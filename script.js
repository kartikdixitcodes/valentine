function showSlide(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* SLIDE 1 */
function startExperience(){
  document.getElementById("bgMusic").play();
  showSlide("slide2");
  startLoading();
}

/* LOADING */
function startLoading(){
  let p=0;
  const bar=document.getElementById("progressBar");
  const enter=document.getElementById("enterBtn");

  const i=setInterval(()=>{
    p++;
    bar.style.width=p+"%";
    if(p>=100){
      clearInterval(i);
      document.getElementById("loadingWrapper").style.display="none";
      enter.classList.remove("hidden");
    }
  },20);
}

/* COUNTDOWN */
function goToSlide3(){
  showSlide("slide3");
  startCountdown();
}

function startCountdown(){
  const startDate=new Date("2025-05-22T00:00:00");
  const counter=document.getElementById("countdown");
  const btn=document.getElementById("worldBtn");

  setInterval(()=>{
    const now=new Date();
    const diff=now-startDate;

    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff/3600000)%24);
    const m=Math.floor((diff/60000)%60);
    const s=Math.floor((diff/1000)%60);

    counter.innerHTML=`${d} Days ❤️ ${h} Hours ❤️ ${m} Minutes ❤️ ${s} Seconds`;
  },1000);

  setTimeout(()=>btn.classList.remove("hidden"),2000);
}

function goToSlide4(){showSlide("slide4");}
function goToSlide5(){showSlide("slide5");}

/* FLOWERS */
const messages=[
"You are my peace ❤️",
"You are my warmth ❤️",
"You are my forever ❤️"
];

function showFlower(i){
  document.getElementById("flowerMessage").innerText=messages[i];
}

/* SLIDER */
const handle=document.getElementById("sliderHandle");
const fill=document.getElementById("sliderFill");
let dragging=false,unlocked=false;

handle.onmousedown=()=>dragging=true;
document.onmouseup=()=>dragging=false;

document.onmousemove=(e)=>{
 if(!dragging||unlocked)return;
 const slider=document.querySelector(".slider");
 const rect=slider.getBoundingClientRect();
 let x=e.clientX-rect.left;
 if(x<0)x=0;
 if(x>rect.width-90)x=rect.width-90;
 handle.style.left=x+"px";
 fill.style.width=(x+90)+"px";

 if(x>=rect.width-90){
  unlocked=true;
  handle.innerText="🔓";
  setTimeout(()=>{
   showSlide("slide6");
   startHerGallery();
  },600);
 }
};

/* HER GALLERY */
let herStarted=false;

function startHerGallery(){
 if(herStarted)return;
 herStarted=true;

 const gallery=document.getElementById("herGallery");
 gallery.innerHTML="";

 const imgs=["her1.jpg","her2.jpg","her5.jpg","her3.jpg","her4.jpg"];
 let i=0;

 function next(){
  if(i>=imgs.length){
   document.getElementById("proposalText").classList.remove("hidden");
   document.getElementById("proposalButtons").classList.remove("hidden");
   activateNo();
   return;
  }

  const img=document.createElement("img");
  img.src="images/"+imgs[i];
  img.className="her-photo";
  gallery.appendChild(img);

  setTimeout(()=>{
   img.classList.add("show-photo");
   if(i===2)img.classList.add("center-landscape");
   i++;
   setTimeout(next,900);
  },300);
 }

 next();
}

/* NO BUTTON */
function activateNo(){
 const no=document.getElementById("noBtn");

 document.addEventListener("mousemove",(e)=>{
  const rect=no.getBoundingClientRect();
  const dx=e.clientX-(rect.left+rect.width/2);
  const dy=e.clientY-(rect.top+rect.height/2);
  const dist=Math.sqrt(dx*dx+dy*dy);

  if(dist<130){
   const maxX=window.innerWidth-rect.width-20;
   const maxY=window.innerHeight-rect.height-20;
   no.style.left=Math.random()*maxX+"px";
   no.style.top=Math.random()*maxY+"px";
  }
 });
}

/* ACCEPT LOVE */
function acceptLove(){
 showSlide("slide7");
 startOurGallery();
}

/* OUR GALLERY */
function createImg(src,extra=""){
 const img=document.createElement("img");
 img.src="images/"+src;
 img.className="our-photo "+extra;
 return img;
}

function startOurGallery(){
 const gallery=document.getElementById("ourGallery");
 gallery.innerHTML="";

 const left=createImg("us1.jpg");
 const center=createImg("us3.jpg","our-center");
 const right=createImg("us2.jpg");

 gallery.append(left,center,right);

 setTimeout(()=>left.classList.add("show-photo"),300);
 setTimeout(()=>center.classList.add("show-photo"),900);
 setTimeout(()=>right.classList.add("show-photo"),1500);

 setTimeout(()=>revealRandomLove(),2200);
}

/* RANDOM TEXT */
function revealRandomLove(){

  const lines = [
    "You are my safe place.",
    "You are my calm.",
    "You are my happiness.",
    "You are my forever.",
    "You are everything I prayed for."
  ];

  const textLayer = document.getElementById("textLayer");
  textLayer.innerHTML = "";

  const gallery = document.getElementById("ourGallery");
  const galleryRect = gallery.getBoundingClientRect();

  lines.forEach((text,i)=>{

    setTimeout(()=>{

      const el = document.createElement("div");
      el.className = "random-line";
      el.innerText = text;

      const wrapperWidth = window.innerWidth;
      const wrapperHeight = window.innerHeight;

      let x,y;

      const leftZone = galleryRect.left - 50;
      const rightZone = galleryRect.right + 50;

      if(i % 2 === 0){
        x = Math.random() * (leftZone - 20);
      } else {
        x = rightZone + Math.random() * (wrapperWidth - rightZone - 40);
      }

      y = Math.random() * (wrapperHeight - 250) + 80;

      el.style.left = x + "px";
      el.style.top = y + "px";

      textLayer.appendChild(el);

      setTimeout(()=>{
        el.classList.add("show");
      },100);

    }, i * 900);

  });

  setTimeout(()=>fadeLove(), 6000);
}

function fadeLove(){

  const container = document.getElementById("finalLove");
  container.innerHTML = "";

  const love = document.createElement("div");
  love.className = "love-glow";
  love.innerText = "I LOVE YOU SO MUCH MY LOVE ❤️";

  container.appendChild(love);

  setTimeout(()=>{
    love.style.opacity = "1";
  },200);
}
