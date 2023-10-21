import { IProduct } from "@/types/product"
import axios, { AxiosResponse } from "axios"

export const getProductsList = async (
	categoryId: string,
	page: number = 0,
	limit: number = 6,
	search: string = ""
): Promise<AxiosResponse<IProduct[]>> => {
	return await axios.get(
		`${
			import.meta.env.VITE_BASE_URL
		}/products?_page=${page}&_limit=${limit}&categoryId=${categoryId}${
			search ? "&name=" + search : ""
		}`
	)
}

export const getProductsListById = async (
	id: number[],
	page: number = 0,
	limit: number = 6
): Promise<AxiosResponse<IProduct[]>> => {
	const idList: string = id.join("&id=")

	return await axios.get(
		`${
			import.meta.env.VITE_BASE_URL
		}/products?_page=${page}&_limit=${limit}&id=${idList}`
	)
}
