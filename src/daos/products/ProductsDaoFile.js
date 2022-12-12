/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import { promises as fs } from 'fs';
import ContFile from '../../containers/ContFile.js';
import {logger} from '../../utils/config.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ProductsDaoFile extends ContFile {
    constructor() {
        super('DB_Products.json');
    }

    async save(obj) {
        const objs = await this.getAll();
        let newID;

        if (objs.length === 0) {
            newID = 1;
        } else {
            newID = objs[objs.length-1].id+1;
        }

        const newObj = { ...obj, id:newID };
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
export default ProductsDaoFile;