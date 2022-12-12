import ContMongoDB from '../../containers/ContMongoDB.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ProductsDaoMongoDB extends ContMongoDB {
    constructor() {
        super('products', {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: String, required: true },
            foto: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true }
        });
    }

}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ProductsDaoMongoDB;