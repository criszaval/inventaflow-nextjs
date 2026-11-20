import {NextResponse} from 'next/server';import {getProducts,addProduct,isDemo} from '@/lib/store';import {parseProduct,errorMessage} from '@/lib/validation';
export const dynamic='force-dynamic';
export async function GET(){try{return NextResponse.json({data:await getProducts(),demo:isDemo()})}catch(e){return NextResponse.json({error:errorMessage(e)},{status:500})}}
export async function POST(req:Request){try{const data=parseProduct(await req.json());return NextResponse.json({data:await addProduct(data)},{status:201})}catch(e){return NextResponse.json({error:errorMessage(e)},{status:400})}}
