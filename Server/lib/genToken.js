var jwt = require('jsonwebtoken');


const generateToken = (values) => {
    if (!values) {
        throw new Error("No values provided")
    }
    console.log(values);
    var token = jwt.sign(values, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

module.exports = generateToken;