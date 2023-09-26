Uma API em Node.js com Express para realizar operações CRUD (Create, Read, Update, Delete) em uma lista de tarefas.

1. **Configuração do Projeto:**

   - Certifique-se de que o Node.js está instalado em seu sistema.
   - Crie uma pasta para o projeto e execute `npm init` para configurar o projeto Node.js.

2. **Instalação de Dependências:**

   - Vamos usar o Express para criar a API e o Mongoose para conectar a um banco de dados MongoDB. Execute os seguintes comandos para instalar as dependências:

   ```bash
   npm install express mongoose
   ```

3. **Configurando o Servidor Express:**

   - Crie um arquivo `server.js` para configurar o servidor.

   ```javascript
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
   ```

4. **Rotas e Controladores:**

   - Crie rotas e controladores para executar as operações CRUD.

   ```javascript
   // Listar todas as tarefas
   app.get('/tasks', async (req, res) => {
     const tasks = await Task.find();
     res.json(tasks);
   });

   // Criar uma nova tarefa
   app.post('/tasks', async (req, res) => {
     const { title, description } = req.body;
     const task = new Task({ title, description, completed: false });
     await task.save();
     res.json(task);
   });

   // Atualizar uma tarefa por ID
   app.put('/tasks/:id', async (req, res) => {
     const { title, description, completed } = req.body;
     const updatedTask = await Task.findByIdAndUpdate(
       req.params.id,
       { title, description, completed },
       { new: true }
     );
     res.json(updatedTask);
   });

   // Excluir uma tarefa por ID
   app.delete('/tasks/:id', async (req, res) => {
     await Task.findByIdAndRemove(req.params.id);
     res.json({ message: 'Tarefa excluída com sucesso!' });
   });
   ```

5. **Iniciar o Servidor:**

   - Agora, você pode iniciar o servidor executando `node server.js`. Ele estará ouvindo em http://localhost:3000.

6. **Testar a API:**

   - Use um cliente REST como o Postman ou faça solicitações HTTP para testar as operações CRUD (GET, POST, PUT, DELETE) em http://localhost:3000/tasks.