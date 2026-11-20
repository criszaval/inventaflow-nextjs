import type { Product, ProductInput, Sale } from './types';
import { sampleProducts, sampleSales } from './demo';
const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_URL.includes('TU_PROYECTO'));
export function isDemo() {return !hasSupabase;}
type DemoStore = {products:Product[];sales:Sale[]};
const globalStore = globalThis as typeof globalThis & { __inventaStore?: DemoStore };
function demo() {return globalStore.__inventaStore ??= {products:structuredClone(sampleProducts),sales:structuredClone(sampleSales)};}
async function db<T>(table:string, opts: {method?:string;query?:string;body?:unknown;prefer?:string}={}) {
 const url=process.env.SUPABASE_URL!; const key=process.env.SUPABASE_SERVICE_ROLE_KEY!;
 const res=await fetch(`${url}/rest/v1/${table}${opts.query?'?'+opts.query:''}`,{method:opts.method??'GET',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:opts.prefer??'return=representation'},body:opts.body?JSON.stringify(opts.body):undefined,cache:'no-store'});
 if(!res.ok) throw new Error(`Base de datos: ${res.status} ${await res.text()}`);
 const t=await res.text();return (t?JSON.parse(t):[]) as T;
}
export async function getProducts():Promise<Product[]> {return hasSupabase?db<Product[]>('products',{query:'select=*&order=created_at.desc'}):demo().products;}
export async function addProduct(data:ProductInput):Promise<Product> {if(hasSupabase)return (await db<Product[]>('products',{method:'POST',body:data}))[0];const product={...data,id:crypto.randomUUID(),created_at:new Date().toISOString()};demo().products.unshift(product);return product;}
export async function updateProduct(id:string,data:Partial<ProductInput>):Promise<Product|null> {if(hasSupabase)return (await db<Product[]>('products',{method:'PATCH',query:`id=eq.${encodeURIComponent(id)}`,body:data}))[0]??null;const x=demo().products.find(p=>p.id===id);if(!x)return null;Object.assign(x,data);return x;}
export async function deleteProduct(id:string):Promise<boolean> {if(hasSupabase){const res=await db<Product[]>('products',{method:'DELETE',query:`id=eq.${encodeURIComponent(id)}`});return res.length>0;}const s=demo();const n=s.products.length;s.products=s.products.filter(p=>p.id!==id);return n!==s.products.length;}
export async function getSales():Promise<Sale[]> {if(hasSupabase){const rows=await db<(Sale&{products:{name:string}|null})[]>('sales',{query:'select=*,products(name)&order=created_at.desc'});return rows.map(({products,...sale})=>({...sale,product_name:products?.name??'Producto'}));}return [...demo().sales].sort((a,b)=>b.created_at.localeCompare(a.created_at));}
export async function addSale(productId:string,quantity:number):Promise<Sale> {if(hasSupabase){const result=await db<{id:string}[]>('rpc/register_sale',{method:'POST',body:{p_product_id:productId,p_quantity:quantity}});if(result.length){const sales=await getSales();const found=sales.find(x=>x.id===result[0].id);if(found)return found;}throw Error('No se pudo registrar la venta. Revisa la función SQL register_sale.');}
 const product=demo().products.find(x=>x.id===productId);if(!product)throw Error('Producto no encontrado');if(product.stock<quantity)throw Error('Stock insuficiente');product.stock-=quantity;const sale:Sale={id:crypto.randomUUID(),product_id:productId,product_name:product.name,quantity,unit_price:product.price,total:Number((product.price*quantity).toFixed(2)),created_at:new Date().toISOString()};demo().sales.unshift(sale);return sale;}
