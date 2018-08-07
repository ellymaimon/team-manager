import { Game } from './game.js'

export class Player {

  constructor(name, number, offense, stamina) {
    this.name = name;
    this.number = number;
    this.offense = offense;
    this.stamina = stamina;
    this.points = 0;
  }

  shoot() {
    let offense = Math.ceil((this.stamina + this.offense) / 2);
    let missChance = Game.random(11) - 1; //number 1-10
    if(offense > missChance) {
      this.points += 2;
      return 2;
    } else if(offense === missChance) {
      this.points += 3;
      return 3;
    } else {
      return 0;
    }
  }

}
