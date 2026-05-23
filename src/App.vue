<script>

import CadastroColaboradores from './components/CadastroColaboradores.vue';
import CadastroUsuarios from './components/CadastroUsuarios.vue';
import LayoutListagem from './components/CardColaborador.vue';

import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    CadastroColaboradores,
    CadastroUsuarios,
    LayoutListagem
  },

  data() {
    return {
      isVisible0: false,
      isVisible1: false,
      isVisible2: false,
      isVisible3: false
    }
  },

  methods: {
    mostrarUsuario() {
      this.isVisible1 = true
      this.isVisible2 = false
    },

    mostrarColaborador() {
      this.isVisible1 = false
      this.isVisible2 = true
    }
  }

}


</script>

<template>

  <div class="text-center container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <button type="button" class="btn btn-primary btn-lg" @click="isVisible0 = !isVisible0">Registrar</button>
      </div>
      <div class="col-md-4">
        <button type="button" class="btn btn-primary btn-lg" @click="isVisible3 = !isVisible3">Login</button>
      </div>
      <div class="col-md-4">
        <button type="button" class="btn btn-primary btn-lg"><i class="bi bi-search"></i>Buscar</button>
      </div>
    </div>

    <div class="container">
      <div v-show="isVisible0" class="row justify-content-center mt-5">
        <div class="col-auto">
          <button type="button" class="btn btn-primary btn-lg" @click="mostrarUsuario">Usuário</button>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary btn-lg" @click="mostrarColaborador">Colaborador</button>
        </div>
      </div>
    </div>
  </div>

  <CadastroUsuarios v-show="isVisible1" />
  <CadastroColaboradores v-show="isVisible2" />

  
  
</template>

<style scoped></style>
