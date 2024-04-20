const express=require('express');
const passport=require('passport');
const LocalStrategy=require('passport-local').strategy;
const session=require('express-session');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session()); 

const users=[
    {
        id:1,
        username:'user1',
        password:'password1',
        role:'user'
    },
    {
        id:2,
        username:'user2',
        password:'password2',
        role:'admin'
    }
];
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.use(new LocalStrategy((username,password,done)=>{
    const user=users.find(user=>user.username===username&&user.password===password);
    if(user){
        return done(null,user);
    }else{
        return done(null,false,{message:'Incorerect'});
    }
    
}));
//define middleware for checkng authentication

const isAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        returnnext();

    }
    else{
        res.redirect('/login');
    }
};
//define route for login
app.post('/login',
passport.authenticate('local',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash:true
}));

app.get('/logout',(req,res)=>{

})
