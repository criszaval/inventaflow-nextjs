import {NextResponse} from 'next/server';import {getProducts,getSales,isDemo} from '@/lib/store';import {calculateSummary} from '@/lib/summary';import {errorMessage} from '@/lib/validation';
export const dynamic='force-dynamic';
export async function GET(){try{const [products,sales]=await Promise.all([getProducts(),getSales()]);return NextResponse.json({data:calculateSummary(products,sales),demo:isDemo()})}catch(e){return NextResponse.json({error:errorMessage(e)},{status:500})}}
