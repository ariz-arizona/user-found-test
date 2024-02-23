import type { User } from "~/types/users"

export type userQuery = {
  username_like?: string[],
  id_like?: number[]
}
const compareArrays = (a: string[] | number[], b: string[] | number[]) =>
  a.length === b.length &&
  a.every((element, index) => element === b[index]);

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    query: [] as userQuery,
    list: [] as User[],
    active: null as null | number,
    loading: false as boolean,
    error: null as null | string
  }),
  actions: {
    async fetch(query: userQuery) {
      const cloneQuery = toRaw(this.query)
      if (
        compareArrays(cloneQuery.username_like || [], query.username_like || [])
        && compareArrays(cloneQuery.id_like || [], query.id_like || [])
      ) {
        return false
      }
      this.query = query
      this.loading = true
      const users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users', { query })

      this.loading = false
      this.list = users
    },
    clean() {
      this.list = []
      this.active = null
    },
    setActive(id: number) {
      this.active = id
    },
    getActive() {
      if (!this.active) {
        return
      }
      return this.list.find(el => el.id === this.active)
    }
  }
})