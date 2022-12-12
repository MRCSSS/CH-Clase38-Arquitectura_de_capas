/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContFile from '../../containers/ContFile.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class UsersDaoFile extends ContFile {
    constructor() {
        super('DB_Users.json');
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default UsersDaoFile;