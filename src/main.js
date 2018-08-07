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

function repopulate() {
  for(let i = 1; i <= 3; i++) {
    $("#active-players").append("<option value='player" + i + "'>" + game.playerTeam.active["player" + i].name + "</option>")

    // $("#namePlayer" + i).html("<p class='name'>" + game.playerTeam.active["player" + i].name + "</p>");
    // using a template literal instead
    $("#namePlayer" + i).html(`<p class='name'>${game.playerTeam.active["player" + i].name}</p>`);


    $("#offensePlayer" + i).html("<p>" + game.playerTeam.active["player" + i].offense + "</p>");
    $("#staminaPlayer" + i).html("<p>" + game.playerTeam.active["player" + i].stamina + "/" + game.playerTeam.active["player" + i].originalStamina + "</p>");

    $("#awayNamePlayer" + i).html("<p>" + game.computerTeam.active["player" + i].name + "</p>");
    $("#awayOffensePlayer" + i).html("<p>" + game.computerTeam.active["player" + i].offense + "</p>");
    $("#awayStaminaPlayer" + i).html("<p>" + game.computerTeam.active["player" + i].stamina + "/" + game.computerTeam.active["player" + i].originalStamina + "</p>");
  }

  for(let i = 4; i <= 6; i++) {
    $("#bench-players").append("<option value='player" + i + "'>" + game.playerTeam.bench["player" + i].name + "</option>")

    $("#namePlayer" + i).html("<p class='name'>" + game.playerTeam.bench["player" + i].name + "</p>");
    $("#offensePlayer" + i).html("<p>" + game.playerTeam.bench["player" + i].offense + "</p>");
    $("#staminaPlayer" + i).html("<p>" + game.playerTeam.bench["player" + i].stamina + "/" + game.playerTeam.bench["player" + i].originalStamina + "</p>");

    $("#awayNamePlayer" + i).html("<p>" + game.computerTeam.bench["player" + i].name + "</p>");
    $("#awayOffensePlayer" + i).html("<p>" + game.computerTeam.bench["player" + i].offense + "</p>");
    $("#awayStaminaPlayer" + i).html("<p>" + game.computerTeam.bench["player" + i].stamina + "/" + game.computerTeam.bench["player" + i].originalStamina + "</p>");
  }
}

function compCheckStamina() {
  let subIn = "player" + (Game.random(3) + 3);

  Object.keys(game.computerTeam.active).forEach(key => {
    if (game.computerTeam.active[key].stamina < 3 && game.computerTeam.timeouts > 0) {
      game.computerSub(key, subIn);
      game.computerTeam.timeouts--;
      game.computerTeam.energize();
    }
  });
}

function startGame() {
    interval = setInterval(() => {
    if(game.play()) {
      clearInterval();
      $("#timer").text("0:00");
    } else {
      clearSubForm();
      repopulate();
      $("#timer").text("Time Remaining: " + game.durationMins + ":" + game.durationSecs);
      $("#quarters").text("Quarter: " + game.quarters);
      $("#homeScore").text("Home Team: " + game.playerTeam.score);
      $("#awayScore").text("Away Team: " + game.computerTeam.score);
      $("#timeouts").text("You have " + game.playerTeam.timeouts + " timeouts remaining.");
      $("#comp-timeouts").text("The away team has " + game.computerTeam.timeouts + " timeouts remaining.");
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
      game.computerTeam.benchEnergize();
      game.playerTeam.benchEnergize();
      compCheckStamina();
    }
  }, 2000);
}

function pauseGame() {
  clearInterval(interval);
}

function clearSubForm() {
  $("#active-players").html("");
  $("#bench-players").html("");
}


$(document).ready(function() {

  $("#set-teams").click(function(){
    populateTeams();

    $("#home-offense").text("Offense: " + game.playerTeam.calculateTeamOffense());
    $("#home-stamina").text("Stamina: " + game.playerTeam.calculateTeamStamina());
    $("#away-offense").text("Offense: " + game.computerTeam.calculateTeamOffense());
    $("#away-stamina").text("Stamina: " + game.computerTeam.calculateTeamStamina());

    repopulate();

    $("#start-game").attr("disabled", false);
    $("#set-teams").attr("disabled", true);
  });

  $("#start-game").click(function() {
    startGame();
    $("#start-game").attr("disabled", true);
    $("#call-timeout").attr("disabled", false);
  });

  $("#call-timeout").click(function() {
    if (game.playerTeam.timeouts === 0) {
      alert("You dont have timeouts left!");
    } else {
      pauseGame();
      game.callTimeOut();
      $("#start-game").attr("disabled", false);
      $("#call-timeout").attr("disabled", true);
      $("#substitute").attr("disabled", false);
    }
  });

  $("#substitute").click(function() {
    $("#start-game").attr("disabled", true);
    $("#substitute").attr("disabled", true);
    $(".substitute").show();
  });

  $("#sub-form").submit(function(event) {
    event.preventDefault();
    let subout = $("#active-players").val();
    let subin = $("#bench-players").val();
    game.playerTeam.substitute(subout, subin);
    clearSubForm();
    repopulate();
    $(".substitute").hide();
    $("#start-game").attr("disabled", false);
  });

});
