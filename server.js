const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Defina o modelo para as tarefas
const Task = mongoose.model('Task', {
  title: String,
  description: String,
  completed: Boolean,
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});