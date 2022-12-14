/* ============================ MODULOS ============================= */
import bcrypt from 'bcrypt';
import connectMongo from 'connect-mongo';
import express from 'express';
import { create } from 'express-handlebars';
import session from 'express-session';
import { createServer } from 'http';
import { normalize, schema } from 'normalizr';
import path from 'path';
import { Server } from 'socket.io';
import { msgsDao, productsDao, usersDao } from './src/daos/index.js';
import domOper from './src/routers/dominio.routes.js';
import {config} from './src/utils/config.js';
import {logger} from './src/utils/logger.js';

/* ====================== INSTANCIA DE SERVER ======================= */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const exphbs = create({
    defaultLayout: null,
    extname: 'hbs'
});

/* ================== PERSISTENCIA DE SESION MONGO ================== */
const MongoStore = connectMongo.create({
    mongoUrl: config.mongoURL,
    ttl: 10 *60 // Minutos *60
});

/* ========================== MIDDLEWARES =========================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
    /* --------------------- Session Setup --------------------- */
app.use(session({
    store: MongoStore,
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false,
    rolling: true
}));
    /* ------------------ Motor de Plantillas ------------------ */
app.engine('hbs', exphbs.engine);
app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'hbs');

/* ============================== RUTAS ============================= */
app.use('/', domOper);
app.all('*', (req, res)=>{
    logger.warn(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/page-not-found', { layout: 'home' });
});

/* ===================== NORMALIZANDO MENSAJES ====================== */
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' });
const msgsSchema = new schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' });
const normalizing = (fullMsgs) => normalize(fullMsgs, msgsSchema);

async function getAllNormalized() {
    const msgs = await msgsDao.getAll();
    return normalizing({ id: 'messages', msgs});
}

/* ============================ WEBSOCKET =========================== */
io.on('connection', async (socket) => {
    logger.info(`Client conected: ${socket.id}`);

    socket.emit('serv-msgs', await getAllNormalized());
    socket.emit('serv-prods', await productsDao.getAll());

    socket.on('client-msg', async (msg) => {
        await msgsDao.save(msg);
        io.sockets.emit('serv-msgs', await getAllNormalized());
    });
    socket.on('client-prods', async (prod) => {
        await productsDao.save(prod);
        io.sockets.emit('serv-prods', await productsDao.getAll());
    });
});

/* ============================ SERVIDOR ============================ */
const server = httpServer.listen(config.port, () => {
    logger.info(`Server listening at PORT: ${config.port}`);
});
server.on('error', err => { logger.error(`Server error: ${err}`); });
