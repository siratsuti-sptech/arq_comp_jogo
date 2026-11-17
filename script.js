// ===== DADOS (rascunhos de pistas: reescreva com suas palavras e confira no e-book) =====
const T = {
 CPU:{s:"CPU",n:"Unidade Central de Processamento",p:"Cérebro do computador: executa as instruções dos programas.",e:"Busca, interpreta e executa instruções. Contém ULA, UC e registradores."},
 ULA:{s:"ULA",n:"Unidade Lógica e Aritmética",p:"Parte da CPU que faz as contas e as operações lógicas.",e:"Realiza somas, subtrações, comparações e operações lógicas (AND, OR, NOT).",l:"Faz as contas e as operações lógicas"},
 UC:{s:"UC",n:"Unidade de Controle",p:"Dentro da CPU, comanda e coordena o que cada parte deve fazer.",e:"Interpreta as instruções e envia os sinais de controle aos demais componentes.",l:"Coordena e comanda as demais partes"},
 REGISTRADORES:{s:"Registradores",n:"Registradores",p:"Minúsculas áreas dentro da CPU, as mais rápidas de todas.",e:"Guardam dados e endereços usados naquele instante pela CPU.",l:"Guarda dados da CPU, o mais rápido de todos"},
 RAM:{s:"RAM",n:"Memória de Acesso Aleatório",p:"Memória de trabalho rápida: perde tudo quando a energia acaba.",e:"Memória volátil onde ficam programas e dados em uso.",l:"Memória de trabalho, volátil"},
 ROM:{s:"ROM",n:"Memória Somente de Leitura",p:"Memória permanente que guarda o programa de inicialização do equipamento.",e:"Não volátil; guarda o firmware e dados fixos de fábrica.",l:"Guarda o programa de inicialização"},
 EEPROM:{s:"EEPROM",n:"ROM Programável e Apagável Eletricamente",p:"Memória não volátil que pode ser apagada por eletricidade, byte a byte.",e:"Permite regravar dados sem remover o chip da placa."},
 FLASH:{s:"Flash",n:"Memória Flash",p:"Memória não volátil apagada em blocos, comum em pendrives e SSDs.",e:"Evolução da EEPROM: mais rápida e densa, apaga por blocos."},
 CACHE:{s:"Cache",n:"Memória Cache",p:"Pequena e veloz, fica entre a CPU e a RAM guardando o que é usado muito.",e:"Reduz o tempo de espera da CPU por dados da memória principal.",l:"Guarda dados mais usados, entre CPU e RAM"},
 MEMORIADEMASSA:{s:"Memória de massa",n:"Armazenamento",p:"Guarda arquivos e programas por muito tempo, como HD ou SSD.",e:"Grande capacidade e não volátil, porém mais lenta que a RAM.",l:"Guarda arquivos por muito tempo (HD/SSD)"},
 DMA:{s:"DMA",n:"Acesso Direto à Memória",p:"Deixa periféricos trocarem dados com a memória sem ocupar o processador.",e:"Controlador que transfere dados direto, liberando a CPU.",l:"Transfere dados sem ocupar a CPU"},
 ADDRESSBUS:{s:"Address bus",n:"Barramento de Endereços",p:"Caminho que leva da CPU o local da memória a ser acessado.",e:"Transporta o endereço; sua largura define quanta memória se endereça.",l:"Leva o local (endereço) a ser acessado"},
 DATABUS:{s:"Data bus",n:"Barramento de Dados",p:"Caminho por onde os valores trafegam entre CPU, memória e periféricos.",e:"Transporta os dados em ambos os sentidos.",l:"Transporta os valores entre as partes"},
 MICROCONTROLADOR:{s:"Microcontrolador",n:"Microcontrolador",p:"Chip único com processador, memória e periféricos, comum em sistemas embarcados.",e:"Um computador completo em um só chip (ex.: Arduino)."},
 DUALCORE:{s:"Dual core",n:"Processador de dois núcleos",p:"Processador com dois núcleos de processamento no mesmo chip.",e:"Executa duas tarefas em paralelo."},
 QUADCORE:{s:"Quad core",n:"Processador de quatro núcleos",p:"Processador com quatro núcleos para executar tarefas em paralelo.",e:"Quatro núcleos no mesmo chip."}
};
// [palavra, linha, coluna, direção] — grade 14 x 19
const L=[["MICROCONTROLADOR",3,3,"H"],["ROM",2,17,"V"],["CACHE",2,15,"V"],["REGISTRADORES",0,4,"V"],["RAM",6,4,"H"],["ULA",7,2,"H"],["FLASH",12,1,"H"],["DMA",5,6,"V"],["UC",2,8,"V"],["EEPROM",9,0,"H"],["DUALCORE",6,8,"H"],["DATABUS",6,8,"V"],["MEMORIADEMASSA",0,0,"H"],["QUADCORE",11,7,"H"],["CPU",11,11,"V"],["ADDRESSBUS",9,8,"H"]];
const SLOTS={slotsCpu:["ULA","UC","REGISTRADORES"],slotsMem:["CACHE","RAM","ROM","MEMORIADEMASSA","DMA"],slotsBus:["ADDRESSBUS","DATABUS"]};

const $=s=>document.querySelector(s);
const feitos={montagem:new Set(),cruz:new Set()};
const descobertas=new Set();

// ===== utilidades =====
function progresso(){
  const t=SLOTS.slotsCpu.length+SLOTS.slotsMem.length+SLOTS.slotsBus.length;
  const f=(feitos.montagem.size/t+feitos.cruz.size/16)/2;
  document.documentElement.style.setProperty("--sol",f);
  $("#sol").style.setProperty("--sol",f);
  $("#progresso").textContent=`Montagem: ${feitos.montagem.size} de ${t} · Cruzadinha: ${feitos.cruz.size} de 16 · O sol já subiu ${Math.round(f*100)}%`;
}
function carta(k){
  const d=T[k];
  $("#card").innerHTML=`<h2>${d.s}</h2><p><b>${d.n}</b></p><p>${d.e}</p><button onclick="$('#modal').hidden=true">Entendi</button>`;
  $("#modal").hidden=false;
  if(!descobertas.has(k)){descobertas.add(k);
    $("#cartas").insertAdjacentHTML("beforeend",`<div class="mini"><b>${d.s}</b><br><i>${d.n}</i><br>${d.e}</div>`);}
}
$("#modal").onclick=e=>{if(e.target.id==="modal")e.target.hidden=true};
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("ativo",x===b));
  document.querySelectorAll(".tela").forEach(t=>t.classList.toggle("ativa",t.id===b.dataset.tela));
});

// ===== MONTAGEM =====
let sel=null;
function colocar(slot,k){
  if(slot.classList.contains("ok")||!k)return;
  if(slot.dataset.k===k){
    slot.classList.add("ok");slot.innerHTML=`<b>${T[k].s}</b>${T[k].n}`;
    document.querySelector(`.peca[data-k="${k}"]`).remove();
    feitos.montagem.add(k);$("#msg").textContent="";sel=null;progresso();carta(k);
  }else{
    slot.classList.add("tremer");setTimeout(()=>slot.classList.remove("tremer"),300);
    $("#msg").textContent="Ainda não é essa peça. Releia a descrição do encaixe e tente de novo.";
  }
}
function montar(){
  const pecas=Object.values(SLOTS).flat().sort(()=>Math.random()-.5);
  pecas.forEach(k=>{
    const b=document.createElement("button");
    b.className="peca";b.textContent=T[k].s;b.dataset.k=k;b.draggable=true;
    b.onclick=()=>{sel=k;document.querySelectorAll(".peca").forEach(x=>x.classList.toggle("sel",x===b))};
    b.ondragstart=e=>e.dataTransfer.setData("text",k);
    $("#bandeja").append(b);
  });
  for(const [id,ks] of Object.entries(SLOTS))ks.forEach(k=>{
    const s=document.createElement("div");
    s.className="slot";s.dataset.k=k;s.textContent=T[k].l;
    s.onclick=()=>colocar(s,sel);
    s.ondragover=e=>{e.preventDefault();s.classList.add("over")};
    s.ondragleave=()=>s.classList.remove("over");
    s.ondrop=e=>{e.preventDefault();s.classList.remove("over");colocar(s,e.dataTransfer.getData("text"))};
    $("#"+id).append(s);
  });
}

// ===== CRUZADINHA =====
const H=14,W=19,cel={};let ativa=null;
const ws=L.map(([w,r,c,d],i)=>({w,r,c,d,i}));
function numerar(){
  const ini=[];ws.forEach(x=>{if(!ini.some(p=>p[0]===x.r&&p[1]===x.c))ini.push([x.r,x.c])});
  ini.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  ws.forEach(x=>x.n=ini.findIndex(p=>p[0]===x.r&&p[1]===x.c)+1);
}
const pos=(x,j)=>[x.r+(x.d==="V"?j:0),x.c+(x.d==="H"?j:0)];
function cruzadinha(){
  numerar();
  const g=$("#grade");g.style.gridTemplateColumns=`repeat(${W},auto)`;
  for(let r=0;r<H;r++)for(let c=0;c<W;c++){const d=document.createElement("div");d.className="c v";cel[r+","+c]=d;g.append(d)}
  ws.forEach(x=>[...x.w].forEach((ch,j)=>{
    const d=cel[pos(x,j).join()];
    if(d.classList.contains("v")){
      d.classList.remove("v");d.dataset.r=ch;
      d.innerHTML='<input maxlength="1" autocomplete="off" inputmode="text">';
      const inp=d.firstChild;
      inp.onfocus=()=>{if(!ativa||!ativa.cells.includes(d))ativa=ws.find(y=>y.w&&cel[pos(y,0).join()]&&y.cells&&y.cells.includes(d))};
      inp.oninput=()=>{inp.value=inp.value.replace(/[^a-z]/gi,"").toUpperCase();if(inp.value)mover(d,1)};
      inp.onkeydown=e=>{
        if(e.key==="Backspace"&&!inp.value)mover(d,-1);
        const set={ArrowRight:[0,1],ArrowLeft:[0,-1],ArrowDown:[1,0],ArrowUp:[-1,0]}[e.key];
        if(set){const [r,c]=d.key.split(",").map(Number);const n=cel[(r+set[0])+","+(c+set[1])];if(n&&n.firstChild&&n.firstChild.tagName==="INPUT")n.firstChild.focus()}
      };
    }
    d.key=pos(x,j).join();
    (x.cells=x.cells||[]).push(d);
    if(j===0){const i=document.createElement("i");i.textContent=x.n;d.append(i)}
  }));
  ws.forEach(x=>{
    const li=document.createElement("li");li.id="p"+x.i;li.textContent=`${x.n}. ${T[x.w].p}`;
    li.onclick=()=>{ativa=x;x.cells[0].firstChild.focus()};
    $(x.d==="H"?"#pH":"#pV").append(li);x.li=li;
  });
  ws.sort((a,b)=>a.n-b.n);
  ["#pH","#pV"].forEach(s=>[...$(s).children].sort((a,b)=>parseInt(a.textContent)-parseInt(b.textContent)).forEach(n=>$(s).append(n)));
}
function mover(d,dir){
  const x=ativa;if(!x)return;
  const j=x.cells.indexOf(d)+dir;
  if(j>=0&&j<x.cells.length)x.cells[j].firstChild.focus();
}
function conferir(){
  document.querySelectorAll(".c").forEach(c=>c.classList.remove("ok","bad"));
  feitos.cruz.clear();
  ws.forEach(x=>{
    const cheio=x.cells.every(c=>c.firstChild.value);
    const certo=x.cells.every(c=>c.firstChild.value===c.dataset.r);
    x.li.className=certo?"ok":cheio?"bad":"";
    if(certo){feitos.cruz.add(x.w);x.cells.forEach(c=>c.classList.add("ok"));
      if(!descobertas.has(x.w)){descobertas.add(x.w);const d=T[x.w];
        $("#cartas").insertAdjacentHTML("beforeend",`<div class="mini"><b>${d.s}</b><br><i>${d.n}</i><br>${d.e}</div>`)}}
    else if(cheio)x.cells.forEach(c=>{if(!c.classList.contains("ok"))c.classList.add("bad")});
  });
  document.querySelectorAll(".c.ok").forEach(c=>c.classList.remove("bad"));
  $("#contador").textContent=`${feitos.cruz.size} de 16 palavras`;progresso();
}
function reiniciar(){
  document.querySelectorAll(".c input").forEach(i=>i.value="");
  document.querySelectorAll(".c").forEach(c=>c.classList.remove("ok","bad"));
  ws.forEach(x=>x.li.className="");feitos.cruz.clear();
  $("#contador").textContent="0 de 16 palavras";progresso();
}
$("#conferir").onclick=conferir;$("#reiniciar").onclick=reiniciar;
montar();cruzadinha();progresso();
