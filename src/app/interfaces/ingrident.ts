export enum IngredientStatus {
    NotAvailable = 0,
    Available = 1
}
export interface Ingrident {
    QTY: number, 
    price: number,
    profit: number,
    status: IngredientStatus,
    unit_id: number
}
