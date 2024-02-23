<script setup lang="ts">
const value = ref<string>('');
const users = useUsersStore();
const isEmpty = ref(<boolean>true);

const onInputChange = async (e: Event) => {
    const val = value.value
    const v = parseInt(val)
    const query: userQuery = {};
    if (isNaN(v)) {
        if (val.length > 3) {
            query.username_like = val.split(' ').map((el: string) => el.replace(/[^A-Za-z]/g, '')).filter(el => el.length > 3)
            if (!query.username_like.length) delete query.username_like
        }
    } else {
        query.id_like = val.split(' ').map((el: string) => parseInt(el))
    }
    if (Object.keys(query).length) {
        isEmpty.value = false
        await users.fetch(query)
    } else {
        isEmpty.value = true
        users.clean()
    }
}

const handleUserClick = (e: number) => {
    users.setActive(e)
}
</script>
<template>
    <a-space direction="vertical" :size="20" style="width: 100%;">
        <div>

            <a-typography-title :level="5">Поиск сотрудников</a-typography-title>
            <a-input v-model:value="value" placeholder="Введите айди пользователя" @change="onInputChange"
                :disabled="users.loading" :allow-clear="true" size="large">
                <template #suffix>
                    <span v-if="!isNaN(parseInt(value))">id</span>
                    <span v-else-if="value.length > 3">username</span>
                </template>
            </a-input>
        </div>
        <div>
            <a-typography-title :level="5">Результаты</a-typography-title>
            <a-row v-if="users.loading" align="middle" justify="center" style="min-height: 100px;">
                <a-col>
                    <a-spin />
                </a-col>
            </a-row>
            <a-typography v-else-if="isEmpty">начните поиск</a-typography>
            <a-typography v-else-if="value && !users.list.length">ничего не найдено</a-typography>
            <a-list class="user_list" :split="false" v-else>
                <a-list-item v-for="user in users.list" class="user_list_item">
                    <a-list-item-meta :description="user.email">
                        <template #title>
                            <nuxt-link @click="() => handleUserClick(user.id)">{{ user.username }}</nuxt-link>
                        </template>
                        <template #avatar>
                            <a-avatar>{{ user.name[0].toUpperCase() }}</a-avatar>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </div>
    </a-space>
</template>