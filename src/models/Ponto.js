export default class Ponto {
    constructor (
        colaborador_id = '',
        data_hora = Date(),
        descricao = ''
    ){
        this.colaborador_id = colaborador_id,
        this.data_hora = data_hora,
        this.descricao = descricao
    }
}