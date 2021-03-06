const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs') // welche viewengine ich benutzen will

app.use((req, res, next)=> {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('unable to append to server.log');
        };
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         title: 'maintenance - Update',
//         welcomeMessage: 'We will be back soon!'
//     });
// });


app.use(express.static(__dirname + '/public')); //middleware 

hbs.registerHelper('getCurrentYear', () => { // wenn etwas permanent sein soll kan man ein helper hinzufügen 
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'Projects'
    })
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title:'Welcome',
        welcomeMessage: 'feel free to visit us again !'
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
    })
});
app.get('/bad', (req, res) => {
    res.send ({
        error: 'unable to fulfill the request'
    });
});
app.listen(port, () => {
    console.log(chalk.yellow(`Server is up on port ${port}`));
});