/* VoidFall creature identity pass: distinct silhouettes for every ordinary enemy. */
(function(){
  const ART_VERSION=1;
  const light={reservoir:'#c8fff1',foundry:'#ffe19a',observatory:'#e8fbff',archive:'#fff0c9',court:'#ffd4df',choir:'#eef0ff',citadel:'#ffb09b',heart:'#fff0b3'};
  const dark={reservoir:'#12313a',foundry:'#3a211d',observatory:'#17243d',archive:'#2b2725',court:'#38212e',choir:'#232744',citadel:'#261b24',heart:'#36251f'};
  const regionFor=e=>LATE_ENEMIES[e.type]?.region||'heart';
  function poly(ctx,points,fill,stroke='#0b0e16',line=2){ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineWidth=line;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill();ctx.stroke();}
  function rect(ctx,x,y,w,h,fill,stroke='#0b0e16',line=2){ctx.fillStyle=fill;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=line;ctx.strokeRect(Math.round(x)+.5,Math.round(y)+.5,Math.round(w)-1,Math.round(h)-1);}}
  function eye(ctx,x,y,size,col='#fff1b8'){ctx.fillStyle='#080b12';ctx.beginPath();ctx.arc(x,y,size+2,0,TAU);ctx.fill();ctx.fillStyle=col;ctx.fillRect(Math.round(x-size/2),Math.round(y-size/2),Math.max(2,Math.round(size)),Math.max(2,Math.round(size)));}
  function line(ctx,a,b,c,w=2){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
  function ring(ctx,x,y,r,c,w=2){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();}
  function legs(ctx,points,c,w=4){ctx.strokeStyle='#0a0e15';ctx.lineWidth=w+3;ctx.beginPath();points.forEach((p,i)=>i%2?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
  function drawDistinctLateBody(ctx,e){
    const t=save.motion?0:G.tAll,seed=e.seed||0,reg=regionFor(e),c=e.col,hi=light[reg],lo=dark[reg],r=e.r;
    const beat=Math.sin(t*3+seed),walk=Math.sin(t*(3.6+e.spd/70)+seed),wind=e.specialMode==='tell',active=!!e.specialMode&&e.specialMode!=='tell';
    const scale=(e.elite?1.12:1)*(1+beat*.018);
    ctx.save();ctx.translate(Math.round(e.x),Math.round(e.y));ctx.scale(scale,scale);ctx.lineJoin='miter';ctx.lineCap='butt';
    switch(e.type){
      case 'rippleLeech':
        ctx.rotate(e.face||0);for(let i=0;i<6;i++){const x=-r*1.25+i*r*.48,y=Math.sin(t*7-i*.75+seed)*3;poly(ctx,[[x-r*.28,y],[x,y-r*.42],[x+r*.34,y],[x,y+r*.42]],i%2?c:lo,'#081118',2);}poly(ctx,[[r*1.08,-5],[r*1.55,0],[r*1.08,5]],hi);eye(ctx,r*.88,-2,2,hi);break;
      case 'pumpCrawler':
        legs(ctx,[[-12,7],[-21,16],[-8,8],[-12,20],[12,7],[21,16],[8,8],[12,20]],c,3);rect(ctx,-14,-9,28,20,lo);rect(ctx,-8,-16,16,11,c);rect(ctx,-4,-13,8,5,hi,null);line(ctx,[14,-4],[20,-4],hi,4);line(ctx,[20,-4],[20,8],c,3);eye(ctx,-8,-2,2,hi);break;
      case 'lampEel':
        ctx.rotate(e.face||0);ctx.strokeStyle='#081018';ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(-24,walk*2);ctx.bezierCurveTo(-12,-9-walk*2,3,10+walk*2,18,0);ctx.stroke();ctx.strokeStyle=c;ctx.lineWidth=8;ctx.stroke();poly(ctx,[[-23,0],[-31,-8],[-28,1],[-31,9]],lo);poly(ctx,[[13,-7],[26,-5],[30,0],[25,7],[13,6]],lo);eye(ctx,22,-2,2,hi);ring(ctx,31,0,5+beat,hi,2);break;
      case 'sluiceGuard':
        legs(ctx,[[-12,13],[-17,24],[-5,14],[-7,25],[12,13],[17,24],[5,14],[7,25]],c,4);rect(ctx,-19,-18,38,34,lo);for(let x=-12;x<=12;x+=8)rect(ctx,x,-15,4,28,c,null);ring(ctx,0,0,10,hi,3);line(ctx,[-9,0],[9,0],hi,3);line(ctx,[0,-9],[0,9],hi,3);break;
      case 'coalMite':
        legs(ctx,[[-8,4],[-16,12],[-7,7],[-11,17],[8,4],[16,12],[7,7],[11,17]],c,3);poly(ctx,[[-11,-7],[-3,-13],[9,-9],[14,2],[7,11],[-7,10],[-14,1]],'#21191a');line(ctx,[-5,-7],[1,0],c,3);line(ctx,[1,0],[7,7],hi,2);eye(ctx,7,-3,2,hi);break;
      case 'slagRunner':
        ctx.rotate(e.face||0);legs(ctx,[[-8,5],[-17,15],[5,7],[-1,19],[8,4],[18,13],[12,6],[19,18]],c,4);poly(ctx,[[-18,0],[-9,-11],[10,-10],[19,-2],[13,9],[-5,11]],lo);poly(ctx,[[-7,-8],[6,-7],[12,-1],[5,4],[-4,2]],c);eye(ctx,12,-4,2,hi);ctx.fillStyle=c;ctx.fillRect(-20+walk*2,6,5,8);break;
      case 'cinderValve':
        ctx.rotate(t*.45+seed);ring(ctx,0,0,15,'#101018',9);ring(ctx,0,0,15,c,5);for(let i=0;i<8;i++){ctx.rotate(TAU/8);rect(ctx,12,-3,12,6,i%2?c:lo);}ring(ctx,0,0,6,hi,3);eye(ctx,0,0,2,hi);break;
      case 'hammerFrame':
        legs(ctx,[[-10,9],[-17,25],[9,9],[14,25]],c,6);rect(ctx,-12,-17,24,31,lo);rect(ctx,-30,-22,42,13,c);rect(ctx,-34,-18,9,23,lo);rect(ctx,10,-27,11,20,'#2a1b1b');rect(ctx,-5,-7,10,13,hi,null);break;
      case 'glassShard':
        ctx.rotate(e.face||0);poly(ctx,[[-20,0],[-6,-9],[22,0],[-5,9]],lo);poly(ctx,[[-5,-6],[15,0],[-5,3]],c,'#bff6ff',1.5);line(ctx,[-15,0],[9,0],hi,2);break;
      case 'lensMote':
        ctx.rotate(t*.25+seed);ring(ctx,0,0,15,lo,7);ring(ctx,0,0,15,c,3);ctx.save();ctx.rotate(-t*.7);ctx.strokeStyle=hi;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,22,8,0,0,TAU);ctx.stroke();ctx.restore();eye(ctx,0,0,5,hi);break;
      case 'orbitHound':
        ctx.rotate(e.face||0);legs(ctx,[[-9,5],[-16,18],[6,6],[1,20],[10,5],[20,16]],c,3);poly(ctx,[[-20,1],[-11,-9],[7,-11],[17,-5],[22,1],[12,8],[-8,9]],lo);poly(ctx,[[-8,-8],[2,-17],[8,-9]],c);eye(ctx,15,-3,2,hi);for(let i=0;i<2;i++){const a=t*(i?-.8:.8)+seed+i*3;rect(ctx,Math.cos(a)*22-2,Math.sin(a)*8-2,5,5,hi,null);}break;
      case 'mirrorShell':
        ctx.rotate(wind?beat*.08:0);poly(ctx,[[-21,1],[-15,-14],[0,-21],[15,-14],[21,1],[0,-3]],'#22303e');poly(ctx,[[-21,2],[-14,16],[0,21],[14,16],[21,2],[0,5]],lo);line(ctx,[-15,-10],[15,11],hi,2);line(ctx,[15,-10],[-15,11],c,2);eye(ctx,0,2,3,hi);break;
      case 'inkMite':
        legs(ctx,[[-7,2],[-18,-8],[-8,6],[-20,7],[-6,9],[-15,18],[7,2],[18,-8],[8,6],[20,7],[6,9],[15,18]],c,2);ctx.fillStyle=lo;ctx.beginPath();ctx.arc(0,0,11,0,TAU);ctx.fill();for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(Math.sin(seed+i)*10,Math.cos(seed*2+i)*8,4,0,TAU);ctx.fill();}eye(ctx,4,-2,2,hi);break;
      case 'pageWraith':
        ctx.globalAlpha=e.alpha??1;poly(ctx,[[-17,-18],[0,-14],[16,-18],[14,13],[7,8],[1,17],[-6,9],[-15,14]],'#d9cfb4');ctx.strokeStyle=lo;ctx.lineWidth=1.5;for(let y=-9;y<8;y+=6)line(ctx,[-9,y],[8,y+(y%2)],lo,1);poly(ctx,[[-17,-18],[-8,-12],[-15,-5]],c,null,0);eye(ctx,2,-7,2,hi);break;
      case 'quillSentinel':
        ctx.rotate(-.55+beat*.03);poly(ctx,[[0,-24],[7,-8],[4,17],[0,26],[-4,17],[-7,-8]],'#ded0aa');for(let y=-12;y<14;y+=7)line(ctx,[0,y],[y%2?8:-8,y-5],c,2);rect(ctx,-3,14,6,13,lo);eye(ctx,1,-8,2,hi);break;
      case 'indexer':
        legs(ctx,[[-11,15],[-15,25],[11,15],[15,25]],c,5);rect(ctx,-21,-23,42,40,lo);for(let y=-17;y<12;y+=10){rect(ctx,-15,y,30,8,y===3?c:'#50473e');rect(ctx,-2,y+2,5,2,hi,null);}rect(ctx,-24,-20,5,31,c);eye(ctx,0,-28,3,hi);break;
      case 'courtMask':
        ctx.translate(0,beat*2);poly(ctx,[[-13,-16],[0,-22],[13,-16],[16,0],[8,15],[0,21],[-8,15],[-16,0]],'#ded5d5');rect(ctx,-10,-5,7,4,lo,null);rect(ctx,3,-5,7,4,lo,null);line(ctx,[-6,8],[0,11],c,2);line(ctx,[0,11],[7,7],c,2);for(const s of [-1,1])ctx.fillStyle=c,ctx.fillRect(s*8-2,17,4,13+Math.round(walk*2));break;
      case 'ribbonDuelist':
        ctx.rotate(e.face||0);ctx.strokeStyle='#120e16';ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(-20,12);ctx.bezierCurveTo(-4,-24,17,-20,6,7);ctx.bezierCurveTo(1,20,21,18,25,-5);ctx.stroke();ctx.strokeStyle=c;ctx.lineWidth=6;ctx.stroke();poly(ctx,[[18,-12],[30,-5],[19,2]],hi);eye(ctx,3,-9,2,hi);break;
      case 'hushBell':
        ctx.translate(0,beat*2);poly(ctx,[[-17,9],[-13,-10],[-7,-20],[7,-20],[13,-10],[17,9]],lo);rect(ctx,-21,8,42,7,c);line(ctx,[0,-20],[0,-28],hi,3);ring(ctx,0,13,4,wind?hi:'#18121a',3);ctx.fillStyle=hi;ctx.fillRect(-6,-10,4,3);ctx.fillRect(2,-10,4,3);break;
      case 'mourningGuard':
        poly(ctx,[[-21,20],[-15,-14],[0,-26],[15,-14],[21,20]],lo);poly(ctx,[[-12,-14],[0,-22],[12,-14],[8,4],[-8,4]],'#29202a');rect(ctx,-7,-10,4,3,hi,null);rect(ctx,3,-10,4,3,hi,null);poly(ctx,[[-25,-4],[-10,-13],[-9,20],[-26,13]],c);for(let y=6;y<21;y+=6)line(ctx,[8,y],[18,y+3],c,2);break;
      case 'choirWisp':
        ctx.translate(0,beat*3);ctx.strokeStyle=c;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(4,-18);ctx.lineTo(4,9);ctx.quadraticCurveTo(-10,2,-13,13);ctx.stroke();ctx.fillStyle=lo;ctx.beginPath();ctx.ellipse(-9,12,10,7,-.35,0,TAU);ctx.fill();ctx.strokeStyle=hi;ctx.lineWidth=2;ctx.stroke();rect(ctx,4,-18,13,5,hi);eye(ctx,-8,10,2,hi);break;
      case 'pinion':
        ctx.rotate(e.face||0);for(const s of [-1,1])poly(ctx,[[-8,0],[-20,s*17],[3,s*9],[19,0]],s>0?lo:c);poly(ctx,[[-8,-5],[24,0],[-8,5]],hi);rect(ctx,-4,-3,8,6,lo);break;
      case 'cantor':
        poly(ctx,[[-17,20],[-13,-11],[-7,-23],[7,-23],[13,-11],[17,20]],lo);for(let x=-9;x<=9;x+=6)rect(ctx,x,-29-(Math.abs(x)%3),4,15,c);ctx.fillStyle='#090a12';ctx.beginPath();ctx.ellipse(0,2,9,6,0,0,TAU);ctx.fill();for(let x=-5;x<=5;x+=5)rect(ctx,x,-1,2,6,hi,null);break;
      case 'bellAngel':
        for(const s of [-1,1]){poly(ctx,[[0,-9],[s*18,-23],[s*31,-14],[s*20,-2],[s*33,11],[s*13,14]],s>0?c:lo);line(ctx,[s*9,-9],[s*25,-14],hi,2);}poly(ctx,[[-12,-8],[0,-20],[12,-8],[15,13],[0,22],[-15,13]],lo);ring(ctx,0,-28,12,hi,2);rect(ctx,-10,7,20,6,c);eye(ctx,0,-4,3,hi);break;
      case 'obsidianPawn':
        ctx.translate(0,Math.abs(walk)*2);ctx.fillStyle=lo;ctx.beginPath();ctx.arc(0,-14,9,0,TAU);ctx.fill();ctx.strokeStyle='#0a0b10';ctx.lineWidth=3;ctx.stroke();poly(ctx,[[-9,-7],[-15,10],[-22,17],[22,17],[15,10],[9,-7]],lo);rect(ctx,-19,9,38,6,c);rect(ctx,-24,16,48,8,'#17131b');eye(ctx,0,-15,2,hi);break;
      case 'chainHound':
        ctx.rotate(e.face||0);for(let i=0;i<6;i++){const x=-19+i*7,y=Math.sin(i*1.2+t*5+seed)*3;ctx.strokeStyle='#090a10';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,y,6,3,i%2?Math.PI/2:0,0,TAU);ctx.stroke();ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();}poly(ctx,[[15,-8],[25,-4],[28,3],[17,9],[9,2]],lo);eye(ctx,21,-2,2,hi);legs(ctx,[[-7,5],[-13,16],[11,5],[16,17]],c,3);break;
      case 'siegeEye':
        legs(ctx,[[-11,9],[-19,19],[11,9],[19,19]],c,4);poly(ctx,[[-18,-12],[11,-12],[19,0],[11,12],[-18,12],[-23,0]],lo);ctx.rotate(e.face||0);rect(ctx,1,-5,29,10,c);poly(ctx,[[26,-8],[36,0],[26,8]],lo);eye(ctx,-7,0,5,hi);break;
      case 'barrierKnight':
        legs(ctx,[[-8,17],[-10,27],[8,17],[10,27]],c,6);poly(ctx,[[-23,-22],[16,-18],[22,19],[0,27],[-22,18]],lo);poly(ctx,[[-17,-15],[10,-13],[15,13],[0,20],[-16,12]],c);line(ctx,[0,-13],[0,19],hi,2);line(ctx,[-14,2],[13,2],hi,2);eye(ctx,3,-8,2,hi);break;
      case 'memoryAsh':
        ctx.translate(0,beat*2);for(let i=0;i<5;i++){const a=t*(i%2?-.5:.65)+seed+i*TAU/5,rr=17+i%2*4;poly(ctx,[[Math.cos(a)*rr-3,Math.sin(a)*rr-2],[Math.cos(a)*rr+4,Math.sin(a)*rr],[Math.cos(a)*rr-1,Math.sin(a)*rr+5]],i%2?c:hi,null,0);}ctx.globalAlpha=.78;poly(ctx,[[-8,-14],[5,-18],[13,-5],[9,12],[0,19],[-11,10],[-14,-3]],lo);eye(ctx,3,-4,3,hi);break;
      case 'starRemnant':
        ctx.rotate(t*.28+seed);for(let i=0;i<7;i++){ctx.rotate(TAU/7);poly(ctx,[[5,-3],[25,0],[7,6]],i%2?c:lo);}ring(ctx,0,0,11,'#0a0b11',6);ring(ctx,0,0,10,hi,2);for(let i=0;i<3;i++){ctx.rotate(TAU/3);rect(ctx,7,-2,6,4,'#0a0b11',null);}break;
      case 'keeperHand':
        ctx.rotate((e.face||0)-Math.PI/2);poly(ctx,[[-11,16],[-13,1],[-19,-13],[-13,-16],[-6,-3],[-8,-24],[-2,-26],[2,-5],[4,-27],[10,-25],[9,-3],[14,-21],[20,-18],[14,2],[12,17]],lo);for(let x=-7;x<=7;x+=7)line(ctx,[x,2],[x,14],c,2);eye(ctx,0,5,4,hi);break;
      case 'oathbound':
        legs(ctx,[[-9,16],[-16,27],[9,16],[16,27]],c,6);poly(ctx,[[-21,17],[-17,-18],[0,-29],[17,-18],[21,17]],lo);poly(ctx,[[-11,-17],[0,-24],[11,-17],[8,-3],[-8,-3]],'#20191b');ring(ctx,0,6,9,hi,2);line(ctx,[-7,0],[7,12],c,3);line(ctx,[7,0],[-7,12],c,3);for(const s of [-1,1]){ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(s*17,-1,7,4,s*.6,0,TAU);ctx.stroke();}break;
      default: poly(ctx,[[-r,0],[0,-r],[r,0],[0,r]],c);eye(ctx,0,0,3,hi);
    }
    if(wind){ctx.strokeStyle=hi;ctx.globalAlpha=.42+.25*Math.sin(t*15);ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r+7,e.specialA-(e.face||0)-.55,e.specialA-(e.face||0)+.55);ctx.stroke();}
    if(active&&['shell','barrier','aura','oath'].includes(e.specialMode)){ctx.strokeStyle=hi;ctx.globalAlpha=.22;ctx.lineWidth=2;ctx.strokeRect(-r-5,-r-5,r*2+10,r*2+10);}
    ctx.restore();
  }

  function bakeHollowCreatures(){
    SPR.gateHound=pxGen(27,17,4,(i,j,f)=>{const x=i-13,y=j,step=f%2;if(y>13&&((i===7+step)||(i===18-step)))return '#6c7896';if(y>=5&&y<=12&&x>-10&&x<8&&Math.abs(y-8)<5-Math.abs(x+1)*.18)return x>3?'#a8759c':'#37445d';if(x>=7&&x<=12&&y>=3&&y<=10)return y<5?'#d7b6d5':'#6c4e78';if(x===10&&y===6)return '#fff0c0';if(x<-8&&y>=6&&y<=8)return '#667793';return null;},{fps:7,sc:2.1});
    SPR.gateSentry=pxGen(19,23,4,(i,j,f)=>{const x=Math.abs(i-9),bob=f===1||f===2?1:0,y=j-bob;if(y<3||y>20)return null;if(y<8&&x<7-y*.35)return x<2&&y>4?'#e6d99a':'#75848b';if(y>=7&&y<16&&x<8-(y-7)*.2)return x===7?'#253140':(y%5===0?'#a6b0a3':'#536574');if(y>=16&&x<5)return x<2?'#282f40':'#657681';if((y===20||y===21)&&x<8)return '#27313e';return null;},{fps:5,sc:2});
    SPR.gateLantern=pxGen(21,25,6,(i,j,f)=>{const x=Math.abs(i-10),sway=Math.round(Math.sin(f/6*TAU));if(j<4&&x<2)return '#91aa99';if(j>=4&&j<=18&&x<9){if(x>6||j===4||j===18)return '#30414d';if((x===3||x===4)&&j>6&&j<17)return '#667880';const flame=Math.abs(i-10-sway)<Math.max(1,4-Math.abs(j-13));if(flame)return j<11?'#eff5b6':'#74e3b2';}if(j>18&&j<24&&((i+sway)%6===1||i%7===3))return '#708b91';return null;},{fps:7,sc:2});
    SPR.gateShield=pxGen(27,25,4,(i,j,f)=>{const x=i-13,y=j,step=f%2;if(y>20&&((Math.abs(x+7-step)<3)||(Math.abs(x-7+step)<3)))return '#4f6070';if(y>=6&&y<=20&&Math.abs(x)<11-(y-6)*.12){if(Math.abs(x)>8)return '#202b3a';if(y%5===0)return '#94a49e';return '#4b6070';}if(y>=2&&y<9&&Math.abs(x)<6)return y<4?'#a89263':'#334556';if(i===13&&y===6)return '#f8e0a2';if(x<-9&&y>=7&&y<=19)return '#9b8659';return null;},{fps:5,sc:2.15});
  }
  const creatureBakeHollowSprites=bakeHollowSprites;
  bakeHollowSprites=function(){creatureBakeHollowSprites();bakeHollowCreatures();document.documentElement.dataset.hollowCreatures=['gateHound','gateSentry','gateLantern','gateShield'].every(k=>SPR[k]?.frames?.length>=4)?'ready':'missing';};
  drawLateBody=drawDistinctLateBody;
  globalThis.VoidFallCreaturePass={version:ART_VERSION,lateTypes:Object.keys(LATE_ENEMIES),hollowTypes:['gateHound','gateSentry','gateLantern','gateShield']};
  document.documentElement.dataset.creaturePass='distinct-v1';
})();
