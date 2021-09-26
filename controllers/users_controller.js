const User = require('../models/user');

module.exports.profile = function(req,res)
{
    res.render('user_profile', {
        title : "User profile"
    })
}

//render the sign up page
module.exports.signUp = function(req,res){
    
    res.render('user_sign_up',{
        title : "Codeial || Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){

    res.render('user_sign_in',{
         title : "Codeial || Sign In"
    });
}

//get the sign-up data
module.exports.create = function(req,res)
{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user)
    {
        if(err)
        {
            console.log("Error in finding user in signing Up");
            return;
        }

        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err){console.log("Error in creating the user while signing Up"); return;};
                
                return res.redirect('/users/sign-in');
            })
        }
        else
        {
           // console.log("Why are you storing the same data");
            return res.redirect('back');
        }
         
    })
}


//now sign in and create the session for the users
//this is done using passport js

module.exports.createSession = function(req,res)
{
    return res.redirect('/');
}

/*
//this sign in is done using manual-authentication
//sign in and create the session for the users
module.exports.createSession = function(req,res)
{
    //steps to authenticate
    //1. find the user
    User.findOne({email : req.body.email},function(err,user)
    {
        if(err){console.log("Error for user to sign-in"); return;}
        //handle user found

        if(user)
        {
            //check if the password matches
            if(user.password != req.body.password)
            {
                //if the password doesnt matches redirect back to the sign in page
                return res.redirect('back');
            }

            //if the password matches
            //handle session creation
            //store the cookie of that user
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }

        //handle user not found
        else
        {
           return res.redirect('back');
        }

    })
}

*/