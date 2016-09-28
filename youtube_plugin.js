// ==UserScript==
// @name         Youtube.com
// @namespace    http://tampermonkey.net/
// @require    	 http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version      0.1
// @description  
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

//jQuery(document).ready(function() {
  //checkContainer();
//});

function checkContainer () {
  if($('#movie_player').is(':visible')){ //if the container is visible on the page
    //createGrid();  //Adds a grid to the html
	//alert("div here");
	playingState = true;
	document.getElementById('movie_player').onmousemove = function(){
		var cX = event.clientX;
		var cY = event.clientY;
		var subPosition = document.getElementsByClassName('caption-window ytp-caption-window-bottom')[0].getBoundingClientRect();
		if (cY > subPosition.top && cY < subPosition.bottom && playingState === true && document.getElementsByClassName('ytp-play-button')[0].getAttribute('aria-label') === "Pause"){
		//console.log('YEP YEP YEP YEP YEP YEP YEP YEP YEP YEP ');
		playingState = false;
		document.getElementsByClassName('ytp-play-button')[0].click();
		$( ".subtitles" ).remove();
		}
		if ((cY < subPosition.top || cY > subPosition.bottom) && playingState === false && document.getElementsByClassName('ytp-play-button')[0].getAttribute('aria-label') === "Play") {
		//console.log('YEP YEP YEP YEP YEP YEP YEP YEP YEP YEP ');
		playingState = true;	
		document.getElementsByClassName('ytp-play-button')[0].click();
		//document.getElementById("sub-video_subs").parentNode.removeChild(document.getElementById("sub-video_subs"));
		$( ".subtitles" ).remove();
		}
		if (cY < subPosition.top || cY > subPosition.bottom){
		$( ".subtitles" ).remove();
		}
	};	
	
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}

$(document).ready(function()
{
   checkContainer();
//window.onload = function() {
	//
	var jsonProxy = document.createElement('script');


	jsonProxy.src = "https://jsonp.afeld.me/?callback=myCallback&url=http://jsonview.com/example.json";
	document.getElementsByTagName('head')[0].appendChild(jsonProxy);
	
	//


	var stingStyle = " ";
	var stingStyle =  stingStyle + ".caption-window{";
	var stingStyle =  stingStyle + "  pointer-events: all !important;";
	var stingStyle =  stingStyle + "  cursor: pointer;";
	var stingStyle =  stingStyle + "}";
	var stingStyle =  stingStyle + "";
	var stingStyle =  stingStyle + ".caption-window ::selection {";
	var stingStyle =  stingStyle + "  background: #BCBCBC;";
	var stingStyle =  stingStyle + "}";
	var stingStyle =  stingStyle + "#movie_player span{";
	var stingStyle =  stingStyle + "  outline: none !important;";
	var stingStyle =  stingStyle + "}";	
	
	function addStyleString(str) {
		var node = document.createElement('style');
		node.innerHTML = str;
		document.body.appendChild(node);
	}
	addStyleString(stingStyle);

	////////////////



//
//}
//

//////////////////////////////////////////////////


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}


////////////////////


    //var lang;
    //var text;
    //$('body').append("<div id='robinzon'><div style='display:table;height:100%;'><div style='display:table-cell;vertical-align:middle;width:150px;'></div></div></div>");

//НАЧАЛО - стили блока
    /*$("#robinzon").css({"width": "150px",
"height": "150px",
"background": "none repeat scroll 0% 0% rgba(0, 0, 0, 0.5)",
"position": "fixed",
"display":"none",
"top": "45%",
"left": "45%",
"z-index": "999",
"text-align": "center",
"color": "white",
"font-family": "Segoe Ui",
"font-size": "25px",
"font-weight": "100",
"padding":"10px",
"border-radius": "85px"});
*/
//КОНЕЦ - стили блока
//-------------------//
//НАЧАЛО - обработка выделения


    $("html").click(function(event){
		//console.log(event.target);
		//console.log($('.caption-window > span > span'))
		var text = getSelectionText();
		if (text!='') {
		var xPosition = event.clientX;
		var yPosition = event.clientY;
			showWindow(xPosition,yPosition);


		//text = "shame";
		//console.log(text);


		  
		$.getJSON('https://jsonp.afeld.me/?callback=?&url=https://api.lingualeo.com/gettranslates?word=' + text, function(data){
			
			showTranslation(data,text);
		});
		}
    });


//КОНЕЦ - обработка выделения
//---------------------------//
//НАЧАЛО - обработка hover

//КОНЕЦ - обработка hover
//НАЧАЛО - определяем язык

//КОНЕЦ - опеделяем язык
});


function showWindow(xPosition,yPosition){
	$( ".subtitles" ).remove();
	var transWrapper = document.createElement('div');

	var offsetTop = $('#movie_player').offset().top;
	var offsetLeft = $('#movie_player').offset().left;		
	var subPosition = document.getElementsByClassName('caption-window ytp-caption-window-bottom')[0].getBoundingClientRect();

	transWrapper.className = "subtitles";
	//transWrapper.id = "sub-video_subs";
	transWrapper.style.position = "absolute";
	transWrapper.style.zIndex = "99999999";
	transWrapper.style.color = "white";	
	transWrapper.style.borderRadius = "10px";
	transWrapper.style.borderColor = "grey";
	transWrapper.style.borderSize = "3px";	
	transWrapper.style.fontSize =  $(".caption-window").css('font-size');	
	//transWrapper.style.backgroundColor = "black";
	transWrapper.style.padding = "8px";
	//transWrapper.style.top = (subPosition.bottom)+ "px";
	//console.log(subPosition.bottom);
	transWrapper.style.left = (xPosition- offsetLeft) + "px";	
	transWrapper.innerHTML = "<img style='border-radius: 16px' src='https://zanstra.home.xs4all.nl/_p/segmented/GoogleReaderPlay.gif'>";

	document.getElementById('movie_player').appendChild(transWrapper);
	document.getElementsByClassName('subtitles')[0].style.top = (subPosition.top - offsetTop - $(".subtitles").height() -15)+ "px";
}

function showTranslation(data,text){		
	var offsetTop = $('#movie_player').offset().top;
	var offsetLeft = $('#movie_player').offset().left;	
	var subPosition = document.getElementsByClassName('caption-window ytp-caption-window-bottom')[0].getBoundingClientRect();
	//text = text.toUpperCase() 
	if(text.length>22){
		var traslationText = "<ul style='border-radius:2px;background-color:rgba(0, 0, 0, 0.85);border-color:#0D1330;border-width: 2px;;border-style: solid;background-color:black;display:block;list-style-type: square;padding-left:25px;padding-right:25px;'>";
	}else{
		var traslationText = "<ul style='border-radius:5px;background-color:rgba(0, 0, 0, 0.85);border-color:#0D1330;border-width: 2px;;border-style: solid;display:block;list-style-type: square;padding-left:25px;padding-right:25px;'><li style='display:block; color: white;font-weight:bold;padding-top:4px;padding-bottom:4px;'>" + text + "</li>";
	}

	/*
	if((parseInt(offsetLeft) + Math.abs(parseInt($(".subtitles").css('left').replace(/[^-\d\.]/g, '')) ) + parseInt($(".subtitles").width())) < document.getElementById('movie_player').getBoundingClientRect().right){
		console.log(true);
	}else{
		console.log(false);
	}
	*/

	for(i=0;i<data.translate.length;i++){
		//console.log(data.translate[i].value);
		traslationText = traslationText + "<li>" + data.translate[i].value + "</li>";
	}
	var traslationText = traslationText + "</ul>";
	//transWrapper.innerHTML = "";

	document.getElementsByClassName('subtitles')[0].innerHTML = traslationText;
	document.getElementsByClassName('subtitles')[0].style.top = (subPosition.top - offsetTop - $(".subtitles").height()-8)+ "px";
//alert(tranText + xPosition + yPosition)

}
