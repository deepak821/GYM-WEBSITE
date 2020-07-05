console.log("creating website backend with help of express app");
const express = require("express");
const fs=require("fs");
const app = express();
const port = 80;
const path= require("path"); 
const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost/deepakkart', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we are connected now!");
});
//creating schema,which will give some restriction
const kittySchema = new mongoose.Schema({
    name: String,
    age: String,
    address:String,
    type:String
  });

  //now creating document in database
const contactdoc = mongoose.model('contact', kittySchema);

//For serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())
//set the tamplet engine as pug
app.set('view engine', 'pug')

//view directory
app.set("views", path.join(__dirname,"views"))

/*app.get("/demo", (req,res)=>{
    res.render('Demo',{ title: 'hii deepak', message:'this is pug template endpoint'});
})*/
app.get("/index", (req,res)=>{
    const con='Welcome to GYM Fantasy';
    const param={"title":'GYM Fantasy',"content":con};
  //res.render('index.pug',{ title: 'GYM Fantasy', "content":'Welcome to GYM Fantasy please fill up the form'})
    res.sendFile(path.join(__dirname,"views", "index.html"))
})
app.get("/contact", (req,res)=>{
    //const con='FILL UP THE FORM';
    const param={"title":'GYM Fantasy'};
  //res.render('index.pug',{ title: 'GYM Fantasy', "content":'Welcome to GYM Fantasy please fill up the form'})
    res.render('contact.pug',param)
})

//to store data in database with the help of mongoose
app.post("/contact",(req,res)=>{
    const con='Thankyou for filling up the form!';
    const param={"title":'GYM Fantasy',"content":con};
    var myData=new contactdoc(req.body);
    myData.save().then(()=>{
        res.status(200).render('contact.pug',param)
    })
})

//here we will store data with the help of simple express
/*app.post("/contact", (req,res)=>{
    const name=req.body.name
    const age=req.body.age
    const address=req.body.address
    const type=req.body.type
    let str=`${name}, ${age} year old resident in ${address} wants to join GYM of type ${type}`;
    fs.writeFileSync('output.txt', str);
    const param={"message": "Thankyou for filling the form"};
    res.render('contact.pug',param)
})*/

//from here website backend work sarts
app.get("/", (req,res)=>{
    res.send("This is home page");
})

app.get("/about", (req,res)=>{
    res.send("This is about page");
})

app.get("/contact", (req,res)=>{
    res.send("This is contact page");
})

app.post("/about", (req,res)=>{
    res.send("This is post request about page");
})

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})