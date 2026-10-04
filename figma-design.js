// Build "Travel for love" landing page design (idempotent — removes previous frame first)
const INK = {r:0.027,g:0.035,b:0.043};
const INK2 = {r:0.047,g:0.063,b:0.075};
const CREAM = {r:0.957,g:0.937,b:0.894};
const GOLD = {r:0.910,g:0.639,b:0.239};
const CARD = {r:0.063,g:0.082,b:0.102};
const DIM = {r:0.62,g:0.60,b:0.55};
const TEAL = {r:0.25,g:0.47,b:0.55};

const R = (c, a=1) => ({r:c.r, g:c.g, b:c.b, a});
const solid = (c, op=1) => ({type:'SOLID', color:{r:c.r,g:c.g,b:c.b}, opacity:op});
const gs = (pos, c, a=1) => ({position:pos, color:R(c,a)});
const GT = [[1,0,0],[0,1,0]];
const lin = (stops, gt=GT) => ({type:'GRADIENT_LINEAR', gradientTransform:gt, gradientStops:stops});
const rad = (stops) => ({type:'GRADIENT_RADIAL', gradientTransform:GT, gradientStops:stops});

const page = figma.currentPage;
const old = page.findOne(n => n.name === 'Landing page — desktop');
if (old) old.remove();

// fonts
let scriptFont = {family:'Inter', style:'Italic'};
try { await figma.loadFontAsync({family:'Alex Brush', style:'Regular'}); scriptFont = {family:'Alex Brush', style:'Regular'}; }
catch(e){ await figma.loadFontAsync({family:'Inter', style:'Italic'}); }
await figma.loadFontAsync({family:'Inter', style:'Regular'});
await figma.loadFontAsync({family:'Inter', style:'Semi Bold'});
await figma.loadFontAsync({family:'Inter', style:'Bold'});
await figma.loadFontAsync({family:'Inter', style:'Extra Bold'});

function rect(parent, x, y, w, h, fills, name, radius=0){
  const n = figma.createRectangle();
  n.name = name; n.x = x; n.y = y; n.resize(w,h);
  n.fills = fills;
  if(radius) n.cornerRadius = radius;
  parent.appendChild(n); return n;
}
function txt(parent, str, x, y, w, font, size, color, name, ls=0, lh=null){
  const n = figma.createText();
  n.name = name; n.x = x; n.y = y; n.resize(w, 200);
  n.fontName = font; n.fontSize = size; n.fills = [solid(color)];
  if(ls) n.letterSpacing = {unit:'PERCENT', value:ls};
  if(lh) n.lineHeight = {unit:'PIXELS', value:lh};
  n.characters = str;
  parent.appendChild(n); return n;
}
function pill(parent, x, y, w, h, label, fillStyle, textColor, stroke=null){
  const b = rect(parent, x, y, w, h, fillStyle, 'btn', h/2);
  if(stroke){ b.strokes=[solid(stroke,0.3)]; b.strokeWeight=1; }
  const t = txt(parent, label, x, y+(h-18)/2, w, {family:'Inter',style:'Bold'}, 13, textColor, 'btn-label');
  t.textAlignHorizontal = 'CENTER';
  return b;
}

const root = figma.createFrame();
root.name = 'Landing page — desktop';
root.resize(1440, 3400);
root.fills = [solid(INK)];
page.appendChild(root);
let y = 0;

// ---- NAV ----
rect(root, 0, y, 1440, 76, [solid(INK)], 'nav-bg');
const logoC = figma.createEllipse(); logoC.name='logo'; logoC.x=56; logoC.y=17; logoC.resize(42,42);
logoC.fills = [rad([gs(0,GOLD), gs(1,INK2)])];
root.appendChild(logoC);
const lt = txt(root,'TL',56,26,42,{family:'Inter',style:'Extra Bold'},16,INK,'logo-t'); lt.textAlignHorizontal='CENTER';
txt(root,'Travel for love',112,24,220,{family:'Inter',style:'Bold'},17,CREAM,'brand');
txt(root,'FEATURED',1050,30,120,{family:'Inter',style:'Semi Bold'},12,DIM,'nl1');
txt(root,'TRIPS',1160,30,80,{family:'Inter',style:'Semi Bold'},12,DIM,'nl2');
txt(root,'MANIFESTO',1240,30,120,{family:'Inter',style:'Semi Bold'},12,DIM,'nl3');
const fb = rect(root, 1300, 20, 96, 36, [solid(CREAM,0.06)], 'follow-btn', 18);
fb.strokes=[solid(CREAM,0.25)]; fb.strokeWeight=1;
const ft = txt(root,'Follow',1300,30,96,{family:'Inter',style:'Bold'},12,CREAM,'follow-t'); ft.textAlignHorizontal='CENTER';
y = 76;

// ---- HERO ----
const hero = figma.createFrame(); hero.name='hero'; hero.x=0; hero.y=y; hero.resize(1440,900);
hero.fills=[solid(INK)]; root.appendChild(hero);
rect(hero, 0,0,1440,900,[lin([gs(0,{r:0.05,g:0.10,b:0.12}),gs(0.55,{r:0.04,g:0.07,b:0.09}),gs(1,INK)])],'hero-bg');
const glow1 = figma.createEllipse(); glow1.name='glow-a'; glow1.x=-140; glow1.y=-160; glow1.resize(620,620);
glow1.fills=[rad([gs(0,GOLD,0.35), gs(1,GOLD,0)])];
hero.appendChild(glow1);
const glow2 = figma.createEllipse(); glow2.name='glow-b'; glow2.x=1050; glow2.y=560; glow2.resize(520,520);
glow2.fills=[rad([gs(0,TEAL,0.4), gs(1,TEAL,0)])];
hero.appendChild(glow2);
const kick = txt(hero,'SWASTHIK \u2014 ON TWO WHEELS',0,300,1440,{family:'Inter',style:'Bold'},13,GOLD,'kicker',34); kick.textAlignHorizontal='CENTER';
const title = txt(hero,'Travel for love.',0,330,1440,scriptFont,150,CREAM,'hero-title'); title.textAlignHorizontal='CENTER';
const hsub = txt(hero,'If you Love Travel, Follow me \u2014 bike journeys through the high ranges,\ncloud seas and coastlines of South India.',0,540,1440,{family:'Inter',style:'Regular'},18,{r:0.75,g:0.73,b:0.68},'hero-sub',0,30); hsub.textAlignHorizontal='CENTER';
pill(hero, 600, 640, 180, 52, 'EXPLORE TRIPS', [solid(GOLD)], INK);
pill(hero, 795, 640, 150, 52, 'INSTAGRAM', [solid(CREAM,0.05)], CREAM, CREAM);
const sh = txt(hero,'scroll',0,830,1440,{family:'Inter',style:'Semi Bold'},11,DIM,'scroll-hint',30); sh.textAlignHorizontal='CENTER';
y += 900;

// ---- MARQUEE ----
rect(root, 0, y, 1440, 84, [solid(INK2)], 'marquee-bg');
const mq = txt(root,'Munnar   \u2726   Kolukkumalai   \u2726   Dhanushkodi   \u2726   Dolphin\u2019s Nose   \u2726   Mallalli Falls   \u2726   Maidadi   \u2726   Neelakurinji',0,y+24,1440,scriptFont,34,DIM,'marquee');
mq.textAlignHorizontal='CENTER';
y += 84;

// ---- FEATURED ----
txt(root,'EDITOR\u2019S PICK',90,y+70,400,{family:'Inter',style:'Bold'},12,GOLD,'eyebrow',32);
txt(root,'The Munnar hills',90,y+96,800,{family:'Inter',style:'Extra Bold'},56,CREAM,'h2');
const fc = rect(root, 90, y+190, 1260, 440, [solid(CARD)], 'feature-card', 28);
fc.strokes=[solid(CREAM,0.1)]; fc.strokeWeight=1;
const fm = rect(root, 90, y+190, 660, 440, [lin([gs(0,{r:0.10,g:0.20,b:0.24}),gs(0.6,{r:0.06,g:0.12,b:0.15}),gs(1,{r:0.16,g:0.13,b:0.07})],[[0.7,0.3,0],[-0.4,1,0]])], 'feature-media', 28);
fm.topLeftRadius=28; fm.bottomLeftRadius=28; fm.topRightRadius=0; fm.bottomRightRadius=0;
txt(root,'IDUKKI \u00B7 KERALA',790,y+250,440,{family:'Inter',style:'Bold'},12,GOLD,'f-loc',26);
txt(root,'Where every ride begins',790,y+276,440,scriptFont,52,CREAM,'f-title');
txt(root,'Tea gardens folding into mist, waterfalls appearing\naround every bend, and roads that feel drawn just for\ntwo wheels.',790,y+360,440,{family:'Inter',style:'Regular'},16,{r:0.72,g:0.70,b:0.65},'f-text',0,28);
pill(root, 790, y+500, 190, 52, 'READ THE STORY', [solid(GOLD)], INK);
y += 700;

// ---- TRIPS ----
txt(root,'THE JOURNEYS',90,y+60,400,{family:'Inter',style:'Bold'},12,GOLD,'eyebrow2',32);
txt(root,'Trips on the road',90,y+86,800,{family:'Inter',style:'Extra Bold'},56,CREAM,'h2-2');
const trips=[['Kolukkumalai Peak','Idukki \u00B7 Kerala'],['Neelakurinji Bloom','Munnar \u00B7 Kerala'],['Maidadi View Point','Kalasa \u00B7 Karnataka'],['Dhanushkodi','Rameswaram \u00B7 Tamil Nadu'],['Dolphin\u2019s Nose','Kodaikanal \u00B7 Tamil Nadu'],['Mallalli Falls','Coorg \u00B7 Karnataka']];
const grads=[
  [{r:0.14,g:0.10,b:0.05},{r:0.05,g:0.09,b:0.10}],
  [{r:0.16,g:0.08,b:0.16},{r:0.05,g:0.05,b:0.10}],
  [{r:0.05,g:0.12,b:0.14},{r:0.10,g:0.08,b:0.04}],
  [{r:0.12,g:0.14,b:0.10},{r:0.04,g:0.06,b:0.10}],
  [{r:0.10,g:0.06,b:0.14},{r:0.05,g:0.08,b:0.08}],
  [{r:0.06,g:0.12,b:0.10},{r:0.12,g:0.08,b:0.05}]];
trips.forEach((t,i)=>{
  const col=i%3, row=Math.floor(i/3);
  const cx=90+col*430, cy=y+190+row*380;
  const card=rect(root,cx,cy,400,340,[solid(CARD)],'trip-card',22);
  card.strokes=[solid(CREAM,0.1)]; card.strokeWeight=1;
  const tm = rect(root,cx,cy,400,220,[lin([gs(0,grads[i][0]),gs(1,grads[i][1])],[[1,0.2,0],[0,1,0]])],'trip-media',22);
  tm.bottomLeftRadius=0; tm.bottomRightRadius=0;
  txt(root,t[1],cx+24,cy+244,352,{family:'Inter',style:'Bold'},11,GOLD,'t-loc',24);
  txt(root,t[0],cx+24,cy+264,352,{family:'Inter',style:'Bold'},21,CREAM,'t-title');
});
y += 190+2*380+40;

// ---- QUOTE ----
rect(root,0,y,1440,340,[rad([gs(0,GOLD,0.10), gs(0.7,GOLD,0)])],'quote-bg');
const q1 = txt(root,'Think less,',0,y+80,1440,{family:'Inter',style:'Extra Bold'},72,CREAM,'q1'); q1.textAlignHorizontal='CENTER';
const q2 = txt(root,'feel more.',0,y+160,1440,scriptFont,84,GOLD,'q2'); q2.textAlignHorizontal='CENTER';
const qsub = txt(root,'The road doesn\u2019t ask for plans \u2014 only that you show up.',0,y+270,1440,{family:'Inter',style:'Regular'},17,{r:0.70,g:0.68,b:0.63},'q-sub'); qsub.textAlignHorizontal='CENTER';
y += 340;

// ---- STATS ----
rect(root,0,y,1440,220,[solid(INK2)],'stats-bg');
[['07','JOURNEYS'],['03','STATES RIDDEN'],['01','LOVE FOR THE ROAD']].forEach((s,i)=>{
  const sx=360+i*360;
  const sn = txt(root,s[0],sx-150,y+50,300,{family:'Inter',style:'Extra Bold'},72,GOLD,'stat-n'); sn.textAlignHorizontal='CENTER';
  const sl = txt(root,s[1],sx-150,y+140,300,{family:'Inter',style:'Bold'},12,DIM,'stat-l',26); sl.textAlignHorizontal='CENTER';
});
y += 220;

// ---- FOOTER ----
const flogo=figma.createEllipse(); flogo.name='f-logo'; flogo.x=678; flogo.y=y+70; flogo.resize(84,84);
flogo.fills=[rad([gs(0,GOLD), gs(1,INK2)])];
root.appendChild(flogo);
const ftag = txt(root,'If you Love Travel Follow me',0,y+180,1440,{family:'Inter',style:'Extra Bold'},40,CREAM,'f-tag'); ftag.textAlignHorizontal='CENTER';
pill(root, 570, y+250, 300, 52, 'INSTAGRAM \u2014 @_IN_FINITE_KILLER_', [solid(GOLD)], INK);
const fm2 = txt(root,'Swasthiknaik1234@gmail.com',0,y+322,1440,{family:'Inter',style:'Semi Bold'},15,{r:0.70,g:0.68,b:0.63},'f-mail'); fm2.textAlignHorizontal='CENTER';
const fcp = txt(root,'\u00A9 2026 Swasthik \u00B7 Travel for love.',0,y+370,1440,{family:'Inter',style:'Regular'},13,{r:0.45,g:0.44,b:0.41},'f-copy'); fcp.textAlignHorizontal='CENTER';
root.resize(1440, y+430);

return {frameId: root.id, height: y+430, children: root.children.length};
