import { createFileRoute, Link } from '@tanstack/react-router';
import { useRef, useState, type PointerEvent } from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Eye, Flame, Heart, Minus, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollHero } from '@/components/ScrollHero';
import { products, cartTotal, money, type Cart } from '@/lib/catalog';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

export const Route = createFileRoute('/')({
 ssr:false,
 head:()=>({meta:[
  {title:'Fireworks / After dark — The celebration edit'},
  {name:'description',content:'Discover fireworks, Electric Sparklers and Ground Chakkars. Make your Diwali shine with our festive collection.'},
  {property:'og:title',content:'Fireworks / After dark — The celebration edit'},
  {property:'og:description',content:'Explore fireworks and Diwali crackers with an interactive celebration for your next celebration.'},
  {property:'og:type',content:'website'},
  {name:'twitter:card',content:'summary_large_image'},
 ]}),
 component:Index,
});
const categories=['All fireworks','Single Sound Crackers','Sparklers','Chakkars'];
const slides=[
 {tag:'The celebration edit / 2026',accent:'Fireworks.',line:'Main character energy.',description:'Big sparks. Bold colours. Unforgettable nights. Your next celebration deserves a little extra.'},
 {tag:'A little louder. A little brighter.',accent:'Good nights.',line:'Great sparks.',description:'Electric sparklers, vibrant chakkars, and festive favorites. Find your perfect spark.'},
 {tag:'Turn the ordinary into extraordinary.',accent:'All colour.',line:'No ordinary nights.',description:'Fill the night with light and your celebrations with joy. Discover the Anil collection.'},
];
function Index(){
 const [category,setCategory]=useState('All fireworks');
 const [query,setQuery]=useState('');
 const [searchOpen,setSearchOpen]=useState(false);
 const [cart,setCart]=useState<Cart>({});
 const [bagOpen,setBagOpen]=useState(false);
 const [favorites,setFavorites]=useState<string[]>([]);
 const [favoritesOnly,setFavoritesOnly]=useState(false);
 const [slide,setSlide]=useState(0);
 const [sort,setSort]=useState('featured');
 const [quickId,setQuickId]=useState<string|null>(null);
 const [quantity,setQuantity]=useState(1);
 const quickProduct=products.find(p=>p.id===quickId);
 const tilt=(event:PointerEvent<HTMLElement>)=>{
  if(event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const bounds=event.currentTarget.getBoundingClientRect();
  const x=(event.clientX-bounds.left)/bounds.width-.5;
  const y=(event.clientY-bounds.top)/bounds.height-.5;
  event.currentTarget.style.transform=`perspective(850px) rotateX(${-y*12}deg) rotateY(${x*14}deg) translateY(-6px)`;
 };
 const resetTilt=(event:PointerEvent<HTMLElement>)=>{event.currentTarget.style.transform='';};
 const collection=useRef<HTMLElement>(null);
 const browse=(next='All fireworks')=>{setCategory(next);setFavoritesOnly(false);collection.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 const add=(id:string,delta=1)=>setCart(previous=>({...previous,[id]:Math.max(0,(previous[id]??0)+delta)}));
 const count=Object.values(cart).reduce((a,b)=>a+b,0);
 const shown=products.filter(p=>(category==='All fireworks'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())&&(!favoritesOnly||favorites.includes(p.id))).sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:0);
 const current=slides[slide]??slides[0];
 if(!current)return null;
 return <>
  <div className="announcement"><Sparkles size={12}/><span>Not your average celebration</span><span>·</span><span>The Diwali edit is here</span><ArrowRight size={12}/></div>
  <header className="site-header shop-container">
   <div className="shop-wordmark"><Zap className="wordmark-icon" fill="currentColor"/>after dark<span className="text-primary">/</span></div>
   <nav className="header-nav" aria-label="Shop categories">
    <Button variant="ghost" className={`nav-control ${category==='All fireworks'?'active':''}`} onClick={()=>browse()}>All fireworks <ChevronDown size={12}/></Button>
   <Button variant="ghost" className="nav-control" onClick={()=>browse('Sparklers')}>Sparklers</Button>
   <Button variant="ghost" className="nav-control" onClick={()=>browse('Chakkars')}>Chakkars</Button>
   <Link className="nav-control nav-link" to="/crackers">Crackers edit <ArrowUpRight size={12}/></Link>
   <Button variant="ghost" className="nav-control" onClick={()=>{browse();setFavoritesOnly(true);}}>Your favorites</Button>
   </nav>
   <div className="header-tools"><Button variant="ghost" size="icon" title="Search fireworks" aria-label="Search fireworks" onClick={()=>setSearchOpen(!searchOpen)}><Search size={18}/></Button>
    <Button variant="ghost" onClick={()=>setBagOpen(true)} aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={18}/><span className="bag-label text-xs">Bag</span><span className="bag-count">{count}</span></Button>
   </div>
  </header>
  {searchOpen&&<div className="shop-container"><div className="search-bar"><Search size={18}/><input autoFocus aria-label="Search products" value={query} onChange={e=>{setQuery(e.target.value);collection.current?.scrollIntoView({behavior:'smooth'});}} placeholder="Find your next spark…"/><Button variant="ghost" size="icon" aria-label="Close search" onClick={()=>{setSearchOpen(false);setQuery('');}}><X/></Button></div></div>}
  <main>
   <ScrollHero
   current={current}
   slide={slide}
   slides={slides}
   onBrowse={()=>browse()}
   onSlideChange={setSlide}
   />
   <div className="shop-container"><div className="benefits">
    <div className="benefit"><BadgeCheck/><div><strong>The celebration essentials</strong><p>A little spark goes a long way</p></div></div>
    <div className="benefit"><Sparkles/><div><strong>More sparkle. Better value.</strong><p>Festive favorites at special prices</p></div></div>
    <div className="benefit"><ShieldCheck/><div><strong>Celebrate responsibly</strong><p>Follow every pack’s safety guidance</p></div></div>
   </div></div>
   <section className="collection shop-container" ref={collection}>
    <div className="section-heading"><div><div className="section-kicker">The good stuff / handpicked</div><h2>{favoritesOnly?'Your festive favorites':'Meet your night-makers.'}</h2><p className="section-subtitle">Discover our most-loved fireworks, ready for your next celebration.</p></div><Button className="view-all text-xs" variant="ghost" onClick={()=>{setCategory('All fireworks');setFavoritesOnly(false);setQuery('');}}>View all fireworks <ArrowRight size={14}/></Button></div>
    <div className="filters" role="group" aria-label="Filter fireworks">{categories.map(c=><Button key={c} variant={category===c?'default':'secondary'} className="filter" aria-pressed={category===c} onClick={()=>setCategory(c)}>{c==='Single Sound Crackers'?'Sound crackers':c}</Button>)}<span className="result-count">{shown.length} products</span><select className="sort-select" aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
    <div className="product-grid">{shown.map(p=><article key={p.id} className="product-card" onPointerMove={tilt} onPointerLeave={resetTilt}>
     <div className="product-photo"><span className="hot-badge"><Flame/>Bestseller</span><Button variant="ghost" size="icon" className={`favorite ${favorites.includes(p.id)?'selected':''}`} title={favorites.includes(p.id)?'Remove from favorites':'Save to favorites'} aria-label={`Favorite ${p.name}`} aria-pressed={favorites.includes(p.id)} onClick={()=>setFavorites(list=>list.includes(p.id)?list.filter(id=>id!==p.id):[...list,p.id])}><Heart size={15} fill={favorites.includes(p.id)?'currentColor':'none'}/></Button><img src={p.image} alt={p.name} width={400} height={400} loading="lazy"/><Button className="quick-view" variant="secondary" onClick={()=>{setQuickId(p.id);setQuantity(1);}} aria-label={`Quick view ${p.name}`}><Eye size={12}/>Take a closer look</Button></div>
     <div className="product-info"><div className="product-category">{p.category}</div><h3>{p.name}</h3><div className="price-row"><span className="price">{money(p.price)}</span><span className="old-price">{money(p.original)}</span><span className="discount">50% OFF</span></div><Button variant="outline" className="add-button" onClick={()=>add(p.id)} aria-label={`Add ${p.name} to bag`}>{cart[p.id]?<><Check size={12}/>In bag ({cart[p.id]})<Plus size={12}/></>:<>Add to bag <Plus size={12}/></>}</Button></div>
    </article>)}</div>
    {shown.length===0&&<div className="empty-state">{favoritesOnly?'Your favorites are waiting for their first spark.':'No fireworks match your search.'}<div className="mt-4"><Button variant="outline" onClick={()=>{setFavoritesOnly(false);setQuery('');setCategory('All fireworks');}}>Browse all fireworks <ArrowRight/></Button></div></div>}
    <div className="collection-note"><ShieldCheck/> A little care makes every celebration brighter. Always read the safety instructions.</div>
   </section>
   <div className="shop-container"><section className="celebration-band"><div className="band-copy"><Sparkles className="sparkle"/><div><h2>Your night. Your kind of loud.</h2><p>Leave ordinary at the door.</p></div></div><Button variant="outline" className="hero-action" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to the hero <ArrowRight/></Button></section></div>
  </main>
  <Dialog open={Boolean(quickProduct)} onOpenChange={open=>{if(!open)setQuickId(null);}}><DialogContent className="quick-dialog">{quickProduct&&<div className="quick-layout"><img className="quick-image" src={quickProduct.image} alt={quickProduct.name} width={400} height={400}/><div><div className="section-kicker">{quickProduct.category}</div><DialogTitle className="quick-title">{quickProduct.name}</DialogTitle><DialogDescription className="quick-description">A celebration essential for your next big night. Follow the safety instructions on the pack.</DialogDescription><div className="quick-prices"><span className="price">{money(quickProduct.price)}</span><span className="old-price">{money(quickProduct.original)}</span><span className="discount">50% OFF</span></div><div className="quantity-control"><Button variant="outline" size="icon" aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>setQuantity(n=>Math.max(1,n-1))}><Minus/></Button><span className="quantity-value">{quantity}</span><Button variant="outline" size="icon" aria-label="Increase quantity" onClick={()=>setQuantity(n=>n+1)}><Plus/></Button></div><Button className="w-full" onClick={()=>{add(quickProduct.id,quantity);setQuickId(null);setBagOpen(true);}}>Add to bag · {money(quickProduct.price*quantity)} <ArrowUpRight/></Button></div></div>}</DialogContent></Dialog>
  <Sheet open={bagOpen} onOpenChange={setBagOpen}><SheetContent className="overflow-y-auto"><SheetHeader><SheetTitle>Your celebration bag</SheetTitle><SheetDescription>{count} {count===1?'item':'items'} ready to sparkle</SheetDescription></SheetHeader>
   {count===0?<div className="empty-state"><ShoppingBag className="mx-auto mb-4" size={32}/>Your bag is waiting for a little sparkle.<Button className="mt-6" onClick={()=>{setBagOpen(false);browse();}}>Explore fireworks <ArrowRight/></Button></div>:<>{products.filter(p=>(cart[p.id]??0)>0).map(p=><div className="cart-row" key={p.id}><img src={p.image} alt={p.name} width={65} height={75}/><div className="flex-1"><h3>{p.name}</h3><span className="text-xs">{money(p.price)}</span><div className="cart-quantity"><Button variant="outline" size="icon" aria-label={`Remove one ${p.name}`} onClick={()=>add(p.id,-1)}><Minus size={12}/></Button><span className="text-xs">{cart[p.id]}</span><Button variant="outline" size="icon" aria-label={`Add one ${p.name}`} onClick={()=>add(p.id)}><Plus size={12}/></Button></div></div></div>)}<div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal(cart))}</strong></div><p className="cart-disclaimer">This is a preview shopping bag. Online checkout and delivery are not available here yet.</p><Button className="w-full mt-5" onClick={()=>{setBagOpen(false);browse();}}>Continue exploring <ArrowRight/></Button></>}
  </SheetContent></Sheet>
 </>;
}
