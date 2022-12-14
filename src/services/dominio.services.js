/* ============================ MODULOS ============================= */
import { usersDao } from "../daos/index.js";
import { logger } from "../utils/logger.js";

/* =========================== FUNCIONES ============================ */
    /* ----------------- Session Authorization ----------------- */
async function auth(req) {
    if(req.isAuthenticated()){
        return await usersDao.searchUser(req.session.passport.user);
    }
    return null;
}
    /* ------------------------ Loggers ------------------------ */
function loggReq(req){
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
}
function loggErr(req, error){
    logger.error(`{ status: 500, route: '${req.method} ${req.baseUrl} ${req.url}', error: '${error}' }`);
}

/* =========================== SERVICIOS ============================ */
export async function getRootServ(req) {
    try {
        loggReq(req);
    } catch (error) {
        loggErr(req,error);
    }
}

export async function getHomeServ(req) {
    try {
        loggReq(req);
        return await auth(req);
    } catch (error) {
        loggErr(error);
    }
}

export async function getLoginServ(req) {
    try {
        loggReq(req);
    } catch (error) {
        loggErr(error);
    }
}

export async function postLoginServ(req) {
    try {
        loggReq(req);
    } catch (error) {
        loggErr(error);
    }
}

export async function getLogoutServ(req) {
    try {
        loggReq(req);
        const user = await usersDao.searchUser(req.session.passport.user);
        req.session.destroy();
        return user;
    } catch (error) {
        loggErr(error);
    }
}

export async function getRegisterServ(req) {
    try {
        loggReq(req);
    } catch (error) {
        loggErr(error);
    }
}

export async function postRegisterServ(req) {
    try {
        loggReq(req);
        const {username, password, email } = req.body;
        const userExists = await usersDao.searchUser(username);

        if (userExists !== null) {
            return 'userExists';
        }
        const newUser = {username, password: await generateHashPassword(password), email};
        await usersDao.save(newUser);
        return null;
    } catch (error) {
        loggErr(error);
    }
}
