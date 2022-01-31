var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "b0adb430053d4b7cad96b557e4b7ea3a");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
        $('#searchResults').show();
    })
    .fail(function () {
      alert("error");
    });
}

function searchSubmit(e) {
    if (e.keyCode == 13) {
        apiSearch();
    }
}

function changeBackground() {
    $.ajax({
        url: 'http://www.colr.org/json/scheme/random',
        type: "GET",
        dataType: 'jsonp',
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(""));
        },
    })
        .done(function (data) {
            let colours = data.schemes[0].colors;
            if (parseInt(colours[0].substring(0, 2)) < 50) {
                document.getElementById("query").style.color = "#808080";
            } else {
                document.getElementById("query").style.color = "#202020";
            }
            for (var i = 0; i < colours.length; i++) {
                colours[i] = "#" + colours[i];
            }
            let gradient = `linear-gradient( 140deg, ${colours})`;
            document.body.style.backgroundImage = gradient;
            document.getElementById("search-button").style.backgroundColor = colours[0];
            document.getElementById("time-button").style.backgroundColor = colours[1] ? colours[1] : colours[0];
        }).fail(function (error) {
            console.log(error);
        })
}

function openTime() {
    var d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "am";
    if (hr > 12) {
        hr -= 12;
        ampm = "pm";
    }
    var time = '<h2>' + hr + ':' + min + ' ' + ampm + '</h2>';
    $("#time").html(time);
    $("#time").dialog();
}