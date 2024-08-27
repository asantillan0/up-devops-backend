const request = require('supertest');
const express = require('express');
const app = require('./app'); // Asegúrate de exportar tu app desde app.js

describe('GET /health', () => {
    it('should return health status', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('UP');
    });
});

describe('POST /items', () => {
    it('should create a new item', async () => {
        const response = await request(app).post('/items').send({ name: 'Test Item' });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Item');
    });
});
