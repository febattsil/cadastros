<script setup>

import { ref } from 'vue'

const name = ref('')
const ageUser = ref(null)
const valorCpf = ref('')
const emailTyped = ref('')
const toggle = ref(false)
const senhaUser = ref('')
const senhaUserConfirma = ref('')

</script>

<template>

    <form action="POST">
        <div class="container col-md-6">
            <h1 class="text-center">Cadastro de Usuários:</h1>
            <div>
                <label for="inputName" class="form-label">Nome do Usuário:</label>
                <input id="inputName" class="form-control" v-model="name" type="text" placeholder="Insira o seu nome aqui" />
            </div>
            <div>
                <label for="inputEmail" class="form-label">Email:</label>
                <input id="inputEmail" class="form-control" v-model="emailTyped" type="email" placeholder="usuario@provedor.com"/>
            </div>
            <div>
                <label for="checkEmail" class="form-label">Confirma o Email? {{ emailTyped }}</label>
                <input id="checkEmail" class="form-check" type="checkbox" v-model="toggle">
            </div>
            <div>
                <label for="inputIdade" class="form-label">Idade:</label>
                <input type="text" id="inputIdade" class="form-control" v-model="ageUser" placeholder="Insira sua idade aqui" />
            </div>
            <div>
                <label for="inputCpf">CPF:</label>
                <input id="inputCpf" class="form-control" v-model="valorCpf" type="text" v-mask="'###.###.###-##'" placeholder="'000.000.000-00'"/>
            </div>
            <div>
                <label for="inputSenha" class="form-label">Nova senha:</label>
                <input type="text" name="senha" class="form-control" id="password" minlength="8" v-model="senhaUser" placeholder="Mínimo 8 caracteres"/>
                <label for="inputSenha" class="form-label">Confirme a senha:</label>
                <input type="text" name="senhaConfirmar" class="form-control" id="passwordConfirm" v-model="senhaUserConfirma"/>
                <p v-if="senhaUser.length > 0 && senhaUser.length < 8" style="color: red;">
                    Digite pelo menos 8 caracteres.
                </p>
            </div>
            <div class="d-flex gap-3 mt-3">
                <button class="btn btn-primary btn-lg">Cadastrar</button>
                <button class="btn btn-primary btn-lg">Atualizar</button>
                <button class="btn btn-primary btn-lg">Excluir</button>
            </div>
        </div>

    </form>
  
</template>

<style scoped>


</style>