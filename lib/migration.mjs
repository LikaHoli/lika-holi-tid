import {validateRecord} from './records.mjs';
const canonical=x=>JSON.stringify(Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))));
export function planLocalMigration(local,cloud,newId=()=>crypto.randomUUID()){
 if(!Array.isArray(local)||!Array.isArray(cloud))throw Error('Lokala uppgifter kunde inte läsas.');local.forEach(validateRecord);
 const remote=new Map(cloud.map(x=>[x.id,x])),clientIds=new Map(),items=[];let skipped=0,conflicts=0;
 // Clients are mapped first so cloned entries never point to the wrong customer.
 for(const x of local.filter(x=>x.kind==='client')){const old=remote.get(x.id);if(!old){items.push(x);clientIds.set(x.id,x.id);}else if(canonical(old)===canonical(x)){skipped++;clientIds.set(x.id,x.id);}else{const id=newId();items.push({...x,id});clientIds.set(x.id,id);conflicts++;}}
 for(const x of local.filter(x=>x.kind==='entry')){if(!clientIds.has(x.client))throw Error('En lokal rapport saknar kund. Återställ en komplett säkerhetskopia.');const row={...x,client:clientIds.get(x.client)},old=remote.get(row.id);if(!old)items.push(row);else if(canonical(old)===canonical(row))skipped++;else{items.push({...row,id:newId()});conflicts++;}}
 return {items,skipped,conflicts};
}
