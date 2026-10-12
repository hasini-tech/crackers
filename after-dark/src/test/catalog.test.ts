import { describe, expect, it } from 'vitest';
import { products, cartTotal } from '@/lib/catalog';
describe('User supplied Anil product prices',()=>{
 it('uses ₹27 / ₹54 for Lakshmi crackers',()=>{expect(products.find(p=>p.id==='lakshmi')).toMatchObject({price:27,original:54});});
 it('uses ₹72 / ₹144 for Electric Sparklers',()=>{expect(products.find(p=>p.id==='sparklers')).toMatchObject({price:72,original:144});});
 it('uses ₹126 / ₹252 for Mega Special',()=>{expect(products.find(p=>p.id==='mega')).toMatchObject({price:126,original:252});});
 it('uses ₹149 / ₹298 for Big',()=>{expect(products.find(p=>p.id==='big')).toMatchObject({price:149,original:298});});
 it('uses ₹124 / ₹248 for Special',()=>{expect(products.find(p=>p.id==='special')).toMatchObject({price:124,original:248});});
 it('totals two Lakshmi packs and one sparkler pack at ₹126',()=>{expect(cartTotal({lakshmi:2,sparklers:1})).toBe(126);});
});