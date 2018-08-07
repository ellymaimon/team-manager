import { Player } from './player.js'
import { Team } from './team.js'

export class Game {

  constructor() {
    this.playerTeam = {};
    this.computerTeam = {};
    this.durationMins = 11;
    this.durationSecs = 59;
    this.quarters = 1;
  }

  buildPlayers() {
    let firstNames = ["Kobe", "Nate", "Thad", "Eric", "Scott", "Nick", "David", "Craig", "Kelli", "Nikki", "Rita", "Renee", "Reese", "LeBron", "Kevin", "Ryan", "Elly", "Franz", "Shaq", "Michael", "Tiger", "Donald", "Barack", "Stephen", "Abel", "Bob", "Sheki", "Constant", "Bob", "Shrek", "Tom", "Aristotle", "Donkey", "Ethan", "Archibald"];
    let lastNames = ["Bryant", "Redbull", "Maximus", "ButtWiper", "KittyCat", "Pitt", "Frankenstein", "Cumbersnatch", "Cucumberscratch", "James", "Ahn", "Trotter", "O'Neal", "Woods", "Trump", "Obama", "Knpufer", "Scissorhands", "Swanson", "Beetlejuice", "Barker", "Constipation", "Fancy Yancy", "Donkey", "Brady", "The Homeless", "The dRuNkEn", "Glue Sniffer", "Toilet Cleaner", "The Scottish Ogre", "Buckingham"];
    let randomFirst = firstNames[Game.random(firstNames.length) - 1];
    let randomLast = lastNames[Game.random(lastNames.length) - 1];
    let name = randomFirst + " " + randomLast;
    let jerseyNumber = Game.random(99);
    let offense = Game.random(10);
    let stamina = Game.random(10);
    let player = new Player(name, jerseyNumber, offense, stamina);
    return player;
  }

  callTimeOut() {
    if (this.playerTeam.timeouts > 0) {
      this.playerTeam.energize();
      this.playerTeam.timeouts -= 1;
    }
  }

  computerSub(playerNumber, subbedPlayerNumber) {
    computerTeam.substitute(playerNumber, subbedPlayerNumber);
  }

  substitutePlayer(playerNumber, subbedPlayerNumber) {
    playerTeam.substitute(playerNumber, subbedPlayerNumber);
  }

  play() {
      this.playerTeam.score += this.playerTeam.getRandomPlayer().shoot();
      this.computerTeam.score += this.computerTeam.getRandomPlayer().shoot();
      this.durationSecs -= 30;
      let player = this.playerTeam.getRandomPlayer();
      let compPlayer = this.computerTeam.getRandomPlayer();
      if (player.stamina > 0) {
        player.stamina--;
      }
      if (compPlayer.stamina) {
        compPlayer.stamina--;
      }
      return this.gameIsOver();
  }

  gameIsOver() {
    if(this.durationSecs <= 0) {
      this.durationMins -= 1;
      this.durationSecs = 59;
    }
    if (this.durationMins < 0 && this.quarters === 2) {
      this.playerTeam.energize();
      this.computerTeam.energize();
    }
    if (this.durationMins < 0) {
      this.quarters += 1;
      this.durationMins = 11;
      while (this.playerTeam.timeouts < 2) {
        this.playerTeam.timeouts++;
      }
      while (this.computerTeam.timeouts < 2) {
        this.computerTeam.timeouts++;
      }
    }
    if (this.quarters > 4) {
      return true;
    } else {
      return false;
    }
  }

  static random(num) {
    let random = Math.floor(Math.random() * num) + 1;
    return random;
  }


}
