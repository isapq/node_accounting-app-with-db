'use strict';

// const User = require('../models/User.model');

async function createUser(req, res) {
  const users = req.app.locals.users;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Nome é obrigatório');
  }

  try {
    const newUser = {
      id: req.app.locals.nextUserId++,
      name,
    };

    users.push(newUser);

    return res.status(201).json(newUser);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Erro ao criar usuário:', err);

    return res.status(500).send('Erro ao criar usuário');
  }
}

async function getUsers(req, res) {
  try {
    const users = req.app.locals.users;

    return res.status(200).json(users);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Erro ao listar usuários:', err);

    return res.status(500).send('Erro no servidor');
  }
}

async function getUserById(req, res) {
  const users = req.app.locals.users;
  const { id } = req.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).send('Erro na URL');
  }

  try {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    return res.status(200).json(user);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Erro ao buscar usuário:', err);

    return res.status(500).send('Erro no servidor');
  }
}

async function patchUserById(req, res) {
  const users = req.app.locals.users;
  const { id } = req.params;
  const { name } = req.body;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).send('Erro na URL');
  }

  if (!name) {
    return res.status(400).send('Nome é obrigatório');
  }

  try {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    user.name = name;

    return res.status(200).json(user);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Erro ao atualizar usuário:', err);

    return res.status(500).send('Erro ao atualizar usuário');
  }
}

async function deleteUserById(req, res) {
  const users = req.app.locals.users;
  const { id } = req.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).send('Erro na URL');
  }

  try {
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return res.status(404).send('Usuário não encontrado');
    }

    users.splice(index, 1);

    return res.status(204).send();
  } catch (err) {
    // eslint-disable-next-line
    console.error('Erro ao deletar usuário:', err);

    return res.status(500).send('Erro ao deletar usuário');
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  patchUserById,
  deleteUserById,
};
