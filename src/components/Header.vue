<template>
	<div
		class="h-24 w-screen bg-secondary flex items-center justify-end pl-[300px] pr-8"
	>
		<RouterLink to="/basket">
			<div class="flex gap-2 cursor-pointer">
				<basket />
				<div class="text-white">
					{{ basketStore.basket.length }}
				</div>
			</div>
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import basket from "@/assets/icons/basket.vue"
import { useBasketStore } from "@/stores/basketStore"
const basketStore = useBasketStore()
</script>

<style scoped></style>
