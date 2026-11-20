import type {ProductInput} from './types';
export function parseProduct(value:unknown):ProductInput {
 if(!value||typeof value!=='object')throw Error('Datos no válidos');
 const x=value as Record<string,unknown>;
 const sku=String(x.sku??'').trim().toUpperCase(),name=String(x.name??'').trim(),category=String(x.category??'').trim();
 const stock=Number(x.stock),min_stock=Number(x.min_stock),cost=Number(x.cost),price=Number(x.price);
 if(!sku||!name||!category)throw Error('Nombre, SKU y categoría son obligatorios');
 if([stock,min_stock,cost,price].some(n=>!Number.isFinite(n)||n<0)||![stock,min_stock].every(Number.isInteger))throw Error('Revisa los valores numéricos');
 return {sku,name,category,stock,min_stock,cost,price};
}
export const errorMessage=(err:unknown)=>err instanceof Error?err.message:'Error inesperado';
