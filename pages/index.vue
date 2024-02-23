<script setup lang="ts">
const value = ref<string>('');
const users = useUsersStore();

const onInputChange = async (e: Event) => {
    const val = value.value
    const v = parseInt(val)
    const query: userQuery = {};
    if (isNaN(v)) {
        if (val.length > 3) {
            query.username_like = val.split(' ').map((el: string) => el.replace(/[^A-Za-z]/g, ''))
        }
    } else {
        query.id_like = val.split(' ').map((el: string) => parseInt(el))
    }
    if (Object.keys(query).length) {
        await users.fetch(query)
    } else {
        users.clean()
    }

}
</script>
<template>
    <a-row class="content_row" align="stretch" justify="space-between">
        <a-col span="6" class="content_sidebar">
            <a-space direction="vertical" style="width: 100%;">
                <a-typography-title :level="5">Поиск сотрудников</a-typography-title>
                <a-input v-model:value="value" placeholder="Введите айди пользователя" @change="onInputChange">
                    <template #suffix>
                        <span v-if="!isNaN(parseInt(value))">id</span>
                        <span v-else-if="value.length > 3">username</span>
                    </template>
                </a-input>

                <a-typography-title :level="5">Результаты</a-typography-title>
                <a-typography v-if="!value && !users.list.length">начните поиск</a-typography>
                <a-typography v-else-if="value && !users.list.length">ничего не найдено</a-typography>
                <a-list v-else>
                    <a-list-item v-for="user in users.list">
                        <a-list-item-meta :description="user.email">
                            <template #title>
                                <nuxt-link :to="`/user/${user.id}`">{{ user.username }}</nuxt-link>
                            </template>
                            <template #avatar>
                                <a-avatar>{{ user.name[0].toUpperCase() }}</a-avatar>
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </a-space>
        </a-col>
        <a-col span="18" class="content_main">
            123
        </a-col>
    </a-row>
</template>