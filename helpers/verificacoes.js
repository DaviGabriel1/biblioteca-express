module.exports = class Verificacoes{
    static verificaLetras(password){
        let charsetMi = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(var i = 0;i<charsetMi.length;i++){
            if(charsetMi.includes(password[i])){
                return true
            }
        } 
        return false
    }
}