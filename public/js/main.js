/* ---------------------------- MODULOS -----------------------------*/
const socket = io();

/* ---------------------------- WEBSOCKET ---------------------------*/
socket.on('serv-msgs', dataN => {
    let dataNsize = JSON.stringify(dataN).length;
    let dataD = normalizr.denormalize(dataN.result, msgsSchema, dataN.entities);
    let dataDsize = JSON.stringify(dataD).length;
    let compression = parseInt((dataDsize * 100) / dataNsize);

    renderMessages(dataD, compression).then(html => {
        document.getElementById('messages_formlist').innerHTML = html;
    })
})

socket.on('serv-prods', async (data) => {
    await renderProducts(data).then(html => {
        document.getElementById('prods_table').innerHTML = html;
    })
})

/* --------------------------- HANDLEBARS ---------------------------*/
async function renderMessages (data, compression) {
    return fetch('templates/messagesCenter.hbs')
        .then(resp => resp.text())
        .then(temp => {
            const template = Handlebars.compile(temp);
            const html = template( {data, compression} );

            return html
        })
}

async function renderProducts (data) {
    return fetch('templates/prod_table.hbs')
        .then(resp => resp.text())
        .then(temp => {
            const template = Handlebars.compile(temp);
            const html = template( {data} );

            return html
        })
}

/* ------------------ DESNORMALIZACION DE MENSAJES ------------------*/
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new normalizr.schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' });
const msgsSchema = new normalizr.schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' });

/* --------------------------- FUNCIONES ----------------------------*/
function sendMessage() {
    const nowDate = new Date();
    const inputDate = 
    `${nowDate.getDate() > 9 ? nowDate.getDate() : `0${nowDate.getDate()}`}/`+
    `${nowDate.getMonth() > 9 ? nowDate.getMonth() : `0${nowDate.getMonth()}`}/${nowDate.getFullYear()} `+
    `${nowDate.getHours() > 9 ? nowDate.getHours() : `0${nowDate.getHours()}`}:`+
    `${nowDate.getMinutes() > 9 ? nowDate.getMinutes() : `0${nowDate.getMinutes()}`}:`+
    `${nowDate.getSeconds() > 9 ? nowDate.getSeconds() : `0${nowDate.getSeconds()}`}`;

    const msg = {
        author: {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lName').value,
            age: document.getElementById('age').value,
            nickname: document.getElementById('nickn').value,
            avatar: document.getElementById('avatar').value
        },
        timestamp: inputDate,
        message: document.getElementById('messageContent').value
    }

    socket.emit('client-msg', msg)
}

function addProduct() {
    const inputTitle = document.getElementById('title');
    const inputPrice = document.getElementById('price');
    const inputThumbnail = document.getElementById('thumbnail');

    const prod = {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value
    }

    socket.emit('client-prods', prod)
}

function logout() {
    window.location.href = "/logout";
}