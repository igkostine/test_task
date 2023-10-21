import { defineStore } from "pinia"
import { ref } from "vue"

export const useBasketStore = defineStore("basketStore", () => {
	const basket = ref<number[]>([])

	const addToBasket = (id: number): void => {
		if (!basket.value.includes(id)) {
			basket.value.push(id)
			localStorage.setItem("basket", JSON.stringify(basket.value))
		}
	}

	const deleteFromBasket = (id: number): void => {
		basket.value = basket.value.filter(item => item !== id)
		localStorage.setItem("basket", JSON.stringify(basket.value))
	}

	const getBasketFromLocalStorage = (): void => {
		if (localStorage.getItem("basket")) {
			basket.value = JSON.parse(localStorage.getItem("basket") as string)
		}
	}

	const removeBasket = (): void => {
		basket.value = []
		localStorage.removeItem("basket")
	}

	return {
		basket,
		addToBasket,
		deleteFromBasket,
		getBasketFromLocalStorage,
		removeBasket,
	}
})
