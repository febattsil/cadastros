<script>

import CadastroColaboradores from './components/CadastroColaboradores.vue';
import CadastroUsuarios from './components/CadastroUsuarios.vue';
import CadastroPontos from './components/CadastroPontos.vue';
import Lista from './components/Lista.vue';

export default {
  name: 'App',
  components: {
    CadastroColaboradores,
    CadastroUsuarios,
    CadastroPontos,
    Lista,
  },

  data() {
    return {
      isVisibleOpcoes: false,
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisiblePonto: false,
      isVisibleLista: false,
    }
  },

  methods: {
    mostrarOpcoes() {
      this.isVisibleOpcoes = !this.isVisibleOpcoes
      this.isVisible1 = false
      this.isVisible2 = false
      this.isVisiblePonto = false
      this.isVisibleLista = false
    },

    mostrarUsuario() {
      this.isVisible1 = true
      this.isVisible2 = false
      this.isVisiblePonto = false
      this.isVisibleLista = false
    },

    mostrarColaborador() {
      this.isVisible1 = false
      this.isVisible2 = true
      this.isVisiblePonto = false
      this.isVisibleLista = false
    },

    mostrarPonto() {
      this.isVisible1 = false
      this.isVisible2 = false
      this.isVisiblePonto = true
      this.isVisibleLista = false
    },

    mostrarLista() {
      this.isVisible1 = false
      this.isVisible2 = false
      this.isVisiblePonto = false
      this.isVisibleLista = true
    }
  }

}


</script>

<template>

  <div class="text-center container">
    <div class="row justify-content-center">
      <div class="col-md-3">
        <button type="button" class="btn btn-primary btn-lg" @click="mostrarOpcoes">Registrar</button>
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-primary btn-lg" @click="isVisible3 = !isVisible3">Login</button>
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-primary btn-lg" @click="mostrarLista"><i class="bi bi-search"></i>Lista</button>
      </div>
    </div>

    <div class="container">
      <div v-show="isVisibleOpcoes" class="row justify-content-center mt-5">
        <div class="col-auto">
          <button type="button" class="btn btn-primary btn-lg" @click="mostrarUsuario">Usuário</button>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary btn-lg" @click="mostrarColaborador">Colaborador</button>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary btn-lg" @click="mostrarPonto">Apontamento</button>
        </div>
      </div>
    </div>
  </div>

  <CadastroUsuarios v-show="isVisible1" />

  <CadastroColaboradores v-show="isVisible2" />

  <CadastroPontos v-show="isVisiblePonto" />

  <Lista v-show="isVisibleLista" />
  
</template>

<style scoped>

</style>
