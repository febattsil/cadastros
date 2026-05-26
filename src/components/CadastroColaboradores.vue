<script setup>

import { ref } from 'vue'
import axios from 'axios'

import Colaborador from '@/models/Colaborador'

const name = ref('')
const ageColab = ref(null)
const valorCpf = ref('')
const emailTyped = ref('')
const toggle = ref(false)
const senhaColab = ref('')
const senhaColabConfirma = ref('')

async function CadastrarColab() {

    if (!name.value.trim()) {
        alert('Informe o nome do colaborador')
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

    if (senhaColab.value !== senhaColabConfirma.value) {
        alert('As senhas estão diferindo')
        return
    }

    if (senhaColab.value.length < 8) {
        alert('A senha deve possuir pelo menos 8 caracteres')
        return
    }

    const novo_colab = new Colaborador()

    novo_colab.nome = name.value
    novo_colab.email = emailTyped.value
    novo_colab.idade = ageColab.value
    novo_colab.cpf = valorCpf.value
    novo_colab.senha = senhaColab.value
    novo_colab.tipo = 'colaborador'

    try {

        const response = await axios.post(
            'http://localhost:3000/cadastro',
            novo_colab
        )

        console.log(response.data)

        alert('Colaborador cadastrado com sucesso!')

        limparFormulario()

    } catch (error) {

        console.error(error)
        console.log('Status:', error.response?.status)
        console.log('Dados:', error.response?.data)

        alert('Erro ao cadastrar colaborador')

    }

}

function limparFormulario() {

    name.value = ''
    ageColab.value = null
    valorCpf.value = ''
    emailTyped.value = ''
    toggle.value = false
    senhaColab.value = ''
    senhaColabConfirma.value = ''

}

</script>

<template>

    <div class="container mt-5">

        <div class="card shadow">

            <div class="card-header bg-primary text-white">
                <h3 class="mb-0">
                    Cadastro de Colaboradores
                </h3>
            </div>

            <div class="card-body">

                <form @submit.prevent="CadastrarColab">

                    <div class="mb-3">
                        <label class="form-label">
                            Nome do Colaborador
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
                            placeholder="colaborador@empresa.com"
                        >
                    </div>

                    <div class="form-check mb-3">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="checkEmail"
                            v-model="toggle"
                        >

                        <label
                            class="form-check-label"
                            for="checkEmail"
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
                            v-model="ageColab"
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
                            v-model="senhaColab"
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
                            v-model="senhaColabConfirma"
                        >

                    </div>

                    <div
                        v-if="senhaColab.length > 0 && senhaColab.length < 8"
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
                            Cadastrar Colaborador
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </div>

</template>