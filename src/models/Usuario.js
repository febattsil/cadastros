export default class Uusario {
    constructor(
        nome = '',
        email = '',
        cpf = '',
        idade = '',
        senha = '',
        tipo = 'usuario'
    ){
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.idade = idade
        this.senha = senha
        this.tipo = tipo
    }
}