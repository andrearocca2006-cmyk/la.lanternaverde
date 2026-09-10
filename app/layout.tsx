import type {Metadata} from 'next';
import './globals.css';
import './mobile-fixes.css';
import Shell from './ui/Shell';
export const metadata:Metadata={title:'La Lanterna Verde | Ristorante e Pizzeria a Bari',description:'Ristorante pizzeria a Bari: cucina italiana, sapori di mare e pizza a lievitazione naturale di 72 ore, in Via Napoli 99. Prenota direttamente.',robots:{index:false,follow:false,nocache:true},referrer:'no-referrer',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="it"><body><Shell>{children}</Shell></body></html>}
