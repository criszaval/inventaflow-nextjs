import type {Product,Sale,Summary} from './types';
export function calculateSummary(products:Product[],sales:Sale[]):Summary {
 const idx=new Map(products.map(p=>[p.id,p]));const unitsByName=new Map<string,number>();const perDay=new Map<string,number>();
 for(const s of sales){const name=s.product_name??idx.get(s.product_id)?.name??'Producto';unitsByName.set(name,(unitsByName.get(name)??0)+s.quantity);const day=s.created_at.slice(0,10);perDay.set(day,(perDay.get(day)??0)+s.total);}
 const today=new Date();const dailyRevenue=Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(d.getDate()-(6-i));const day=d.toISOString().slice(0,10);return {day,total:perDay.get(day)??0}});
 return {products:products.length,units:products.reduce((n,p)=>n+p.stock,0),lowStock:products.filter(p=>p.stock<=p.min_stock).length,revenue:sales.reduce((n,s)=>n+s.total,0),profit:sales.reduce((n,s)=>n+s.total-s.quantity*(idx.get(s.product_id)?.cost??0),0),salesCount:sales.length,recentSales:sales.slice(0,5),topProducts:[...unitsByName].map(([name,units])=>({name,units})).sort((a,b)=>b.units-a.units).slice(0,5),dailyRevenue};
}
