import { createRouter, createWebHistory } from "vue-router";
import CartPage from "@/features/cart/pages/CartPage.vue";
import MenuPage from "@/features/menu/pages/MenuPage.vue";
import ProductDetailsPage from "@/features/menu/pages/ProductDetailsPage.vue";
import OrderStatusPage from "@/features/orders/pages/OrderStatusPage.vue";
import PaymentPage from "@/features/payment/pages/PaymentPage.vue";
import SelectUnitPage from "@/features/units/pages/SelectUnitPage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "select-unit",
			component: SelectUnitPage,
		},
		{
			path: "/cardapio",
			name: "menu",
			component: MenuPage,
		},
		{
			path: "/produto",
			name: "product-details",
			component: ProductDetailsPage,
		},
		{
			path: "/carrinho",
			name: "cart",
			component: CartPage,
		},
		{
			path: "/pagamento",
			name: "payment",
			component: PaymentPage,
		},
		{
			path: "/status-pedido",
			name: "order-status",
			component: OrderStatusPage,
		},
	],
});

export default router;
