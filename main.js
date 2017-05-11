"use strict"

$(function() {
    d3.csv('data/prepped_data.csv', function(error, data) {
        // Nest your data *by region* using d3.nest()
        var nestedData = d3.nest()
            .key(function(d) {return "world"})
            .key(function(d) {
                return d.region;
            })
            .entries(data);

        var myChart = CirclePack()

        myChart.count("gdp").leafTitle("country").rootTitle("region").diameter(1000).colorScheme("rainbow").colorDomain(2).showCount(true)

        var chartWrapper = d3.select('#vis')
                .attr("height", 10000) // Arbitrarily so that circlepack has enough space
                .attr("width", 10000)
                .data(nestedData) 
                .call(myChart); 
    })
})