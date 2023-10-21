<template>
	<div class="h-full flex flex-col justify-between">
		<div>
			<div class="flex justify-between">
				<h1 class="text-3xl font-bold mb-4">Корзина</h1>

				<div v-if="showAlert" class="text-[#32a132] text-xl font-bold">
					Заказ успешно оформлен!
				</div>
				<UiButton
					v-else-if="!showAlert && basketList.length > 0"
					class="bg-primary text-white ml-4 h-10 px-4 rounded-xl"
					@click="checkout"
				>
					Оформить заказ
				</UiButton>
			</div>

			<div class="flex gap-8 flex-wrap items-center">
				<Card v-for="item in basketList" :product="item">
					<img :src="'catalog/' + item.cover" alt="" class="" />

					<div class="w-full flex flex-col gap-2 items-start">
						<h4 class="text-xl font-bold">{{ item.name }}</h4>

						<h5 class="text-lg font-semibold">{{ item.price }} руб.</h5>
						<button @click="basketStore.deleteFromBasket(item.id)">
							Удалить из корзины
						</button>
					</div>
				</Card>
			</div>
		</div>

		<UiPagination
			:page="currentPage"
			:totalPage="Math.ceil(basketStore.basket.length / 5)"
			@changePage="changePage"
		/>
	</div>
</template>

<script setup lang="ts">
import { useBasketStore } from "@/stores/basketStore"
import Card from "@/components/catalog/Card.vue"
import { onMounted, ref, watch } from "vue"
import { getProductsListById } from "@/api/products"
import { IProduct } from "@/types/product"
import UiPagination from "@/components/ui/UiPagination.vue"
import UiButton from "../ui/UiButton.vue"

const basketStore = useBasketStore()

const basketList = ref<IProduct[]>([])
const currentPage = ref<number>(1)

const showAlert = ref<boolean>(false)

onMounted(async () => {
	await gatPage()
})

const gatPage = async () => {
	try {
		basketList.value = (
			await getProductsListById(basketStore.basket, currentPage.value)
		).data
	} catch (error) {
		console.log(error)
	}
}

const changePage = async (page: number) => {
	currentPage.value = page
	await gatPage()
}

const checkout = () => {
	basketStore.removeBasket()
	showAlert.value = true
}

watch(
	() => basketStore.basket,
	async () => {
		currentPage.value = 1
		basketList.value = []
		await gatPage()
	}
)
</script>

<style scoped></style>
