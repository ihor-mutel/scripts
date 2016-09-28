// ==UserScript==
// @name         hamatata.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.hamatata.com/play*
// @grant        none
// ==/UserScript==
window.onload = function() {

function start(){
document.getElementById("starter").children[0].style.color = "#3a87ad";    
export_word;

tbl = document.createElement("div");
document.getElementById('player_wrapper').appendChild(tbl);
messageText = "";
//for timer
timer = document.createElement("div");
count = 0;
document.getElementById('player_wrapper').appendChild(timer);
clockInterval = 0;
wordLibrary = [];
translationLibrary = [];
wordTemp = "";
//var turn = true;
//

exitHandler = function ()
{
    if (document.webkitIsFullScreen !== null)
    {

        document.getElementsByClassName("fp-subtitle")[0].style.fontSize = "38.8832px";
		document.getElementsByClassName("fp-subtitle")[0].style.backgroundColor= "rgba(0,0,0,0.9)";
		document.getElementsByClassName("fp-subtitle")[0].style.bottom= "60px";	
		
		document.getElementsByClassName('fp-ui')[0].style.opacity = "0.1";
		document.getElementsByClassName('fp-fullscreen')[0].style.opacity = "0";
		//////console.log("NEW STYLE");		
		document.getElementsByClassName('translateBox')[0].style.left = ((document.getElementsByClassName('myplayer')[0].offsetWidth - document.getElementsByClassName('translateBox')[0].offsetWidth - 20) / 2 ) + "px";	

		}
}
if (document.addEventListener)
{
    document.addEventListener('webkitfullscreenchange', exitHandler, false);

}

export_word = function (service, word, translation, context) {

			
			
			// clearTimeout(hideBox);

			if(wordTemp.toLowerCase().trim() !=   word.toLowerCase().trim()){
			translationLibrary.push([[wordTemp + " " + word],[translation]]);
			//console.log(word + " " + wordTemp);	
			}else{
			translationLibrary.push([[word],[translation]]);	
			}
			
			messageText = "";
			for(c=0;c<translationLibrary.length;c++){
			//wordMessage = wordMessage +
				
			messageText = messageText + "<span style=\"color: #fc6\" class='dictionaryMessageEn'>" + translationLibrary[c][0] + "</span><span class='dictionaryMessageRu'>" + " - " + translationLibrary[c][1] + ";  " + "</span>";
			}

			tbl.innerHTML = messageText;
			makeBold();
			
			tbl.style.display= "block";
			tbl.style.position = "absolute";
			tbl.style.left = "10px";
			tbl.style.bottom = "0";
			tbl.style.backgroundColor =  'rgba(0, 0, 0, 1)';
			tbl.style.color = "#fc8";
			tbl.style.zIndex = "2147483647";
			tbl.style.fontSize = "30px";
			tbl.style.borderRadius = '5px'
			tbl.style.fontWeight = "700";
			tbl.style.padding = "10px"; 
			tbl.style.lineHeight = "30px";
			tbl.className = "translateBox";		
			
			document.getElementsByClassName('translateBox')[0].style.left = ((document.getElementsByClassName('myplayer')[0].offsetWidth - document.getElementsByClassName('translateBox')[0].offsetWidth - 20) / 2 ) + "px";
			
			 // hideBox = setTimeout(function(){
				 // messageText = "";
				 // tbl.style.display= "none";}, 55000);			

			
		}

			document.getElementsByClassName("fp-fullscreen")[0].onmousemove=function(){
				translationLibrary = [];
				messageText = "";
				tbl.style.display= "none";
				tbl.innerHTML = "";
				timer.style.display = "none";
				wordLibrary = [];
				for (i=0;i<document.getElementsByClassName("word").length;i++){
					var originalWord = document.getElementsByClassName("word")[i].removeAttribute("style")
				}
			};
			
//FULLSCREEN
doc_Fullscreen = function (e) {
    if (e.ctrlKey && e.keyCode == 73) {// ctrl + i        
        document.getElementsByClassName("fp-fullscreen")[0].click()
    }
}
// register the handler 
document.addEventListener('keyup', doc_Fullscreen, false);

//timer
timerFu = function (e) {
    if (e.keyCode == 121) {// f10     
			count = 0;
			timer.innerHTML = count; 
			timer.style.display = "block";
    		timer.style.position = "absolute";
			timer.style.left = "0";
			timer.style.color = "grey";
			timer.style.bottom = "0";
			timer.style.zIndex = "2147483647";
			clearInterval(clockInterval);
			clockInterval = setInterval(function(){
			count++;  
			switch(count) {
			case 0:
				timer.style.color = "white";
				break;
			case 1:
				timer.style.color = "grey";
				break;
			case 7:
				timer.style.color = "white";
				break;
			case 8:
				timer.style.color = "grey";
				break;
			case 10:
				timer.style.color = "grey";
				break;
			case 11:
				timer.style.color = "grey";
				break;
			case 15:
				timer.style.color = "grey";
				break;
			case 16:
				timer.style.color = "grey";
				break;
			case 20:
				timer.style.color = "grey";
				break;
			case 21:
				timer.style.color = "grey";
				break;
			default:
				timer.style.color = "grey";
			};
			timer.innerHTML = count;
			if (count==35){
			clearInterval(clockInterval);
			timer.style.display = "none";
			count = 0;
			timer.innerHTML = count; 
			}			
			}, 1000);
	

    }
	
}
document.addEventListener('keyup', timerFu, false);			
////TIME OUT FOR TEXT BOLD FUNCTION
// setInterval(function(){ 

// }, 10);


jumpToSubtitles = function (e) {
    if (e.keyCode == 107) {     

	console.log('clocked');
	var api = flowplayer();
	var playerapi = flowplayer($(".flowplayer"));
	var currentTime= playerapi.ready ? playerapi.video.time : 0;
	
		for(i=0;i<api.subtitles.length;i++) {
			////
			if(api.subtitles[i].startTime > currentTime){
			//console.log(api.subtitles[i].startTime);
			//console.log(currentTime)
			//console.log(api.subtitles[i].startTime);
			if (true){
				//api.seek(api.subtitles[i].startTime, function(){});
				flowplayer(".flowplayer").seek(api.subtitles[i].startTime);
			}else{



				if ((api.subtitles[i].startTime - api.subtitles[i-1].startTime) <3){
				api.seek(api.subtitles[i-2].startTime, function(){});
				console.log(api.subtitles[i].startTime - api.subtitles[i-1].startTime);			
				console.log(api.subtitles[i-1].text);
				console.log(api.subtitles[i-2].text);
				}else{
				api.seek(api.subtitles[i-1].startTime - 2, function(){});
				}

			}
			break;
			
		}

	}
}

}
	

document.addEventListener('keyup', jumpToSubtitles, false);




$(".fp-subtitle:first").bind("DOMSubtreeModified", function() {
    makeBold();
});
//MAKE WORD BOLD


get_translation = function (service, text) {
		wordTemp = text;
		//////console.log(wordLibrary);
		if (wordLibrary.indexOf(text)  > -1){
			for (i=0;i<wordLibrary.length;i++){
				if(wordLibrary[i]==text){
				wordLibrary[i] = "" ;
				deleteBold(text);
				}
			}
		}else {
			wordLibrary.push(text);
			makeBold();
		}
		//////console.log(wordLibrary);
	//
	
    show_translation('<p style="text-align:center"><img src="img/loader.gif"/></p>');
    if (app.has_extension) {
        if (service === "lingualeo" && !app.lingualeo_ready) {
            lingualeo_guest_translation(text)
        } else {
            window.postMessage({
                client_id: "translator",
                service: service,
                text: text
            }, "*")
        }
        return
    } else {
        yandex_translate(text)
    }
}



makeBold = function (){
for (k=0;k<wordLibrary.length;k++){
	var word = wordLibrary[k].toLowerCase();
	for (i=0;i<document.getElementsByClassName("word").length;i++){
		var originalWord = document.getElementsByClassName("word")[i].innerHTML.toLowerCase();
		
		if(originalWord==word){
		document.getElementsByClassName("word")[i].style.fontWeight = "900";
		
		}
	}
	}
		//CLEAN SPAN
		for (i=0;i<document.getElementsByClassName("dictionaryMessageEn").length;i++){

			document.getElementsByClassName("dictionaryMessageEn")[i].style.color = "#fc6";
			document.getElementsByClassName("dictionaryMessageRu")[i].style.color = "rgb(255, 204, 136)";
			
		}
if(document.getElementsByClassName("word")[0] != null && document.getElementsByClassName("dictionaryMessageEn")[0] != null){
	for (k=0;k<document.getElementsByClassName("word").length;k++){
		var word = document.getElementsByClassName("word")[k].innerHTML.toLowerCase()
		word = " "+ word +" "
		for (i=0;i<document.getElementsByClassName("dictionaryMessageEn").length;i++){
			var originalWord = document.getElementsByClassName("dictionaryMessageEn")[i].innerHTML.toLowerCase();
			originalWord = " "+originalWord + " "
			//console.log(word +"_"+originalWord);
			if(originalWord.indexOf(word) > -1 && !(word == " a " ||word == " an " ||word == " the " ||word == " out " || word == " of " || word == " in " || word == " to " || word == " for " || word == " with " || word == " on "|| word == " at "|| word == " on "|| word == " from "|| word == " by "|| word == " about " || word == " into " || word == " over " || word == " out " || word == " after "|| word == " in ") ){
			document.getElementsByClassName("dictionaryMessageEn")[i].style.color = "#faa62e";
			document.getElementsByClassName("dictionaryMessageRu")[i].style.color = "rgb(255, 176, 62)";
			}
		}
		}
	}
	
	
		//THIS CODE NEEDS REFACTORING
	///////////////////////////////////////////////////////////////
   
	for (c=0;c<document.getElementsByClassName('dictionaryMessageEn').length; c++) {
		var bottomDictionary = document.getElementsByClassName('dictionaryMessageEn')[c].innerHTML.replace(/\,/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\./g, "").replace(/\:/g, "").replace(/\  /g, " ").split(" ");
		for (i=0;i<document.getElementsByClassName('word').length ; i++) {

				if(bottomDictionary[0].toLowerCase().replace(/[^a-zA-Z ]/g, "") == document.getElementsByClassName('word')[i].innerHTML.toLowerCase().replace(/[^a-zA-Z ]/g, "")){		
						var spanNumber = 0;
					for(k=0;k < bottomDictionary.length && spanNumber < document.getElementsByClassName('word').length; k++){ 
				        spanNumber=i+k;
                            console.log(bottomDictionary.length != 0)

				            if (document.getElementsByClassName('word').length > 1 && spanNumber< document.getElementsByClassName('word').length -1 && k < bottomDictionary.length -1 && document.getElementsByClassName('word')[spanNumber].innerHTML.toLowerCase().replace(/[^a-zA-Z ]/g, "") == bottomDictionary[k].toLowerCase().replace(/[^a-zA-Z ]/g, "") && document.getElementsByClassName('word')[spanNumber+1].innerHTML.toLowerCase().replace(/[^a-zA-Z ]/g, "") == bottomDictionary[k+1].toLowerCase().replace(/[^a-zA-Z ]/g, ""))  {                     document.getElementsByClassName('word')[spanNumber].style.fontWeight = "900";
                            document.getElementsByClassName('word')[spanNumber+1].style.fontWeight = "900";  
  				        console.log(document.getElementsByClassName('word').length);
                        console.log(spanNumber);                      
                            }
							console.log("bottomDictionary.length  " + bottomDictionary.length + " " + bottomDictionary); 
				            if (bottomDictionary[k-1] != undefined && bottomDictionary.length > 1 && spanNumber == document.getElementsByClassName('word').length -1 && document.getElementsByClassName('word')[spanNumber].innerHTML.toLowerCase().replace(/[^a-zA-Z ]/g, "") == bottomDictionary[k].toLowerCase().replace(/[^a-zA-Z ]/g, "") && document.getElementsByClassName('word')[spanNumber-1].innerHTML.toLowerCase().replace(/[^a-zA-Z ]/g, "") == bottomDictionary[k-1].toLowerCase().replace(/[^a-zA-Z ]/g, ""))  {                      document.getElementsByClassName('word')[spanNumber].style.fontWeight = "900";  
  				        console.log(document.getElementsByClassName('word').length);
                                             
                            }
                            
					}
				}
	   }
	}
	/////////////////////////////////////////////////////////////////////
}
deleteBold = function (text) {
	
		for (i=0;i<document.getElementsByClassName("word").length;i++){
		var originalWord = document.getElementsByClassName("word")[i].innerHTML;
		
		if(originalWord==text){
		document.getElementsByClassName("word")[i].style.fontWeight = "";
		}
	}
}

};


li = document.createElement("li");
li.innerHTML = "<a>Вкл</a>";
li.style.cursor = "pointer";
li.id = "starter";
li.onclick = start;
document.getElementsByClassName('nav')[0].appendChild(li);

//AUTOCLICK PLAY
switchOnScript = "true";
stop_upload = function (error, message) {	
    var result = "",
        alert_class;
    if (!error) {
        alert_class = "alert alert-success";
        result = "Файл загружен успешно!";
        $("#subs_url").html(message);
		
    } else {
        alert_class = "alert alert-error";
        var error_str = "";
        if (error === 3) error_str = "Вы загрузили архив. Распакуйте его у себя и загрузите файл с расширением *.srt или *.vtt";
        else error_str = message;
        result = "Произошла ошибка во время загрузки файла! (" + error_str + ")"
    }
    $("#subs_upload_process").hide();
    $("#subs_upload_form").show();
    $("#subs_upload_result").removeClass("alert-error alert-success").addClass(alert_class).show();
    $("#subs_upload_result").html(result);
    window.setTimeout(function() {
        $("#subs_upload_result").slideUp(500)
		document.getElementById("submit-btn").click();
		document.getElementById("submit-btn").click();
		document.getElementById("submit-btn").click();
		
			if (switchOnScript){
				document.getElementById('starter').click();
				switchOnScript = false;
				////console.log("SWITCH ON");
			}
    }, error ? 5e3 : 1e3)
}

};

function giveMePath(){
	var fullPath = document.getElementsByName("local_video")[0].value;
	if (fullPath) {
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		var filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}
		var nameSrt = filename.replace("mp4", "srt");
		
		//window.prompt("Copy to clipboard: Ctrl+C, Enter", nameSrt);
		//document.getElementsByName('subs_file').value = "<input type='text' id='copyTarget' value=" + nameSrt + "'Text to Copy'>"  ;
		document.getElementsByClassName('form_helper')[0].innerHTML = "<input type='text' id='copyTarget'>";
		document.getElementById('copyTarget').value = nameSrt;
	}
}
document.getElementsByName("subs_file")[0].onclick = giveMePath;






document.getElementsByName('subs_file')[0].addEventListener("click", function() {
    copyToClipboard(document.getElementById('copyTarget'));
});

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}




