function scoreboardSet(home, away){
    $("#homeScore").text(home);
    $("#awayScore").text(away);
}
function pointAdd(team, point){
    var settings = {
        "url": "api/",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "point": point,
          "team": team
        }
    };
      
    $.ajax(settings).done(function (response) {
        scoreboardSet(response.home, response.away);
    });
}
function reset(){
    var settings = {
        "url": "api/reset/",
        "method": "POST",
        "timeout": 0,
    };
      
    $.ajax(settings).done(function (response) {
        scoreboardSet(response.home, response.away);
    });
}