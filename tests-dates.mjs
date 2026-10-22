import test from 'node:test';import assert from 'node:assert/strict';import {dateRange} from './lib/dates.mjs';
test('inclusive weekday range',()=>assert.deepEqual(dateRange('2026-10-19','2026-10-25'),['2026-10-19','2026-10-20','2026-10-21','2026-10-22','2026-10-23']));
test('weekends optional and same day supported',()=>{assert.equal(dateRange('2026-10-19','2026-10-25',false).length,7);assert.equal(dateRange('2026-10-24','2026-10-24',false).length,1);assert.equal(dateRange('2026-10-24','2026-10-25').length,0);});
test('DST and month boundaries do not skip or duplicate days',()=>assert.deepEqual(dateRange('2026-10-24','2026-10-27',false),['2026-10-24','2026-10-25','2026-10-26','2026-10-27']));
test('leap days and invalid ranges',()=>{assert.equal(dateRange('2028-02-28','2028-03-01',false).length,3);for(const [a,b]of[['2026-02-30','2026-03-01'],['2026-10-25','2026-10-24'],['2026-01-01','2028-01-01'],['','2026-10-22']])assert.throws(()=>dateRange(a,b));});
