const mongoose = require('mongoose')
const {Schema} = mongoose
const jwt = require ('jsonwebtoken') 

const bcrypt = require('bcrypt');
const saltRounds = 10;



const adminSchema =new Schema ({
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    pass: {
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
    token: {
        type: String
    }, 
    verified: {
        type: Boolean
    } 
})
// Middleware 'pre'; before save to user collection
adminSchema.pre('save', function(next){
    console.log('PRE here')

    const admin = this;
   
    if(admin.isModified ('pass')) {
        
        bcrypt.genSalt(saltRounds, function(err,salt ) {
    
            if(err) return next(err);

            bcrypt.hash(admin.pass, salt, function(err, hash) {

                if(err) return next(err)
                admin.pass = hash;
                next(); 
            })

        })
    } else {
        next() 
    }
    
})

adminSchema.methods.comparePassword = async (providedPass, dbPass)=> {
  return await  bcrypt.compare( providedPass, dbPass)
}

adminSchema.methods.generateToken = async function() {

    const admin = this;

    const token = jwt.sign({id: admin._id.toHexString()}, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXP 
    })
  
    admin.token = token;
    await admin.save()
    return admin
}
adminSchema.statics.getPayload = async token => {

    try {
        return jwt.verify(token, process.env.SECRET)
        
    } catch (error) {
        return error.message 
    }
}

const Admin= mongoose.model('Admin', adminSchema)
module.exports = Admin