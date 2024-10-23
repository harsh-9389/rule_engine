const { createRule, combineRules, evaluateRule } = require('./astEngine');

// Test createRule
const rule1 = createRule("age > 30 AND department = 'Sales'");
console.log("AST for Rule 1:", rule1);

// Test combineRules
const rule2 = createRule("age < 25 AND department = 'Marketing'");
const combined = combineRules([rule1, rule2], "OR");
console.log("Combined AST:", combined);

// Test evaluateRule
const userData = { age: 35, department: 'Sales', salary: 60000, experience: 3 };
const result = evaluateRule(combined, userData);
console.log("Evaluation Result:", result);  // Expected True or False
