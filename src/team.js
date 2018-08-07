export class Team {

  constructor() {
    this.active = {
      player1: {},
      player2: {},
      player3: {},
    }
    this.bench = {
      player4: {},
      player5: {},
      player6: {},
    }
    this.score = 0;
  }

  energize() {
    let i;
    for(i in this.active) {
      i.stamina += 5;
    }
  }

  substitute(activePlayer, benchPlayer) {
    this.bench[benchPlayer] = this.active[activePlayer];
    this.active[activePlayer] = this.bench[benchPlayer];
  }

  givePepTalk(activePlayer) {
    this.active[activePlayer].offense += 5;
    setTimeout(() => {
      this.active[activePlayer].offense -= 5;
    }, 15000);
  }

  calculateTeamOffense() {
    let rating = 0;
    let i;

    for(i in this.active) {
      rating += this.active[i].offense;
    }

    for(i in this.bench) {
      rating += this.bench[i].offense;
    }

    return rating;
  }

  calculateTeamStamina() {
    let rating = 0;
    let i;

    for(i in this.active) {
      rating += this.active[i].stamina;
    }

    for(i in this.bench) {
      rating += this.bench[i].stamina;
    }

    return rating;
  }

}
