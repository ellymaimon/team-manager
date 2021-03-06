import { Game } from './game.js'

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
    this.timeouts = 2;
  }

  energize() {
    Object.keys(this.active).forEach(key => {
      if(this.active[key].stamina < this.active[key].originalStamina) {
        this.active[key].stamina = this.active[key].originalStamina;
      }
    });
  }

  benchEnergize() {
    Object.keys(this.bench).forEach(key => {
      if (this.bench[key].stamina < this.bench[key].originalStamina) {
        this.bench[key].stamina += 1;
      }
    });
  }

  substitute(activePlayer, benchPlayer) {
    let subbedOut = this.active[activePlayer]; //player1
    let subbedIn = this.bench[benchPlayer]; //player4
    this.bench[benchPlayer] = subbedOut;
    this.active[activePlayer] = subbedIn;
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

  getRandomPlayer() {
    let players = [];
    Object.keys(this.active).forEach(key => {
      players.push(this.active[key]);
    });

    return players[Game.random(3) - 1];
  }

}
