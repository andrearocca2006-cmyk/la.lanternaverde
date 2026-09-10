'use client';
export function clientKey(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('')}
export async function get(action:string,adminToken=''){const r=await fetch('/api/data?action='+action,{headers:adminToken?{Authorization:'Bearer '+adminToken}:{}});const b:any=await r.json();if(!r.ok)throw new Error(b.error||'Servizio non disponibile');return b}
export async function post(body:any,adminToken=''){const r=await fetch('/api/data',{method:'POST',headers:{'Content-Type':'application/json',...(adminToken?{Authorization:'Bearer '+adminToken}:{})},body:JSON.stringify(body)});const b:any=await r.json();if(!r.ok)throw new Error(b.error||'Operazione non riuscita');return b}
export function Field({label,id,...props}:React.InputHTMLAttributes<HTMLInputElement>&{label:string;id:string}){return <div className="field"><label htmlFor={id}>{label}</label><input id={id} {...props}/></div>}
export function Check({children,...props}:React.InputHTMLAttributes<HTMLInputElement>){return <label className="check"><input type="checkbox" {...props}/><span>{children}</span></label>}
