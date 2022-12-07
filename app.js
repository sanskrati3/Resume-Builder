const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const mongoose=require("mongoose");
const users =[];

const port=process.env.PORT || 3000;
require("./conn");
const Register=require("./models/register");
const Login=require("./models/login");

const static_path=path.join(__dirname,"/public");
const template_path=path.join(__dirname,"/templates/views");
const partials_path=path.join(__dirname,"/templates/partials");

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.get("/",function(req,res){
  res.render("index");
})

app.get("/register",function(req,res){
  res.render("register");

})

app.get("/login",function(req,res){
  res.render("login");
})

// register
app.post("/register",async(req,res)=>{
  try{
    const user={email:req.body.email,password:req.body.pass}

    users.push(user)
   const name=req.body.name;
   const email=req.body.email;
   const password=req.body.pass;
   const cpassword=req.body.cpass;

   if (name.length <= 0) {

      name.focus();
   }

    if (email.length <= 0) {
      alert("Email Id is required");
      email.focus();
   }
   if (password.length <= 0) {
      alert("Password number is required");
      password.focus();
   }
   if (cpassword.length <= 0) {
      alert("Password number is required");
      cpassword.focus();
   }
     console.log(password);
     console.log(cpassword);
     if(password === cpassword)
     {    console.log("matched inside if");
      const registerEmployee=new Register({
        name:req.body.name,
        email:req.body.email,
        pass:req.body.pass,
        cpass:req.body.cpass
      })
      const registered=await registerEmployee.save();
      res.status(201).render("login");
    }
    else{
      res.status(201).render("register");
    }
  }
  catch(error){
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
    try{
         const email=req.body.email;
        const user=users.find(user=> user.email=req.body.email)
        if(user==null){
            res.send("Invalid email or password");
        }
        else{
            let submittedPass = req.body.pass;
            let storedPass = user.password;
 console.log("submittedPass",submittedPass);
 console.log("storedPass",storedPass);
            if (submittedPass === storedPass) {

                res.render("index");
            } else {
                res.render("login");
       }
     }
    } catch{
        res.send("Internal server error");
    }
});

app.listen(port,function(){
  console.log("server running");
})
