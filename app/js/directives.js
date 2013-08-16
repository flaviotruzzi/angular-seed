'use strict';

/* Directives */


angular.module('myApp.directives', [])
	.directive('mychart', function() {
		return {
			restrict: 'A',
			template: '<div  id="test"><p>{{ config }}</p></div>',
            scope: {
                config : '=',
                filtered : '='
            },
			link: function(scope, elem, attr) {

                var drawChart = function(column1, column2, series, title, width, height) {
                    // Create the data table.
                    var data = new google.visualization.DataTable();
                    data.addColumn(column1[0], column1[1]);
                    data.addColumn(column2[0], column2[1]);

                    data.addRows(series);

                    // Set chart options
                    var options = {'title': title,
                        'width': width,
                        'height': height};

                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.PieChart(document.getElementById('test'));
                    chart.draw(data, options);
                };

                var doStuff = function() {
                    console.log(scope.config);
                  }

            //    scope.$watch(scope.filtered, doStuff);


                drawChart(
                    scope.config["column1"],
                    scope.config["column2"],
                    scope.config["series"],
                    scope.config["title"],
                    scope.config["width"],
                    scope.config["height"]);
			}
		}
	});