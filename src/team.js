export class Team {

  constructor(active, bench) {
    this.active = {
      player1: active[0];
      player2: active[1];
      player3: active[2];
    }
    this.bench = {
      player4: bench[0];
      player5: bench[1];
      player6: bench[2];
    }
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


}
