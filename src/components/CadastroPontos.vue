<script setup>

import { ref } from 'vue'
import axios from 'axios'

import Ponto from '@/models/Ponto'

const colaborador_id = ref('')
const data_hora = ref('')
const tipo = ref('apontamento')
const descricao = ref('')

async function CadastroPonto() {

    if (!colaborador_id.value) {
        alert('Informe o ID do colaborador')
        return
    }

    if (!data_hora.value) {
        alert('Informe a data e hora')
        return
    }

    const novo_ponto = new Ponto()

    novo_ponto.colaborador_id = colaborador_id.value
    novo_ponto.data_hora = data_hora.value
    novo_ponto.tipo = tipo.value
    novo_ponto.descricao = descricao.value

    try {

        const response = await axios.post(
            'http://localhost:3000/cadastroponto',
            novo_ponto
        )

        console.log(response.data)
        

        alert('Ponto registrado com sucesso!')

        colaborador_id.value = ''
        data_hora.value = ''
        descricao.value = ''

    } catch (error) {

        console.error(error)
        console.log('Status:', error.response?.status)
        console.log('Dados:', error.response?.data)

        alert('Erro ao registrar ponto')

    }

}

</script>

<template>

    <div class="container mt-5">

        <div class="card shadow">

            <div class="card-header bg-primary text-white">
                <h3 class="mb-0">Registro de Ponto</h3>
            </div>

            <div class="card-body">

                <form @submit.prevent="CadastroPonto">

                    <div class="mb-3">
                        <label class="form-label">
                            ID do Colaborador
                        </label>

                        <input
                            type="number"
                            class="form-control"
                            v-model="colaborador_id"
                            placeholder="Informe o ID do colaborador"
                        >
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Data e Hora
                        </label>

                        <input
                            type="datetime-local"
                            class="form-control"
                            v-model="data_hora"
                        >
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Descrição
                        </label>

                        <textarea
                            class="form-control"
                            rows="3"
                            v-model="descricao"
                            placeholder="Ex.: Entrada, Saída para almoço, Retorno do almoço..."
                        ></textarea>
                    </div>

                    <div class="d-flex justify-content-end gap-2">

                        <button
                            type="reset"
                            class="btn btn-outline-secondary"
                        >
                            Limpar
                        </button>

                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Registrar Ponto
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </div>

</template>