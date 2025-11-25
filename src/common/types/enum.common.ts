export enum DiscountType {
    FIXED = 'fixed',
    PERCENTAGE = 'percentage'
}

export enum PaymentMethod {
    COD = 'cash',
    E_WALLET = 'e_wallet',
    CREDIT_CARD = 'credit_card',
}

export enum OrderStatus {
    PLACED = 'placed',
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded',
}