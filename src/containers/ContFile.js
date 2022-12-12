/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import { promises as fs } from 'fs';
import moment from 'moment';
import {logger} from '../utils/config.js';
// import * as dotenv from 'dotenv';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ContFile {
    constructor(path) {
        this.path = `${process.env.FILESYSTEM_PATH}/${path}`;
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.path, 'utf8');
            return JSON.parse(objs);
        } catch (error) {
            logger.error(`{ error: '${error}' }`);
            return [];
        }
    }

    async save(obj) {
        const objs = await this.getAll();
        const newObj = { ...obj, timestamp: moment().format('DD/MM/YY HH:mm:ss') };

        objs.push(newObj);

        try {
            await fs.writeFile(this.path, JSON.stringify(objs, null, 2));
            return newID;
        } catch (error) {
            logger.error(`{ error: '${error}' }`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ContFile;