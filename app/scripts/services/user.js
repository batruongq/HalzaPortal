angular.module('halzaPortalAppApp').factory('userService', ['$http', function ($http){

	var urlGetProfile = 'http://192.168.190.92:3001/api/Account/GetUser';
	var urlUpdateProfile = 'http://192.168.190.92:3001/api/Account/EditProfile';
	var userServices = {};

	userServices.getProfile = function(data) {
        return $http.get(urlGetProfile, data);
    };

    userServices.updateProfile = function(data) {

    	var fd = new FormData();
    	fd.append('Photo', data.photo);
    	fd.append('UserName', "test1@gmail.com");
    	fd.append('FullName', "testFullName");
    	fd.append('HospitalAddress', "TestHospitalAddress");
    	fd.append('HospitalPhoneNumber', "0973370124");
    	fd.append('MedicalEducation', 'MedicalEducation');
    	fd.append('Award', 'Award');
        return $http.post(urlUpdateProfile, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    };

	return userServices;
}]);