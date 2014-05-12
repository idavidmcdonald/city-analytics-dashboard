(function(){
  "use strict"
  var root = this,
      $ = root.jQuery;
  if(typeof root.matrix === 'undefined'){ root.matrix = {} }

  var content = {
    pages: [],
    $el: false,

    endpoint: function(){
      return "/realtime?ids=ga:56899021&metrics=rt%3Apageviews&dimensions=rt%3ApageTitle&max-results=10&sort=-rt%3Apageviews"
    },
    parseResponse: function(data){
      var i, _i;

      content.pages = [];
      for(i=0,_i=data.rows.length; i<_i; i++){
        content.pages.push({
          title: data.rows[i][0],//.split(' — ').slice(0,-1).join(' - '),
          visits: data.rows[i][1]
          //displayHits: root.matrix.numberWithCommas(data.rows[i].week2),
          //percentageUp: root.matrix.numberWithCommas(Math.round(data.rows[i].percent_change)) + "%"
        });
        console.log(content.pages)
      }

      content.displayResults();
    },
    displayResults: function(){
      matrix.template(content.$el, 'content-results', { pages: content.pages.slice(0,10) });
    },
    init: function(){
      content.$el = $('#content');

      content.reload();
      window.setInterval(content.reload, 60e3 * 60 * 12); // refresh every 12 hours
    },
    reload: function(){
      var endpoint = content.endpoint();

      $.ajax({ dataType: 'json', url: endpoint, success: content.parseResponse});
    }
  };

  root.matrix.content = content;
}).call(this);
