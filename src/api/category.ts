import { IIdAndName } from "@/types"
import axios, { AxiosResponse } from "axios"

export const getCategoryList = async (): Promise<
	AxiosResponse<IIdAndName[]>
> => {
	return await axios.get(`${import.meta.env.VITE_BASE_URL}/category`)
}
