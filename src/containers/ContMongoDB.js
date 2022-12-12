/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import mongoose from 'mongoose';
import moment from 'moment';
import { config } from '../utils/config.js';

import {logger} from '../utils/config.js';

await mongoose.connect(config.mongoURL);

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ContMongoDB {
    constructor(collectionName, squema) {
        this.collection = mongoose.model(collectionName, squema);
    }

    async getAll() {
        try {
            let docs = await this.collection.find({});
            return docs;
        } catch (error) {
            logger.error(`{ error: '${error}' }`);
        }
    }

    async save(obj) {
        try {
            let newObj = await this.collection.create({ ...obj, timestamp: moment().format('DD/MM/YY HH:mm:ss') });
            return newObj._id;
        } catch (error) {
            logger.error(`{ error: '${error}' }`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ContMongoDB;