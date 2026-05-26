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

async function carregarColaboradores(dataInicial = '', dataFinal = ''){

    try{

        const response = await axios.get(    
        `http://localhost:3000/colaboradores`,
        {
            params:
            {
                inicio: dataInicial,
                fim: dataFinal,
            }
        })
        
        
        colaboradores.value = response.data

        console.log(
    JSON.stringify(
        response.data,
        null,
        2
    )
)
        console.log('Colaboradores:', colaboradores.value)


    } catch (error){

        console.log('Status:', error.response?.status)
        console.log('Dados:', error.response?.data)

    }

}

//PASSADOS ATRAVÉS DO EMIT
async function atualizarFiltros(novosFiltros){

    console.log('Filtros recebidos:', novosFiltros)

    filtros.value = novosFiltros

    await carregarColaboradores(filtros.value.dataInicial, filtros.value.dataFinal)

}

const colaboradoresFiltradosOuOrdenados = computed(() => {

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

</script>

<template>

    <FiltroColaboradores
    @filtrar="atualizarFiltros"
    />

    <div
        v-for="colaborador in colaboradoresFiltradosOuOrdenados"
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