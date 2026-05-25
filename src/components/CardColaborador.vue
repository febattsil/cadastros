<script setup>

import { defineProps } from 'vue'

const props = defineProps({
    colaborador: {
        type: Object,
        required: true
    }
})

const pontos = ref([])

async function carregarPontos(){
    
    try{
        
        const response = await axios.get(
            `http://localhost:3000/pontos/${props.colaborador.id}`)
            
            alert("Usuários retornados com sucesso!")
            
            return response.data
            
    } catch (error){
            
            console.log('Status:', error.response?.status)
            console.log('Dados:', error.response?.data)
            
        }
    }

    onMounted(() => {
        carregarPontos()
    })

</script>

<template>

    <div class="container">
        <div class="row mt-2">
            <div class="col-md-6">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-9">{{ props.colaborador.nome }}</div>
                        <div class="col-md-3">{{ props.colaborador.idade }}</div>
                    </div>
                </div>
                <div class="card-body">
                    <div>{{ props.colaborador.email }}</div>
                    <div class="text-small">{{ props.colaborador.cpf }}</div>
                    <div v-for="ponto in pontos" :key="ponto.id">
                        {{ ponto.descricao }}
                        -
                        {{ ponto.data_hora }}
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>
</style>