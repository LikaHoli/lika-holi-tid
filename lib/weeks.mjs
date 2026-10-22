const dayMs=86400000;
export function weekInfo(date){
 const d=new Date(date+'T12:00:00Z');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==date)throw Error('Ogiltigt datum.');
 const monday=new Date(d.getTime()-((d.getUTCDay()+6)%7)*dayMs);
 const thursday=new Date(monday.getTime()+3*dayMs);
 const year=thursday.getUTCFullYear();const january4=new Date(Date.UTC(year,0,4,12));
 const firstMonday=new Date(january4.getTime()-((january4.getUTCDay()+6)%7)*dayMs);
 const week=Math.round((monday-firstMonday)/(7*dayMs))+1;
 return {key:`${year}-W${String(week).padStart(2,'0')}`,year,week,start:monday.toISOString().slice(0,10),end:new Date(monday.getTime()+6*dayMs).toISOString().slice(0,10)};
}
export function groupByWeek(records){
 const groups=new Map();
 for(const entry of records){const info=weekInfo(entry.date);if(!groups.has(info.key))groups.set(info.key,{...info,entries:[],hours:0,miles:0,totalOre:0});const g=groups.get(info.key);g.entries.push(entry);g.hours+=entry.hours;g.miles+=entry.miles;g.totalOre+=Math.round((entry.hours*entry.rate+entry.miles*entry.mileRate)*100);}
 return [...groups.values()].sort((a,b)=>b.start.localeCompare(a.start)).map(g=>({...g,total:g.totalOre/100,entries:g.entries.sort((a,b)=>a.date.localeCompare(b.date))}));
}
