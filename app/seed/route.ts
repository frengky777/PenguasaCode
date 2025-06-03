import bcrypt from "bcryptjs";
import postgres from "postgres";
import { invoices, customers, revenue, users, products, transactions } from "@/lib/db";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount > 100;
  `;

  return data;
}

export async function GET() {
  try {
    await seedDatabase();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function seedDatabase() {
  try {
    // Begin transaction
    const result = await Promise.all([
      seedUsers(),
      seedCustomers(),
      seedProducts(),
      seedTransactions(),
      seedInvoices(),
      seedRevenue(),
    ]);
    
    return result;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedCustomers;
}

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      original_price DECIMAL(10, 2),
      rating DECIMAL(2, 1),
      stock BOOLEAN DEFAULT true,
      image_url TEXT
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        INSERT INTO products (id, name, description, category, price, original_price, rating, stock, image_url)
        VALUES (
          ${product.id}, 
          ${product.name}, 
          ${product.description}, 
          ${product.category}, 
          ${product.price}, 
          ${product.original_price}, 
          ${product.rating}, 
          ${product.stock}, 
          ${product.image_url}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

async function seedTransactions() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id VARCHAR(255) PRIMARY KEY,
      customer_id VARCHAR(255) NOT NULL REFERENCES customers(id),
      date DATE NOT NULL,
      status VARCHAR(255) NOT NULL,
      items INT NOT NULL,
      total DECIMAL(10, 2) NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS transaction_items (
      id SERIAL PRIMARY KEY,
      transaction_id VARCHAR(255) REFERENCES transactions(id),
      product_id VARCHAR(255) REFERENCES products(id),
      UNIQUE(transaction_id, product_id)
    );
  `;

  // Insert transactions
  await Promise.all(
    transactions.map(
      (transaction) => sql`
        INSERT INTO transactions (id, customer_id, date, status, items, total)
        VALUES (
          ${transaction.id}, 
          ${transaction.customer_id}, 
          ${transaction.date}, 
          ${transaction.status}, 
          ${transaction.items}, 
          ${transaction.total}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  // Insert transaction items
  const transactionItems = transactions.flatMap(transaction => 
    transaction.products.map(productId => ({
      transaction_id: transaction.id,
      product_id: productId
    }))
  );

  await Promise.all(
    transactionItems.map(
      (item) => sql`
        INSERT INTO transaction_items (transaction_id, product_id)
        VALUES (${item.transaction_id}, ${item.product_id})
        ON CONFLICT (transaction_id, product_id) DO NOTHING;
      `
    )
  );

  return true;
}

async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id VARCHAR(255) NOT NULL REFERENCES customers(id),
      amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedInvoices;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
    )
  );

  return insertedRevenue;
}