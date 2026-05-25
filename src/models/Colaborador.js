export default class Colaborador {
    constructor(
        nome = '',
        email = '',
        cpf = '',
        idade = '',
        pontos = {},
        senha = '',
        tipo = 'colaborador',
    ){
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.idade = idade
        this.pontos = pontos
        this.senha = senha
        this.tipo = tipo

    }
}