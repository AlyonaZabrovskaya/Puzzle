const myCanvas = document.getElementById("myCanvas");
const myContext = myCanvas.getContext("2d");
const playPuzzle = document.getElementById("playPuzzle");
const nav = document.getElementById("nav");
const banner = document.getElementById("banner");
const vers1 = document.getElementById("vers1");
const vers2 = document.getElementById("vers2");
const vers3 = document.getElementById("vers3");
const vers4 = document.getElementById("vers4");
const vers5 = document.getElementById("vers5");
const vers6 = document.getElementById("vers6");
const vers7 = document.getElementById("vers7");
const vers8 = document.getElementById("vers8");
const buttonPuzzle = document.getElementById("buttonPuzzle");
const playButton8 = document.getElementById("playButton8");
const playButton18 = document.getElementById("playButton18");
const playButton32 = document.getElementById("playButton32");
const playButton72 = document.getElementById("playButton72");
const choosingSize = document.getElementsByClassName("choosingSize");
const controlButtons = document.getElementById("controlButtons");
const mainScreen = document.getElementById("mainScreen");
const update = document.getElementById("update");
const home = document.getElementById("home");
const timer = document.getElementById("timer");
const soundCorrect = new Audio('assets/audio1.mp3'); //элемент Audio при верной установке
const soundVictory = new Audio('assets/audio2.mp3'); //элемент Audio при одержании победы
const mixing = new Audio('assets/audio3.mp3'); //элемент Audio при перемешивании
const backgraund = new Image();//фон поля
let arrayPartImage = [];//массив всех деталей картины
let horizontallyPuzzle;//количество фрагментов по горизонтали
let verticallyPuzzle;//количество фрагментов по вертикали
let img = new Image();// элемент Image
let originalSize;//размер оригинального фрагмента
let p = null;//индекс выбранного элемента
let victory = 0;//перменная - победы в игре
let sizePuzzle;//размер фрагментов
let multiplierWidth;//коэффициент ширины поля
let multiplierHeight;//коэффициент высоты поля
let device;//устройство игры
let selected = false;//переносится ли сейчас какой-нибудь фрагмент
let src;//путь к картине сборки
let seconds = 0;//секунды
let minutes = 0;//минуты
let hours = 0;//часы
let interval;//интервал

function check()//функция проверки разрешения экрана
{
	if(window.innerWidth >= 769)
	{
		multiplierWidth = 7;
		multiplierHeight = 3;
		sizePuzzle8 = 864;
		sizePuzzle18 = 576;
		sizePuzzle32 = 432;
		sizePuzzle72 = 288;
		device = 0;
	}
	else if(window.innerWidth >= 640)
	{
 		multiplierWidth = 10;
		multiplierHeight = 5;
		sizePuzzle8 = 90;
		sizePuzzle18 = 55;
		sizePuzzle32 = 50;
		sizePuzzle72 = 35;
		device = 1;
	}
	else
	{
		multiplierWidth = 6;
		multiplierHeight = 11;
		sizePuzzle8 = 90;
		sizePuzzle18 = 60;
		sizePuzzle32 = 45;
		sizePuzzle72 = 30;
		device = 2;
	}
}

check();//запуск функции проверки разрешения экрана

function newGame()//функция запуска новой игры
{
	buttonPuzzle.style.display = "none";//убирать кпопки-пазлы
	controlButtons.style.display = "block";//отображение дополнительных кнопок
	myCanvas.style.display = "block";//отображение поля для сборки пазлов
	timer.style.display = "block";//отображение таймера
	myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);//очистка канвы
	myCanvas.width  = sizePuzzle * multiplierWidth; //установка ширины canvas
	myCanvas.height = sizePuzzle * multiplierHeight;//установка высоты canvas
	drawBackgraund();
	mixing.play();
	victory = 0;
	selected = false;
  arrayPartImage = [];//очистка массива фрагментов
  fillPuzzle();
  shuffleFragments();
  drawPuzzle();
  interval = setInterval(updateTime, 1000);
}

playButton8.addEventListener("click", ()=> //последствия нажатия кнопки "8"
{
	if(device == 0)
	{
		multiplierWidth = 7;
  	multiplierHeight = 3; 
	}
		if(device == 1)
	{
		multiplierWidth = 7;
  	multiplierHeight = 3; 
	}
		if(device == 2)
	{
		multiplierWidth = 4;
  	multiplierHeight = 6; 
	}
	horizontallyPuzzle=4; 
	verticallyPuzzle=2;
	originalSize = 432;
	sizePuzzle = sizePuzzle8;  
	newGame();
});

playButton18.addEventListener("click", ()=> //последствия нажатия кнопки "18"
{
	if(device == 0)
	{
		multiplierWidth = 10;
  	multiplierHeight = 5;   
	}
	if(device == 1)
	{
		multiplierWidth = 11;
  	multiplierHeight = 5; 
	}
	if(device == 2)
	{
		multiplierWidth = 6;
  	multiplierHeight = 9; 
	}
	horizontallyPuzzle=6; 
	verticallyPuzzle=3;
	originalSize = 288; 
	sizePuzzle = sizePuzzle18; 
	newGame();
});

playButton32.addEventListener("click", ()=> //последствия нажатия кнопки "32"
{
	if(device == 0)
	{
		multiplierWidth = 14;
  	multiplierHeight = 6; 
	}
	if(device == 1)
	{
		multiplierWidth = 13;
  	multiplierHeight = 5; 
	}
	if(device == 2)
	{ 
		multiplierWidth = 8;
  	multiplierHeight = 12; 
	}
	horizontallyPuzzle=8; 
	verticallyPuzzle=4;
	originalSize = 216; 
	sizePuzzle = sizePuzzle32; 
	newGame(); 
});


playButton72.addEventListener("click", ()=> //последствия нажатия кнопки "72"
{
	if(device == 0)
	{
		multiplierWidth = 21;
  	multiplierHeight = 9; 
 	}
	if(device == 1)
	{
		multiplierWidth = 19;
  	multiplierHeight = 8; 
 	}
	if(device == 2)
	{
		multiplierWidth = 12;
  	multiplierHeight = 18; 
 	}
 	horizontallyPuzzle=12; 
	verticallyPuzzle=6;
	originalSize = 144;
  sizePuzzle = sizePuzzle72; 
 	newGame(); 
});

update.addEventListener("click", ()=>//обработчик события кнопки "обновить"
{
	clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  timer.textContent = '00:00:00';
  newGame();
});

home.addEventListener("click", ()=>//обработчик события кнопки "дом"
{
	mixing.play();
	history.go(0);//перезагрузка текущей страницы
});

mainScreen.addEventListener("click", ()=>//обработчик события кнопки "главная страница"
{
	mixing.play();
	history.go(0);//перезагрузка текущей страницы
});

function updateTime()//функция запуска таймера
{
  seconds++;
  if (seconds === 60) 
  {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) 
  {
    hours++;
    minutes = 0;
  }
  timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setImg()//функция установки изображений
{
  img.src = src;
  nav.style.display = "none";
  banner.style.display = "none";  
  img.onload = () =>
  {
  	backgraund.src = "assets/backgraund.png";
  	backgraund.onload = () =>
  	{ 
  		buttonPuzzle.style.display = "block";
  	}
  }
}

vers1.addEventListener("click", () => {src="assets/img1.png"; setImg();});
vers2.addEventListener("click", () => {src="assets/img2.jpg"; setImg();});
vers3.addEventListener("click", () => {src="assets/img3.jpg"; setImg();});
vers4.addEventListener("click", () => {src="assets/img4.png"; setImg();});
vers5.addEventListener("click", () => {src="assets/img5.png"; setImg();});
vers6.addEventListener("click", () => {src="assets/img6.png"; setImg();});
vers7.addEventListener("click", () => {src="assets/img7.jpg"; setImg();});
vers8.addEventListener("click", () => {src="assets/img8.jpg"; setImg();});

function fillPuzzle()//функция заполнения массива элементами
{
	for (let i=0; i<horizontallyPuzzle; i++)
	{
		for (let q=0; q<verticallyPuzzle; q++)
		{		
			let puzzle = new Part(i, q, i, q);
			arrayPartImage.push(puzzle);
		}
	}
}

function drawPuzzle(scaleW=1, scaleH=1)//функция отрисовки фрагментов пазла
{
	for(let detail of arrayPartImage)
	{
		myContext.drawImage(img, detail.sx*originalSize, detail.sy*originalSize, originalSize, originalSize, detail.dx*sizePuzzle, detail.dy*sizePuzzle, sizePuzzle, sizePuzzle);
	}
}

function drawBackgraund()//функция отрисовки рабочего поля
{
	const pattern = myContext.createPattern (backgraund, "repeat");
	myContext.fillStyle = pattern;
	myContext.fillRect(0,0,sizePuzzle*multiplierWidth,sizePuzzle*multiplierHeight);
	myContext.strokeRect(0,0,sizePuzzle*multiplierWidth,sizePuzzle*multiplierHeight);
	myContext.strokeStyle = "#79553d";
	myContext.lineWidth = 4.5;
	myContext.strokeRect(0,0,sizePuzzle*horizontallyPuzzle,sizePuzzle*verticallyPuzzle);
};

function Part(sx, sy, dx, dy, locationPart)//конструктор объектов-пазлов
{
  this.sx = sx;
  this.sy = sy;
  this.dx = dx;
  this.dy = dy;
  this.lP = false;
};

function CanvasCoordinat(myCanvas, x, y)//функция определения сектора на канве
{
	let RectBounding = myCanvas.getBoundingClientRect();//канва как область просмотра, отдельная от всего документа
	let coordinatX = Math.floor((x-RectBounding.x)/sizePuzzle); 
	let coordinatY = Math.floor((y-RectBounding.y)/sizePuzzle); 
	return {x: coordinatX, y: coordinatY};
};

function shuffleFragments()//функция перетасовки фрагментов
{
	const fieldPath = [];
	for (let x = 0; x < multiplierWidth; x++)
	{
		for (let y = 0; y < multiplierHeight; y++)
		{
			if (x >= horizontallyPuzzle || y >= verticallyPuzzle)
			{
				fieldPath.push({ x, y });
			}
		}
	}
	fieldPath.sort(() => Math.random() - 0.5);
	arrayPartImage.forEach((detail, i) => 
	{
		detail.dx = fieldPath[i].x;
		detail.dy = fieldPath[i].y;
	});
}

myCanvas.addEventListener("click", function(e)//обработчик события "клик по фрагменту"
{
	let RectBounding = myCanvas.getBoundingClientRect();//канва как область просмотра, отдельная от всего документа
	let location = CanvasCoordinat(myCanvas, e.clientX, e.clientY);//переменная - местоположения курсора мыши на канве
	if(selected == false)//если нет выбранного элемента
	{
		for(let n=0; n < horizontallyPuzzle*verticallyPuzzle; n++)
		{
			if(location.x == arrayPartImage[n].dx && location.y == arrayPartImage[n].dy && arrayPartImage[n].lP == false)
			{
				p = n;//выбранный элемент из массива
				selected = true;//после щелчка по элементу, он - выбран
				myContext.beginPath();//начало пути отрисовки рамки
				myContext.strokeStyle = "#13dd22";//цвет рамки
				myContext.lineWidth = 4;//толщина рамки
				myContext.strokeRect(arrayPartImage[p].dx * sizePuzzle, arrayPartImage[p].dy * sizePuzzle, sizePuzzle,sizePuzzle);//координаты и размер рамки
				myContext.stroke();//отображение пути
				return;
			}
		}
	}
	else if(selected == true)//если есть выбранный элемент
	{
		arrayPartImage[p].dx = location.x;
		arrayPartImage[p].dy = location.y;
		myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);//очистка канвы
		drawBackgraund();//после щелчка по элементу, он - зафиксирован
		drawPuzzle(img);//новая отрисовка
		selected = false;// выбранного элемента снова нет
		if(arrayPartImage[p].dx == arrayPartImage[p].sx && arrayPartImage[p].dy == arrayPartImage[p].sy)
		{
			arrayPartImage[p].lP = true;
			soundCorrect.play();
			victory++;
			if(victory == horizontallyPuzzle*verticallyPuzzle)
			{
				clearInterval(interval);
				timer.textContent = "Ваш результат: " + timer.textContent;
				myCanvas.style.display = "none";
				controlButtons.style.display = "none";
				textSize.style.display = "block";
				home.style.display = "block";
				soundVictory.play();
			}
		}		
	}
});	

myCanvas.addEventListener("mousemove", function(e)//обработчик события "перемещение мыши"
{
	if(selected == true)//если элемент выбран
	{
		let RectBounding = myCanvas.getBoundingClientRect();//канва как область просмотра, отдельная от всего документа
		let location = CanvasCoordinat(myCanvas, e.clientX, e.clientY);//переменная - местоположения курсора мыши на канве
		arrayPartImage[p].dx = location.x;
		arrayPartImage[p].dy = location.y;
		myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);//очистка канвы
		drawBackgraund();
		drawPuzzle(img);//новая отрисовка
		myContext.beginPath();//начало пути отрисовки рамки
		myContext.strokeStyle = "#ffd700";//цвет рамки
		myContext.lineWidth = 4;//толщина рамки
		myContext.strokeRect(arrayPartImage[p].dx*sizePuzzle, arrayPartImage[p].dy*sizePuzzle, sizePuzzle,sizePuzzle);//координаты и размер рамки
		myContext.stroke();//отображение пути
	}	
});

document.querySelectorAll('.choosingSize').forEach(el => el.addEventListener("mouseover", function(e)//обработчик события "выбор размера" 
{ 
		soundCorrect.play();
 }));

window.addEventListener("orientationchange", () => //обработчик события "изменение оринтации"
{
   history.go(0);//перезагрузка текущей страницы
});