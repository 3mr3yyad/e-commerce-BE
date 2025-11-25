const generateMessages = (entity: string) => ({
    created: `${entity} created successfully`,
    updated: `${entity} updated successfully`,
    deleted: `${entity} deleted successfully`,
    failToCreate: `Failed to create ${entity}`,
    failToUpdate: `Failed to update ${entity}`,
    failToDelete: `Failed to delete ${entity}`,
    notFound: `${entity} not found`,
    alreadyExists: `${entity} already exists`,
})

export const MESSAGE = {
    category: {...generateMessages('Category')},
    brand: { ...generateMessages('Brand') },
    product: { ...generateMessages('Product') },
    coupon: { ...generateMessages('Coupon') },
    user: { ...generateMessages('User') },
    seller: { ...generateMessages('Seller') },
    admin: { ...generateMessages('Admin') },
    customer: { ...generateMessages('Customer') },
    cart: { ...generateMessages('Cart') },
    order: { ...generateMessages('Order') },
}
