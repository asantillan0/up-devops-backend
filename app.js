const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Datos en memoria
let items = [];

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// CRUD endpoints
app.post('/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.status(200).json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
});

app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const { name } = req.body;
    if (name) {
        item.name = name;
    }
    res.status(200).json(item);
});

app.delete('/items/:id', (req, res) => {
    items = items.filter(i => i.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;