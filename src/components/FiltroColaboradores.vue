<script setup>

import { ref } from 'vue'

const emit = defineEmits([
    'filtrar'
])

const dataInicial = ref('')
const dataFinal = ref('')
const ordenacao = ref('nome')

function aplicarFiltro(){

    emit(
        'filtrar',
        {
            dataInicial: dataInicial.value,
            dataFinal: dataFinal.value,
            ordenacao: ordenacao.value
        }
    )

}

</script>

<template>

    <div class="card shadow-sm mb-4">

        <div class="card-header">
            <h5 class="mb-0">
                Filtros
            </h5>
        </div>

        <div class="card-body">

            <div class="row">

                <div class="col-md-4">

                    <label class="form-label">
                        Data Inicial
                    </label>

                    <input
                        type="date"
                        class="form-control"
                        v-model="dataInicial"
                    >

                </div>

                <div class="col-md-4">

                    <label class="form-label">
                        Data Final
                    </label>

                    <input
                        type="date"
                        class="form-control"
                        v-model="dataFinal"
                    >

                </div>

                <div class="col-md-4">

                    <label class="form-label">
                        Ordenar por
                    </label>

                    <select
                        class="form-select"
                        v-model="ordenacao"
                    >

                        <option value="nome">
                            Nome
                        </option>

                        <option value="data">
                            Último Apontamento
                        </option>

                    </select>

                </div>

            </div>

            <div class="mt-3">

                <button
                    class="btn btn-primary"
                    @click="aplicarFiltro"
                >
                    Aplicar Filtros
                </button>

            </div>

        </div>

    </div>

</template>