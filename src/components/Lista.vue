<script setup>

import CardColaborador from './CardColaborador.vue';

import{ ref, onMounted } from 'vue'
import axios from 'axios'

const colaboradores = ref([])

async function carregarColaboradores(){

    try{

        const response = await axios.get(
        `http://localhost:3000/colaboradores`)
        
        
        colaboradores.value = response.data

        console.log(response.data)

        alert("Colaboradores retornados com sucesso!")


    } catch (error){

        console.log('Status:', error.response?.status)
        console.log('Dados:', error.response?.data)

    }

}

onMounted(() => {
    carregarColaboradores()
})


</script>

<template>

    <div class="container col-md-6">
        <CardColaborador v-for="colaborador in colaboradores" :key="colaborador.id" :colaborador="colaborador"/>
    </div>
    
</template>