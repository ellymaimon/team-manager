import { Player } from './player.js'
import { Team } from './team.js'

export class Game {

  constructor() {
    this.playerTeam = {};
    this.computerTeam = {};
    this.duration = 12;
    this.quarters = 4;
  }

  buildPlayers() {
    let firstNames = ["Kobe", "Nate", "Thad", "Eric", "Scott", "Nick", "David", "Craig", "Kelli", "Nikki", "Rita", "Renee", "Reese", "LeBron", "Kevin", "Ryan", "Elly", "Franz", "Shaq", "Michael", "Tiger", "Donald", "Barack", "Stephen", "Abel", "Bob", "Sheki", "Constant", "Bob", "Shrek", "Tom", "Aristotle", "Donkey"];
    let lastNames = ["Bryant", "Redbull", "Maximus", "ButtWiper", "KittyCat", "Pitt", "Frankenstein", "Cumbersnatch", "Cucumberscratch", "James", "Ahn", "Trotter", "O'Neal", "Woods", "Trump", "Obama", "Knpufer", "Scissorhands", "Swanson", "Beetlejuice", "Barker", "Constipation", "Fancy Yancy", "Donkey", "Brady", "The Homeless", "The dRuNkEn", "Glue Sniffer", "Toilet Cleaner", "The Scottish Ogre"];
    let randomFirst = firstNames[this.random(firstNames.length) - 1];
    let randomLast = lastNames[this.random(lastNames.length) - 1];
    let name = randomFirst + " " + randomLast;
    let jerseyNumber = this.random(99);
    let offense = this.random(10);
    let stamina = this.random(10);
    let player = new Player(name, jerseyNumber, offense, stamina);
    return player;
  }

  callTimeOut() {
    playerTeam.energize();
  }

  substitutePlayer(playerNumber, subbedPlayerNumber) {
    playerTeam.substitute(playerNumber, subbedPlayerNumber);
  }

  play() {
      this.duration -= 2;
      if(this.gameIsOver()) this.gameOver();
  }

  gameIsOver() {
    if (this.duration === 0) {
      this.quarters -= 1;
      this.duration = 12;
    }
    if (this.quarters === 0) {
      clearInterval();
      return true;
    } else {
      return false;
    }
  }

  gameOver() {
    
  }

  random(num) {
    let random = Math.floor(Math.random() * num) + 1;
    return random;
  }
}
