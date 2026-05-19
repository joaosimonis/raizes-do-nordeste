import type { OrderStatus } from "@/features/orders/types/order.types";

export const ADVANCE_ACTION_LABELS: Record<OrderStatus, string> = {
	em_preparo: "Marcar como pronto",
	pedido_confirmado: "Iniciar preparo",
	pronto_para_retirada: "Confirmar retirada",
};
