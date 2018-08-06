export class Player {

  constructor(name, number, offense, stamina) {
    this.name = name;
    this.number = number;
    this.offense = offense;
    this.stamina = stamina;
  }

  shoot() {
    let missChance = Math.floor(Math.random() * 10);
    if(offense > missChance) {
      return 2;
    } else if(offense === missChance) {
      return 3;
    } else {
      return 0;
    }
  }

}
