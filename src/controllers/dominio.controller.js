/* ============================ MODULOS ============================= */

/* ====================== INSTANCIA DE SERVER ======================= */

/* ========================== MIDDLEWARES =========================== */

/* =========================== OPERATIONS =========================== */
export async function rootCtrlr(req, res) {
    try {
        const data = await rootServ();
        res.status(200).json({
            status: 200,
            route: `${req.method} ${req.baseUrl} ${req.url}`,
            data: data
        });
        !req.session.user ? res.redirect('/login') : res.redirect('/home');
    } catch (error) {
        return res.status(500).json({
            status: 500,
            route: `${req.method} ${req.baseUrl} ${req.url}`,
            error: error
        });
    }
}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}

// export async function (req, res) {}
