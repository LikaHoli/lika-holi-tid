import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Lika Holi · Tid & underlag',description:'Din arbetsdag, samlad. Tidrapportering och fakturaunderlag.'};
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="sv"><body>{children}</body></html>}
