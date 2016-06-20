'use strict';

/**
 * @ngdoc function
 * @name halzaPortalAppApp.controller:UpdateProfileCtrl
 * @description
 * # UpdateProfileCtrl
 * Controller of the halzaPortalAppApp
 */
 angular.module('halzaPortalAppApp')
 .controller('UpdateProfileCtrl', ['$scope', '$http', '$timeout', 'user', 'userService', 'fileReader', 'urlConfig','SweetAlert',
   function ($scope, $http, $timeout, user, userService, fileReader, urlConfig,SweetAlert) {

     var userDatas = user.data;
     $scope.userProfiles = {};
     $scope.userProfiles.photo = urlConfig.apiServer + userDatas.Photo;
     $scope.userProfiles.email = userDatas.Email;
     $scope.userProfiles.fullName = userDatas.FullName;
     $scope.userProfiles.isFemale = userDatas.IsFemale;
     $scope.userProfiles.phones = [];
     $scope.userProfiles.officeAddress = [];
     $scope.userProfiles.practiceAreas = [];
     $scope.userProfiles.medicalEducations = [];
     $scope.userProfiles.awards = [];
     var separator = "$$$$$";
     $scope.isLoading = false;

     $scope.showSaveErrorMessage = false;
     $scope.showSaveSuccesMessage = false;
     $scope.showAddSuccesMessage = false;

     $scope.successAddMsg = "The data added successfully";
     $scope.successSaveMsg = "The data saved successfully";
     $scope.errorSaveMsg = "The data saved unsuccessfully";

     if(userDatas.HospitalPhoneNumber != null && userDatas.HospitalPhoneNumber != "" ){
      $scope.userProfiles.phones = userDatas.HospitalPhoneNumber.split(separator);
    }
    if(userDatas.HospitalAddress != null && userDatas.HospitalAddress != ""){
      $scope.userProfiles.officeAddress = userDatas.HospitalAddress.split(separator);
    }
    if(userDatas.MedicinePracticeArea != null && userDatas.MedicinePracticeArea != ""){
      $scope.userProfiles.practiceAreas = userDatas.MedicinePracticeArea.split(separator);
    }
    if(userDatas.MedicalEducation != null && userDatas.MedicalEducation != ""){
      $scope.userProfiles.medicalEducations = userDatas.MedicalEducation.split(separator);
    }
    if(userDatas.Award != null && userDatas.Award != ""){
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
        $scope.isAddNewOffice = ! $scope.isAddNewOffice;
        showAddSuccesMessage();
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
        $scope.isAddPhoneNumber = ! $scope.isAddPhoneNumber;
        showAddSuccesMessage();
      }
      else{
        $scope.phoneExist = true;
      }
    }

    $scope.openAddNewPhone = function(){
      $scope.isAddPhoneNumber = ! $scope.isAddPhoneNumber;
      $scope.newPhone = '';
      $scope.phoneExist = false;
    }

    $scope.addNewPracticeArea = function(practiceArea) {
      if($scope.userProfiles.practiceAreas.indexOf(practiceArea) === -1){
        $scope.userProfiles.practiceAreas.push(practiceArea);
        $scope.newPracticeArea = '';
        $scope.isAddMedicinePracticeArea = ! $scope.isAddMedicinePracticeArea;
        showAddSuccesMessage();
      }
      else{
        $scope.practiceAreaExist = true;
      }
    }

    $scope.openAddNewPracticeArea = function(){
      $scope.isAddMedicinePracticeArea = ! $scope.isAddMedicinePracticeArea;
      $scope.newPracticeArea = '';
      $scope.practiceAreaExist = false;
    }

    $scope.addNewMedicalEducation = function(medicalEducation) {
      if($scope.userProfiles.medicalEducations.indexOf(medicalEducation) === -1){
        $scope.userProfiles.medicalEducations.push(medicalEducation);
        $scope.newMedicalEducation = '';
        $scope.isAddMedicalEducations = ! $scope.isAddMedicalEducations;
        showAddSuccesMessage();
      }
      else{
        $scope.medicalEducationExist = true;
      }
    }

    $scope.openAddNewMedicalEducation = function(){
      $scope.isAddMedicalEducations = ! $scope.isAddMedicalEducations;
      $scope.newMedicalEducation = '';
      $scope.medicalEducationExist = false;
    }

    $scope.addNewAward = function(award) {
      if($scope.userProfiles.awards.indexOf(award) === -1){
        $scope.userProfiles.awards.push(award);
        $scope.newAward = '';
        $scope.isAddAward = ! $scope.isAddAward;
        showAddSuccesMessage();
      }
      else{
        $scope.awardExist = true;
      }
    }

    $scope.openAddNewAward = function(){
      $scope.isAddAward = ! $scope.isAddAward;
      $scope.newAward = '';
      $scope.awardExist = false;
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
      if(profile.fullName == null){
        profile.fullName = "";
      }
      $scope.isLoading = true;
      userService.updateProfile(profile, function(){
        $scope.isLoading = false;
        showSaveSuccesMessage();
      }, function(){
        $scope.isLoading = false;
        showSaveErrorMessage();
      });
    };

    function showAddSuccesMessage(){
      $scope.showAddSuccesMessage = true;
      $timeout(function(){
        $scope.showAddSuccesMessage = false;
      }, 3000);
    };

    function showSaveSuccesMessage(){
      $scope.showSaveSuccesMessage = true;
      $timeout(function(){
        $scope.showSaveSuccesMessage = false;
      }, 3000);
    }

    function showSaveErrorMessage(){
      $scope.showSaveErrorMessage = true;
      $timeout(function(){
        $scope.showSaveErrorMessage = false;
      }, 3000);
    }



    $scope.confirmSave = function(profile) {
      SweetAlert.swal({
       title: "Are you sure to save the data?",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Yes",
       cancelButtonText: "No",
       closeOnConfirm: true,
       closeOnCancel: true},
       function(isConfirm){
        if (isConfirm) {
          if(profile.fullName == null){
            profile.fullName = "";
          }
          $scope.isLoading = true;
          userService.updateProfile(profile, function(){
            $scope.isLoading = false;
            showSaveSuccesMessage();
          }, function(){
            $scope.isLoading = false;
            showSaveErrorMessage();
          });
        }

      });
    };

  }]);
