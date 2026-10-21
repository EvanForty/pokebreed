// Deterministic additions to the existing illustrative ecosystem, never live coins.
function createExpandedFamilies(seed, savedNodes=[]){
 const added=[],occupied=new Set([...seed,...savedNodes].map(n=>n.id)),tickers=new Set([...seed,...savedNodes].map(n=>n.ticker));
 const allocations=new Map();
 [...seed,...savedNodes].forEach(n=>{if(n.parent)allocations.set(n.parent,(allocations.get(n.parent)||0)+n.inheritance);});
 function add(parent,name,ticker,type,x,y,r,agent=false){
  const id='meadow-'+name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  if(occupied.has(id))return null;
  const inheritance=Math.max(0,Math.min(parent.gen===0?1:3,100-(allocations.get(parent.id)||0)));
  allocations.set(parent.id,(allocations.get(parent.id)||0)+inheritance);
  const index=added.length,gen=parent.gen+1;
  const base=ticker.slice(0,8);let suffix=index;
  while(tickers.has(ticker))ticker=base.slice(0,4)+(suffix++).toString(36).toUpperCase().padStart(3,'0');
  const n={id,name,ticker,type,x,y,r,gen,parent:parent.id,agent,inheritance,
   mcap:Math.round(parent.mcap*(gen===1?.045:.035+index%4*.008)),
   treasury:Math.round(parent.treasury*(gen===1?.035:.07+index%3*.015)),
   cards:gen===1?3:gen===2?1:0,progress:15+(index*13)%79,volume:Math.round(parent.volume*.035),created:100+index};
  occupied.add(id);tickers.add(ticker);added.push(n);return n;
 }
 function grow(parent,i){
  const ancestor=[...seed,...added].find(n=>n.id===parent.parent);
  const heading=Math.atan2(parent.y-ancestor.y,parent.x-ancestor.x);
  for(let j=0;j<2;j++){
   const angle=heading+(j===0?-.64:.64),distance=38+(i%3)*5;
   const n=add(parent,parent.name+' '+(j===0?'Bloom':'Sprout'),parent.ticker.slice(0,6)+(j===0?'B':'S'),parent.type,parent.x+Math.cos(angle)*distance,parent.y+Math.sin(angle)*distance,7+i%3);
   if(n&&j===0){const leafAngle=angle+.2;add(n,parent.name+' Bud',parent.ticker.slice(0,6)+'D',parent.type,n.x+Math.cos(leafAngle)*25,n.y+Math.sin(leafAngle)*25,5);}
  }
 }
 // The original families keep their positions and gain deeper branches.
 seed.filter(n=>n.gen===2).forEach(grow);
 const outerFamilies=[
  ['Typhlosion','TYPH','Fire',['Cyndaquil','Quilava','Magmar','Magby']],
  ['Ampharos','AMPH','Electric',['Mareep','Flaaffy','Dedenne','Togedemaru']],
  ['Alakazam','ALAKA','Psychic',['Kadabra','Drowzee','Hypno','Munna']],
  ['Salamence','SALAM','Dragon',['Bagon','Shelgon','Gible','Gabite']],
  ['Milotic','MILO','Water',['Feebas','Corsola','Horsea','Seadra']],
  ['Luxray','LUX','Electric',['Shinx','Luxio','Tynamo','Eelektrik']],
  ['Meganium','MEGA','Grass',['Chikorita','Bayleef','Hoppip','Skiploom']],
  ['Tyranitar','TYRAN','Dark',[['Larvitar','Rock'],['Pupitar','Rock'],'Murkrow','Houndour']],
  ['Gardevoir','GARDE','Psychic',['Ralts','Kirlia','Gothita','Gothorita']],
  ['Feraligatr','FERAL','Water',['Totodile','Croconaw','Marill','Azumarill']],
  ['Arcanine','ARC','Fire',['Ponyta','Rapidash','Slugma','Torkoal']],
  ['Sceptile','SCEPT','Grass',['Treecko','Grovyle','Seedot','Nuzleaf']]
 ];
 const genesis=seed.find(n=>n.id==='breed');
 outerFamilies.forEach(([name,ticker,type,children],i)=>{
  const angle=-Math.PI/2+i*Math.PI/6+Math.sin(i*2)*.035,spread=1+(i%3-1)*.035;
  const root=add(genesis,name,ticker,type,560+Math.cos(angle)*735*spread,365+Math.sin(angle)*530*spread,30+(i%3)*3,true);
  if(!root)return;
  children.forEach((entry,j)=>{
   const [childName,childType]=Array.isArray(entry)?entry:[entry,type];
   const branchAngle=angle+j*Math.PI/2+.35,distance=93+(j%2)*10;
   const child=add(root,childName,childName.slice(0,6).toUpperCase(),childType,root.x+Math.cos(branchAngle)*distance,root.y+Math.sin(branchAngle)*distance,13+j%3);
   if(child)grow(child,i+j);
  });
 });
 // A second, much larger ring preserves the existing map at its center.
 const frontierFamilies=[
  ['Infernape','INFER','Fire',['Chimchar','Monferno','Panear','Simisear']],
  ['Empoleon','EMPO','Water',['Piplup','Prinplup','Mantyke','Mantine']],
  ['Torterra','TORT','Grass',['Turtwig','Grotle','Bonsly','Tropius']],
  ['Delphox','DELPH','Fire',['Fennekin','Braixen','Ninetales','Salandit']],
  ['Greninja','GREN','Water',['Froakie','Frogadier','Poliwag','Poliwhirl']],
  ['Serperior','SERP','Grass',['Snivy','Servine','Petilil','Lilligant']],
  ['Emboar','EMBO','Fire',['Tepig','Pignite','Darumaka','Darmanitan']],
  ['Samurott','SAMU','Water',['Oshawott','Dewott','Buizel','Floatzel']],
  ['Decidueye','DECI','Grass',['Rowlet','Dartrix','Bounsweet','Steenee']],
  ['Incineroar','INCIN','Fire',['Litten','Torracat','Houndoom','Heatmor']],
  ['Primarina','PRIMA','Water',['Popplio','Brionne','Clamperl','Huntail']],
  ['Rillaboom','RILLA','Grass',['Grookey','Thwackey','Gossifleur','Eldegoss']],
  ['Cinderace','CINDE','Fire',['Scorbunny','Raboot','Sizzlipede','Centiskorch']],
  ['Inteleon','INTE','Water',['Sobble','Drizzile','Chewtle','Drednaw']],
  ['Meowscarada','MEOWS','Grass',['Sprigatito','Floragato','Smoliv','Dolliv']],
  ['Skeledirge','SKELE','Fire',['Fuecoco','Crocalor','Charcadet','Ceruledge']],
  ['Quaquaval','QUAQU','Water',['Quaxly','Quaxwell','Finizen','Palafin']],
  ['Goodra','GOOD','Dragon',['Goomy','Sliggoo','Drampa','Turtonator']],
  ['Hydreigon','HYDRA','Dark',['Deino','Zweilous','Zorua','Zoroark']],
  ['Volcarona','VOLCA','Fire',['Larvesta','Fletchinder','Talonflame','Pyroar']],
  ['Flygon','FLY','Dragon',['Trapinch','Vibrava','Swablu','Altaria']],
  ['Haxorus','HAX','Dragon',['Axew','Fraxure','Jangmo-o','Hakamo-o']],
  ['Chandelure','CHAN','Ghost',['Litwick','Lampent','Shuppet','Banette']],
  ['Reuniclus','REUNI','Psychic',['Solosis','Duosion','Elgyem','Beheeyem']]
 ];
 frontierFamilies.forEach(([name,ticker,type,children],i)=>{
  const angle=-Math.PI/2+(i+.5)*Math.PI/12,spread=1+Math.sin(i*2.4)*.025;
  const root=add(genesis,name,ticker,type,560+Math.cos(angle)*1400*spread,365+Math.sin(angle)*1010*spread,34+i%3*3,true);
  if(!root)return;
  [...children,name+' Dawn',name+' Dusk'].forEach((childName,j)=>{
   const branchAngle=angle+j*Math.PI/3+.25,distance=99+j%2*10;
   const child=add(root,childName,childName.replace(/[^a-z]/gi,'').slice(0,6).toUpperCase(),type,root.x+Math.cos(branchAngle)*distance,root.y+Math.sin(branchAngle)*distance,12+j%3);
   if(child)grow(child,i+j);
  });
 });
 // Two tiny fifth-generation seedlings at the tip of every established branch.
 added.filter(n=>n.gen===4).forEach((parent,i)=>{
  const ancestor=added.find(n=>n.id===parent.parent),heading=Math.atan2(parent.y-ancestor.y,parent.x-ancestor.x);
  for(let j=0;j<2;j++){
   const angle=heading+(j===0?-.7:.7),distance=23+i%3*3;
   add(parent,parent.name+' '+(j===0?'Sun':'Moon'),parent.ticker.slice(0,7)+(j===0?'1':'2'),parent.type,parent.x+Math.cos(angle)*distance,parent.y+Math.sin(angle)*distance,4);
  }
 });
 return added;
}
function expandedMapLandscape(){
 const grass=Array.from({length:280},(_,i)=>{
  const angle=i*2.39996323,radius=520+Math.sqrt(i)*63,x=560+Math.cos(angle)*radius,y=365+Math.sin(angle)*radius*.73;
  return `<path d="M${x} ${y}v-5m4 5v-8m4 8v-4" fill="none" stroke="#a9bf87" stroke-width="2" opacity=".3"/>`;
 }).join('');
 return `<ellipse cx="560" cy="365" rx="1400" ry="1010" fill="none" stroke="#b6c89b" stroke-dasharray="4 20" opacity=".5"/><ellipse cx="560" cy="365" rx="735" ry="530" fill="none" stroke="#b6c89b" stroke-dasharray="3 15" opacity=".5"/>${grass}<g class="outer-region"><text x="560" y="-385" text-anchor="middle" class="map-region">THE JOHTO GARDENS</text><text x="1480" y="365" class="map-region">DRAGON RIDGE</text><text x="560" y="1120" text-anchor="middle" class="map-region">THE BLOSSOM FIELDS</text><text x="-470" y="365" class="map-region">THE BREEDING GROVE</text><text x="560" y="-880" text-anchor="middle" class="map-region">THE SUNRISE FRONTIER</text><text x="560" y="1620" text-anchor="middle" class="map-region">THE MOONLIT NURSERY</text></g>`;
}
