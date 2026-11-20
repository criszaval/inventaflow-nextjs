import {NextResponse} from 'next/server';import {getSales,addSale} from '@/lib/store';import {errorMessage} from '@/lib/validation';
export const dynamic='force-dynamic';
export async function GET(){try{return NextResponse.json({data:await getSales()})}catch(e){return NextResponse.json({error:errorMessage(e)},{status:500})}}
export async function POST(req:Request){try{const x=await req.json();const qty=Number(x.quantity);if(!x.product_id||!Number.isInteger(qty)||qty<=0)throw Error('Selecciona un producto y una cantidad válida');return NextResponse.json({data:await addSale(String(x.product_id),qty)},{status:201})}catch(e){return NextResponse.json({error:errorMessage(e)},{status:400})}}
