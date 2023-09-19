const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const handleError = (err) => {
    console.log("Inside handleError")
    console.log(err.message, err.code)
}


const createToken = (id) => {
    return jwt.sign({ id }, 'This is a secret', {
        expiresIn: 3 * 24 * 60 * 60
    })
}




module.exports.sign_up_get = (req, res) => {
    res.render('signup')
}


module.exports.sign_up_post = async (req, res) => {
    var { email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        console.log("salt : ", salt);
        password = await bcrypt.hash(password, salt)
        const user = await User.create({ email, password });
        const token = createToken(user._id)
        res.cookie('jwt', token);
        console.log("USER CREATED : ", user);
        res.render('home')
    }
    catch (err) {
        handleError(err);
        res.send("OOPS USER NOT CREATED!!!")
    }
}
module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.login_post = async (req, res) => {
    console.log("Inside login_post")
    var { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({ email })
        console.log("User : ", user)
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                const token = createToken(user._id)
                await res.cookie('jwt', token);
                res.render('home')
            }
            else {
                res.send('Wrong Password! ');
                return;
            }
        }
        else {
            console.log("User not found ");
            res.send("User not found")
        }
    }
    catch (err) {
        handleError(err);
        res.send("OOPS USER NOT CREATED!!!")
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.render('home');
}

