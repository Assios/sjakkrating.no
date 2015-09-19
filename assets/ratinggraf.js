$(function () {
    $('#container').highcharts({
        title: {
            text: 'Ratinggraf',
            x: -20 //center
        },
        xAxis: {
            categories: ['Jan 2012', 'Apr 2012', 'Jun 2012', 'Sept 2012', 'Jan 2013', 'Apr 2013', 'Jun 2013', 'Sept 2013', 'Jan 2014', 'Apr 2014', 'Jun 2014', 'Sept 2014', 'Jan 2015', 'Apr 2015', 'Sept 2015']
        },
        yAxis: {
            title: {
                text: 'Elo'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Offisiell elo',
            data: [1730, 1632, 1890, 2200, 2213, 2217, 2350, 2320, 2400, 2290, 2340, 1810, 2500, 2502, 2600]
        }]
    });
});