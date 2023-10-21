<template>
	<div class="h-full flex flex-col justify-between">
		<div>
			<input
				v-model="search"
				class="h-10 w-[600px] border-secondary rounded-xl mb-8 px-4 border-[1px]"
				placeholder="Поиск"
			/>
			<UiButton
				class="bg-primary text-white ml-4 h-10 px-4 rounded-xl"
				@click="searchForName"
			>
				Найти
			</UiButton>

			<div class="flex gap-8 flex-wrap items-center">
				<Card v-for="item in productList" :product="item">
					<img :src="item.cover" alt="" class="" />

					<div class="w-full flex flex-col gap-2 items-start">
						<h4 class="text-xl font-bold">{{ item.name }}</h4>

						<h5 class="text-lg font-semibold">{{ item.price }} руб.</h5>
						<button
							v-if="!basketStore.basket.includes(item.id)"
							@click="basketStore.addToBasket(item.id)"
						>
							Купить
						</button>
						<button v-else @click="basketStore.deleteFromBasket(item.id)">
							Удалить из корзины
						</button>
					</div>
				</Card>
			</div>
		</div>

		<UiPagination
			:page="paginationSettings.page"
			:totalPage="totalItems"
			@changePage="changePage"
		/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { getProductsList } from "@/api/products"
import { IProduct } from "@/types/product"
import Card from "@/components/catalog/Card.vue"
import UiPagination from "@/components/ui/UiPagination.vue"
import { useBasketStore } from "@/stores/basketStore"
import { AxiosResponse } from "axios"
import UiButton from "@/components/ui/UiButton.vue"

const basketStore = useBasketStore()

interface IPaginationSettings {
	page: number
	limit: number
}

const productList = ref<IProduct[]>([])
const paginationSettings = ref<IPaginationSettings>({
	page: 1,
	limit: 6,
})
const search = ref<string>("")
const totalItems = ref<number>(0)

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

onMounted(async () => {
	await gatPage()
})

const gatPage = async () => {
	try {
		const result: AxiosResponse<IProduct[]> = await getProductsList(
			props.id,
			paginationSettings.value.page,
			paginationSettings.value.limit,
			search.value
		)

		totalItems.value = Math.ceil(
			result.headers["x-total-count"] / paginationSettings.value.limit
		)
		productList.value = result.data
	} catch (error) {
		console.log(error)
	}
}

const changePage = async (page: number) => {
	paginationSettings.value.page = page
	await gatPage()
}

const searchForName = async () => {
	paginationSettings.value.page = 1
	await gatPage()
}

watch(
	() => props.id,
	async () => {
		search.value = ""
		paginationSettings.value.page = 1
		await gatPage()
	}
)
</script>

<style scoped></style>
