import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

function Cars(props) {
 
  const content = props.posts.map((post) =>
    <div key={post.id} className="container">
      <h1 className="carText">{post.title}</h1>
      <img src={post.image} alt="Brak zdjęcia" 	className="carImg"/> 
	  <h3><p>{post.text}</p></h3>
    </div>
  );
  return (
    <div>
      {content}
    </div>
  );
}

var lines = [];
var posts = [];
var titles = [];
var photos = [];
var texts = [];
var i;

function readFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status === 0)
                {
                     var allText = rawFile.responseText;
                     lines = allText.split("\n");
                   
                }
            }
        }
        rawFile.send(null);
    }
    readFile("./samochody.txt")
	
	
	let a=0;
	for (i = 0; i < lines.length ; i++) {
		
		 titles[i] = lines[a];
		 photos[i] = lines[a+1];
		 texts[i] = lines[a+2];
		 
		 a=a+3; 
	}

	for (i = 0; i < lines.length/3 ; i++) {
			posts[i]={id: i+1, title: titles[i], image: "cars_pics/"+photos[i]+".jpg", text: texts[i]};
	}
	
class Header extends React.Component {
	goTo(x,y) {
	 $('html, body').animate({
        scrollTop: parseInt($(y).offset().top)
		}, x*1000);	
	}
  
  render() {
    return (
      <div id="header">
	  <div className="menuButton">Strona główna</div>
      <div className="menuButton" onClick={() => this.goTo(.8,"#aboutcont")}>O nas</div>
      <div className="menuButton" onClick={() => this.goTo(1,"#carsHeader")}>Wasze Auta</div>
	  <div className="menuButton" onClick={() => this.goTo(1.2,"#footer")}>Kontakt</div>
	  <div id="upButton" onClick={() => this.goTo(1,"#header")}>GO  UP</div>
	  </div>
    );
  }
}

ReactDOM.render(
  <Cars posts={posts} />,
  document.getElementById('container')
);


ReactDOM.render(
  <Header />,
  document.getElementById('header')
);

setTimeout(() => {   
	
	let button = document.getElementById('upButton');
	let progress = document.getElementById('progressbar');
	let totalHeight = document.body.scrollHeight - window.innerHeight;
	window.onscroll = () => {
	let progressHeight = (window.pageYOffset / totalHeight) * 100;
	progress.style.height = progressHeight+ "%" ;
	
	if(progressHeight>15)
	{
		button.style.opacity=".8";
		button.style.cursor="pointer";
	}
	else
	{
		button.style.opacity="0";
		button.style.cursor="default";
	}
}	}, 5);

picsSlider();

function picsSlider(){

	var currentpic = 0;
	var secondpic = 0;
	var secondpic2=0;
	var pictures = document.querySelectorAll('.toRotate');

	function changePics(){
			
		if(currentpic<4)
			{
			pictures[currentpic].style.transform= "scale(0.6)";
			pictures[currentpic].style.opacity= "0";
			pictures[currentpic+1].style.left="0";
			currentpic++;
			}
		else{
			pictures[currentpic].style.transform= "scale(0.6)";
			pictures[currentpic].style.opacity= "0";
			pictures[0].style.left="0";
			currentpic=0;
		}
	}
	window.setInterval(function(){
		  changePics();
	}, 10000); 


	setTimeout(() => {  window.setInterval(function(){	   
		   if(secondpic===5)
				secondpic=0;		
			pictures[secondpic].style.left="100%";
			pictures[secondpic].style.transform= "scale(1)";
			secondpic++;
	}, 10000); }, 20000);


	setTimeout(() => {  window.setInterval(function(){	  
		   if(secondpic2===5)
				secondpic2=0;
			pictures[secondpic2].style.opacity= "1";
			secondpic2++;
	}, 10000); }, 30000);
}

//Animacja postępu Slidera

  var elem = document.getElementById("picProgress");   
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
	  pos=pos+0.6; 
      elem.style.width = pos + 'px'; 
    if (pos >= 600) {
      pos = 0;
	  elem.style.width = '0px'; }
  }





