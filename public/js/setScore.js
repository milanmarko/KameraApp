function setAccourateScore() {
    var settings = {
        "url": "api/setAccourateScore/",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "home": parseInt($("#homeScoreSet").val()),
          "away": parseInt($("#awayScoreSet").val())
        }
    };
      
    $.ajax(settings).done(function (response) {
        document.location.href = "/";
    });
}