
angular.module('halzaPortalAppApp')
.directive("addbuttonsbutton", function(){
	return {
		restrict: "AE",
		template: "<button addbuttons class='btn btn-default btn-sm'><span class='glyphicon glyphicon-plus'></span></button>"
	}
});

angular.module('halzaPortalAppApp')
.directive("addbuttons", ['$compile', function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
				angular.element(document.getElementById('space-for-add-info'))
				.append($compile("<div class=\"well frmAddProfile\"> " +
				      			"<form id=\"frmAddPhoneNumber\" name =\"frmAddPhoneNumber\" > " + 
									"<div class=\"form-group\">" + 
										"<input ng-model=\"user.phoneNumber\" placeholder=\"Input your phone number here\" class=\"form-control\" name =\"phoneNumber\" /> " +
									"</div> " +
									"<div class=\"form-group\">" +
										"<button class=\"btn btn-success\">Add</button> " + 
									"</div>"+

								"</form></div>")(scope));
		});
	};
}]);