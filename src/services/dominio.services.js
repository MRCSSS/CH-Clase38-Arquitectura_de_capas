export async function rootServ() {
    try {
        logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    } catch (error) {
        logger.error(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    }
}