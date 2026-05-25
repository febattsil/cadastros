<script setup>

import { ref } from 'vue'
import axios from 'axios'

import Usuario from '@/models/Usuario'

const name = ref('')
const ageUser = ref(null)
const valorCpf = ref('')
const emailTyped = ref('')
const toggle = ref(false)
const senhaUser = ref('')
const senhaUserConfirma = ref('')

async function CadastrarUsuario() {

    if (!name.value.trim()) {
        alert('Informe o nome do usuário')
        return
    }

    if (!emailTyped.value.trim()) {
        alert('Informe o e-mail')
        return
    }

    if (!toggle.value) {
        alert('Confirme o e-mail antes de continuar')
        return
    }

    if (senhaUser.value !== senhaUserConfirma.value) {
        alert('As senhas não conferem')
        return
    }

    if (senhaUser.value.length < 8) {
        alert('A senha deve possuir pelo menos 8 caracteres')
        return
    }

    const novo_usuario = new Usuario()

    novo_usuario.nome = name.value
    novo_usuario.email = emailTyped.value
    novo_usuario.idade = ageUser.value
    novo_usuario.cpf = valorCpf.value
    novo_usuario.senha = senhaUser.value
    novo_usuario.tipo = 'usuario'

    try {

        const response = await axios.post(
            'http://localhost:3000/cadastro',
            novo_usuario
        )

        console.log(response.data)

        alert('Usuário cadastrado com sucesso!')

        limparFormulario()

    } catch (error) {

        console.log('Status:', error.response?.status)
        console.log('Dados:', error.response?.data)

        alert('Erro ao cadastrar usuário')

    }

}

function limparFormulario() {

    name.value = ''
    ageUser.value = null
    valorCpf.value = ''
    emailTyped.value = ''
    toggle.value = false
    senhaUser.value = ''
    senhaUserConfirma.value = ''

}

</script>

<template>

    <div class="container mt-5">

        <div class="card shadow">

            <div class="card-header bg-primary text-white">
                <h3 class="mb-0">
                    Cadastro de Usuários
                </h3>
            </div>

            <div class="card-body">

                <form @submit.prevent="CadastrarUsuario">

                    <div class="mb-3">

                        <label class="form-label">
                            Nome do Usuário
                        </label>

                        <input
                            class="form-control"
                            v-model="name"
                            type="text"
                            placeholder="Digite o nome completo"
                        >

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            E-mail
                        </label>

                        <input
                            class="form-control"
                            v-model="emailTyped"
                            type="email"
                            placeholder="usuario@email.com"
                        >

                    </div>

                    <div class="form-check mb-3">

                        <input
                            id="checkEmail"
                            class="form-check-input"
                            type="checkbox"
                            v-model="toggle"
                        >

                        <label
                            for="checkEmail"
                            class="form-check-label"
                        >
                            Confirmo que o e-mail informado está correto
                        </label>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Idade
                        </label>

                        <input
                            class="form-control"
                            type="number"
                            v-model="ageUser"
                            placeholder="Informe a idade"
                        >

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            CPF
                        </label>

                        <input
                            class="form-control"
                            v-model="valorCpf"
                            type="text"
                            v-mask="'###.###.###-##'"
                            placeholder="000.000.000-00"
                        >

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Senha
                        </label>

                        <input
                            class="form-control"
                            type="password"
                            v-model="senhaUser"
                            placeholder="Mínimo 8 caracteres"
                        >

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Confirmar Senha
                        </label>

                        <input
                            class="form-control"
                            type="password"
                            v-model="senhaUserConfirma"
                        >

                    </div>

                    <div
                        v-if="senhaUser.length > 0 && senhaUser.length < 8"
                        class="alert alert-danger"
                    >
                        A senha deve possuir pelo menos 8 caracteres.
                    </div>

                    <div class="d-flex justify-content-end gap-2">

                        <button
                            type="button"
                            class="btn btn-outline-secondary"
                            @click="limparFormulario"
                        >
                            Limpar
                        </button>

                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Cadastrar Usuário
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </div>

</template>