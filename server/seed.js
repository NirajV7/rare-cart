// server/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create hashed passwords
    const hashedPassword = await bcrypt.hash('test123', 10);

    // Users
    const users = [
      { username: 'adminuser', email: 'admin@example.com', password: hashedPassword, role: 'admin' },
      { username: 'john', email: 'john@example.com', password: hashedPassword, role: 'user' },
      { username: 'jane', email: 'jane@example.com', password: hashedPassword, role: 'user' },
      { username: 'alice', email: 'alice@example.com', password: hashedPassword, role: 'user' },
      { username: 'bob', email: 'bob@example.com', password: hashedPassword, role: 'user' },
    ];

    await User.insertMany(users);
    console.log('Users seeded');

    // Products with future drop times (10 to 30 mins ahead)
    const now = new Date();

    const products = [
      {
        name: 'Rare Sneakers',
        category: 'collectibles',
        price: 199,
        dropTime: new Date(now.getTime() + 10 * 60 * 1000), // 10 min later
        imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80',
        description: 'Limited edition sneaker drop',
      },
      {
        name: 'Street Art Print',     
            category: 'art',
        price: 89,
        dropTime: new Date(now.getTime() + 15 * 60 * 1000), // 15 min later
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
        description: 'Signed print by anonymous artist',
      },
      {
        name: 'Digital Watch',
        category: 'gadgets',
        price: 149,
        dropTime: new Date(now.getTime() + 20 * 60 * 1000), // 20 min later
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
        description: 'Retro-futuristic limited edition watch',
      },
      {
  name: 'Canopy Bed Frame',
  category: 'home',
  price: 2200,
  dropTime: new Date(now.getTime() + 30 * 60 * 1000), // 30 min later
  imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  description: 'Solid oak four-poster bed'
},
      {
  name: 'Signature Hoodie',
  category: 'fashion',
  price: 189,
  dropTime: new Date(now.getTime() + 30 * 60 * 100),
  imageUrl: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=800&q=80',
  description: 'Premium heavyweight hoodie with signature embroidery',
},
    ];

    await Product.insertMany(products);
    console.log('Products seeded ✅');

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
