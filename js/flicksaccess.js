/* ==========================================================================
 * Template: FLKTeam Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLKTeam Access JS
 * Email: 
 * Date : 11/1/2017
 * ========================================================================== */

/**
 * flicksCtrl Controller
 */

//app.controller('flicksController', function($scope, $http, API_URL) {
//    
//});



//app.controller('flicksController', ['$scope', 'defaultService', 'DTOptionsBuilder', function ($scope, defaultService, DTOptionsBuilder) {
app.controller('flicksController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];

    $scope.Modules = [];
    /**
     * Onload
     * @param {type} val
     * @returns {undefined}
     */
    $scope.initModules = function (val) {
        $scope.loadModules(val);
    };
    /**
     * onChange
     */
    $scope.loadModules = function(user_application_id){
       $scope.UserApplicationModule = [];
       urlPath = '/' + urlPrefix + 'access/regional-state/fetch';
       params = { user_application_id : user_application_id };
       defaultService.allPostRequests(urlPath, params)
       .then(function(resp){
           //console.log('Fetched State: '+ JSON.stringify(resp));
           if(resp.length > 0){
              angular.forEach(resp, function(obj){
                  //console.log('Fetched State Iterated: '+ JSON.stringify(obj));
                  $scope.UserApplicationModule.push(obj);
              });
           }
           else{
               var msg = "Unable to get the list of state for the selected country, please try again";
//               FlicksApp.handlemsgtoast(resp.msg,"error");
            }
       })
       .then(function(error){
          if(typeof error != 'undefined'){
              console.log('An error ocuured: ' + JSON.stringify(error));
          }
       });
    };
    
    $scope.initTasks = function (val) {
       $scope.loadTasks(val);
    };    
    /**
     * onChange
     */
    $scope.loadTasks = function(user_application_module_id){
       $scope.UserApplicationTask = [];
       urlPath = '/' + urlPrefix + 'basic/regional-area/fetch';
       params = { user_application_module_id : user_application_module_id };
       defaultService.allPostRequests(urlPath, params).then(function(resp){
           if(resp.length > 0){
              angular.forEach(resp, function(obj){
                  $scope.UserApplicationTask.push(obj);
              });
           }
           else{
               var msg = "Unable to get user application task for the selected module, please try again";
//               FlicksApp.handlemsgtoast(resp.msg,"error");
            }
       })
       .then(function(error){
          if(typeof error != 'undefined'){
              console.log('An error ocuured: ' + JSON.stringify(error));
          }
       });
    },
    //----- add user type ---- //
    $scope.addUserType = function () {
        
        if ($scope.frmuserttype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { table_name: $scope.utype.table_name,
                           table_title: $scope.utype.table_title,
                           mactive: $scope.utype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserttype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/add-user-type';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuserttype')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                    $scope.frmuserttype.$invalid = false;
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit user type ----- //
    $scope.editUserType = function ($id) {
        
        if ($scope.frmuserttype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { table_name: $scope.utype.table_name,
                           table_title: $scope.utype.table_title,
                           mactive: $scope.utype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserttype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/edit-user-type/'+$id;
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                }
                $scope.frmuserttype.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

    //----- add user access group ---- //
    $scope.addUserAccessGroup = function () {
        
        if ($scope.frmuseraccessgroup.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { user_access_group: $scope.useraccessgroup.user_access_group,
                           user_access_group_description: $scope.useraccessgroup.user_access_group_description,
                           mactive: $scope.useraccessgroup.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuseraccessgroup.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/add-user-access-group';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuseraccessgroup')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                    $scope.frmuseraccessgroup.$invalid = false;
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Group');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Group');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit user access group ----- //
    $scope.editUserAccessGroup = function ($id) {
        
        if ($scope.frmuseraccessgroup.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
             var params = { user_access_group: $scope.useraccessgroup.user_access_group,
                           user_access_group_description: $scope.useraccessgroup.user_access_group_description,
                           mactive: $scope.useraccessgroup.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuseraccessgroup.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/edit-user-access-group/'+$id;
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                }
                $scope.frmuseraccessgroup.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Access Group');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };   
    
    //----- add user application ---- //
    $scope.addUserApplication = function () {
        
        if ($scope.frmuserapplication.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }
        else if($scope.uapp.icon == " --- Please Select --- ") { 
            $scope.errors.push({'icon' : ['Select one icon']});
            $scope.frmuserapplication.$invalid = true;
            return;
        } 
        else { 
            var mactive = ($scope.uapp.mactive == "") && (!$scope.uapp.mactive) ? false : true
            var params = { user_application: $scope.uapp.user_application,
                           user_application_description: $scope.uapp.user_application_description,
                           icon: $scope.uapp.icon,
                           mactive: $scope.uapp.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplication.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/add-user-application';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuserapplication')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                    $scope.frmuserapplication.$invalid = false;
                    //console.log('An error occurred: ' + JSON.stringify(resp.errors));
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Application');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

    //---- edit user application ----- //
    $scope.editUserApplication = function ($id) {
        
        if ($scope.uapp.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } 
        else if($scope.uapp.icon == " --- Please Select --- ") { 
            $scope.errors.push({'icon' : ['Select one icon']});
            $scope.frmuserapplication.$invalid = true;
            return;
        }
        else { 
            var mactive = ($scope.uapp.mactive == "") && (!$scope.uapp.mactive) ? false : true
            var params = { user_application: $scope.uapp.user_application,
                           user_application_description: $scope.uapp.user_application_description,
                           icon: $scope.uapp.icon,
                           mactive: $scope.uapp.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplication.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/edit-user-application/'+$id;
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                }
                $scope.frmuserapplication.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Application');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Edit User Application');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
        //----- add user application module---- //
    $scope.addUserApplicationModule = function () {
        
        if ($scope.frmuserapplicationmodule.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }
        else if($scope.uapp.icon == " --- Please Select --- ") { 
            $scope.errors.push({'icon' : ['Select one icon']});
            $scope.frmuserapplicationmodule.$invalid = true;
            return;
        } 
        else { 
            //var mactive = ($scope.uapp.mactive == "") && (!$scope.uapp.mactive) ? false : true
            var params = { user_application_module: $scope.uapp.user_application_module,
                           user_application_module_description: $scope.uapp.user_application_module_description,
                           icon: $scope.uapp.icon,
                           //mactive: $scope.uapp.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationmodule.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/add-user-application-module';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuserapplicationmodule')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                    $scope.frmuserapplicationmodule.$invalid = false;
                    //console.log('An error occurred: ' + JSON.stringify(resp.errors));
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Module');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Module');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

    //---- edit user application module ----- //
    $scope.editUserApplicationModule = function ($id) {
        
        if ($scope.uapp.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } 
        else if($scope.uapp.icon == " --- Please Select --- ") { 
            $scope.errors.push({'icon' : ['Select one icon']});
            $scope.frmuserapplicationmodule.$invalid = true;
            return;
        }
        else { 
            var mactive = ($scope.uapp.mactive == "") && (!$scope.uapp.mactive) ? false : true
            var params = { user_application_module: $scope.uapp.user_application_module,
                           user_application_module_description: $scope.uapp.user_application_module_description,
                           icon: $scope.uapp.icon,
                           mactive: $scope.uapp.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationmodule.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/edit-user-application-module/'+$id;
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                }
                $scope.frmuserapplication.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Application Module');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Module');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
            //----- add user application task---- //
    $scope.addUserApplicationTask = function () {
        
        if ($scope.frmUserApplicationTask.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }
        else if($scope.uapp.icon == " --- Please Select --- ") { 
            $scope.errors.push({'icon' : ['Select one icon']});
            $scope.frmUserApplicationTask.$invalid = true;
            return;
        } 
        else {
            var mactive = ($scope.uapp.mactive == "") && (!$scope.uapp.mactive) ? false : true
            var params = { user_application_task: $scope.uapp.user_application_task,
                           user_application_task_description: $scope.uapp.user_application_task_description,
                           icon: $scope.uapp.icon,
                           mactive: $scope.uapp.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationtask.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/add-user-application-task';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuserapplicationtask')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                    $scope.frmuserapplicationtask.$invalid = false;
                    //console.log('An error occurred: ' + JSON.stringify(resp.errors));
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Application task');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application task');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

    //---- edit user application task ----- //
    $scope.editUserApplicationTask = function ($id) {
        
        if ($scope.uapp.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } 
        else if($scope.uapp.icon == " --- Please Select --- ") { 
            $scope.errors.push({'icon' : ['Select one icon']});
            $scope.frmuserapplicationtask.$invalid = true;
            return;
        }
        else { 
            var mactive = ($scope.uapp.mactive == "") && (!$scope.uapp.mactive) ? false : true
            var params = { user_application_task: $scope.uapp.user_application_task,
                           user_application_task_description: $scope.uapp.user_application_task_description,
                           icon: $scope.uapp.icon,
                           mactive: $scope.uapp.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationtask.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/edit-user-application-task/'+$id;
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    //swal('Error', resp.msg, 'error');
                    var errors = JSON.parse(resp.errors);
                    $scope.errors.push(errors);
                }
                $scope.frmuserapplication.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Application task');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application task');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

//    
//    $scope.dtOptions = DTOptionsBuilder.newOptions()
//        .withDOM('<"html5buttons"B>lTfgitp')
//        .withButtons([
//            {extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'ExampleFile'},
//            {extend: 'pdf', title: 'ExampleFile'},
//
//            {extend: 'print',
//                customize: function (win){
//                    $(win.document.body).addClass('white-bg');
//                    $(win.document.body).css('font-size', '10px');
//
//                    $(win.document.body).find('table')
//                        .addClass('compact')
//                        .css('font-size', 'inherit');
//                }
//            }
//        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.persons = [
        {
            id: '1',
            firstName: 'Monica',
            lastName: 'Smith'
        },
        {
            id: '2',
            firstName: 'Sandra',
            lastName: 'Jackson'
        },
        {
            id: '3',
            firstName: 'John',
            lastName: 'Underwood'
        },
        {
            id: '4',
            firstName: 'Chris',
            lastName: 'Johnatan'
        },
        {
            id: '5',
            firstName: 'Kim',
            lastName: 'Rosowski'
        }
    ];
}]);