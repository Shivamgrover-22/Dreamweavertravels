const header = require('./components/header');
const footer = require('./components/footer');
const home = require('./components/home');

function init() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${header()}
        ${home()}
        ${footer()}
    `;
}

document.addEventListener('DOMContentLoaded', init);