export function dateRange(start,end,weekdaysOnly=true){
 const parse=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw Error('Välj både startdatum och slutdatum.');const d=new Date(s+'T12:00:00Z');if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==s)throw Error('Välj ett giltigt datum.');return d;};
 const a=parse(start),b=parse(end);if(b<a)throw Error('Slutdatum måste vara samma dag eller senare än startdatum.');if((b-a)/86400000>365)throw Error('Välj högst 366 kalenderdagar åt gången.');const days=[];for(let d=a;d<=b;d=new Date(d.getTime()+86400000)){if(!weekdaysOnly||![0,6].includes(d.getUTCDay()))days.push(d.toISOString().slice(0,10));}return days;
}
