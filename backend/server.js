const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Temporary storage (we'll replace with database)
let customers = [
  {
    id: 1,
    name: "John Smith",
    phone: "07123456789",
    postcode: "SW1A 1AA",
    address: "10 Downing Street, London",
    usualOrder: "Large Pepperoni Pizza, Coke",
    orderCount: 15
  }
];

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Restaurant CRM API is running!" });
});

// Get all customers
app.get('/customers', (req, res) => {
  // Sort by order frequency
  const sorted = [...customers].sort((a, b) => b.orderCount - a.orderCount);
  res.json(sorted);
});

// Add a customer
app.post('/customers', (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    ...req.body,
    orderCount: 0
  };
  customers.push(newCustomer);
  res.json(newCustomer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
