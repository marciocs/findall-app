export class Api {

    constructor(api_url){
        this.api_url = api_url;
    }

    async login(usuario_email, senha, stay_connected=false){
        
        try{
            return fetch(this.api_url + '/login',
                {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        usuario_email,
                        senha,
                        stay_connected
                    })
                }
            )
        }catch(err){
            throw err;
        }

    }

    async register(email, nome, senha, endereco, telefone, cpf, tipo='USUARIO'){
        
        try{
            return fetch(this.api_url + '/register',
                {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        nome : nome,
                        senha : senha,
                        email : email,
                        endereco : endereco,
                        telefone : telefone,
                        cpf : cpf,
                        tipo : tipo
                    })
                }
            )
        }catch(err){
            throw err;
        }

    }

    async user_info(token){

        if(!token) return { error : true, msg : 'invalid token' };

        try{
            return fetch(this.api_url + '/user_info',
                {
                    method : 'GET',
                    headers : {
                        'Content-type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }                
                }
            )
        }catch(err){
            throw err;
        }

    }

    async add_points(destino, token){

        if(!token) return { error : true, msg : 'invalid token' };

        try{
            return fetch(this.api_url, + '/add_points', 
                {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                    body : JSON.stringify({
                        destino : destino
                    })
                }
            )
        }catch(err){
            throw err;
        }

    }

};