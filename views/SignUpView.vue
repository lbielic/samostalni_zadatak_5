<template>
  <form @submit.prevent="handleSignUp">
    <input v-model="username" placeholder="Username" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Lozinka" required />
    <input v-model="confirmPassword" type="password" placeholder="Ponovi lozinku" required />
    <button type="submit">Registracija</button>
    <p>{{ error }}</p>
    <router-link to="/login">Imate račun? Prijavite se</router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()
const store = useUserStore()

const handleSignUp = () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Lozinke se ne podudaraju.'
    return
  }
  try {
    store.register({ username: username.value, email: email.value, password: password.value })
    router.push('/user')
  } catch (err) {
    error.value = err.message
  }
}
</script>
