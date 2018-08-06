import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Team } from './team.js'
import { Game } from './game.js'
import { Player } from './player.js'

let game = new Game();

function populateTeams() {
  let team1 = new Team();
  let team2 = new Team();

  for(let i = 1; i <= 12; i++) {
    if(i < 4) {
      team1.active["player" + i] = game.buildPlayers();
    } else if (i > 3 && i < 7) {
      team1.bench["player" + i] = game.buildPlayers();
    } else if (i > 6 && i < 10) {
      team2.active["player" + (i - 6)] = game.buildPlayers();
    } else {
      team2.bench["player" + (i - 6)] = game.buildPlayers();
    }
  }

  game.playerTeam = team1;
  game.computerTeam = team2;
}

$(document).ready(function() {

  $("#set-teams").click(function(){
    let newGame = populateTeams();
    $("#home-offense").text("Offense: " + game.playerTeam.calculateTeamOffense());
    $("#home-stamina").text("Stamina: " + game.playerTeam.calculateTeamStamina());
    $("#away-offense").text("Offense: " + game.computerTeam.calculateTeamOffense());
    $("#away-stamina").text("Stamina: " + game.computerTeam.calculateTeamStamina());

    for(let i = 1; i <= 3; i++) {
      $("#homePlayerName").append("<p>" + game.playerTeam.active["player" + i].name + "</p>");
      $("#homePlayerNumber").append("<p>" + game.playerTeam.active["player" + i].number + "</p");
      $("#homePlayerOffense").append("<p>" + game.playerTeam.active["player" + i].offense + "</p");
      $("#homePlayerStamina").append("<p>" + game.playerTeam.active["player" + i].stamina + "</p");

      $("#awayPlayerName").append("<p>" + game.computerTeam.active["player" + i].name + "</p>");
      $("#awayPlayerNumber").append("<p>" + game.computerTeam.active["player" + i].number + "</p");
      $("#awayPlayerOffense").append("<p>" + game.computerTeam.active["player" + i].offense + "</p");
      $("#awayPlayerStamina").append("<p>" + game.computerTeam.active["player" + i].stamina + "</p");
    }

    $("#start-game").attr("disabled", false);
    $("#set-teams").attr("disabled", true);
  });

  $("#start-game").click(function(){

    setInterval(() => {
      game.play();
      $("#timer").text(game.duration);
      $("#quarters").text(game.quarters);
    }, 3000);

    $("#start-game").attr("disabled", true);
  });

});
