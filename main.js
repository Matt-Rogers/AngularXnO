var game = angular.module("Game", []);

game.controller('gameCtrl', function($scope){
	$scope.currentplayer = "Player1";
	$scope.player1played = [];
	$scope.player2played = [];
	$scope.totSpacePlayed = [];
	$scope.win = false;
	$scope.stale = false;
	$scope.winMessage = '';
	$scope.reloadPage = function(){window.location.reload();}
	$scope.spacePlayed = function(message){
		if ($scope.currentplayer === "Player1"){
				if($scope.totSpacePlayed.indexOf(message) > -1){ alert ("Space already played");
				}else{
					$scope.player1played.push(message);
					$scope.totSpacePlayed.push(message)
					$scope.win = checkWin($scope.player1played);
				};	
			}
		if ($scope.currentplayer === "Player2"){
				if($scope.totSpacePlayed.indexOf(message) > -1){ alert ("Space already played");
				}else{
					$scope.player2played.push(message);
					$scope.totSpacePlayed.push(message);
					$scope.win = checkWin($scope.player2played);
				};	
			}
	}
	checkWin = function(arr){
		var winArr = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]; 
		for(var i = 0; i < winArr.length; i++){
			var count = 0; 
			for(var j = 0; j < winArr[0].length; j++){
				for(var k = 0; k < arr.length; k++){
					if( arr[k] === winArr[i][j]){
						count ++;
						if(count ===3){
							$scope.winMessage = $scope.currentplayer + " you are the winrar";
							return true;
							}
						}
					}
				}
			}
			console.log(arr.length);
			console.log(winArr.length);
		if(arr.length == 5){
			$scope.stale = true;}
			console.log($scope.stale);
		return false;
	}

})

game.directive('gamespace', function(){
	var controller = function($scope) {
		$scope.clicked = false; 
	};
	return{
		restrict: "E",
		replace: 'true', 
		scope: {
			currentplayer: '=',
			positionplayed: '&'
		},
		controller: controller, 
		template: 	"<div class='spaceWrapper' ng-class='{answer:clicked}' ng-click='selectSpace(); positionplayed({message:value})'></div>",
		link: function(scope,elem ){
			var clicked = false;
			scope.selectSpace = function(){
				if(!scope.clicked){
					if (scope.currentplayer === 'Player1'){
						elem.addClass("red");
						console.log(scope.currentplayer);
						scope.currentplayer = 'Player2'; 
						console.log(scope.currentplayer);
					}
				else{
						elem.addClass("blue");
						scope.currentplayer = 'Player1'; 
					}
					scope.clicked = true; 
				};
			}
		}
	}
});

game.directive('gameovermessage', function(){
	return{
		restrict: 'E',
		replace: 'true',
		
		template: "<div class='alert alert-success' ng-if='displayWinner()'>{{winMessage}} <button type='button' class='btn btn-default' ng-click='reloadPage()'> Replay?</button></div>",
		link: function(scope){
			scope.displayWinner = function(){
				if(scope.win === true) {
					scope.currentplayer = 'random';
					return true; };

			}
		}
	}
});

game.directive('stalemate', function(){
	return{
		restrict: 'E',
		replace: 'true',

		template: "<div class='alert alert-danger' ng-show='stale'> Everbody loses </div>"
	}
});