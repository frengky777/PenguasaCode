import { v4 as uuidv4 } from 'uuid';

// User data for authentication
export const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a46d20',
    name: 'Admin User',
    email: 'admin@hauntedparts.com',
    password: 'Admin123!',
  },
  {
    id: '15744b2b-5401-3261-3455-fec4b6a67m54',
    name: 'Test User',
    email: 'test@hauntedparts.com',
    password: 'Test123!',
  },
];

// Customer data
export const customers = [
  {
    id: 'c001',
    name: 'Jack Skellington',
    email: 'jack@halloweentown.com',
    image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  },
  {
    id: 'c002',
    name: 'Sally Finkelstein',
    email: 'sally@halloweentown.com',
    image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
  {
    id: 'c003',
    name: 'Zero Ghostdog',
    email: 'zero@halloweentown.com',
    image_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: 'c004',
    name: 'Oogie Boogie',
    email: 'oogie@halloweentown.com',
    image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
  {
    id: 'c005',
    name: 'Lock Shock',
    email: 'lock@halloweentown.com',
    image_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
  },
];

// Product data
export const products = [
  {
    id: 'p001',
    name: 'Blood Moon Air Filter',
    description: 'High-performance air filter that gives your engine a haunting howl.',
    category: 'Engine',
    price: 79.99,
    original_price: 99.99,
    rating: 4.8,
    stock: true,
    image_url: 'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg',
  },
  {
    id: 'p002',
    name: 'Banshee Exhaust System',
    description: 'Emit a spine-chilling sound with this custom exhaust system.',
    category: 'Exhaust',
    price: 249.99,
    original_price: 299.99,
    rating: 4.9,
    stock: true,
    image_url: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
  },
  {
    id: 'p003',
    name: 'Demon Eye Headlight',
    description: 'Terrifying red LED headlights that will make other drivers move aside.',
    category: 'Lighting',
    price: 129.99,
    original_price: 149.99,
    rating: 4.7,
    stock: true,
    image_url: 'https://images.pexels.com/photos/1073078/pexels-photo-1073078.jpeg',
  },
  {
    id: 'p004',
    name: 'Ghost Rider Brake Pads',
    description: 'Stop on a dime with these otherworldly brake pads.',
    category: 'Brakes',
    price: 59.99,
    original_price: 69.99,
    rating: 4.6,
    stock: true,
    image_url: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
  },
  {
    id: 'p005',
    name: 'Haunted Chain Kit',
    description: 'A timing chain that will never break, even in the afterlife.',
    category: 'Engine',
    price: 89.99,
    original_price: 99.99,
    rating: 4.5,
    stock: true,
    image_url: 'https://images.pexels.com/photos/2248339/pexels-photo-2248339.jpeg',
  },
  {
    id: 'p006',
    name: 'Phantom Oil Filter',
    description: 'Keeps your engine clean with supernatural filtering technology.',
    category: 'Engine',
    price: 24.99,
    original_price: 29.99,
    rating: 4.4,
    stock: true,
    image_url: 'https://images.pexels.com/photos/188777/pexels-photo-188777.jpeg',
  },
  {
    id: 'p007',
    name: 'Crypt Keeper Sprocket',
    description: 'Durable sprocket that will outlive you and your vehicle.',
    category: 'Engine',
    price: 79.99,
    original_price: 89.99,
    rating: 4.7,
    stock: true,
    image_url: 'https://images.pexels.com/photos/743902/pexels-photo-743902.jpeg',
  },
];

// Transaction data
export const transactions = [
  {
    id: 'T1001',
    customer_id: 'c001',
    date: '2023-10-31',
    status: 'Shipped',
    items: 2,
    total: 339.97,
    products: ['p001', 'p005'],
  },
  {
    id: 'T1002',
    customer_id: 'c002',
    date: '2023-10-30',
    status: 'Delivered',
    items: 1,
    total: 249.99,
    products: ['p002'],
  },
  {
    id: 'T1003',
    customer_id: 'c003',
    date: '2023-10-29',
    status: 'Pending',
    items: 2,
    total: 99.98,
    products: ['p003', 'p006'],
  },
  {
    id: 'T1004',
    customer_id: 'c004',
    date: '2023-10-28',
    status: 'Cancelled',
    items: 1,
    total: 79.99,
    products: ['p007'],
  },
  {
    id: 'T1005',
    customer_id: 'c005',
    date: '2023-10-27',
    status: 'Delivered',
    items: 2,
    total: 139.97,
    products: ['p003', 'p004'],
  },
];

// Monthly revenue data
export const revenue = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 3000 },
  { month: 'May', revenue: 2000 },
  { month: 'Jun', revenue: 2500 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3200 },
  { month: 'Sep', revenue: 3000 },
  { month: 'Oct', revenue: 4200 },
  { month: 'Nov', revenue: 5500 },
  { month: 'Dec', revenue: 6500 },
];

// Invoice data (keeping for compatibility)
export const invoices = [
  {
    customer_id: 'c001',
    amount: 339.97,
    status: 'paid',
    date: '2023-10-31',
  },
  {
    customer_id: 'c002',
    amount: 249.99,
    status: 'paid',
    date: '2023-10-30',
  },
  {
    customer_id: 'c003',
    amount: 99.98,
    status: 'pending',
    date: '2023-10-29',
  },
  {
    customer_id: 'c004',
    amount: 79.99,
    status: 'canceled',
    date: '2023-10-28',
  },
  {
    customer_id: 'c005',
    amount: 139.97,
    status: 'paid',
    date: '2023-10-27',
  },
];