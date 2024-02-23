import type { User } from "~/types/users"

export type userQuery = {
  username_like?: string | string[],
  id_like?: number | number[]
}

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    list: <User[]>[]
  }),
  actions: {
    async fetch(query: userQuery) {
      const users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users', { query })

      this.list = users
    },
    clean() {
      this.list = []
    }
  }
})