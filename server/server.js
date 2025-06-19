const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const materialRoutes = require('./routes/materials');
const locationRoutes = require('./routes/locations');
const categoryRoutes = require('./routes/categories'); // ✅ NEW

app.use('/api/materials', materialRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/categories', categoryRoutes); // ✅ NEW

app.get('/', (req, res) => {
  res.send('Inventory Manager Pro API running.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
