import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Hapus data lama agar tidak error duplicate
  await prisma.transactionItem.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Tambah semua produk
  await prisma.product.createMany({
    data: [
      {
        id: "1",
        name: "Blood Moon Air Filter",
        price: 79.99,
        oldPrice: 99.99,
        description: "A high-performance air filter that howls when your engine revs above 7000 RPM.",
        image: "https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg",
        category: "engine",
        rating: 4.8,
        inStock: true,
        featured: true,
        tags: ["engine", "performance", "racing"],
      },
      {
        id: "2",
        name: "Banshee Exhaust System",
        price: 249.99,
        oldPrice: 299.99,
        description: "An exhaust system that produces a bone-chilling scream that'll wake the dead.",
        image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg",
        category: "exhaust",
        rating: 4.9,
        inStock: true,
        featured: true,
        tags: ["exhaust", "sound", "performance"],
      },
      {
        id: "3",
        name: "Demon Eye Headlight",
        price: 129.99,
        description: "LED headlight with a blood-red halo that pierces through the darkest nights.",
        image: "https://images.pexels.com/photos/5090526/pexels-photo-5090526.jpeg",
        category: "lighting",
        rating: 4.7,
        inStock: true,
        featured: true,
        tags: ["lighting", "visibility", "style"],
      },
      {
        id: "4",
        name: "Ghost Rider Brake Pads",
        price: 59.99,
        description: "Brake pads that emit an eerie glow when heated, providing superior stopping power.",
        image: "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg",
        category: "brakes",
        rating: 4.6,
        inStock: true,
        featured: false,
        tags: ["brakes", "safety", "performance"],
      },
      {
        id: "5",
        name: "Haunted Chain Kit",
        price: 89.99,
        description: "A cursed chain that never needs lubrication and whispers to your bike at night.",
        image: "https://images.pexels.com/photos/4940662/pexels-photo-4940662.jpeg",
        category: "engine",
        rating: 4.5,
        inStock: true,
        featured: false,
        tags: ["drivetrain", "maintenance", "reliability"],
      },
      {
        id: "6",
        name: "Phantom Oil Filter",
        price: 24.99,
        description: "An oil filter that turns your oil pitch black but keeps your engine running cool as a crypt.",
        image: "https://images.pexels.com/photos/4116193/pexels-photo-4116193.jpeg",
        category: "engine",
        rating: 4.4,
        inStock: true,
        featured: false,
        tags: ["engine", "maintenance", "performance"],
      },
      {
        id: "7",
        name: "Crypt Keeper Sprocket",
        price: 79.99,
        description: "A lightweight sprocket with teeth sharp enough to devour chains that aren't worthy.",
        image: "https://images.pexels.com/photos/5912089/pexels-photo-5912089.jpeg",
        category: "engine",
        rating: 4.7,
        inStock: true,
        featured: false,
        tags: ["drivetrain", "performance", "lightweight"],
      },
      {
        id: "8",
        name: "Wicked Grip Set",
        price: 39.99,
        description: "Grips that feel like they're holding you back, enhancing control and reducing fatigue.",
        image: "https://images.pexels.com/photos/22386/pexels-photo.jpg",
        category: "accessories",
        rating: 4.8,
        inStock: true,
        featured: false,
        tags: ["controls", "comfort", "style"],
      },
    ],
  });

  // Tambah user dan transaksi
  await prisma.user.create({
    data: {
      name: "Jack Destin",
      email: "jack@halloweentown.com",
      transactions: {
        create: {
          id: "T1001",
          status: "SHIPPED",
          total: 339.97,
          createdAt: new Date("2023-10-31T14:22:10"),
          items: {
            create: [
              { productId: "1", quantity: 1 },
              { productId: "3", quantity: 2 },
            ],
          },
        },
      },
    },
  });

  console.log("✅ Seeding selesai!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Error saat seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
