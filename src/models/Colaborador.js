export default class Colaborador {
    constructor(
        nome = '',
        email = '',
        cpf = '',
        idade = '',
        senha = '',
        tipo = 'colaborador',
    ){
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.idade = idade
        this.senha = senha
        this.tipo = tipo

    }
}