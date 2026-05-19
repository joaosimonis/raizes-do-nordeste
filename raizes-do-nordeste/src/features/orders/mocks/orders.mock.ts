import type { Order } from "@/features/orders/types/order.types";

export const mockOrders: Order[] = [
	{
		id: "order-001",
		code: "#123456",
		unitId: "unit-recife-boa-vista",
		items: [
			{
				id: "order-item-001",
				name: "Tapioca Nordestina",
				quantity: 1,
				unitPrice: 18.9,
			},
			{
				id: "order-item-002",
				name: "Baião de dois",
				quantity: 1,
				unitPrice: 22.5,
			},
		],
		status: "em_preparo",
		statusMessage: "Seu pedido está sendo preparado",
		estimatedPickupTime: "15-20 min",
		total: 41.4,
		createdAt: "2026-05-19T10:10:00-03:00",
		steps: [
			{
				id: "pedido_confirmado",
				label: "Pedido confirmado",
				isCompleted: true,
				isCurrent: false,
			},
			{
				id: "em_preparo",
				label: "Em preparo",
				isCompleted: false,
				isCurrent: true,
			},
			{
				id: "pronto_para_retirada",
				label: "Pronto para retirada",
				isCompleted: false,
				isCurrent: false,
			},
			{
				id: "retirado",
				label: "Retirado",
				isCompleted: false,
				isCurrent: false,
			},
		],
	},
	{
		id: "order-002",
		code: "#123457",
		unitId: "unit-recife-boa-vista",
		items: [
			{
				id: "order-item-003",
				name: "Cartola",
				quantity: 1,
				unitPrice: 14.9,
			},
			{
				id: "order-item-004",
				name: "Café Coado",
				quantity: 2,
				unitPrice: 5.9,
			},
		],
		status: "pedido_confirmado",
		statusMessage: "Seu pedido foi confirmado e seguirá para preparo em instantes",
		estimatedPickupTime: "20-25 min",
		total: 26.7,
		createdAt: "2026-05-19T10:22:00-03:00",
		steps: [
			{
				id: "pedido_confirmado",
				label: "Pedido confirmado",
				isCompleted: false,
				isCurrent: true,
			},
			{
				id: "em_preparo",
				label: "Em preparo",
				isCompleted: false,
				isCurrent: false,
			},
			{
				id: "pronto_para_retirada",
				label: "Pronto para retirada",
				isCompleted: false,
				isCurrent: false,
			},
			{
				id: "retirado",
				label: "Retirado",
				isCompleted: false,
				isCurrent: false,
			},
		],
	},
	{
		id: "order-003",
		code: "#123458",
		unitId: "unit-caruaru-centro",
		items: [
			{
				id: "order-item-005",
				name: "Acarajé",
				quantity: 1,
				unitPrice: 19.9,
			},
		],
		status: "pronto_para_retirada",
		statusMessage: "Seu pedido já pode ser retirado na unidade",
		estimatedPickupTime: "Agora",
		total: 19.9,
		createdAt: "2026-05-19T10:35:00-03:00",
		steps: [
			{
				id: "pedido_confirmado",
				label: "Pedido confirmado",
				isCompleted: true,
				isCurrent: false,
			},
			{
				id: "em_preparo",
				label: "Em preparo",
				isCompleted: true,
				isCurrent: false,
			},
			{
				id: "pronto_para_retirada",
				label: "Pronto para retirada",
				isCompleted: false,
				isCurrent: true,
			},
			{
				id: "retirado",
				label: "Retirado",
				isCompleted: false,
				isCurrent: false,
			},
		],
	},
];

export const mockCurrentOrder = mockOrders[0];
