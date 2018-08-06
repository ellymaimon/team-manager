export class Game {

  constructor(playerTeam, computerTeam, difficulty) {
    this.playerTeam = playerTeam;
    this.computerTeam = away;
    this.duration = 12;
    this.quarters = 4;
    this.difficulty = difficulty;
  }

  buildPlayers() {
    let firstNames = ["Kobe", "LeBron", "Kevin", "Ryan", "Elly", "Franz", "Shaq", "Michael", "Tiger", "Donald", "Barack", "Stephen", "Abel"];
    let lastNames = ["Bryant", "James", "Ahn", "Trotter", "O'Neal", "Woods", "Trump", "Obama", "Knpufer", "Scissorhands", "Swanson", "Beetlejuice"];
    let randomFirst = firstNames[random(firstNames.length)];
    let randomLast = lastNames[random(lastNames.length)];
    let name = randomFirst + " " + randomLast;
    let jerseyNumber = random(99);
    let offense = random(10);
    let stamina = random(10);
    player = new Player(name, jerseyNumber, offense, stamina);

  }

  callTimeOut() {
    playerTeam.energize();
  }

  substitutePlayer(playerNumber, subbedPlayerNumber) {
    playerTeam.substitute(playerNumber, subbedPlayerNumber);
  }

  startGame() {
    let time = setInterval(() => {
      this.duration -= 2;
      if(gameIsOver(time)) gameOver();
    }, 3000);
  }

  gameIsOver(time) {
    if (this.duration === 0) {
      this.quarters -= 1;
      clearInterval(time);
    }
    if (this.quarters === 0) {
      clearInterval(time);
      return true;
    } else {
      return false;
    }
  }

  random(num) {
    let random = Math.floor(Math.random() * num);
    return random;
  }
}
