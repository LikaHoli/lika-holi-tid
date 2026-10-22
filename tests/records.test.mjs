import test from 'node:test';import assert from 'node:assert/strict';import {validateRecord,parseBackup} from '../lib/records.mjs';
const c={id:'c',kind:'client',name:'Kund',rate:510,mileRate:70};const e={id:'e',kind:'entry',client:'c',date:'2026-10-22',description:'Arbete',hours:8,rate:510,miles:4,mileRate:70,invoiced:false};
test('supports migration from original JSON backup',()=>{assert.equal(parseBackup({clients:[c],entries:[e]}).length,2);});
test('rejects corrupt dates and unsafe values',()=>{for(const bad of [{date:'2026-02-30'},{hours:25},{rate:-1},{miles:Infinity},{description:''},{invoiced:'false'}])assert.throws(()=>validateRecord({...e,...bad}));});
test('rejects duplicate and orphaned imported records',()=>{assert.throws(()=>parseBackup({clients:[c,c],entries:[]}));assert.throws(()=>parseBackup({clients:[],entries:[e]}));});
test('preserves historical prices rather than taking current customer prices',()=>{const data=parseBackup({clients:[{...c,rate:600}],entries:[e]});assert.equal(data[1].rate,510);assert.equal(data[1].hours*data[1].rate+data[1].miles*data[1].mileRate,4360);});
