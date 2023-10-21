import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import MainLayout from "@/layouts/MainLayout.vue"

const routes: RouteRecordRaw[] = [
	{
		path: "/catalog/:id",
		component: () => import("@/components/catalog/Catalog.vue"),
		meta: { layout: MainLayout },
		props: true,
	},
	{
		path: "/basket",
		component: () => import("@/components/basket/Basket.vue"),
		meta: { layout: MainLayout },
	},
]

export default createRouter({
	history: createWebHistory(),
	routes,
})
