<template>
  <div v-if="user">
    <h2>Dobrodošao, {{ user.username }} ({{ user.email }})</h2>

    <form @submit.prevent="handlePasswordChange">
      <h3>Promjena lozinke</h3>
      <input v-model="currentPassword" type="password" placeholder="Trenutna lozinka" />
      <input v-model="newPassword" type="password" placeholder="Nova lozinka" />
      <button type="submit">Promijeni lozinku</button>
      <p>{{ errorChange }}</p>
    </form>

    <form @submit.prevent="handleDeleteAccount">
      <h3>Brisanje računa</h3>
      <input v-model="deletePassword" type="password" placeholder="Unesite lozinku za potvrdu" />
      <button type="submit">Obriši račun</button>
      <p>{{ errorDelete }}</p>
    </form>

    <button @click="logout">Odjava</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
const router = useRouter()
const user = store.currentUser

const currentPassword = ref('')
const newPassword = ref('')
const deletePassword = ref('')
const errorChange = ref('')
const errorDelete = ref('')

const logout = () => {
  store.logout()
  router.push('/login')
}

const handlePasswordChange = () => {
  try {
    store.changePassword({ currentPassword: currentPassword.value, newPassword: newPassword.value })
    router.push('/login')
  } catch (err) {
    errorChange.value = err.message
  }
}

const handleDeleteAccount = () => {
  try {
    store.deleteUser({ currentPassword: deletePassword.value })
    router.push('/login')
  } catch (err) {
    errorDelete.value = err.message
  }
}
</script>
