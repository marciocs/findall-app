/**
* 
* @author Daniel Victor Freire Feitosa
* @version 0.0.1
* @package middlewares.js
*/
const config = require('./config');
const jwt = require('jsonwebtoken');

module.exports = {

    csrf_verification : (req, res, next) => {
        next();
    },

    redirect_https : (req, res, next) => {
        console.log(req.protocol);
        if(req.protocol != 'https'){
            return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        next();
    },

    sess_verification : (req, res, next) => {

        if(!req.headers.authorization) return res.status(401).json({ error : true, mgs : 'Não autorizado(a) 1' });

        if(req.headers.authorization.split(' ').length != 2) return res.status(401).json({ error : true, mgs : 'Não autorizado(a) 2' });

        const token = req.headers.authorization.split(' ')[1];

        if(jwt.verify(token, config.security.session.sess_key)){
            next();
        }else{
            return res.json({ error : true, msg : 'Não autorizado(a) 3' });
        }

    }

};