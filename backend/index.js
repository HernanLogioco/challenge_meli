const express = require('express');
const cors = require('cors');
const client = require('./client');


//LEVANTA EL BACKEND EN PUERTO 8080 + DEFINICION DE ENDPOINTS (RUTAS POSIBLES) 
// => localhost:8080/api/items y localhost:8080/items/:id
const app = express();
app.use(cors());

//TEST SERVER
// app.get('/TESTING', (req, res) => {
//     res.send('Testing GET')
// });


//GET LIST OF PRODUCTS
getProductList = (query) => {
    return client.searchProduct(query).then((response => {

        const author = {
            name: 'Hernan',
            lastname: 'Logioco'
        };

        //Get Categories
        let categories = response.filters.find(({ id }) => id === 'category');
        
        categories = categories ? categories.values[0].path_from_root.map(({ name }) => name) : [];

        // Get array of PRODUCTS
        const products = response.results.map((item) => {
            const [amount, decimals] = item.price.toString().split('.');
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: parseInt(amount),
                    decimals: parseInt(decimals)
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping
            }
        });
        
        return {
            author,
            categories,
            products
        }
    }))
};

//GET PRODUCT DETAIL
getProductDetail = (query) => {
    return client.getDataProducts(query)
        .then(responses => {
        
            const [item, description] = responses;
            const [amount, decimals] = item.price.toString().split('.');
            return {
                author: {
                    name: 'Hernan',
                    lastname: 'Logioco'
                },
                item: {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                        amount: parseInt(amount),
                        decimals: parseInt(decimals)
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping,
                    sold_quantity: item.sold_quantity,
                    description: description.plain_text
                }
            }
        })
};


// ####################################### BACKEND-EndPoints - GETS - PORT #######################################
app.get('/api/items', (req, res) => {
    getProductList(req.query.q)
        .then(products => res.json(products))
        .catch(error => res.status(500).send(error));
});


app.get('/api/items/:id', (req, res) => {
    getProductDetail(req.params['id'])
            .then(item => res.json(item))
            .catch(error =>  res.status(500).send(error));
});

app.listen(8080, () => {
    console.log('Server started in port 8080');
});

