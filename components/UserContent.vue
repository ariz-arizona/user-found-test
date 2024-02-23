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
    <a-space direction="vertical" style="width: 100%;" class="user">
        <a-row v-if="!users.active" align="middle" justify="center" style="min-height: 50vh;">
            <a-col>
                <a-typography class="user_notfound">Выберите сотрудника, чтобы посмотреть его профиль</a-typography>
            </a-col>
        </a-row>
        <a-row v-else>
            <a-col span="12" class="user_img">
                <a-image :width="424" :height="286" :preview="false" src="/test.png" fallback="/error.svg" />
            </a-col>
            <a-col span="12" class="user_content">
                <a-space direction="vertical" :size="20">
                    <div>

                        <a-typography-title :level="5">
                            {{ active.name }} ({{ active.username }})
                        </a-typography-title>
                        <dl>
                            <dt>email</dt>
                            <dd>{{ active.email }}</dd>
                            <dt>phone</dt>
                            <dd>{{ active.phone }}</dd>
                        </dl>
                    </div>
                    <div>
                        <a-typography-title :level="5">
                            О себе
                        </a-typography-title>
                        <a-typography-paragraph>
                            <a-typography-text v-for="text in Object.values(active.company)" class="user_about">
                                {{ text }}
                            </a-typography-text>
                        </a-typography-paragraph>
                    </div>
                </a-space>
            </a-col>
        </a-row>
    </a-space>
</template>