const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const Post = require('./models/Post');
const path = require('path');
app.use(express.static('public'));

// Config Template Engine;
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Config Body Parser;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config Routes:

app.get('/', function (req, res) {
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
        res.render('Home', { title: 'Home', posts: posts });
    })
})

app.get('/post', function (req, res) {
    res.render('Post', { title: 'Post' });
});

app.post('/signup', async function (req, res) {
    try {
        await Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        })
        res.redirect('/');
    } catch (error) { console.log(error); }
});

app.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    Post.destroy({ where: { 'id': id } }).then(function () {
        res.redirect('/');
    }).catch(function (error) {
        res.send(error);
    });
});

app.post('/update/:id', async function (req, res) {
    try {
        await Post.update({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        },
            {
                where: { id: req.params.id }
            }
        )
        res.redirect('/');
    } catch (error) { console.log(error); }
});

app.get('/edit/:id', function (req, res) {
    Post.findByPk(req.params.id).then(post => {
        res.render('UpdatePost', {
            id: req.params.id,
            titulo: post.titulo,
            conteudo: post.conteudo
        });
    });
});

module.exports = app;