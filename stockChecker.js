const axios = require('axios');
const { notify } = require('./notify');
const aussarLink = 'https://www.aussar.es/tarjetas-graficas//Disponibilidad-En%20stock/?from-xhr';
const neoByteLink = 'https://www.neobyte.es/tarjetas-graficas-gaming-151?from-xhr';
const searches = [{
    name: '3060',
    max_price: 500,
}, {
    name: '3070',
    max_price: 800
}, {
    name: '3080',
    max_price: 1050
},{
    name: '6700',
    max_price: 600,
}, {
    name: '6800',
    max_price: 800
}, {
    name: '6900',
    max_price: 1050
}]

async function checkAussar() {
    console.log('Checking prices');
    const response = await axios({
        method: 'get',
        url: aussarLink,
        headers: {
            Accept: 'application/json'
        }
    })
    for (const product of response.data.products) {
        for (const search of searches) {
            if (product.name.includes(search.name) && product.price_amount < search.max_price) {
                notify(product.name, product.link);
                console.log(`Found: ${product.name} for ${product.price_amount}€`);
            }
        }
    }
}

async function checkTiendaTR() {
    const checkLinks = [
        'https://www.tiendatr.com/tarjeta-grafica-evga-geforce-rtx-3080-xc3-ultra-gaming-10gb-gddr6x-lhr',
        'https://www.tiendatr.com/tarjeta-grafica-evga-geforce-rtx-3060-ti-xc-gaming-8gb-gddr6-lhr',
        'https://www.tiendatr.com/tarjeta-grafica-evga-geforce-rtx-3070-xc3-ultra-gaming-8gb-gddr6-lhr',
    ]
    console.log('Checking TiendaTR prices');
    for (const url of checkLinks) {
        const response = await axios({
            url,
            method: 'get',
            headers: {
                Accept: 'application/json'
            }
        })
        if (response.data.includes('Comprar')) notify('GPU Available', url);
    }
}

setInterval(() => {
    checkAussar();
    checkTiendaTR();
}, 60000);
console.log('Daemon started.');
