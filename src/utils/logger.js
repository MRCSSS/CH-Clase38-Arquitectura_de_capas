/* ---------------------------- MODULOS -----------------------------*/
import winston from 'winston';

/* ------------------- OBJETO CONFIGURADOR DE LOGGER -------------------- */
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.File({ filename: 'logs/warn.log' ,level: 'warn'}),
        new winston.transports.File({ filename: 'logs/error.log' ,level: 'error'}),
    ]
});