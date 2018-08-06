import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function populateTeams() {
  let team1 = [];
  let team2 = [];

  for(let i = 0; i < 12; i++) {
    if(i < 6) {
      team1.push(buildPlayers());
    } else {
      team2.push(buildPlayers());
    }
  }

  let teams = [];
  teams.push(team1);
  teams.push(team2);

  return teams;
}

$(document).ready(function() {

  $("#button").click(function(){
    let teams = populateTeams();
    let userTeam = teams[0];
    let computerTeam = teams[1];
  });

  

});
