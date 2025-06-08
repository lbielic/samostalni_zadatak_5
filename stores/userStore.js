import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  actions: {
    register({ username, email, password }) {
      const exists = this.users.some(u => u.email === email || u.username === username)
      if (exists) throw new Error('Korisnik već postoji.')
      const newUser = { username, email, password }
      this.users.push(newUser)
      this.currentUser = newUser
    },
    login({ email, password }) {
      const user = this.users.find(u => u.email === email && u.password === password)
      if (!user) throw new Error('Neispravni podaci za prijavu.')
      this.currentUser = user
    },
    logout() {
      this.currentUser = null
    },
    changePassword({ currentPassword, newPassword }) {
      if (!this.currentUser || this.currentUser.password !== currentPassword)
        throw new Error('Pogrešna trenutačna lozinka.')
      const userIndex = this.users.findIndex(u => u.email === this.currentUser.email)
      this.users[userIndex].password = newPassword
      this.logout()
    },
    deleteUser({ currentPassword }) {
      if (!this.currentUser || this.currentUser.password !== currentPassword)
        throw new Error('Pogrešna lozinka.')
      this.users = this.users.filter(u => u.email !== this.currentUser.email)
      this.logout()
    }
  },
  persist: true
})
