const express = require('express');

//add the view engine
const expressHandlebars = require('express-handlebars');

const app = express();

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars')

//static files or folders are specified before any route
app.use(express.static(__dirname + "/public"))

const port = process.env.port || 3000;

const gallery = require('./data/gallery.json')
//Routes go before 404 and 500
app.get('/',(req,res)=>{
    var data = require("./data/home-data.json");
    res.render('page',{data, gallery});


});
app.get('/downtown',(req,res)=>{
    var data = require("./data/downtown-data.json");
    res.render('page',{data, gallery});


});
app.get('/midtown',(req,res)=>{
    var data = require("./data/midtown-data.json");
    res.render('page',{data, gallery});


});
app.get('/buckhead',(req,res)=>{
    var data = require("./data/buckhead-data.json");
    res.render('page',{data, gallery});


});
app.get('/oldfourthward',(req,res)=>{
    var data = require("./data/oldfourthward-data.json");
    res.render('page',{data, gallery});


});

//generate error becuase paramenters do not match 

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