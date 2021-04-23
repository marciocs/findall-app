/**
 * 
 * @author Daniel Victor Freire Feitosa
 * @version 0.0.1
 * @package config.js
 */

module.exports = {

    server : {
        http_port : 80,
        https_port : 443
    },
    mysql : {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'db_findall'
    },

    security : {
        session : {
            sess_key : '__SECRET_SESS_KEY__',
            sess_timeout : 300, // 5 minutos
        },
        cookies : {
            secret : '__SECRET_COOKIES_KEY__'
        },
        encryptation : {
            algorithm : 'aes256'
        }
    },

    google : {
        analitytcs : {

        },
        ouath2 : {

        }
    },

    dev : true,

};