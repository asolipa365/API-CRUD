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