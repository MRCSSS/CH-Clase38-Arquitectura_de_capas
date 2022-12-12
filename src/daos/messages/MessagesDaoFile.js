/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContFile from '../../containers/ContFile.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class MessagesDaoFile extends ContFile {
    constructor() {
        super('DB_Messages.json');
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default MessagesDaoFile;