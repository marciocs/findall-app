/**
 * 
 * @author Daniel Victor Freire Feitosa
 * @version 0.0.1
 * @package server.js
 */

String.prototype.replaceAll = () => {

    var str = this;

};

String.prototype.empty = () => {
    
    var str = this;
    
    if(str.length == 0 || str == null || str == '' || !str) 
        return true;
    return false;

};

String.prototype.sqlSafe = () => {

    var str = this;

};

Array.prototype.in_array = (needle) => {

    var arr = this;

    for(let i = 0; i < arr.length; i++){
        if(arr[i].toLowerCase().indexOf(needle.toLowerCase())) return true;
    }

    return false;

};

// imports
const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');
const https = require('https');
const fs = require('fs');

//libs da app
const utils = require('./lib/utils');
const config = require('./lib/config');
const middlewares = require('./lib/middlewares');

const cursor = mysql.createConnection(config.mysql);

cursor.connect(function(err){
    if(err) utils.error_handle(config.dev, err);
});

app.use(helmet());
app.use(cors());
app.use(middlewares.redirect_https);
app.use(cookieParser(config.security.cookies.secret));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.get('/', middlewares.csrf_verification, (req, res, next) => {
    res.status(200).send('index');
});

// cadastrar usuarios
app.post('/register', middlewares.csrf_verification, (req, res, next) => {
    
    //const { nome, usuario, senha, email, tipo } = req.body;

    const check = utils.check_params(req.body);

    if(!check){
        res.json(check);
    }else{

        cursor.query(`INSERT INTO usuarios (nome,usuario,senha,email,tipo,pontos) VALUES (?,?,?,?,?,?)`, req.body, (err, results) => {

            if(err) utils.error_handle(config.dev, err);

            res.json({ error : false, msg : 'Cadastro com sucesso' });

        });

    }

});

// login diferenciando cliente do usuario
app.post('/login', middlewares.csrf_verification, (req, res, next) => {

    console.log(req.body);

    if(!cursor) return res.status(500).json({ error : true, msg : 'Erro na conexão com a base de dados' });

    const { usuario_email, senha, stay_connected } = req.body;

    if(usuario_email.empty() || senha.empty()) return res.json({ error : true, msg : 'Usuário e/ou senha não preenchido(s) ' });

    cursor.query(`SELECT id FROM usuarios WHERE usuario = ? AND senha = ? LIMIT 1`, [usuario_email,senha], (err, results) => {

        if(err) utils.error_handle(err);

        if(results.length==0){
            return res.json({ error : true, msg : 'Usuário e/ou senha incorreto(s) ' });
        }

        const sess_timeout = stay_connected ? 1000000 : config.security.session.sess_timeout;
        const token = jwt.sign({ id : results.id }, config.security.session.sess_key, { expiresIn : sess_timeout });

        return res.json({ error : false, token : token });

    });


});

// sair do app
app.get('/logout', middlewares.sess_verification, (req, res, next) => {
    
    req.signedCookies = [];
    req.cookies = [];

    res.json({ error : false, msg : 'Descontado(a)' });

});

// informacoes do usuario e tb configurar o usuario
app.get('/user/:id', middlewares.sess_verification, (req, res, next) => {

    const { id } = req.params;

    cursor.query(`SELECT id,nome,email,pontos,tipo FROM usuarios WHERE id = ? LIMIT 1`, [parseInt(id)], (err, results) => {

        if(err) utils.error_handle(config.dev, err);
        
        if(results.length==0){
            res.json({ error : true, msg : 'Nenhum usuário encotrado com este id' });
        }

        results = results[0];

        res.json(results);

    });


});

// alterar usuario da sessao
app.post('/alter/user', middlewares.sess_verification, (req, res, next) => {

    const check = utils.check_params(req.body);

    if(check){

        const user_id = utils.get_session_id(req);
        //const { nome, email } = req.body;

        req.body = Array.map(req.body, (param) => {
            return param.sqlSafe();
        });

        const { nome, email } = req.body;

        cursor.query(`UPDATE usuarios SET nome = ?, email = ? WHERE id = ?`, [nome,email,parseInt(user_id)], (err, results) => {

            if (err) utils.error_handle(config.dev, err);

            res.json({ error : false, msg : 'Usuário alterado com sucesso!' });

        });

    }

});

//pontos
app.post('/add_points', middlewares.sess_verification, (req, res, next) => {
    
    const session_id = utils.get_session_id(req);
    
    res.json({
        session_id : session_id
    });

});

app.post('/transfer_points', middlewares.sess_verification, (req, res, next) => {
    res.send('points');
});

// relatorios POWER BI
app.get('/reports', middlewares.sess_verification, (req, res, next) => {
    res.send('reports');
});

app.get('/test', (req, res) => {
    res.status(200).send('OK');
});

const https_server = https.createServer({
    key : fs.readFileSync('./lib/ssl/server.key'),
    cert : fs.readFileSync('./lib/ssl/server.cert')
}, app);

const http_server = http.createServer((req, res) => {
    res.writeHead(301, { 'Location' : 'https://' + req.headers.host + req.url });
    res.end();
});

http_server.listen(config.server.http_port);

https_server.listen(config.server.https_port, () => {
    console.log(`[API] on https://localhost`);
});

/**
// UP da api
app.listen(config.port, () => {
    console.log(`[API] on http://localhost:${config.port}`);
}); */