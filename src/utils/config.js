/* ---------------------------- MODULOS -----------------------------*/
import * as dotenv from 'dotenv';

dotenv.config();

/* ------------------- OBJETO CONFIGURADOR DE DB -------------------- */
export const config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    secretKey: process.env.SECRET_KEY,
    dbType: process.env.DB_TYPE,
    mongoURL: process.env.MONGO_URL,
    fileSystemPath: process.env.FILESYSTEM_PATH,
};