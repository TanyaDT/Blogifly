const Admin = require('../models/Admin')
exports.Login = async (req, res) => {

    try {
        
        console.log('req.body is', req.body)

        const {email, pass, username} = req.body

        // need to check if pass is missing or one of username and email
        // if email and password are missing then email || username = false.
        // then the opposite of false is true. if it's true then send that success = false
        if (!(email || username) || !pass) return res.send({success: false, errorId: 1})

        // if (!email && !username) //send success false
        // if (!pass) send success false

        // const user = User.findOne({email: email, pass: pass})
        let user = await Admin.findOne({$or: [{email}, {username}]}).select('-__v')
        
        console.log('Login: user is', user)
        if (!user) return res.send({success: false, errorId: 2})

        const passMatch = await user.comparePassword(pass, user.pass)
        console.log(' passmatch is', passMatch)

        if (!passMatch) return res.send({success: false, errorId: 3}) // passwords don't match

        // const token = await user.generateToken('1d');

        user = user.toObject();
        delete user.pass;
        delete user.token;

        // res.cookie('cookiename', token).send({success: true, user})
        res.send({success: true, user})
        
    } catch (error) {
        
        console.log('Login ERROR:', error.message)
        res.send(error.message)
    }
} 

exports.Register = async (req, res) => {

    try {
        console.log('req.body is', req.body)
        const user = new Admin(req.body)

        await user.save()  

        res.send({success: true})
    } catch (error) {
        console.log('Register Error: ', error.message)
    }
} 