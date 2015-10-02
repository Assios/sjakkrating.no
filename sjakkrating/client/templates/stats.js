Template.stats.onRendered(function() {

  delete Session.keys["filter_object"];

});

Template.stats.helpers({
  number_of_players: function() {
    return Players.find().count();
  },

  number_of_clubs: function() {
    return Clubs.find().count();
  },

  average_rating: function() {
    total = 0;

    Players.find().map(function(p) {
      total += p.elo;
    });

    return Math.round(total/Players.find().count());
  },

  average_age: function() {
    var year = new Date().getFullYear()
    total_age = 0;

    Players.find().map(function(p) {
      total_age += (year-p.year_of_birth);
    });

    return Math.round(total_age/Players.find().count());  
  },

  genderRatio: function() {
      male = Players.find({gender: 'M'}).count();
      female = Players.find({gender: 'F'}).count();

      return {
          credits: false,
          chart: {
              plotBorderWidth: null,
              plotShadow: false
          },
          title: {
            text: ""
          },
          tooltip: {
              pointFormat: '<b>{point.y}</b>'
          },
          plotOptions: {
              pie: {
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      },
                      connectorColor: 'silver'
                  }
              }
          },
          series: [{
              type: 'pie',
              name: 'Kjønn',
              data: [
                  {name: 'Menn', y: male},
                  {name: 'Kvinner', y: female}
              ]
          }]
      };
  }
});
