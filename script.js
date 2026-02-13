function showSlide(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* Slide 1 */
function goToSlide2(){
  document.getElementById("bgMusic").play();
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
      wrapper.remove();
      btn.classList.remove("hidden");
    }
  },18);
}

/* Slide 3 */
function goToSlide3(){
  showSlide("slide3");
  startCountdown();
}

function startCountdown(){
  const startDate=new Date("2025-05-22T00:00:00");
  const counter=document.getElementById("countdown");
  const button=document.getElementById("worldBtn");

  function update(){
    const now=new Date();
    const diff=now-startDate;
    const d=Math.floor(diff/(1000*60*60*24));
    const h=Math.floor((diff/(1000*60*60))%24);
    const m=Math.floor((diff/(1000*60))%60);
    const s=Math.floor((diff/1000)%60);
    counter.innerHTML=`${d} Days ❤️ ${h} Hours ❤️ ${m} Minutes ❤️ ${s} Seconds`;
  }

  update();
  setInterval(update,1000);

  setTimeout(()=>{
    button.classList.remove("hidden");
  },1500);
}

function goToSlide4(){showSlide("slide4");}
function goToSlide5(){showSlide("slide5");}

/* Flowers */
const messages=[
  "You are my peace ❤️",
  "You are my warmth ❤️",
  "You are my forever ❤️"
];

function showFlowerMessage(i){
  document.getElementById("flowerMessage").innerText=messages[i];
}

/* Slider */
const handle=document.getElementById("sliderHandle");
const fill=document.getElementById("sliderFill");
const slider=document.querySelector(".slider");

let dragging=false;

handle.addEventListener("mousedown",()=>dragging=true);
document.addEventListener("mouseup",()=>dragging=false);

document.addEventListener("mousemove",(e)=>{
  if(!dragging) return;

  const rect=slider.getBoundingClientRect();
  let x=e.clientX-rect.left;
  if(x<0)x=0;
  if(x>rect.width-60)x=rect.width-60;

  handle.style.left=x+"px";
  fill.style.width=(x+60)+"px";

  if(x>=rect.width-60){
    handle.innerText="🔓";
    setTimeout(()=>{
      showSlide("slide6");
      startHerGallery();
    },500);
  }
});

/* Her Gallery */
function startHerGallery(){

  const gallery = document.getElementById("herGallery");

  // CLEAR FIRST (stops duplication)
  gallery.innerHTML = "";

  const imgs = ["her1.jpg","her2.jpg","her5.jpg","her3.jpg","her4.jpg"];
  let i = 0;

  function next(){

    if(i >= imgs.length){

      document.getElementById("proposalText").classList.remove("hidden");
      document.getElementById("proposalButtons").classList.remove("hidden");

      activateNo();
      return;
    }

    const img = document.createElement("img");
    img.src = "images/" + imgs[i];
    img.className = "her-photo";

    gallery.appendChild(img);

    setTimeout(()=>{
      img.classList.add("show-photo");
      if(i === 2) img.classList.add("center-landscape");
      i++;
      setTimeout(next, 900);
    }, 300);
  }

  next();
}
/* No Button */
function activateNo(){

  const no = document.getElementById("noBtn");

  document.addEventListener("mousemove",(e)=>{

    const rect = no.getBoundingClientRect();

    const dx = e.clientX - (rect.left + rect.width/2);
    const dy = e.clientY - (rect.top + rect.height/2);
    const dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 130){

      const maxX = window.innerWidth - rect.width - 20;
      const maxY = window.innerHeight - rect.height - 20;

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      no.style.position = "fixed";
      no.style.left = newX + "px";
      no.style.top = newY + "px";
    }

  });
}
/* Yes */
function acceptLove(){
  showSlide("slide7");
  startOurGallery();
}

/* Our Gallery */
function startOurGallery(){
  const gallery=document.getElementById("ourGallery");

  const left=createImg("us1.jpg");
  const center=createImg("us3.jpg","our-center");
  const right=createImg("us2.jpg");

  gallery.append(left,center,right);

  setTimeout(()=>{
    left.classList.add("show-photo");
    center.classList.add("show-photo");
    right.classList.add("show-photo");
  },300);

  revealRandomLove();
}

function createImg(src,extra){
  const img=document.createElement("img");
  img.src="images/"+src;
  img.className="our-photo";
  if(extra) img.classList.add(extra);
  return img;
}

/* Floating text */
function revealRandomLove(){

  const lines = [
    "You are my safe place.",
    "You are my calm.",
    "You are my happiness.",
    "You are my forever.",
    "You are everything I prayed for."
  ];

  const slide = document.getElementById("slide7");

  const leftZone = {
    minX: 0,
    maxX: window.innerWidth * 0.25
  };

  const rightZone = {
    minX: window.innerWidth * 0.75,
    maxX: window.innerWidth
  };

  lines.forEach((text,i)=>{

    setTimeout(()=>{

      const el = document.createElement("div");
      el.className = "random-line";
      el.innerText = text;

      const useLeft = i % 2 === 0;

      const zone = useLeft ? leftZone : rightZone;

      const x = Math.random() * (zone.maxX - zone.minX) + zone.minX;
      const y = Math.random() * (window.innerHeight - 250) + 50;

      el.style.left = x + "px";
      el.style.top = y + "px";

      slide.appendChild(el);

      setTimeout(()=>{
        el.style.opacity = "1";
      },100);

    }, i * 900);

  });

  setTimeout(()=>{

    const love = document.createElement("div");
    love.className = "love-glow";
    love.innerText = "I LOVE YOU SO MUCH MY LOVE ❤️";

    document.getElementById("finalLove").innerHTML = "";
    document.getElementById("finalLove").appendChild(love);

    setTimeout(()=>{
      love.style.opacity = "1";
    },200);

  }, 5000);
}
