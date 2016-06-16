angular.module('halzaPortalAppApp').factory('userService', ['$http', function ($http){

	var urlGetProfile = 'http://192.168.190.92:3002/api/Account/GetUser';
	var urlUpdateProfile = 'http://192.168.190.92:3002/api/Account/EditProfile';
	var userServices = {};
    var separator = "$$$$$";

	userServices.getProfile = function(data) {
        return $http.get(urlGetProfile, data);
    };

    userServices.updateProfile = function(data) {

    	var fd = new FormData();
        if(data.photoFile != undefined){
            fd.append('Photo', data.photoFile);
        }
    	fd.append('Email', data.email);
    	fd.append('FullName', data.fullName);
        fd.append('IsFemale', data.isFemale);
        fd.append('HospitalAddress', data.officeAddress.join(separator));
        fd.append('HospitalPhoneNumber', data.phones.join(separator));
        fd.append('MedicalEducation', data.medicalEducations.join(separator));
        fd.append('MedicinePracticeArea', data.practiceAreas.join(separator));
        fd.append('Award', data.awards.toString());
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