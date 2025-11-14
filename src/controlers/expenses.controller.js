'use strict';

const Expense = require('../models/Expense.model');

async function getExpensesById(req, res) {
  const id = Number(req.params.id);

  // eslint-disable-next-line
  if (isNaN(id)) return res.status(404).send('Erro na url');

  try {
    const expense = Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Não foi encontrado').json(expense);
    }
  } catch (err) {
    res.status(500).send('Erro ao buscar despesa');
  }
}

async function createExpense(req, res) {
  const { title, amount, category, date, userId } = req.body;

  if (!title || !amount || !date || !userId) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      userId,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function patchExpensesById(req, res) {
  const id = Number(req.params.id);

  // eslint-disable-next-line
  if (isNaN(id)) return res.status(404).send('Erro na url');

  try {
    const expense = Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Não foi encontrado');
    }
  } catch (err) {
    res.status(500).send('Erro ao atualizar');
  }
}

async function deleteExpensesById(req, res) {
  const id = Number(req.params.id);

  // eslint-disable-next-line
  if (isNaN(id)) return res.status(404).send('Erro na url');

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Não foi encontrado');
    }

    await expense.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Erro ao deletar despesa');
  }
}

module.exports = {
  getExpensesById,
  patchExpensesById,
  deleteExpensesById,
  createExpense,
};
