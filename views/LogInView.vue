<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Lozinka" required />
    <button type="submit">Prijava</button>
    <p>{{ error }}</p>
    <router-link to="/signup">Nemate račun? Registrirajte se</router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const store = useUserStore()

const handleLogin = () => {
  try {
    store.login({ email: email.value, password: password.value })
    router.push('/user')
  } catch (err) {
    error.value = err.message
  }
}
</script>
