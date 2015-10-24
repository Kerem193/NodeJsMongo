var testApp = angular.module('testApp', []);

var host = "http://" + window.location.host;

testApp.controller('studentanlegenCtrl', function($scope,$http){
   
    var name;
    var mnr;
    var email;
    var gdatum;
    var note;
    
    $scope.abschicken = function() {
        
        var daten = {};
        
        name = $scope.name;
        mnr = $scope.mnr;
        email = $scope.email;
        gdatum = JSON.stringify($scope.gdatum);
        note = $scope.note;
        
        daten["name"] = name;
        daten["mnr"] = mnr;
        daten["email"] = email;
        daten["gdatum"] = substrGdatum(gdatum);
        daten["note"] = note;
        
        $http.post(host + "/studentanlegen", daten).then(function(data) {
			
				console.log(data);
		});
        
    }
    
    $scope.holen = function() {
        
        console.log("war hier");
                
        $http.get(host + "/studentholen").then(function(data) {
           
            $scope.besterStudent = data.data.name;
            
            console.log(data.data);
        });
        
    }
    
});


function substrGdatum(gdatum) {
    
    var neuDatum;
    
    neuDatum = gdatum.substr(1,10);
    
    return neuDatum;
    
}