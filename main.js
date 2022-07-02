let amiibos = undefined,
    bases = [
      'link', 'zelda', 'mario', 'peach', 
      'yoshi', 'bowser', 'Donkey Kong', 
      'Isabelle','Timmy & Tommy', 'Mabel',
      'Resetti', 'Kicks', 'Daisy', 'Waluigi',
      'Donkey Kong', 'Birdo', 'Bayonetta'
    ],
    randomInt = getRandomInt(0,(bases.length - 1)),
    character = bases[randomInt],
    btn = document.getElementById('btn'),
    item = document.getElementById('item'),
    amiiboName = document.getElementById('amiiboName');

btn.addEventListener('click', clickShowData);
amiiboName.addEventListener('keydown',enterShowData);

amiiboName.placeholder = `输入amiibo人物名字`

// console.log(character);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getData() {
    let response = await fetch(`https://amiiboapi.com/api/amiibo/?character=${character}`);
    if(response.status >= 200 && response.status < 300){
      amiibos = await response.json();
      amiibos = await amiibos.amiibo;
      showData();
    }else{
      alert(`
      ${response.status}---${response.statusText}
      查询失败，请输入正确的amiibo人物名字全称。`
      );
   }
}

getData();

function showData() {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
  for(i=0; i < amiibos.length; i++) {
    lili = document.createElement('li');
    img = document.createElement('img');
    img.src = amiibos[i].image;
    lili.appendChild(img);
    item.appendChild(lili);
  }
}

function clickShowData() {
 if(amiiboName.value.trim()){
   character = amiiboName.value.toLowerCase();
   getData();
 } else {
   alert('输入不能为空！');
 }
}

function enterShowData(e){
  if(e.key === 'Enter'){
    clickShowData();
  }
}
