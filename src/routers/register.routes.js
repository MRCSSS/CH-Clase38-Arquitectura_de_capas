/* ============================ MODULOS ============================= */
import express from 'express';
import bcrypt from 'bcrypt';
import { usersDao } from '../daos/index.js';
import {logger} from '../utils/config.js';
import info from './info.routes.js';

/* ====================== INSTANCIA DE ROUTER ======================= */
const register = express.Router();

    /* ---------------- Encripado de Contraseña ---------------- */
async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

/* ============================== RUTAS ============================= */
register.get('/', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/register', {layout: 'register'});
});

register.post('/', async (req, res)=>{
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const {username, password, email } = req.body;
    const userExists = await usersDao.searchUser(username);

    if (userExists !== null) {
        res.render('partials/register-error', {layout: 'register'});
    } else {
        const newUser = {username, password: await generateHashPassword(password), email};
        await usersDao.save(newUser);
        res.redirect('../login')
    }
})

register.get('*', async (request, response) => {
    logger.warn(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    response.status(404).send('404 - Page not found!!');
});

/* ====================== MODULOS EXPORTADOS ======================== */
export default register;