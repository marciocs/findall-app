String.prototype.empty = () => {
    
    var str = this;
    
    if(str.length == 0 || str == null || str == '' || !str) 
        return true;
    return false;

};

const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = {

    error_handle : (is_dev, err) => {

        if(is_dev){
            throw err;
        }else{
            console.error(`[ERROR (${err.code})] =>`, err.message);
        }

    },

    check_params : (params) => {

        if(params.length==0){
            return false;
        }

        for(let i = 0; i < params.length; i++){

            if(params[i].empty()){
                return { error : true, msg : 'Campo(s) inválido(s)' };
            }

        }

        return true;

    },

    get_session_id : (req) => {

        const token = req.headers.authorization.split(' ')[1];
        const s_id = jwt.verify(token, config.security.session.sess_key);

        return s_id;

    }


};