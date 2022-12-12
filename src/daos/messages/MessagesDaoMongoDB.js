/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContMongoDB from '../../containers/ContMongoDB.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class MessagesDaoMongoDB extends ContMongoDB {
    constructor() {
        super('msgs', {
            author: { type: [], required: true },
            timestamp: { type: String, required: true },
            message: { type: String, required: true }
        });
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default MessagesDaoMongoDB;