let bases = [],
    character = ''
    targetAmiibo = [],
    randomInt = 0,
    btn = document.getElementById('btn'),
    item = document.getElementById('item'),
    amiiboName = document.getElementById('amiiboName');
    guide = document.getElementById('guide');
    guideImg = document.getElementById('guide-img');
    amiiboInfo = document.getElementById('amiiboInfo');
    colseInfo = document.getElementById('colseInfo');
    re = document.getElementById('re');
    bacTop = document.getElementById('bacTop');

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
  console.log("mobile");
  document.querySelectorAll('link')[2].href = './mobile_shadow.css'
/*   (function () {
    //获取弹框
    var modalBg = document.querySelector('#modalBg');
    var closeBtn = document.querySelector('#closeBtn');

    //全局阻止默认行为
    document.addEventListener('touchstart', function(event){
        event.preventDefault();
    }, {passive: false});

    //按钮触摸事件 touchend
    closeBtn.addEventListener('touchend', function(event){
        modalBg.remove();
    });

    //单独给a元素添加 touchend事件
    var linkNodes = document.querySelectorAll('.links a');
    linkNodes.forEach(function(linkNode){
        linkNode.addEventListener('touchend', function(){
           location.href =  this.href;
        });
    })
})(); */

} else {
  console.log("pc");
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
    // console.log(bases);
    // console.log(randomInt);
    // console.log(character);
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
  //  console.log(word);
  //  console.log(targetAmiibo);

  // console.log(targetAmiibo);
  showData2(targetAmiibo);
}


function showData2(targetAmiibo) {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
  for(i=0; i < targetAmiibo.length; i++) {
    lili = document.createElement('li');
    img = document.createElement('img');
    img.src = `https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${targetAmiibo[i].image.slice(65)}`;
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
    <li><span>amiiboSeries:</span> ${amiiboSeries}</li>
    <li><span>character:</span> ${character}</li>
    <li><span>gameSeries:</span> ${gameSeries}</li>
    <li><span>type:</span> ${type}</li>
    <p>
    <li><span>release:</span></li>
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