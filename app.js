const express = require('express');
const Sequelize = require('Sequelize');
// const dotenv = require('dotenv');
// dotenv.load();

const app = express();
const sequelize = new Sequelize('postgres://postgres@localhost:5432/blog')

sequelize.authenticate()
    .then(() => {
        console.log('successfully connected');
    })
    .catch(err => {
        console.log('unable to connect: ' + err);
    });

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

User.sync().then(() => {
    User.create({
        username: 'jimmy',
        password: 'bananapancake',
    });
})


app.get('/', (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    })
})

app.get('/getthree', (req, res) => {
    User.findAndCount({
        limit: 3
    }).then(users => {
        res.json(users.rows);
    })
})

app.listen(300, () => {
    console.log('listening on port 3000');
})