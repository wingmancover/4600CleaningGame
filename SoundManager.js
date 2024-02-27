// SoundManager.js
// This is for managing all the necessary sound effects and music playing

// Function that can be used to play sound effects
function playSoundEffect(soundEffect) {
    soundEffect.play().catch(error => console.error("Sound effect couldn't play:", error));
}

// Function to play the mouse click sound
function playMouseClickSound() {
    playSoundEffect(mouseClickSound);
}

// PLay the mouse click sound every time when mouse is clicked
var mouseClickSound = new Audio('Sounds/Mouse-click-sound.mp3');
document.addEventListener('click', playMouseClickSound);


// For the background music
var bgMusic = new Audio('Sounds/Lobby-Time(chosic.com)(BGM).mp3');
bgMusic.loop = true; // Enable looping
bgMusic.volume = 0.2; // Set volume

// For the victory music
var victoryMusic = new Audio('Sounds/Victory.mp3');
victoryMusic.loop = false;
victoryMusic.volume = 0.4;


// For the Tank Scene sound effects
var flapperInstall = new Audio('Sounds/TankScene_Special/FlapperInstall.mp3');
flapperInstall.volume = 0.3;

var tankLidScrape = new Audio('Sounds/TankScene_Special/TankLidScrape.mp3');
tankLidScrape.volume = 0.3;

var toiletFlush = new Audio('Sounds/TankScene_Special/ToiletFlush.mp3');
toiletFlush.volume = 0.3;

var valveTurning = new Audio('Sounds/TankScene_Special/ValveTurning.mp3');
valveTurning.volume = 0.3;


// Play the background music when the game starts
// document.addEventListener('DOMContentLoaded', function() {
//     bgMusic.play().catch(error => console.error("Background music couldn't play:", error));
// });
