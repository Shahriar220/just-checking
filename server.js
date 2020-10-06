const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now}:${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append');
        }
    })
    next();
});
//app.use((req, res, next) => {
//  res.render('maintanance.hbs');
//})
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screanIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        message: 'Welcome to our html page.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        message: 'error leading this page'
    })
})

app.listen(3000, () => {
    console.log('working on port 3000')
});