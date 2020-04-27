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

function readCar(file)
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
    readCar("./samochody.txt")
	
	
	var a=0;
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


