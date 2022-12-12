/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContMongoDB from '../../containers/ContMongoDB.js';
import {logger} from '../../utils/config.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class UsersDaoMongoDB extends ContMongoDB {
    constructor() {
        super('users', {
            username: { type: String, required: true },
            password: { type: String, required: true },
            email: { type: String, required: true }
        });
    }

    async searchUser(username) {
        try {
            const object = await this.collection.find({ 'username': username });
            return object.length != 0 ? object[0] : null
        } catch (error) {
            logger.error(`{ error: '${error}' }`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default UsersDaoMongoDB;