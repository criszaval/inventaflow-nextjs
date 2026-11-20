import {AlertTriangle,LoaderCircle,RefreshCw} from 'lucide-react';
export const money=(v:number)=>new Intl.NumberFormat('es-SV',{style:'currency',currency:'USD'}).format(v);
export const dateLabel=(v:string)=>new Date(v).toLocaleDateString('es-SV',{day:'2-digit',month:'short',year:'numeric'});
export function Loading(){return <div className="feedback"><LoaderCircle className="spin"/><span>Cargando información...</span></div>}
export function Failure({error,retry}:{error:string;retry:()=>void}){return <div className="feedback error-feedback"><AlertTriangle/><span>{error}</span><button className="btn btn-outline" onClick={retry}><RefreshCw size={15}/> Reintentar</button></div>}
export function Empty({text}:{text:string}){return <div className="empty">{text}</div>}
export function PageHeading({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:React.ReactNode}){return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div>{action}</div>}
export function Status({stock,min}:{stock:number;min:number}){return stock===0?<span className="pill pill-danger">Agotado</span>:stock<=min?<span className="pill pill-warn">Stock bajo</span>:<span className="pill pill-good">Disponible</span>}
