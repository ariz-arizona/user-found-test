<script setup lang="ts">
import type { User } from '~/types/users';

const users = useUsersStore();
let active = reactive(<User>users.getActive())

users.$onAction(({ name, after }) => {
    after(() => {
        if (name === 'setActive') {
            active = Object.assign(active, users.getActive())
        }
    })
})
</script>
<template>
    <a-row class="content_row" align="stretch" justify="space-between">
        <a-col span="6" class="content_sidebar">
            <AppSidebar />
        </a-col>
        <a-col span="18" class="content_main">
            <a-space direction="vertical" style="width: 100%;">
                <a-row v-if="!users.active" align="middle" justify="center" style="min-height: 50vh;">
                    <a-col>
                        <a-typography>Выберите сотрудника, чтобы посмотреть его профиль</a-typography>
                    </a-col>
                </a-row>
                <a-row v-else>
                    {{ active.username }}
                </a-row>
            </a-space>
        </a-col>
    </a-row>
</template>