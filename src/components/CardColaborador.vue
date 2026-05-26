<script setup>

import { defineProps } from 'vue'
import { ref } from 'vue'

const props = defineProps({
    colaborador: {
        type: Object,
        required: true
    }
})

const apontamentos = ref([])

function formatarData(data) {

    return new Date(data).toLocaleString(
        'pt-BR',
        {
            dateStyle: 'short',
            timeStyle: 'short'
        }
    )

}

</script>

<template>

    <div class="card shadow-sm border-0 mt-4 colaborador-card">

        <div class="card-header bg-primary text-white">

            <div class="d-flex justify-content-between align-items-center">

                <div>
                    <h5 class="mb-0">
                        {{ colaborador.nome }}
                    </h5>
                </div>

                <span class="badge bg-light text-dark">
                    {{ colaborador.idade }} anos
                </span>

            </div>

        </div>

        <div class="card-body">

            <div class="mb-3">

                <p class="mb-1">
                    <strong>Email:</strong>
                    {{ colaborador.email }}
                </p>

                <p class="mb-0">
                    <strong>CPF:</strong>
                    {{ colaborador.cpf }}
                </p>

            </div>

            <hr>

            <h6 class="mb-3">
                Registros de Ponto
            </h6>

            <div
                v-if="apontamentos.length > 0"
                class="list-group"
            >

                <div
                    v-for="ponto in colaborador.apontamentos[0]"
                    :key="ponto.id"
                >
                    {{ ponto.descricao }}
                    -
                    {{ formatarData(ponto.data_hora) }}
                </div>

            </div>

            <div
                v-else
                class="alert alert-light text-center"
            >
                Nenhum apontamento encontrado.
            </div>

        </div>
    </div>

</template>

<style scoped>

.colaborador-card {
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s ease;
}

.colaborador-card:hover {
    transform: translateY(-3px);
}

.card-header {
    padding: 1rem 1.25rem;
}

.card-body {
    background-color: #fafafa;
}

.list-group-item {
    border: none;
    border-bottom: 1px solid #eee;
}

.list-group-item:last-child {
    border-bottom: none;
}

.card-footer {
    padding: 1rem;
}

</style>