const https = require('https');

requestToPromise = (url) => {
    return new Promise((resolve, reject) => {
        let body = '';
        https.get(url, (response) => {
            //chunk extrae un pedazo del body y como se itera, va concatenando sobre la vaariable body todo el body
            //cuando termina lo detecta el evento end, y bueno cuando esta listo resolvemos la promesa y parseamos el body
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(body));
            })
        }).on('error', (error) => reject(error));
    })
};

exports.searchProduct = (query) => {
    return requestToPromise(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`);
};

exports.getDataProducts = (query) => {
    return Promise.all([requestToPromise(`https://api.mercadolibre.com/items/${query}`),
    requestToPromise(`https://api.mercadolibre.com/items/${query}/description`)]);
};