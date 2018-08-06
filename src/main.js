import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#button").click(function(){
    for(let i = 0; i < 12; i++) {
      buildPlayers();
    }
  });
});
