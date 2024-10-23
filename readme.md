# Rule Engine with AST

## Project Overview

This project is a **Rule Engine** built in **Node.js** that uses **Abstract Syntax Trees (AST)** to represent conditional rules. The rules can be dynamically created, combined, and evaluated against user data to determine eligibility based on attributes like `age`, `department`, `income`, `experience`, etc. The rules are stored in a **SQLite** database for persistence.

## Features

- **Create Rules**: Parse a string-based rule and convert it into an AST (e.g., `age > 30 AND department = 'Sales'`).
- **Combine Rules**: Combine multiple rules into a single AST using logical operators (`AND`, `OR`).
- **Evaluate Rules**: Evaluate user data against the rules and return whether the conditions are satisfied.
- **Data Persistence**: Rules are stored in a SQLite database for retrieval and evaluation.

---

## Technologies Used

- **Node.js**: JavaScript runtime environment for the backend.
- **Express.js**: Web framework for creating RESTful APIs.
- **Sequelize**: ORM for interacting with the SQLite database.
- **SQLite**: Lightweight SQL database for storing rules.
- **Body-Parser**: Middleware for parsing incoming request bodies in JSON format.

---

## Installation and Setup

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your machine.

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/rule-engine.git
   cd rule-engine
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the database setup script to initialize the SQLite database and create necessary tables**:
   ```bash
   npm run dbsetup
   ```
4. **Start the Node.js server**:
   ```bash
   npm start
   ```

#### The application will now be running on http://localhost:3000.

## API Endpoints

### 1. Create a Rule

- **Endpoint**: /rules/create
- **Method**: POST
- **Description**: Create a new rule from a string and store it in the database.

  #### **Sample Request**:

  ```bash
  {
  "rule_string": "age > 30 AND department = 'Sales'"
  }
  ```

  #### **Sample Response**:

  ```bash
  {
  "rule_id": 1,
  "ast": {
      "type": "operator",
      "value": "AND",
      "left": {
          "type": "operand",
          "value": "age > 30"
          },
      "right": {
          "type": "operand",
          "value": "department = 'Sales'"
          }
      }
  }
  ```

### 2. Combine Rules

- **Endpoint**: /rules/combine
- **Method**: POST
- **Description**: Combine multiple rules using logical operators (e.g., AND, OR).

  #### **Sample Request**:

  ```bash
  {
  "rule_ids": [1, 2],
  "operator": "AND"
  }
  ```

  #### **Sample Response**:

  ```bash
  {
    "combined_ast": {
        "type": "operator",
        "value": "AND",
        "left": { ... },
        "right": { ... }
    }
  }
  ```

### 3. Evaluate a Rule

- **Endpoint**: /rules/evaluate
- **Method**: POST
- **Description**: Evaluate a rule by passing user data and check if the conditions are satisfied.

  #### **Sample Request**:

  ```bash
  {
    "rule_id": 1,
    "data": {
        "age": 35,
        "department": "Sales",
        "salary": 60000,
        "experience": 3
    }
  }
  ```

  #### **Sample Response**:

  ```bash
  {
    "result": true
  }
  ```

  In this case, the age is 35 and department is Sales, which matches the rule age > 30 AND department = 'Sales'.

## File Structure

```bash
rule-engine/
│
├── app.js                 # Main server and application entry point
├── models.js              # Sequelize model for database interactions
├── astEngine.js           # AST creation, combination, and evaluation logic
├── routes/
│   └── rules.js           # API routes for creating, combining, and evaluating rules
├── dbSetup.js             # Script to initialize the SQLite database
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
└── testCases.js           # Sample test cases to validate the functionality
```

## Running Test

#### Test cases are available in testCases.js. You can run them manually using Node.js:

```
node testCases.js
```

#### These test cases validate:

- Rule creation and AST generation.
- Rule combination logic.
- Rule evaluation with sample user data.

## Dependencies

- **express**: Web framework for creating the API.
- **sequelize**: ORM for database interaction.
- **sqlite3**: SQLite database for lightweight storage.
- **body-parser**: Middleware for parsing incoming request bodies.

## License

#### This project is licensed under the MIT License. See the LICENSE file for details.

#### This **README.md** covers all the details required for users to understand, install, and use the **Rule Engine with AST** project in Node.js.
