<template>
	<div class="w-full h-full bg-bg-color">
		<Header />
		<div class="grid grid-cols-[300px_1fr]">
			<Sidebar />
			<div class="w-full h-full p-8 overflow-auto bg-bg-color">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue"
</script>

<style scoped></style>
