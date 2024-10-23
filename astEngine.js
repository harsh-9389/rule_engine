class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;  // 'operator' or 'operand'
    this.value = value;  // e.g., 'AND', 'age > 30'
    this.left = left;  // Left child node
    this.right = right;  // Right child node
  }
}

// Function to create a rule as an AST from a rule string
function createRule(ruleString) {
  const parseCondition = (condition) => {
    const [attr, operator, val] = condition.trim().split(' ');
    return new Node('operand', `${attr} ${operator} ${val}`);
  };

  const parseLogicalExpression = (expression) => {
    if (expression.includes('AND') || expression.includes('OR')) {
      const operator = expression.includes('AND') ? 'AND' : 'OR';
      const [left, right] = expression.split(operator);
      return new Node('operator', operator, parseRule(left.trim()), parseRule(right.trim()));
    } else {
      return parseCondition(expression);
    }
  };

  const parseRule = (rule) => {
    return parseLogicalExpression(rule);
  };

  return parseRule(ruleString);
}

// Function to combine multiple rules into a single AST
function combineRules(rules, operator = 'AND') {
  let combined = rules[0];
  for (let i = 1; i < rules.length; i++) {
    combined = new Node('operator', operator, combined, rules[i]);
  }
  return combined;
}

// Function to evaluate a rule against user data
function evaluateRule(node, data) {
  if (node.type === 'operand') {
    const [attr, operator, val] = node.value.split(' ');
    if (operator === '>') return data[attr] > parseInt(val);
    if (operator === '<') return data[attr] < parseInt(val);
    if (operator === '=') return data[attr] === val.replace(/'/g, '');
  } else if (node.type === 'operator') {
    const leftResult = evaluateRule(node.left, data);
    const rightResult = evaluateRule(node.right, data);
    if (node.value === 'AND') return leftResult && rightResult;
    if (node.value === 'OR') return leftResult || rightResult;
  }
  return false;
}

module.exports = {
  Node,
  createRule,
  combineRules,
  evaluateRule
};
