function showSlide(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* Slide 1 */
function goToSlide2(){
  const music=document.getElementById("bgMusic");
  music.play();
  music.loop=true;
  showSlide("slide2");
  startLoading();
}

/* Loading */
function startLoading(){
  let p=0;
  const bar=document.getElementById("progressBar");
  const wrapper=document.getElementById("loadingWrapper");
  const btn=document.getElementById("enterBtn");

  const i=setInterval(()=>{
    p++;
    bar.style.width=p+"%";
    if(p>=100){
      clearInterval(i);
      wrapper.innerHTML="";
      btn.classList.remove("hidden");
    }
  },20);
}

/* Countdown */
function goToSlide3(){
  showSlide("slide3");
  startCountdown();
}
function startCountdown(){
  const startDate=new Date("2025-05-22T00:00:00");
  const counter=document.getElementById("countdown");
  const btn=document.getElementById("enterWorldBtn");

  setInterval(()=>{
    const now=new Date();
    const diff=now-startDate;
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff/3600000)%24);
    const m=Math.floor((diff/60000)%60);
    const s=Math.floor((diff/1000)%60);
    counter.innerHTML=`${d} Days ❤️ ${h} Hours ❤️ ${m} Minutes ❤️ ${s} Seconds`;
    counter.style.opacity=1;
    btn.classList.remove("hidden");
  },1000);
}

/* Flower */
const messages=[
  "You are my peace ❤️",
  "You are my warmth ❤️",
  "You are my forever ❤️"
];
function showFlowerMessage(i){
  document.getElementById("flowerMessage").innerText=messages[i];
}
function goToSlide4(){showSlide("slide4");}
function goToSlide5(){showSlide("slide5");}

/* Slider */
const handle=document.getElementById("sliderHandle");
const fill=document.getElementById("sliderFill");
let dragging=false;

handle.onmousedown=()=>dragging=true;
document.onmouseup=()=>dragging=false;
document.onmousemove=(e)=>{
  if(!dragging)return;
  const slider=document.querySelector(".slider");
  const rect=slider.getBoundingClientRect();
  let x=e.clientX-rect.left;
  if(x<0)x=0;
  if(x>rect.width-90)x=rect.width-90;
  handle.style.left=x+"px";
  fill.style.width=(x+90)+"px";
  if(x>=rect.width-90){
    setTimeout(()=>{
      showSlide("slide6");
      startHerGallery();
    },500);
  }
};

/* Her Gallery */
function startHerGallery(){

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
    gallery.appendChild(img);

    setTimeout(()=>img.classList.add("show"),200);

    i++;
    setTimeout(next,1400);
  }

  next();
}

/* NO Button */
function activateNo(){
  const no=document.getElementById("noBtn");
  no.style.position="fixed";
  no.style.zIndex="9999";

  document.addEventListener("mousemove",(e)=>{
    const rect=no.getBoundingClientRect();
    const dist=Math.hypot(e.clientX-rect.left,e.clientY-rect.top);
    if(dist<120){
      no.style.left=Math.random()*(window.innerWidth-120)+"px";
      no.style.top=Math.random()*(window.innerHeight-80)+"px";
    }
  });
}

/* YES */
function acceptLove(){
  showSlide("slide7");
  startOurGallery();
}

/* Our Gallery */
function startOurGallery(){
  const gallery=document.getElementById("ourGallery");
  gallery.innerHTML="";
  const imgs=["us1.jpg","us3.jpg","us2.jpg"];

  imgs.forEach((name,index)=>{
    setTimeout(()=>{
      const img=document.createElement("img");
      img.src="images/"+name;
      if(index===1)img.classList.add("our-center");
      gallery.appendChild(img);
      setTimeout(()=>img.classList.add("show"),200);
    },index*1500);
  });

  setTimeout(revealRandomLove,5000);
}

/* Floating Text */
function revealRandomLove(){
  const lines=[
    "You are my happiness.",
    "You are everything I prayed for.",
    "You are my safe place.",
    "You are my calm.",
    "You are my forever.",
    "You are my destiny."
  ];

  const textLayer=document.getElementById("textLayer");
  textLayer.innerHTML="";

  lines.forEach((text,i)=>{
    setTimeout(()=>{
      const el=document.createElement("div");
      el.className="random-line";
      el.innerText=text;

      if(i<3){
        el.style.left="50px";
        el.style.top=100+(i*120)+"px";
      }else{
        el.style.right="50px";
        el.style.top=100+((i-3)*120)+"px";
      }

      textLayer.appendChild(el);
      setTimeout(()=>el.classList.add("show"),200);
    },i*1000);
  });

  setTimeout(fadeLove,8000);
}

function fadeLove(){
  const container=document.getElementById("finalLove");
  const love=document.createElement("div");
  love.className="love-glow";
  love.innerText="I LOVE YOU SO MUCH MY LOVE ❤️";
  container.appendChild(love);
  setTimeout(()=>love.style.opacity=1,300);
}

