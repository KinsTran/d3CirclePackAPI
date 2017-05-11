// Circle pack
var CirclePack = function() {

  // Global Variables with set defaults
  var diameter = 500,
      margin = {
        left: 70,
        bottom: 50,
        top: 30,
        right: 10
      },
      count = "",
      leafTitle = "",
      rootTitle,
      colorDomain = 4,
      showCount = true
      opacity = .75,
      transitionTime = 1000,
      colorScheme = 'plasma',
      d3colorScheme = d3.interpolatePlasma;

  var chart = function(selection) {
    selection.each(function(data) {

      // Handles user selection of color scheme.
      switch(colorScheme) {
        case 'viridis':
          d3colorScheme = d3.interpolateViridis;
          break;
        case 'inferno':
          d3colorScheme = d3.interpolateInferno;
          break;
        case 'magma':
          d3colorScheme = d3.interpolateMagma;
          break;
        case 'plasma':
          d3colorScheme = d3.interpolatePlasma;
          break;
        case 'warm':
          d3colorScheme = d3.interpolateWarm;
          break;
        case 'cool':
          d3colorScheme = d3.interpolateCool;
          break;
        case 'rainbow':
          d3colorScheme = d3.interpolateRainbow;
          break;
        case 'cubehelixdefault':
          d3colorScheme = d3.interpolateCubehelixDefault;
          break;
      }

      // Create the color scheme
      var color = d3.scaleSequential(d3colorScheme)
      .domain([0, colorDomain]);

      var ele = d3.select(this);
      var svg = ele.selectAll('svg').data([data]);

      // Add a cicle to hold the data that is currently being processes.
      var svgEnter = svg.enter()
        .append('svg')
        .attr('width', diameter)
        .attr('height', diameter);

      // pack format courtesy of d3
      var pack = d3.pack()
        .size([diameter, diameter])
        .padding(2);

      // Format the data
      var data = data.values;
      console.log(data);
      var root = d3.hierarchy({
        values: data
      }, function(d) {
        return d.values;
      });
      root.sum(function(d) {
          return +d[count];
      }).sort(function(a, b) {
          return b.value - a.value;
      });

      pack(root);

      // Add tips for the nodes. Contains some condtitional logic to add the tip based on the
      // type of the node.
      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        if (d.parent == null) {
          if (rootTitle.length > 0) {
            return "<span style='color:white'>" + rootTitle + "</span>";
          } else {return;};
        } else if (d.data[leafTitle] == null) {
            return "<span style='color:white'>" + d.data.key + "</span>";
          } else {
            if (showCount) {
              return "<span style='color:white'>" + d.data[leafTitle] + ": " + d.data[count] + "</span>";
            }
            return "<span style='color:white'>" + d.data[leafTitle] + "</span>";
          };
        })
      // add the tip
      svgEnter.call(tip);

      // add the nodes
      var nodes = svgEnter.selectAll('.node').data(root.descendants());

      nodes.enter()
          .append('circle')
          .style("fill", "none")
          .style('fill-opacity', opacity)
          .attr('transform', function(d) {return 'translate(' + diameter / 2 + ',' + diameter / 2 +')';})
          .attr('transform', function(d) {return 'translate(' + d.y + ',' + d.x +')';})
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          //.merge(nodes)
          .transition().duration((d) => ((d.depth + 1) * transitionTime))
          .style("fill", function(d) { return color(d.depth); })
          .attr('class', 'node')
          .attr('r', function(d) {return d.r;});
    });
  };


  // Getter/setter methods to change locally scoped settings
  chart.diameter = function(value) {
      if (!arguments.length) return diameter;
      diameter = value;
      return chart;
  };

  chart.count = function(value) {
    if (!arguments.length) return count;
    count = value;
    return chart;
  }

  chart.leafTitle = function(value) {
    if (!arguments.length) return leafTitle;
    leafTitle = value;
    return chart;
  }

  chart.rootTitle = function(value) {
    if (!arguments.length) return rootTitle;
    rootTitle = value;
    return chart;
  }

  chart.colorDomain = function(value) {
    if (!arguments.length) return colorDomain;
    colorDomain = value;
    return chart;
  }

  chart.showCount = function(value) {
    if (!arguments.length) return showCount;
    showCount = value;
    return chart;
  }

  chart.opacity = function(value) {
    if (!arguments.length) return opacity;
    opacity = value;
    return chart;
  }

  chart.transitionTime = function(value) {
    if (!arguments.length) return transitionTime;
    transitionTime = value;
    return chart;
  }

  chart.colorScheme = function(value) {
    if (!arguments.length) return colorScheme;
    colorScheme = value.toLowerCase();
    return chart;
  }

  return chart;
};
