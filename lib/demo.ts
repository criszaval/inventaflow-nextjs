import type { Product, Sale } from './types';
const now = new Date().toISOString();
export const sampleProducts: Product[] = [
 {id:'demo-1',sku:'ZAP-001',name:'Tenis urbanos blancos',category:'Zapatos',stock:15,min_stock:5,cost:32,price:55,created_at:now},
 {id:'demo-2',sku:'GOR-001',name:'Gorra clásica negra',category:'Gorras',stock:24,min_stock:6,cost:10,price:22,created_at:now},
 {id:'demo-3',sku:'BOL-001',name:'Bolso casual beige',category:'Bolsos',stock:4,min_stock:5,cost:26,price:48,created_at:now},
 {id:'demo-4',sku:'ROP-001',name:'Camiseta premium',category:'Ropa',stock:19,min_stock:6,cost:13,price:28,created_at:now},
 {id:'demo-5',sku:'ZAP-002',name:'Tenis deportivos negros',category:'Zapatos',stock:3,min_stock:5,cost:39,price:68,created_at:now},
 {id:'demo-6',sku:'BOL-002',name:'Cartera compacta',category:'Bolsos',stock:11,min_stock:5,cost:18,price:36,created_at:now},
];
export const sampleSales: Sale[] = [
 {id:'sale-1',product_id:'demo-1',product_name:'Tenis urbanos blancos',quantity:2,unit_price:55,total:110,created_at:new Date(Date.now()-86400000).toISOString()},
 {id:'sale-2',product_id:'demo-2',product_name:'Gorra clásica negra',quantity:3,unit_price:22,total:66,created_at:new Date(Date.now()-86400000*2).toISOString()},
 {id:'sale-3',product_id:'demo-4',product_name:'Camiseta premium',quantity:1,unit_price:28,total:28,created_at:new Date(Date.now()-86400000*3).toISOString()},
];
