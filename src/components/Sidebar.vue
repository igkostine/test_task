<template>
	<div
		class="bg-secondary h-[calc(100vh_-_96px)] flex flex-col py-4 px-4 gap-8"
	>
		<h2 class="text-white text-2xl font-bold">Категории:</h2>
		<RouterLink
			:to="`/catalog/${item.id}`"
			class="text-white text-xl"
			v-for="item in categoryList"
			>{{ item.name }}</RouterLink
		>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getCategoryList } from "@/api/category"
import { IIdAndName } from "@/types"

const categoryList = ref<IIdAndName[]>([])

onMounted(async () => {
	categoryList.value = (await getCategoryList()).data
})
</script>

<style scoped></style>
