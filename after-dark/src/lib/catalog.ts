import lakshmi from '@/assets/lakshmi.webp.asset.json';
import sparklers from '@/assets/sparklers.webp.asset.json';
import mega from '@/assets/mega.webp.asset.json';
import big from '@/assets/big.webp.asset.json';
import special from '@/assets/special.webp.asset.json';

export const crackerCategories = [
 'Flower Pots',
 'Sparklers',
 'Rockets',
 'Ground Chakkars',
 'Fountains',
 'Garlands',
 'Gift Boxes',
 'Combo Packs',
] as const;

export type CrackerCategory = (typeof crackerCategories)[number];

export type Product = {
 id: string;
 name: string;
 category: string;
 crackerCategory: CrackerCategory;
 price: number;
 original: number;
 image: string;
 badge?: string;
 description?: string;
};

export const products: Product[] = [
 { id:'lakshmi', name:'3½" Lakshmi crackers', category:'Single Sound Crackers', crackerCategory:'Combo Packs', price:27, original:54, image:lakshmi.url, badge:'Everyday favourite', description:'A classic pack for easy, feel-good celebrations.' },
 { id:'sparklers', name:'30 cm Electric Sparklers', category:'Sparklers', crackerCategory:'Sparklers', price:72, original:144, image:sparklers.url, badge:'Bestseller', description:'Bright, clean-burning sparkle for every age.' },
 { id:'mega', name:'Anil Ground Chakkar Mega Special', category:'Chakkars', crackerCategory:'Ground Chakkars', price:126, original:252, image:mega.url, badge:'Crowd pleaser', description:'Big colour, bold spins and a whole lot of joy.' },
 { id:'big', name:'Anil Ground Chakkar Big', category:'Chakkars', crackerCategory:'Ground Chakkars', price:149, original:298, image:big.url, badge:'Fan favourite', description:'A classic ground showpiece with a bright finish.' },
 { id:'special', name:'Anil Ground Chakkar Special', category:'Chakkars', crackerCategory:'Ground Chakkars', price:124, original:248, image:special.url, badge:'Limited edit', description:'A colourful spin for nights that deserve more.' },
 { id:'flower-pot', name:'Luxe Colour Flower Pot', category:'Flower Pots', crackerCategory:'Flower Pots', price:199, original:399, image:'/images/flower-pot.png', badge:'New drop', description:'A rich, colourful fountain of light from the ground up.' },
 { id:'rocket', name:'Skyline Colour Rocket', category:'Rockets', crackerCategory:'Rockets', price:89, original:179, image:'/images/rocket.png', badge:'Up next', description:'Send a little colour into the night sky.' },
 { id:'fountain', name:'Midnight Gold Fountain', category:'Fountains', crackerCategory:'Fountains', price:159, original:319, image:'/images/flower-pot.png', badge:'Top rated', description:'A slow, golden plume made for the main event.' },
 { id:'garland', name:'Red Ribbon Garland', category:'Garlands', crackerCategory:'Garlands', price:249, original:499, image:'/images/garland.png', badge:'Best value', description:'A classic celebration staple with plenty of pop.' },
 { id:'gift-box', name:'The Diwali Gift Box', category:'Gift Boxes', crackerCategory:'Gift Boxes', price:599, original:1199, image:'/images/gift-box.png', badge:'Giftable', description:'A considered mix of colour, sparkle and surprise.' },
 { id:'combo-pack', name:'After Dark Combo Pack', category:'Combo Packs', crackerCategory:'Combo Packs', price:799, original:1599, image:'/images/gift-box.png', badge:'Save 50%', description:'Your all-night edit: a little bit of everything.' },
];
export type Cart = Record<string,number>;
export const cartTotal = (cart:Cart) => products.reduce((total,p) => total+p.price*(cart[p.id]??0),0);
export const money = (value:number) => `₹${value.toFixed(2)}`;
export const discountPercent = (product:Pick<Product,'price'|'original'>) => Math.round(((product.original-product.price)/product.original)*100);
