
  $.getJSON("https://yts.ag/api/v2/list_movies.json", function(json) {
      var div = document.getElementById("moviediv");
      var movies = json.data.movies;
      for (i = 0; i < movies.length && i < 10; i++) {
          div.innerHTML = div.innerHTML +
              "<a href=\"" + movies[i].url + "\"><img id=\"" + i + "\" src=\"" + movies[i].large_cover_image + "\" height=\"320px\"/></a>";
      }
      resize();
  });



  var div = document.getElementById("header");

  // if(Cookies.get('quote')==undefined){
  if(typeof Cookies.get('quote') === 'undefined'){
  $.getJSON("http://quotes.rest/qod.json", function(json) {
      // var div = document.getElementById("quotediv");
      div.innerHTML = json.contents.quotes[0].quote  + " - " + json.contents.quotes[0].author;
      console.log(div.innerHTML);
      console.log(document.cookie);
      console.log(new Date());
      Cookies.set('quote',div.innerHTML, { expires: 0.2 });

  });
  }else{
  div.innerHTML = Cookies.get('quote');
  console.log("cookie is set")
  }







  function startTime() {
      var today=new Date();
      var h=today.getHours();
      var m=today.getMinutes();
      var s=today.getSeconds();
      h = checkTime(h);
      m = checkTime(m);
      s = checkTime(s);
      document.getElementById("clock").innerHTML = h+":"+m+":"+s;
      var t = setTimeout(function(){startTime()},500);
  }

  function checkTime(i) {
      if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
  }

  function handleQuery(e, q) { // Handle search query
      var key = e.keyCode || e.which;
      if (key == 13) { // enter
          window.location = "https://google.com/search?q=" + q;
      }
  }

  function resize() {
      var div = document.getElementById("moviediv");
      for (i = 0; i < 10; i++) {
          var movie = document.getElementById(i);
          if (movie != null) {
              movie.style.display = "inline";
              if (document.documentElement.clientWidth <= (screen.width/2) && i > 5) {
                  movie.style.display = "none";
                  movie.style.width = (div.style.width/3-1)+"px";
              } else if (document.documentElement.clientWidth > (screen.width/2) && i > 10) {
                  movie.style.display = "none";
                  movie.style.width = (div.style.width/5-1)+"px";
              }
          }
      }
  }
  window.onresize = function() {
      resize();
  };
  startTime();
