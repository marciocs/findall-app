import * as Storage from './storage';

export class Secure {

    constructor(api_url){
        this.api_url = api_url;
    }

    async check_authenticated(){
        
        const token = await Storage.get('token');

        console.log(token)

        return new Promise(resolve => {
            if(!token){
                resolve(false)
            }
            resolve(true)
        }, reject => {
            reject(new Error('Invalid token'))        
        })

    }

}