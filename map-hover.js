const coinHoverState={owner:null,timer:null,dismissed:null};

function hideCoinHover(dismiss=false){
 clearTimeout(coinHoverState.timer);
 if(dismiss&&coinHoverState.owner)coinHoverState.dismissed=coinHoverState.owner.dataset.node;
 coinHoverState.owner?.removeAttribute('aria-describedby');
 coinHoverState.owner?.classList.remove('hover-preview');
 coinHoverState.owner=null;
 const card=document.getElementById('coin-hover');if(card)card.hidden=true;
}
function positionCoinHover(){
 const card=document.getElementById('coin-hover'),owner=coinHoverState.owner;
 if(!card||card.hidden||!owner?.isConnected)return;
 const panel=card.parentElement,frame=panel.getBoundingClientRect();
 const node=(owner.querySelector('.ball')||owner).getBoundingClientRect();
 const left=Math.max(frame.left+10,10),right=Math.min(frame.right-10,innerWidth-10);
 const top=Math.max(frame.top+48,10),bottom=Math.min(frame.bottom-36,innerHeight-10);
 if(right-left<120||bottom-top<120||node.bottom<top||node.top>bottom||node.right<left||node.left>right){hideCoinHover();return;}
 card.style.maxHeight=Math.min(390,bottom-top)+'px';
 const w=card.offsetWidth,h=card.offsetHeight;
 let x=node.right+14;if(x+w>right)x=node.left-w-14;
 x=Math.max(left,Math.min(x,right-w));
 const y=Math.max(top,Math.min(node.top-12,bottom-h));
 card.style.left=(x-frame.left-panel.clientLeft)+'px';
 card.style.top=(y-frame.top-panel.clientTop)+'px';
}
function showCoinHover(owner){
 const card=document.getElementById('coin-hover');
 if(!card||!owner||owner.dataset.node===coinHoverState.dismissed||document.getElementById('ecosystem-map')?.classList.contains('dragging'))return;
 clearTimeout(coinHoverState.timer);
 if(coinHoverState.owner===owner){positionCoinHover();return;}
 const n=getNode(owner.dataset.node);if(!n)return;
 hideCoinHover();coinHoverState.owner=owner;
 const parent=getNode(n.parent);
 card.innerHTML=`<div class="coin-hover-header"><div class="coin-hover-avatar">${avatar(n)}</div><div><span class="coin-hover-kicker">COIN DETAILS · GEN ${n.gen}</span><h3>${esc(n.name)}</h3><p>$${esc(n.ticker)} <span>· ${esc(n.type)}</span></p></div></div><dl class="coin-hover-stats"><div><dt>Market cap</dt><dd>${compact(n.mcap)}</dd></div><div><dt>Card vault</dt><dd>${compact(n.treasury)}</dd></div><div><dt>24h volume</dt><dd>${compact(n.volume)}</dd></div><div><dt>Cards collected</dt><dd>${n.cards}</dd></div><div><dt>Offspring</dt><dd>${childrenOf(n.id).length}</dd></div><div><dt>Inherited exposure</dt><dd>${n.inheritance}%</dd></div></dl><div class="coin-hover-parent"><span>Parent</span><strong>${parent?'$'+esc(parent.ticker):'Genesis egg'}</strong></div><div class="coin-hover-evolution"><span>Evolution progress</span><b>${n.progress}%</b><div class="progress"><span style="width:${n.progress}%"></span></div></div><div class="coin-hover-foot">Click for full details</div>`;
 card.hidden=false;owner.setAttribute('aria-describedby','coin-hover');owner.classList.add('hover-preview');positionCoinHover();
}
function deferCoinHoverHide(){clearTimeout(coinHoverState.timer);coinHoverState.timer=setTimeout(()=>hideCoinHover(),160);}
function attachCoinHover(){
 const svg=document.getElementById('ecosystem-map'),card=document.getElementById('coin-hover');
 if(!svg||!card)return;
 svg.addEventListener('pointerover',e=>{
  if(e.pointerType==='touch'||e.buttons)return;
  const owner=e.target.closest('.map-node');
  if(owner&&owner!==e.relatedTarget?.closest?.('.map-node'))showCoinHover(owner);
 });
 svg.addEventListener('pointerout',e=>{
  const owner=e.target.closest('.map-node');
  if(owner&&owner!==e.relatedTarget?.closest?.('.map-node')){
   if(coinHoverState.dismissed===owner.dataset.node)coinHoverState.dismissed=null;
   deferCoinHoverHide();
  }
 });
 svg.addEventListener('pointerdown',()=>hideCoinHover());
 svg.addEventListener('pointerleave',deferCoinHoverHide);
 svg.addEventListener('focusin',e=>{const owner=e.target.closest('.map-node');if(owner?.matches(':focus-visible'))showCoinHover(owner);});
 svg.addEventListener('focusout',()=>{coinHoverState.dismissed=null;deferCoinHoverHide();});
 card.addEventListener('pointerenter',()=>clearTimeout(coinHoverState.timer));
 card.addEventListener('pointerleave',deferCoinHoverHide);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideCoinHover(true);});
document.addEventListener('fullscreenchange',()=>hideCoinHover());
window.addEventListener('resize',()=>hideCoinHover());
window.addEventListener('scroll',e=>{const card=document.getElementById('coin-hover');if(!(e.target instanceof Node&&card?.contains(e.target)))hideCoinHover();},{capture:true,passive:true});
