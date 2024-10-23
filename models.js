const { Sequelize, DataTypes } = require('sequelize');

// Setup a SQLite database using Sequelize ORM
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './rules.db'  // Location of the SQLite database
});

// Define the 'Rule' model schema
const Rule = sequelize.define('Rule', {
  rule_string: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ast_string: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = {
  sequelize,
  Rule
};
