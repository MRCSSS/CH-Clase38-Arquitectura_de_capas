/* ============================ MODULOS ============================= */
import express from 'express';
import os from 'os';
import compression from 'compression';
import {logger} from '../utils/config.js';

/* ====================== INSTANCIA DE ROUTER ======================= */
const info = express.Router();

/* ============================== RUTAS ============================= */
info.get('/', compression(), (req, res) => {
// info.get('/', (req, res) => {
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
    // console.log("Information data: ",infoData);

    res.render('partials/info-content', infoData );
});


info.get('*', async (request, response) => {
    logger.warn(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    response.status(404).send('404 - Page not found!!');
});

/* ====================== MODULOS EXPORTADOS ======================== */
export default info;