import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/UserController';
import { verifyAdmin, verifyUser } from '../utils/verifyToken';

const app = express();

/*
 * app.get('/checkauth', verifyToken, (req, res) => {
 * res.json({type: true, message: 'hello user, you are authenticated'});
 * });
 * 
 * app.get('/checkuser/:id', verifyUser, (req, res) => {
 * res.json({type: true, message: 'hello user, you are authenticated and delete you account'});
 * });
 * 
 * app.get('/checkadmin', isAdmin, (req, res) => {
 * res.json({type: true, message: 'hello admin, you are authenticated'});
 * }); 
 */

//UPDATE
app.put('/:id', verifyUser, updateUser);

//DELETE
app.delete('/:id', verifyUser, deleteUser);

//GET
app.get('/:id', verifyUser, getUser);

//GET ALL
app.get('/', verifyAdmin, getUsers);

module.exports = app;