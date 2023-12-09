const express = require('express');

//add the view engine
const expressHandlebars = require('express-handlebars');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}))

const handler = require('./lib/handler')

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars')

//static files or folders are specified before any route
app.use(express.static(__dirname + "/public"))

const port = process.env.port || 3000;

//Routes go before 404 and 500
app.get('/',(req,res)=>{
    var data = require("./data/about-data.json");
    res.render('home',{data});


});

app.get('/checkout', handler.checkout)

app.post('/newsletter-signup/process', handler.newsletterSignupProcess)

app.get('/user/list', handler.userList)

app.get('/user/details/:email',handler.user)

app.get('/product/:id',handler.showProduct)

app.get('/category/:category',handler.showCategory)

app.post('/cart', handler.addToCartProcess)

app.get('/cart/delete/:email',handler.userDelete)

app.get('/thankyou',(req,res) =>{
    res.render('thankyou')
})
//Error handling -> app.use() basic express route
app.use((req,res) =>{
    res.status(404);
    res.render('404')
});

//Server error 500
app.use((error,req,res,next)=>{
    console.log(error.message);
    res.status(500);
    res.render('500')
});

//setup listener
app.listen(port,()=>{
    console.log('Server started http://localhost:'+port)
    console.log('To close press Ctrl-C')
});