const { sequelize } = require('./models');

// Sync the database and create necessary tables
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database and tables created');
  })
  .catch((err) => {
    console.error('Error during database setup:', err);
  });
