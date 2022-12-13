/* ============================ MODULOS ============================= */
import { Router } from "express";
import { rootCtrlr } from "../controllers/dominio.controller.js";

/* ====================== INSTANCIA DE SERVER ======================= */
const domOper = Router();

/* ============================== RUTAS ============================= */
domOper.get('/', rootCtrlr);
domOper.get('/home', auth, async (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const user = await usersDao.searchUser(req.session.passport.user);
    res.render('partials/home', {layout: 'home', user: user.username , email: user.email});
});

domOper.get('/login', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/login', {layout: 'login'});
});

domOper.post('/login', () => {logger.info(`{ url: '${req.url}', method: '${req.method}' }`);}, passport.authenticate('local', {
    successRedirect: '/home', 
    failureRedirect: '/login-error'
}));

domOper.get('/login-error', (req, res)=>{
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/login-error', {layout: 'login'});
})

domOper.get('/logout', async (req, res)=> {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const user = await usersDao.searchUser(req.session.passport.user);

    req.session.destroy(err=>{
        if (err) {
            res.json({err});
        } else {
            res.render('partials/logout', { layout: 'logout', user: user.username });
        }
    });
});







/* ============================== RUTAS ============================= */
domOper.get('/', compression(), (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const args = process.argv.slice(2);
    let argsData = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '-p') {
            argsData.push({port: args[i+1]});
            i++;
        } else if (args[i] === '-s') {
            argsData.push({serverMode: args[i+1].toUpperCase()});
            i++;
        } else {
            argsData.push({value: args[i]});
        }
    }
    let infoData = {
        layout: 'info',
        args: argsData,
        path: process.execPath,
        os: process.platform,
        cores: os.cpus().length, 
        pid: process.pid,
        nodeVersion: process.version,        
        directory: process.cwd(),
        memUsage: process.memoryUsage(),
    };
    res.render('partials/info-content', infoData );
});

    








domOper.get('/', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/register', {layout: 'register'});
});

domOper.post('/', async (req, res)=>{
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

/* ====================== MODULOS EXPORTADOS ======================== */
export default domOper;