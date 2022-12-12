/* ---------------------------- MODULOS -----------------------------*/
const socket = io();

/* ---------------------------- WEBSOCKET ---------------------------*/
socket.on('serv-rNumbs', randomNumbersResult => {
    renderNumbers( randomNumbersResult ).then(html => {
        document.getElementById('randomCount').innerHTML = html;
    });
});

/* --------------------------- HANDLEBARS ---------------------------*/
async function renderNumbers ( randomNumbers ) {
    return fetch('../templates/random-count.hbs')
        .then(resp => resp.text())
        .then(temp => {
            const template = Handlebars.compile(temp);
            const html = template( {randomNumbers} );

            return html;
        });
}
