const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const ruleRoutes = require('./routes/rules');

const app = express();

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Use the routes defined in routes/rules.js for '/rules' endpoint
app.use('/rules', ruleRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Rule Engine API. Read readme for usage instructions.');
});

// Set the port for the application
const PORT = process.env.PORT || 3000;

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database sync failed:', err);
});
