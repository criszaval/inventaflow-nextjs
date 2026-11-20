import type {Metadata} from 'next';import './globals.css';import {AppShell} from '@/components/layout';
export const metadata:Metadata={title:{default:'InventaFlow | Gestión de inventario',template:'%s | InventaFlow'},description:'Sistema moderno para inventario, ventas y reportes con Next.js.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><AppShell>{children}</AppShell></body></html>}
