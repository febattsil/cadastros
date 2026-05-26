<script setup>

import CardColaborador from './CardColaborador.vue';
import FiltroColaboradores from './FiltroColaboradores.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const colaboradores = ref([])

const filtros = ref({
    dataInicial: '',
    dataFinal: '',
    ordenacao: 'nome'
})

async function carregarColaboradores(){

    try{

        const response = await axios.get(
        `http://localhost:3000/colaboradores?inicio=${filtros.value.dataInicial}&fim=${filtros.value.dataFinal}`)
        
        
        colaboradores.value = response.data
        console.log('Colaboradores:', colaboradores.value)

        console.log(response.data)


    } catch (error){

        console.log('Status:', error.response?.status)
        console.log('Dados:', error.response?.data)

    }

}

//PASSADOS ATRAVÉS DO EMIT
async function atualizarFiltros(novosFiltros){

    console.log('Filtros recebidos:', novosFiltros)

    filtros.value = novosFiltros

    await carregarColaboradores()

}

const colaboradoresFiltrados = computed(() => {

    let lista = [...colaboradores.value]

    if(filtros.value.ordenacao === 'nome'){

        lista.sort(
            (a, b) =>
            a.nome.localeCompare(b.nome)
        )

    }

    return lista

})

function gerarRelatorio() {

    window.open(
        `http://localhost:3000/relatorio?inicio=${filtros.value.dataInicial}&fim=${filtros.value.dataFinal}&ordem=${filtros.value.ordenacao}`,
        '_blank'
    )

}

onMounted(() => {
    carregarColaboradores()
})

</script>

<template>

    <FiltroColaboradores
    @filtrar="atualizarFiltros"
    />

    <div
        v-for="colaborador in colaboradoresFiltrados"
        :key="colaborador.id"
        class="col-lg-8"
    >

        <CardColaborador
            :colaborador="colaborador"
            :filtros="filtros"
        />

    </div>
    <button
        class="btn btn-primary"
        @click="gerarRelatorio"
    >
        Gerar Relatório
    </button>
    
</template>