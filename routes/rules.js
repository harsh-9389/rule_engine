const express = require('express');
const { Rule } = require('../models');
const { createRule, combineRules, evaluateRule } = require('../astEngine');

const router = express.Router();

// Route to create a rule from a rule string
router.post('/create', async (req, res) => {
  const { rule_string } = req.body;
  const ast = createRule(rule_string);
  const rule = await Rule.create({
    rule_string,
    ast_string: JSON.stringify(ast)
  });
  res.json({ rule_id: rule.id, ast });
});

// Route to combine multiple rules
router.post('/combine', async (req, res) => {
  const { rule_ids, operator } = req.body;
  const rules = await Rule.findAll({
    where: { id: rule_ids }
  });
  const astList = rules.map(rule => JSON.parse(rule.ast_string));
  const combinedAst = combineRules(astList, operator);
  res.json({ combined_ast: combinedAst });
});

// Route to evaluate a rule against user data
router.post('/evaluate', async (req, res) => {
  const { rule_id, data } = req.body;
  const rule = await Rule.findByPk(rule_id);
  const ast = JSON.parse(rule.ast_string);
  const result = evaluateRule(ast, data);
  res.json({ result });
});

module.exports = router;
