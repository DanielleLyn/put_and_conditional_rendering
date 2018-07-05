const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let customers = [
    {id: 1, name: 'Andrew'},
    {id: 2, name: 'Austin'},
    {id: 3, name: 'Zak'},
    {id: 4, name: 'Abraham'},
    {id: 5, name: 'arisztid'}
]

app.get('/api/test', (req, res) => {
    res.status(200).json(customers)
})

app.put('/api/test', (req, res) => {
    const {id} = req.query;
    const {name} = req.body;
    
    customers.forEach((customer, index) => {
        if(customer.id == id){
            customer.name = name;
        }
    })

    res.status(200).json(customers);

})

app.listen(4000, () => console.log('server running on port 4000'))

