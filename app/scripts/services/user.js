angular.module('halzaPortalAppApp').factory('userService', ['$http', 'urlConfig', function ($http, urlConfig){

	var userServices = {};
    var separator = "$$$$$";

	userServices.getProfile = function() {
        return $http.get(urlConfig.getProfile);
    };

    userServices.updateProfile = function(data, callback, errorCallback) {

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
        return $http.post(urlConfig.updateProfile, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            if(callback){
                callback();
            }
        })
        .error(function(){
            if(errorCallback){
                errorCallback();
            }
        });
    };

    return userServices;
}]);