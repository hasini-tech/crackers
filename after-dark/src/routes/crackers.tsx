import { createFileRoute, Link } from '@tanstack/react-router';
import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import {
 ArrowRight,
 ArrowUpRight,
 Boxes,
 Check,
 ChevronDown,
 CircleDot,
 Flame,
 Flower2,
 Gift,
 Minus,
 PartyPopper,
 Plus,
 Rocket,
 Search,
 ShieldCheck,
 ShoppingBag,
 Sparkles,
 X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { crackerCategories, discountPercent, money, products, cartTotal, type Cart, type CrackerCategory, type Product } from '@/lib/catalog';

export const Route = createFileRoute('/crackers')({
 ssr: false,
 head: () => ({
  meta: [
   { title: 'Crackers / After dark — The celebration edit' },
   { name: 'description', content: 'Shop flower pots, sparklers, rockets, chakkars, fountains, garlands, gift boxes and combo packs.' },
  ],
 }),
 component: Crackers,
});

const categoryIcons = {
 'Flower Pots': Flower2,
 Sparklers: Sparkles,
 Rockets: Rocket,
 'Ground Chakkars': CircleDot,
 Fountains: Flame,
 Garlands: PartyPopper,
 'Gift Boxes': Gift,
 'Combo Packs': Boxes,
} as const;

function Crackers() {
 const collection = useRef<HTMLElement>(null);
 const [category, setCategory] = useState<CrackerCategory | 'All crackers'>('All crackers');
 const [query, setQuery] = useState('');
 const [sort, setSort] = useState('featured');
 const [cart, setCart] = useState<Cart>({});
 const [bagOpen, setBagOpen] = useState(false);
 const [favorites, setFavorites] = useState<string[]>([]);

 const add = (id: string, delta = 1) => setCart((previous) => ({ ...previous, [id]: Math.max(0, (previous[id] ?? 0) + delta) }));
 const count = Object.values(cart).reduce((total, value) => total + value, 0);
 const scrollToCollection = () => collection.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
 const selectCategory = (next: CrackerCategory | 'All crackers') => { setCategory(next); scrollToCollection(); };
 const shown = products
  .filter((product) => category === 'All crackers' || product.crackerCategory === category)
  .filter((product) => `${product.name} ${product.crackerCategory}`.toLowerCase().includes(query.trim().toLowerCase()))
  .sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0);

 const tilt = (event: PointerEvent<HTMLElement>) => {
  if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  event.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-5px)`;
 };
 const resetTilt = (event: PointerEvent<HTMLElement>) => { event.currentTarget.style.transform = ''; };

 return <>
  <div className="announcement"><Sparkles size={12}/><span>After dark / crackers edit</span><span>·</span><span>Flat 50% off selected picks</span><ArrowRight size={12}/></div>
  <header className="cracker-header shop-container">
   <Link to="/" className="shop-wordmark" aria-label="After dark home"><Sparkles className="wordmark-icon" fill="currentColor"/>after dark<span className="text-primary">/</span></Link>
   <div className="cracker-breadcrumb"><span>Shop</span><span>/</span><strong>Crackers</strong></div>
   <div className="cracker-header-actions">
    <Link className="back-home" to="/"><ArrowRight size={14} className="back-home-icon"/>Back to home</Link>
    <Button variant="ghost" onClick={() => setBagOpen(true)} aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={18}/><span className="bag-label">Bag</span><span className="bag-count">{count}</span></Button>
   </div>
  </header>

  <main>
   <section className="cracker-hero" aria-label="Crackers collection hero">
    <img src="/images/crackers-banner.png" alt="Colorful fireworks over a city at night" className="cracker-hero-image" width="1984" height="1120" fetchPriority="high"/>
    <div className="cracker-hero-overlay"/>
    <div className="shop-container cracker-hero-content">
     <div className="cracker-hero-copy">
      <div className="eyebrow"><span className="status-dot"/>The celebration edit / 2026</div>
      <h1>Make it <span>bright.</span><br/><em>Make it yours.</em></h1>
      <p>From first spark to final boom, find the pieces that make your night feel like a headline.</p>
      <div className="hero-actions"><Button className="hero-action" onClick={scrollToCollection}>Shop all crackers <ArrowUpRight size={15}/></Button><Button variant="outline" className="hero-action hero-secondary" onClick={() => selectCategory('Combo Packs')}><Gift size={15}/>Build the big night</Button></div>
     </div>
     <div className="cracker-offer-card"><span className="offer-kicker">The good stuff</span><strong>50%</strong><span>off selected<br/>celebration picks</span><div className="offer-line"/><span className="offer-note">Use code <b>BRIGHT50</b> at checkout*</span></div>
    </div>
    <div className="shop-container cracker-hero-footer"><span><ShieldCheck size={14}/>Celebrate responsibly, sparkle fully.</span><span className="hero-scroll-label">Scroll to explore <ArrowRight size={14}/></span></div>
   </section>

   <section className="shop-container category-showcase" aria-labelledby="category-title">
    <div className="section-kicker">Pick your kind of loud</div>
    <div className="category-heading-row"><div><h2 id="category-title">Shop by category</h2><p className="section-subtitle">A little something for every kind of celebration.</p></div><Button variant="ghost" className="view-all" onClick={() => selectCategory('All crackers')}>View all products <ArrowRight size={14}/></Button></div>
    <div className="category-grid">
     {crackerCategories.map((item) => { const Icon = categoryIcons[item]; return <button type="button" key={item} className={`category-tile ${category === item ? 'active' : ''}`} aria-pressed={category === item} onClick={() => selectCategory(item)}><span className="category-icon"><Icon size={19}/></span><span>{item}</span><ArrowUpRight className="category-arrow" size={14}/></button>; })}
    </div>
   </section>

   <section className="shop-container cracker-promo" aria-label="Promotional offer">
    <div className="promo-orbit"><Sparkles size={25}/><span>50</span><small>%</small></div>
    <div className="promo-copy"><div className="section-kicker">More sparkle. Better value.</div><h2>Make room for one more.</h2><p>Save 50% on selected celebration favourites and make the whole night count.</p></div>
    <div className="promo-details"><span>Code</span><strong>BRIGHT50</strong><span className="promo-divider"/><span>Limited festive offer</span></div>
   </section>

   <section className="shop-container cracker-collection" ref={collection} aria-labelledby="products-title">
    <div className="section-heading cracker-section-heading"><div><div className="section-kicker">The main event / handpicked</div><h2 id="products-title">Every kind of wow.</h2><p className="section-subtitle">Big colour, little moments, and everything in between.</p></div><Button className="view-all" variant="ghost" onClick={() => { setCategory('All crackers'); setQuery(''); }}>View all products <ArrowRight size={14}/></Button></div>
    <div className="cracker-toolbar">
     <div className="cracker-search"><Search size={16}/><input aria-label="Search crackers" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search crackers, sparks, favourites…"/><button type="button" aria-label="Clear search" className={`clear-search ${query ? 'visible' : ''}`} onClick={() => setQuery('')}><X size={14}/></button></div>
     <div className="cracker-toolbar-meta"><span>{shown.length} {shown.length === 1 ? 'product' : 'products'}</span><label htmlFor="cracker-sort">Sort by <select id="cracker-sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select><ChevronDown size={13}/></label></div>
    </div>
    <div className="cracker-grid">
     {shown.map((product, index) => <CrackerCard key={product.id} product={product} count={cart[product.id] ?? 0} favorite={favorites.includes(product.id)} index={index} onAdd={() => add(product.id)} onFavorite={() => setFavorites((list) => list.includes(product.id) ? list.filter((id) => id !== product.id) : [...list, product.id])} onPointerMove={tilt} onPointerLeave={resetTilt}/>)}
    </div>
    {shown.length === 0 && <div className="cracker-empty"><Sparkles size={25}/><strong>No sparks found.</strong><span>Try a different search or reset the collection.</span><Button variant="outline" onClick={() => { setCategory('All crackers'); setQuery(''); }}>View all products <ArrowRight size={14}/></Button></div>}
    <div className="cracker-safety-note"><ShieldCheck size={15}/><span>Always read the pack instructions, keep water nearby, and celebrate with care.</span></div>
   </section>

   <section className="shop-container cracker-signoff"><div><div className="section-kicker">Your night, your edit</div><h2>Go on. Make some noise.</h2><p>Bring the people, we’ll bring the sparkle.</p></div><Button className="hero-action" onClick={scrollToCollection}>Keep exploring <ArrowRight size={15}/></Button></section>
  </main>


  <Sheet open={bagOpen} onOpenChange={setBagOpen}><SheetContent className="overflow-y-auto"><SheetHeader><SheetTitle>Your celebration bag</SheetTitle><SheetDescription>{count} {count === 1 ? 'item' : 'items'} ready to sparkle</SheetDescription></SheetHeader>
   {count === 0 ? <div className="empty-state"><ShoppingBag className="mx-auto mb-4" size={32}/>Your bag is waiting for a little sparkle.<Button className="mt-6" onClick={() => { setBagOpen(false); scrollToCollection(); }}>Explore crackers <ArrowRight/></Button></div> : <>{products.filter((product) => (cart[product.id] ?? 0) > 0).map((product) => <div className="cart-row" key={product.id}><img src={product.image} alt={product.name} width={65} height={75}/><div className="flex-1"><h3>{product.name}</h3><span className="text-xs">{money(product.price)}</span><div className="cart-quantity"><Button variant="outline" size="icon" aria-label={`Remove one ${product.name}`} onClick={() => add(product.id, -1)}><Minus size={12}/></Button><span className="text-xs">{cart[product.id]}</span><Button variant="outline" size="icon" aria-label={`Add one ${product.name}`} onClick={() => add(product.id)}><Plus size={12}/></Button></div></div></div>)}<div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal(cart))}</strong></div><p className="cart-disclaimer">This is a preview shopping bag. Online checkout and delivery are not available here yet.</p><Button className="w-full mt-5" onClick={() => setBagOpen(false)}>Continue exploring <ArrowRight/></Button></>}
  </SheetContent></Sheet>
 </>;
}

function CrackerCard({ product, count, favorite, index, onAdd, onFavorite, onPointerMove, onPointerLeave }: { product: Product; count: number; favorite: boolean; index: number; onAdd: () => void; onFavorite: () => void; onPointerMove: (event: PointerEvent<HTMLElement>) => void; onPointerLeave: (event: PointerEvent<HTMLElement>) => void }) {
 return <article className="cracker-card" style={{ '--card-index': index } as CSSProperties} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
  <div className="cracker-card-image"><span className="cracker-badge"><Flame size={11}/>{product.badge ?? 'Festive pick'}</span><button type="button" className={`cracker-favorite ${favorite ? 'selected' : ''}`} aria-label={`${favorite ? 'Remove' : 'Add'} ${product.name} ${favorite ? 'from' : 'to'} favorites`} aria-pressed={favorite} onClick={onFavorite}>{favorite ? '♥' : '♡'}</button><img src={product.image} alt={product.name} width="520" height="520" loading="lazy"/><span className="card-glow"/></div>
  <div className="cracker-card-body"><div className="product-category">{product.crackerCategory}</div><h3>{product.name}</h3><p>{product.description}</p><div className="cracker-price-row"><span className="price">{money(product.price)}</span><span className="old-price">{money(product.original)}</span><span className="discount">{discountPercent(product)}% OFF</span></div><Button variant={count ? 'default' : 'outline'} className="cracker-add-button" onClick={onAdd}>{count ? <><Check size={13}/>In cart ({count})<Plus size={13}/></> : <>Add to Cart <Plus size={13}/></>}</Button></div>
 </article>;
}
