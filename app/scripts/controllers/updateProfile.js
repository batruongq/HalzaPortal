'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:UpdateProfileCtrl
 * @description
 * # UpdateProfileCtrl
 * Controller of the halzaPortalAppApp
 */
 angular.module('halzaPortalAppApp')
 .controller('UpdateProfileCtrl', ['$scope', '$http', 'user', 'userService', 'fileReader',
   function ($scope, $http, user, userService, fileReader) {

     var userDatas = user.data;

     $scope.userProfiles = {};
     $scope.userProfiles.photo = "http://192.168.190.92:3002" + userDatas.Photo;
     $scope.userProfiles.email = userDatas.Email;
     $scope.userProfiles.fullName = userDatas.FullName;
     $scope.userProfiles.isFemale = userDatas.IsFemale;
     $scope.userProfiles.phones = [];
     $scope.userProfiles.officeAddress = [];
     $scope.userProfiles.practiceAreas = [];
     $scope.userProfiles.medicalEducations = [];
     $scope.userProfiles.awards = [];
     var separator = "$$$$$";

     if(userDatas.HospitalPhoneNumber != null){
      $scope.userProfiles.phones = userDatas.HospitalPhoneNumber.split(separator);
    }
    if(userDatas.HospitalAddress != null){
      $scope.userProfiles.officeAddress = userDatas.HospitalAddress.split(separator);
    }
    if(userDatas.MedicinePracticeArea != null){
      $scope.userProfiles.practiceAreas = userDatas.MedicinePracticeArea.split(separator);
    }
    if(userDatas.MedicalEducation != null){
      $scope.userProfiles.medicalEducations = userDatas.MedicalEducation.split(separator);
    }
    if(userDatas.Award != null){
      $scope.userProfiles.awards = userDatas.Award.split(separator);
    }

    $scope.isAddPhoneNumber = false;
    $scope.isAddNewOffice = false;
    $scope.isAddMedicinePracticeArea = false;
    $scope.isAddMedicalEducations = false;
    $scope.isAddAward = false;
    
    $scope.addNewOffice = function(office) {
      if($scope.userProfiles.officeAddress.indexOf(office) === -1){
        $scope.userProfiles.officeAddress.push(office);
        $scope.newOffice = '';
      }
      else{
        $scope.officeExist = true;
      }
    }

    $scope.openAddNewOffice = function(){
      $scope.isAddNewOffice = ! $scope.isAddNewOffice;
      $scope.newOffice = '';
      $scope.officeExist = false;
    }

    $scope.addNewPhone = function(phone) {
      if($scope.userProfiles.phones.indexOf(phone) === -1){
        $scope.userProfiles.phones.push(phone);
        $scope.newPhone = '';
      }
      else{
        $scope.phoneExist = true;
      }
    }

    $scope.openAddNewPhone = function(){
      $scope.isPhoneNumber = ! $scope.isPhoneNumber;
      $scope.newPhone = '';
      $scope.phoneExist = false;
    }

    $scope.addNewPracticeArea = function(practiceArea) {
      $scope.userProfiles.practiceAreas.push(practiceArea);
      $scope.newPracticeArea = '';
    }
    $scope.addNewMedicalEducation = function(medicalEducation) {
      $scope.userProfiles.medicalEducations.push(medicalEducation);
      $scope.newMedicalEducation = '';
    }
    $scope.addNewAward = function(award) {
      $scope.userProfiles.awards.push(award);
      $scope.newAward = '';
    }

    $scope.changePhotoProfile = function (input) {
      $scope.$apply(function() {
        var file = input.files[0];
        
        $scope.userProfiles.photoFile = file;

        fileReader.readAsDataUrl(file, $scope)
        .then(function(result) {
          $scope.userProfiles.photo = result;
        });
      });
    };

    $scope.updateProfile = function(profile){
      userService.updateProfile(profile);
    }
    
    }]);