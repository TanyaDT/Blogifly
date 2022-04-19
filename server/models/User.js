const mongoose = require('mongoose')
const {Schema} = mongoose

const bcrypt = require('bcrypt')
const saltRounds = 10;

const userSchema = new Schema({

    // email: {
    //     type: String, 
    // },  
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    address: {
        type: String
    },
    image: {
        type: String
    }, 
    refreshToken: {
        type: String
    }

})

// Middleware 'pre'; before save to user collection
userSchema.pre('save', function(next){

    const user = this;
  
    if(user.isModified ('pass')) {
       
        bcrypt.genSalt(saltRounds, function(err,salt ) {

            if(err) return next(err);

            bcrypt.hash(user.pass, salt, function(err, hash) {

                if(err) return next(err)
                user.pass = hash;
                next(); 
            })
            
        })
    } else {
        next() 
    }
})  

userSchema.methods.comparePassword = async (providedPass, dbPass)=> {
    return await  bcrypt.compare( providedPass, dbPass)
  }


const User = mongoose.model('User', userSchema)
module.exports = User  