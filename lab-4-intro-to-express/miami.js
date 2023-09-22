const express = require('express');

//add the view engine
const expressHandlebars = require('express-handlebars');

const app = express();

//configure our express app to use handleb(ars
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars')

const port = process.env.port || 3000;

//Routes go before 404 and 500
app.get('/',(req,res)=>{
    res.render('home');


});

app.get('/about',(req,res)=>{
    res.render('about');
    

});

//generate error becuase paramenters do not match 
app.get('/nightlife',(request,response)=>{
    res.type('text/plain');
    res.send('Miami at Night');

});

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