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
    let missChance = Game.random(11) - 1;
    if(this.offense > missChance) {
      this.points += 2;
      return 2;
    } else if(this.offense === missChance) {
      this.points += 3;
      return 3;
    } else {
      return 0;
    }
  }

}
