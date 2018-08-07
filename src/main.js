import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Team } from './team.js'
import { Game } from './game.js'
import { Player } from './player.js'

let game = new Game();
let interval;

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

function startGame() {
    interval = setInterval(() => {
    if(game.play()) {
      clearInterval();
      $("#timer").text("0:00");
    } else {
      $("#timer").text(game.durationMins + ":" + game.durationSecs);
      $("#quarters").text(game.quarters);
      $("#homeScore").text(game.playerTeam.score);
      $("#awayScore").text(game.computerTeam.score);
      $("#pointsPlayer1").text(game.playerTeam.active.player1.points);
      $("#pointsPlayer2").text(game.playerTeam.active.player2.points);
      $("#pointsPlayer3").text(game.playerTeam.active.player3.points);
      $("#pointsPlayer4").text(game.playerTeam.bench.player4.points);
      $("#pointsPlayer5").text(game.playerTeam.bench.player5.points);
      $("#pointsPlayer6").text(game.playerTeam.bench.player6.points);
      $("#awayPointsPlayer1").text(game.computerTeam.active.player1.points);
      $("#awayPointsPlayer2").text(game.computerTeam.active.player2.points);
      $("#awayPointsPlayer3").text(game.computerTeam.active.player3.points);
      $("#awayPointsPlayer4").text(game.computerTeam.bench.player4.points);
      $("#awayPointsPlayer5").text(game.computerTeam.bench.player5.points);
      $("#awayPointsPlayer6").text(game.computerTeam.bench.player6.points);
    }
  }, 3000);
}

function pauseGame() {
  clearInterval(interval);
}


$(document).ready(function() {

  $("#set-teams").click(function(){
    populateTeams();

    $("#home-offense").text("Offense: " + game.playerTeam.calculateTeamOffense());
    $("#home-stamina").text("Stamina: " + game.playerTeam.calculateTeamStamina());
    $("#away-offense").text("Offense: " + game.computerTeam.calculateTeamOffense());
    $("#away-stamina").text("Stamina: " + game.computerTeam.calculateTeamStamina());

    for(let i = 1; i <= 3; i++) {
      $("#namePlayer" + i).append("<button class='sub-in' id='player" + i + "'></button>");
      $("#namePlayer" + i).append("<p class='name'>" + game.playerTeam.active["player" + i].name + "</p>");
      $("#offensePlayer" + i).append("<p>" + game.playerTeam.active["player" + i].offense + "</p");
      $("#staminaPlayer" + i).append("<p>" + game.playerTeam.active["player" + i].stamina + "</p");

      $("#awayNamePlayer" + i).append("<p>" + game.computerTeam.active["player" + i].name + "</p>");
      $("#awayOffensePlayer" + i).append("<p>" + game.computerTeam.active["player" + i].offense + "</p");
      $("#awayStaminaPlayer" + i).append("<p>" + game.computerTeam.active["player" + i].stamina + "</p");
    }

    for(let i = 4; i <= 6; i++) {
      $("#namePlayer" + i).append("<button class='sub-out' id='player" + i + "'></button>");
      $("#namePlayer" + i).append("<p class='name'>" + game.playerTeam.bench["player" + i].name + "</p>");
      $("#offensePlayer" + i).append("<p>" + game.playerTeam.bench["player" + i].offense + "</p");
      $("#staminaPlayer" + i).append("<p>" + game.playerTeam.bench["player" + i].stamina + "</p");

      $("#awayNamePlayer" + i).append("<p>" + game.computerTeam.bench["player" + i].name + "</p>");
      $("#awayOffensePlayer" + i).append("<p>" + game.computerTeam.bench["player" + i].offense + "</p");
      $("#awayStaminaPlayer" + i).append("<p>" + game.computerTeam.bench["player" + i].stamina + "</p");
    }

    $("#start-game").attr("disabled", false);
    $("#set-teams").attr("disabled", true);
  });

  $("#start-game").click(function() {
    startGame();
    $("#start-game").attr("disabled", true);
    $("#call-timeout").attr("disabled", false);
  });

  $("#call-timeout").click(function() {
    pauseGame();
    $("#start-game").attr("disabled", false);
    $("#call-timeout").attr("disabled", true);
    $("#substitute").attr("disabled", false);
  });

  $("#substitute").click(function() {
    $("#start-game").attr("disabled", true);
    $("#substitute").attr("disabled", true);
    $(".sub-in").css("display", "inline");
  });

});
