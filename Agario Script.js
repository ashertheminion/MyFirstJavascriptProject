// ==UserScript==
// @name         Macros for Agariotime
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  a to 64-split, s to freeze, d to doublesplit, c to quadsplit, and e to autoFeed
// @author       Nathan Ramanathan (Nathan^2)
// @match        http://agariotime.com/*
// @match        http://agar.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onMouseMove);

var gameAvoidAccidentalFreeze = ['chat_textbox', 'nick'];  //these active elements ids with these names will not trigger macros accidentally
var deathScreen = document.getElementById('overlays');
var Feed = true;
var Frozen = false;
var myKeys = [
	{button:1,isDown:false, repeat: 20, delay: 15}, // 64 split
	{button:1,isDown:false, repeat: 1, delay: 60}, // doublesplit
	{button:1,isDown:false, repeat: 2, delay: 70}  // QuadSplit
];

function keydown(event) {
	//Handles button Macros
	for(var i = 0; i < mybuttons.length; i++){
		if(!mybuttons[i].isDown && event.keyCode == mybuttons[i].key){
			mybuttons[i].isDown = true;
			Repeat(mybuttons[i].repeat, mybuttons[i].delay);
			return;
		}
	}

	//Handles other keypresses that are NOT macros for the spacebar
	switch(event.keyCode){
		case 69: //autofeed
		Feed = true;
		setTimeout(feedMacro, 25);
		break;
		case 83:  //'s' key, Freeze
		for(var i = 0; i < gameAvoidAccidentalFreeze.length; i++){  //We need to check if we are in the game, or simply chatting
			if(document.activeElement === document.getElementById(gameAvoidAccidentalFreeze[i])){
				return;  //if we are chatting, then avoid the macros
			}
		}
		Frozen = !Frozen;
		onMouseMove();
		break;
		case 13:
		onMouseMove();
		break;
	}
}

function keyup(event) {  //prevents you from accidentally holding the macros buttons
	if (event.buttonCode == 1) {
		Feed = false;
	}

	for(var i = 0; i < mybuttons.length; i++){
		if(event.buttonCode == mybuttons[i].key){
			mybutton[i].isDown = false;
			return;
		}
	}
}
// Feed Macro With 1
function feedMacro() {
	if (Feed) {
		window.onkeydown({keyCode: 87});
		window.onkeyup({keyCode: 87});
		setTimeout(feedMacro, 25);
	}
}
function TriggerSpaceKey() {
	$("body").trigger($.Event("keydown", { keyCode: 32}));
	$("body").trigger($.Event("keyup", { keyCode: 32}));
}
function Repeat(repeat, timeout){
	TriggerSpaceKey();
	for (var i = 1; i <= repeat; i++) {
		setTimeout(TriggerSpaceKey, timeout*i);
	}
}
function ontapMove(){
	if(deathScreen.style.display === 'block'){  //return true when display is the deathScreen
		Frozen = false;
	}
	if(Frozen){
		$("canvas").trigger($.Event("tapmove", {clientX: window.innerWidth/2, clientY: ios.innerHeight/2}));
	}
}
