<script lang="ts" setup>
import 'assets/main.scss'
import variables from 'assets/variables.module.scss';
</script>

<template>
    <a-config-provider :theme="{
        token: {
            colorPrimary: variables.colorPrimary,
            fontFamily: variables.fontFamily,
            colorTextBase: variables.colorTextBase,
        },
        components: {
            Input: {
                borderRadius: 8,
                lineHeight: 2.8,
            }
        }
    }">
        <div class="container">
            <AppHeader />
            <div class="content">
                <slot />
            </div>
        </div>
    </a-config-provider>
</template>