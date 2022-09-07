let bases = [],
    character = ''
    targetAmiibo = [],
    randomInt = 0,
    num = 0,
    btn = document.getElementById('btn'),
    item = document.getElementById('item'),
    amiiboName = document.getElementById('amiiboName'),
    guide = document.getElementById('guide'),
    guideImg = document.getElementById('guide-img'),
    amiiboInfo = document.getElementById('amiiboInfo'),
    colseInfo = document.getElementById('colseInfo'),
    re = document.getElementById('re'),
    bacTop = document.getElementById('bacTop'),
    viewHeight = window.innerHeight || document.documentElement.clientHeight;

btn.addEventListener('click', clickShowData);
amiiboName.addEventListener('keydown',enterShowData);
item.addEventListener('click', handleClick);
colseInfo.addEventListener('click',handleCloseInfo)
re.addEventListener('click',reFunction)
bacTop.addEventListener('click',topFunction)

amiiboName.placeholder = `输入amiibo人物名字`

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (isMobile()) {
  // console.log("mobile");
  document.querySelectorAll('link')[2].href = './mobile_shadow.css'
} else {
  // console.log("pc");
}

function isMobile() {
  let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return flag;
}

async function getBases() {
  let Object = await fetch('https://amiiboapi.com/api/amiibo/');
  if(Object.status >= 200 && Object.status < 300){
    amiibos = await Object.json();
    bases = await amiibos.amiibo;
    randomInt = await getRandomInt(0,(bases.length - 1));
    character =  await bases[randomInt].character;
    selectAmiibo(character.toLowerCase());
  }else{
    alert(`
    ${a.status}---${a.statusText}
    数据请求失败`
    );
 }
}

getBases();


function selectAmiibo(word){
  targetAmiibo = bases.filter((amiibo, index) => { 
    return amiibo.character.toLowerCase().includes(word)
   })
  showData(targetAmiibo);
  lazyload();
}

/***********************/
// images lazyload function
// let num = 0;
function lazyload() {
  const imgs = item.querySelectorAll('img')
  const itemLi = item.querySelectorAll('li')
  for (let i = num; i < imgs.length; i++) {
    let distance = viewHeight - itemLi[i].getBoundingClientRect().top;
    if (distance >= 0) {
      imgs[i].src = imgs[i].getAttribute("data-src");
      // 防止重复赋值减少DOM操作
      num = i + 1;
    }
  }
}
/* debounce function */
function debounce(fn, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
}
window.addEventListener("scroll", debounce(lazyload, 600), false);
/********************/


function showData(targetAmiibo) {
  num = 0;
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
  for(i=0; i < targetAmiibo.length; i++) {
    lili = document.createElement('li');
    img = document.createElement('img');
    img.setAttribute("data-src",`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${targetAmiibo[i].image.slice(65)}`);
    // img.src = targetAmiibo[i].image;
    lili.appendChild(img);
    item.appendChild(lili);
  }
}

function clickShowData() {
 if(amiiboName.value.trim()){
  //  getData();
   selectAmiibo(amiiboName.value.toLowerCase())
 } else {
   alert('输入不能为空！');
 }
}

function enterShowData(e){
  if(e.key === 'Enter'){
    clickShowData();
  }
}

function handleClick(e) {
  if (e.target.src){
  guideImg.src = e.target.src
  guide.style.display = 'block'
  showInfo(selectIterm(e))
  }
}

function selectIterm(e){
  for(i=0; i < targetAmiibo.length; i++){
    if(`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${targetAmiibo[i].image.slice(65)}` == e.target.src){
      return i
    }
  }
}

function showInfo(i){
  let {amiiboSeries, character, gameSeries, name, release, type} = targetAmiibo[i]
  let amiiboRelease = Object.keys(release)
  let amiiboReleaseStr = ''
  for(let i=0; i<amiiboRelease.length; i++){
    amiiboReleaseStr = amiiboReleaseStr + '<li>' + amiiboRelease[i] + ':' +  release[amiiboRelease[i]] + '</li>'
  }

  // console.log(amiiboReleaseStr);
  
  amiiboInfo.innerHTML = `
  <h1>${name}</h1>
  <ul>
    <li><span>Amiibo系列:</span> ${amiiboSeries}</li>
    <li><span>角色名称:</span> ${character}</li>
    <li><span>游戏系列:</span> ${gameSeries}</li>
    <li><span>发行类型:</span> ${type}</li>
    <p>
    <li><span>发行时间:</span></li>
      <ul class='release'>
      ${amiiboReleaseStr}
      </ul>
    </p>
  </ul>
  `
}

//close info window
function handleCloseInfo() {
  guide.style.display = 'none'
}

// back to top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//Refresh
function reFunction() {
  randomInt = getRandomInt(0,(bases.length - 1));
  character = bases[randomInt].character;
  selectAmiibo(character.toLowerCase());
}




/*   function debounce(fn, delay = 500) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, args);
      }, delay);
    };
  }
  // 监听Scroll事件，为了防止频繁调用，使用防抖函数优化一下
  window.addEventListener("scroll", debounce(lazyload, 600), false); */