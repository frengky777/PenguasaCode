export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];        
}

export const bestSellerProducts: Product[] = [
  {
    id: "1",
    name: "Blood Moon Air Filter",
    price: 79.99,
    oldPrice: 99.99,
    description: "A high-performance air filter that howls when your engine revs above 7000 RPM.",
    image: "https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.8,
    inStock: true,
    featured: true,
    tags: ["engine", "performance", "racing"]
  },
  {
    id: "2",
    name: "Banshee Exhaust System",
    price: 249.99,
    oldPrice: 299.99,
    description: "An exhaust system that produces a bone-chilling scream that'll wake the dead.",
    image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "exhaust",
    rating: 4.9,
    inStock: true,
    featured: true,
    tags: ["exhaust", "sound", "performance"]
  },
  {
    id: "3",
    name: "Demon Eye Headlight",
    price: 129.99,
    description: "LED headlight with a blood-red halo that pierces through the darkest nights.",
    image: "https://images.pexels.com/photos/5090526/pexels-photo-5090526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "lighting",
    rating: 4.7,
    inStock: true,
    featured: true,
    tags: ["lighting", "visibility", "style"]
  },
  {
    id: "4",
    name: "Ghost Rider Brake Pads",
    price: 59.99,
    description: "Brake pads that emit an eerie glow when heated, providing superior stopping power.",
    image: "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "brakes",
    rating: 4.6,
    inStock: true,
    tags: ["brakes", "safety", "performance"]
  },
  {
    id: "5",
    name: "Haunted Chain Kit",
    price: 89.99,
    description: "A cursed chain that never needs lubrication and whispers to your bike at night.",
    image: "https://images.pexels.com/photos/4940662/pexels-photo-4940662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.5,
    inStock: true,
    tags: ["drivetrain", "maintenance", "reliability"]
  },
  {
    id: "6",
    name: "Phantom Oil Filter",
    price: 24.99,
    description: "An oil filter that turns your oil pitch black but keeps your engine running cool as a crypt.",
    image: "https://images.pexels.com/photos/4116193/pexels-photo-4116193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.4,
    inStock: true,
    tags: ["engine", "maintenance", "performance"]
  },
  {
    id: "7",
    name: "Crypt Keeper Sprocket",
    price: 79.99,
    description: "A lightweight sprocket with teeth sharp enough to devour chains that aren't worthy.",
    image: "https://images.pexels.com/photos/5912089/pexels-photo-5912089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.7,
    inStock: true,
    tags: ["drivetrain", "performance", "lightweight"]
  },
  {
    id: "8",
    name: "Wicked Grip Set",
    price: 39.99,
    description: "Grips that feel like they're holding you back, enhancing control and reducing fatigue.",
    image: "https://images.pexels.com/photos/22386/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    rating: 4.8,
    inStock: true,
    tags: ["controls", "comfort", "style"]
  }
];

export const allProducts: Product[] = [
  ...bestSellerProducts,
  {
    id: "9",
    name: "Zombie Spark Plugs",
    price: 29.99,
    description: "Spark plugs that refuse to die, providing consistent ignition even in the most cursed conditions.",
    image: "https://images.pexels.com/photos/4116211/pexels-photo-4116211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.6,
    inStock: true,
    tags: ["engine", "ignition", "reliability"]
  },
  {
    id: "10",
    name: "Hellfire Radiator",
    price: 149.99,
    description: "A radiator that keeps your engine cool even in the fires of hell.",
    image: "https://images.pexels.com/photos/5912078/pexels-photo-5912078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.7,
    inStock: true,
    tags: ["cooling", "performance", "reliability"]
  },
  {
    id: "11",
    name: "Cursed Clutch Plates",
    price: 119.99,
    description: "Clutch plates that grip like a banshee and never slip, even under the most demonic acceleration.",
    image: "https://images.pexels.com/photos/92615/pexels-photo-92615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.8,
    inStock: true,
    tags: ["transmission", "performance", "durability"]
  },
  {
    id: "12",
    name: "Nightmare Fuel Pump",
    price: 89.99,
    description: "A fuel pump that draws gasoline like a vampire draws blood, ensuring your engine never starves.",
    image: "https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "engine",
    rating: 4.5,
    inStock: true,
    tags: ["fuel system", "performance", "reliability"]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.featured);
};

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}
// export async function fetchRevenue() {
//   try {
//     console.log('Fetching revenue data...');
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue[]>`SELECT * FROM revenue`;

//     console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

export const recentTransactions: Transaction[] = [
  {
    id: "T1001",
    customerName: "Jack Destin",
    customerEmail: "jack@halloweentown.com",
    date: "2023-10-31T14:22:10",
    products: [
      {
        id: "1",
        name: "Blood Moon Air Filter",
        quantity: 1,
        price: 79.99
      },
      {
        id: "3",
        name: "Demon Eye Headlight",
        quantity: 2,
        price: 129.99
      }
    ],
    total: 339.97,
    status: 'shipped'
  },
  {
    id: "T1002",
    customerName: "Sally Finkelstein",
    customerEmail: "sally@halloweentown.com",
    date: "2023-10-30T09:15:22",
    products: [
      {
        id: "2",
        name: "Banshee Exhaust System",
        quantity: 1,
        price: 249.99
      }
    ],
    total: 249.99,
    status: 'delivered'
  },
  {
    id: "T1003",
    customerName: "Zero Ghostdog",
    customerEmail: "zero@halloweentown.com",
    date: "2023-10-29T16:45:30",
    products: [
      {
        id: "8",
        name: "Wicked Grip Set",
        quantity: 1,
        price: 39.99
      },
      {
        id: "4",
        name: "Ghost Rider Brake Pads",
        quantity: 1,
        price: 59.99
      }
    ],
    total: 99.98,
    status: 'pending'
  },
  {
    id: "T1004",
    customerName: "Oogie Boogie",
    customerEmail: "oogie@halloweentown.com",
    date: "2023-10-28T11:10:45",
    products: [
      {
        id: "7",
        name: "Crypt Keeper Sprocket",
        quantity: 1,
        price: 79.99
      }
    ],
    total: 79.99,
    status: 'cancelled'
  },
  {
    id: "T1005",
    customerName: "Lock Shock",
    customerEmail: "lock@halloweentown.com",
    date: "2023-10-27T14:20:15",
    products: [
      {
        id: "5",
        name: "Haunted Chain Kit",
        quantity: 1,
        price: 89.99
      },
      {
        id: "6",
        name: "Phantom Oil Filter",
        quantity: 2,
        price: 24.99
      }
    ],
    total: 139.97,
    status: 'delivered'
  }
];
