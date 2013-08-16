'use strict';



angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$location', function($scope, $location) {
	$scope.active = 'active';
  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl3', [function() {

  }])
  .controller('MyCtrl4', [function() {

  }])
  .controller('MyCtrl5', [function() {

  }])      
  .controller('MyCtrl6', [function() {

  }])  
  .controller('MyCtrl7', [function() {

  }])  
  .controller('navController', ['$scope', '$location', function($scope, $location) {

  	$scope.getNav = function(path) {
  		if ($location.path().substr(0, path.length) == path) {  			
  			return "active"
  		} else {
  			return ""
  		}
  	};
  }])
  .controller('chartCtrl', ['$scope', function($scope, sharedProperties) {
        $scope.chartConfig = {
            "column1" : ['string', 'Senator'],
            "column2" : ['number', 'Dinheiro'],
            "series" : [['test', 1], ['test2', 2]],
            "title" : "Senator battle",
            "width" : 400,
            "height" : 300,
            "test" : $scope.filtered
        };

  }])
  .controller('senatorController', ['$scope', '$http', function($scope, $http) {  

  	$http.get('senadores/senadores.json').success(function(data) {
  		$scope.senadores = data;
  	});
  	$scope.filtered = [];
  	$scope.orderProp = 'id';

  	$scope.pRsenator = function(senator) {
  		// var index = $scope.filtered.indexOf(senator);
  		var index = $scope.findWithAttr($scope.filtered, 'id', senator.id);
  		if (index > -1) {
  			$scope.filtered.splice(index, 1);
        $scope.updateChart($scope);
  		} else {
  			$http.get('senadores/' + senator.id + '.json').success(function(data) {
  				senator.data = data[0].data;
          $scope.filtered.push(senator);
          $scope.updateChart($scope);
  			});
  		}
  	};

    $scope.updateChart = function($scope) {
      var dataa = [];
      for (var i = 0; i < $scope.filtered.length; i++) {
        dataa.push([$scope.filtered[i].name, $scope.filtered[i].data]);
      };
      //drawChart(dataa);
      if (dataa.length > 0) {
        $scope.showPlot = true;
      } else {
        $scope.showPlot = false;
      }
    };

  	$scope.findWithAttr = function (array, attr, value) {
  	    for(var i = 0; i < array.length; i += 1) {
  	        if(array[i][attr] === value) {
  	            return i;
  	        }
  	    }
  	};	
    //$scope.updateChart($scope);
  }]);

//function drawChart(dataa) {
//	// Create the data table.
//	var data = new google.visualization.DataTable();
//	data.addColumn('string', 'Topping');
//	data.addColumn('number', 'Slices');
//
//	data.addRows(dataa);
//
//	// Set chart options
//	var options = {'title':'How Much Pizza I Ate Last Night',
//	               'width':400,
//	               'height':300};
//
//	// Instantiate and draw our chart, passing in some options.
//	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
//  chart.draw(data, options);
//};