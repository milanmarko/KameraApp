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
          "point": parseInt(point),
          "team": team
        }
    };
      
    $.ajax(settings).done((response) => {
        scoreboardSet(response.home, response.away);
    });
}
function reset(){
    if (confirm('Biztos törölni szeretné az eddigi pontokat?')){
        var settings = {
            "url": "api/reset/",
            "method": "POST",
            "timeout": 0,
        };
          
        $.ajax(settings).done((response) => {
            scoreboardSet(response.home, response.away);
        });
    }
}
function undo(){
    var settings = {
        "url": "api/undo/",
        "method": "POST",
        "timeout": 0,
    };
      
    $.ajax(settings)
    .done(function (response) {
        scoreboardSet(response.home, response.away);
    })
    .fail(function (response) {
        alert("Nincs több visszavonható pont!");
    });
}