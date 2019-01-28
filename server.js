const express =require('express')
const hbs =require('hbs')
var app = express();
const fs=require('fs')
app.set('view engine','hbs')

app.use(express.static(__dirname+'/public'))

//middleware
app.use((req,res,next) =>{
var now=new Date().toString()
var log =`log is :${now} ${req.method} ${req.url}`
console.log(log)
fs.appendFile("LOG.txt",log+'\n',(err) =>{
    if(err){
        console.log("there is an error")
    }
})
next();


})
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getcurrentyear',()=>{
 return new Date().getFullYear()
})
hbs.registerHelper('slice',(text) =>{
    return text.toUpperCase();
})

app.get('/', (req,res) =>{
    //res.send('<h1>hello express</h1>')
    res.render('home.hbs', {
        aboutpage : 'WELCOME !!!!!!',
        pagetitle : 'welcome page',
   //currentyear :new Date().getFullYear()
    })
});




app.get('/about',(req,res) =>{
    //res.send('we are in about page');
    res.render('about.hbs',{
        aboutpage :"About  page",
        pagetitle : 'this is about page',
        //currentyear: new Date().getFullYear()
    })

}
);

app.get('/bad',(req,res) =>{
    res.send({
        error :'there is an error',
        STATUS_CODE :290
    })
});

app.listen(4590,() => {
    console.log('the server is listening on port number 4590')
});
