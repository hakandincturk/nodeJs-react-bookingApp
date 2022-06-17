import express from 'express';
import { login, register } from '../controllers/AuthController';

const app = express();

app.post('/login', login);
app.post('/register', register);

module.exports = app;