<template>
	<component :is="layout" />
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import MainLayout from "./layouts/MainLayout.vue"
import { useBasketStore } from "@/stores/basketStore"
const basketStore = useBasketStore()
const route = useRoute()

const layout = computed(() => route.meta.layout ?? MainLayout)

onMounted(() => {
	basketStore.getBasketFromLocalStorage()
})
</script>
