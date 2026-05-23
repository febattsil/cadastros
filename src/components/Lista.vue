<script>

import CardColaborador from './CardColaborador.vue';

export default {
    
    components: {
        CardColaborador
    },

    data(){

    },

    methods: {

    }
}

</script>

<template>

    <div class="container col-md-6">
        <CardColaborador v-for="colaborador in colaboradores" :key="colaborador.id"/>
    </div>
    
</template>