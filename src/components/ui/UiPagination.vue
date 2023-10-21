<template>
	<div class="flex justify-center items-center gap-4">
		<div
			v-for="item in totalPage"
			class="min-w-[28px] h-7 bg-white shadow-md text-center text-primary rounded-lg cursor-pointer"
			:class="{ active: item === page }"
			@click="$emit('changePage', item)"
		>
			{{ item }}
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	page: {
		type: Number,
		required: true,
	},
	totalPage: {
		type: Number,
		required: true,
	},
})
</script>

<style scoped>
.active {
	@apply bg-primary text-white;
}
</style>
