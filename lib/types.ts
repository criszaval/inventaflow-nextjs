export type Product = { id: string; sku: string; name: string; category: string; stock: number; min_stock: number; cost: number; price: number; created_at: string };
export type Sale = { id: string; product_id: string; quantity: number; unit_price: number; total: number; created_at: string; product_name?: string };
export type Summary = { products: number; units: number; lowStock: number; revenue: number; profit: number; salesCount: number; recentSales: Sale[]; topProducts: { name: string; units: number }[]; dailyRevenue: { day: string; total: number }[] };
export type ProductInput = Omit<Product,'id'|'created_at'>;
