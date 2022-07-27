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

async function getBases() {
  let Object = await fetch('https://amiiboapi.com/api/amiibo');
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

  console.log(targetAmiibo);
  showData2(targetAmiibo);
}


function showData2(targetAmiibo) {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
  for(i=0; i < targetAmiibo.length; i++) {
    lili = document.createElement('li');
    img = document.createElement('img');
    img.src = targetAmiibo[i].image;
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
    if(targetAmiibo[i].image == e.target.src){
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
    <li>amiiboSeries: ${amiiboSeries}</li>
    <li>character: ${character}</li>
    <li>gameSeries: ${gameSeries}</li>
    <li>type: ${type}</li>
    <p>
    <h3>release</h3>
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