/**

 * @createdBy: FLKTeam
 * @dateOfCreation: **18th January, 2017**
 * @email:
 *
 */

//var app = angular.module('flicksApps', [])
//        .constant('API_URL', 'http://localhost/angulara/public/api/v1/');


//(function(){'datatables','datatables.buttons'
var app = angular.module('flicksApps', ['datatables', 'datatables.buttons', 'ngFileUpload', 'ngSanitize']);

app.constant("AppConstants", {
    "MAX_VIDEO_SIZE": "2GB",
    "MAX_IMAGE_SIZE": "2MB"
})
//--- local --- //
//var urlPrefix = 'al-halal/';
//--- online --- //
var urlPrefix = '';
/**
 * Global configuration
 *
 */
app.run(function ($rootScope, $http, defaultService, AppConstants) {
    $rootScope.prefixUrl = urlPrefix;
    $rootScope.constants = AppConstants;
    $rootScope.RegionalAreas = [];
    $rootScope.RegionalAreaSpouses = [];
    $rootScope.RegionalAreaSponsors = [];
    $rootScope.Departments = [];
    $rootScope.AcademicCourseOptionStandards = [];
    $rootScope.RegionalStates = [];
    $rootScope.RegionalStateSpouses = [];
    $rootScope.RegionalStateSponsors = [];
    $rootScope.UserApplicationModules = [];
    $rootScope.AcademicFaculties = [];
    $rootScope.AcademicFaculties2 = [];
    $rootScope.AcademicDepartments = [];
    $rootScope.AcademicDepartments2 = [];
    $rootScope.AcademicModeEntries = [];
    $rootScope.AcademicModeEntries2 = [];
    $rootScope.AcademicModestudies = [];
    $rootScope.AcademicModeStudies = [];
    $rootScope.AcademicModeStudies2 = [];
    $rootScope.ProgAcademicModeStudy = [];
    $rootScope.ProgAcademicModeStudy2 = [];
    $rootScope.AcademicLevels = [];
    $rootScope.AcademicLevels2 = [];
    $rootScope.AcademicProgrammeCentres = [];
    $rootScope.AcademicProgrammeCentres2 = [];
    $rootScope.OlevelExams = [];
    $rootScope.OlevelExams2 = [];
    $rootScope.Titles = [];
    $rootScope.DegreeClasses = [];
    $rootScope.AcademicProgrammeBySession = [];
    $rootScope.AcademicProgrammeBySession2 = [];
    $rootScope.AcademicCourseOptions = [];
    $rootScope.AcademicCourseOptions2 = [];
    $rootScope.SessionStream = [];
    $rootScope.SessionStream2 = [];
    $rootScope.AcademicSemesterBySessionStreamProgramme = [];
    $rootScope.AcademicSummerSemesterBySessionStreamProgramme = [];
    $rootScope.AcademicSemesterBySession = [];
    $rootScope.AdmissionCourses = [];
    $rootScope.AdmissionCourses2 = [];
    $rootScope.StudentCategories = [];
    $rootScope.StudentCategories2 = [];
    $rootScope.AcademicCourseLecturers = [];
    $rootScope.AcademicCourseLecturers2 = [];
    $rootScope.AcademicCourseAdmins = [];
    $rootScope.AcademicCourseAdmins2 = [];
    $rootScope.FacultyProvostStaffs = [];
    $rootScope.ProgrammeDirectorStaffs = [];
    $rootScope.ProgrammeAdmissionOfficerStaffs = [];
    $rootScope.CourseOptionHeadStaffs = []
    $rootScope.DepartmentHODStaffs = [];
    $rootScope.SchoolDeanStaffs = [];
    $rootScope.LevelAdviserStaffs = [];
    $rootScope.CourseOptionStandardByProgrammes = [];
    $rootScope.showStudentCategory = false;
    $rootScope.showRecommendationStatus = false;

    //  -------------------------- Gender Title   ---------------------------------------
    $rootScope.initTitle = function (val) {
        $rootScope.loadTitle(val);
    };

    /**
     * onChange to load Academic Programme Centre
     */
    $rootScope.titleloader = false;
    $rootScope.loadTitle = function (gender_id) {
        $rootScope.Titles = [];
        urlPath = '/' + urlPrefix + 'basic/title/fetch';
        params = {gender_id: gender_id};
        $rootScope.titleloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.Titles.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of title, please try again";
                }
                $rootScope.titleloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Academic   Programme Centre   ---------------------------------------
    $rootScope.initAcademicProgrammeCentre = function (val) {
        $rootScope.loadAcademicProgrammeCentre(val);
    };

    /**
     * onChange to load Academic Programme Centre
     */
    $rootScope.academidprogrammecentreloader = false;
    $rootScope.loadAcademicProgrammeCentre = function (academic_programme_id) {
        $rootScope.AcademicProgrammeCentres = [];
        urlPath = '/' + urlPrefix + 'academic/programme-centre/fetch';
        params = {academic_programme_id: academic_programme_id};
        $rootScope.academidprogrammecentreloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicProgrammeCentres.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic level, please try again";
                }
                $rootScope.academidprogrammecentreloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Applicant Programme Centre   ---------------------------------------
    $rootScope.initProgrammeCall = function (val, obj_name) {
        $rootScope.loadApplicantProgrammeCentre(val, obj_name);
        $rootScope.loadAcademicModeEntry(val, obj_name);
        $rootScope.initProgAcademicModeStudy(val, obj_name);
    };

    $rootScope.initApplicantProgrammeCentre = function (val, obj_name, use_programme_centres) {
        if(val > 0)
            $rootScope.loadApplicantProgrammeCentre(val, obj_name, use_programme_centres);
    };

    $rootScope.loadApplicantProgrammeCentre = function (academic_programme_id, obj_name, use_programme_centres) {
        if (typeof obj_name != 'undefined' && Boolean(obj_name))
            $rootScope.AcademicProgrammeCentres2 = [];
        else
            $rootScope.AcademicProgrammeCentres = [];

        var use_programme_centres = use_programme_centres ? use_programme_centres : 0;

        urlPath = '/' + urlPrefix + 'applicant/programme-centre/fetch';
        params = {academic_programme_id: academic_programme_id, use_programme_centres:use_programme_centres};
        $rootScope.academidprogrammecentreloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.acadProgCenters.length > 0) {
                    angular.forEach(resp.acadProgCenters, function (obj) {
                        if (typeof obj_name != 'undefined' && Boolean(obj_name))
                            $rootScope.AcademicProgrammeCentres2.push(obj);
                        else
                            $rootScope.AcademicProgrammeCentres.push(obj);
                    });
                    $rootScope.showStudentCategory = resp.stdCategory;
                    $rootScope.showRecommendationStatus = resp.recommendationStatus;
                }
                else {
                    var msg = "Unable to get the list of academic programme center, please try again";
                }
                $rootScope.academidprogrammecentreloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Academic Course Option    ---------------------------------------
    $rootScope.initAcademicCourseOptionStandard = function (val) {
        $rootScope.loadAcademicCourseOptionStandard(val);
    };

    /**
     * onChange to load Academic Level
     */
    $rootScope.academiccourseoptionstandardloader = false;
    $rootScope.loadAcademicCourseOptionStandard = function (department_id) {
        $rootScope.AcademicCourseOptionStandards = [];
        urlPath = '/' + urlPrefix + 'academic/academic-course-option-standard/fetchstandard';
        params = {department_id: department_id};
        $rootScope.academiccourseoptionstandardloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicCourseOptionStandards.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic level, please try again";
                }
                $rootScope.academiccourseoptionstandardloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initAcademicCourseOption = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_level_id, obj_name, use_course_option_standards) {
        $rootScope.loadAcademicCourseOption(session_standard_id, stream, academic_programme_id, academic_centre_id, academic_level_id, obj_name, use_course_option_standards);
    };

    /**
     * onChange to load Academic Level
     */
    $rootScope.academiccourseoptionloader = false;
    $rootScope.loadAcademicCourseOption = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_level_id, obj_name, use_course_option_standards) {
        if (typeof obj_name != 'undefined' && Boolean(obj_name))
            $rootScope.AcademicCourseOptions2 = [];
        else
            $rootScope.AcademicCourseOptions = [];

        var use_course_option_standards = use_course_option_standards ? use_course_option_standards : 0;

        urlPath = '/' + urlPrefix + 'load/course-option/fetch-by-level';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id, academic_level_id: academic_level_id, use_course_option_standards:use_course_option_standards};
        $rootScope.academiccourseoptionloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined' && Boolean(obj_name))
                            $rootScope.AcademicCourseOptions2.push(obj);
                        else
                            $rootScope.AcademicCourseOptions.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic course options, please try again";
                }
                $rootScope.academiccourseoptionloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initAcademicCourseOptionbyModeEntry = function (session_standard_id, stream, academic_programme_id, mode_entry_id, mode_study_id, prog_centre_id) {
        if(session_standard_id > 0 && stream > 0 && academic_programme_id > 0 && mode_entry_id > 0 && mode_study_id > 0 && prog_centre_id > 0)
            $rootScope.loadAcademicCourseOptionbyModeEntry(session_standard_id, stream, academic_programme_id, mode_entry_id, mode_study_id, prog_centre_id);
    };

    /**
     * onChange to load Academic Level
     */
    $rootScope.academiccourseoptionloader = false;
    $rootScope.loadAcademicCourseOptionbyModeEntry = function (session_standard_id, stream, academic_programme_id, mode_entry_id, mode_study_id, prog_centre_id) {
        $rootScope.AcademicCourseOptions = [];
        urlPath = '/' + urlPrefix + 'load/course-option/fetch-by-mode-entry';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_mode_entry_id: mode_entry_id, academic_mode_study_id: mode_study_id, academic_programme_centre_id: prog_centre_id};
        $rootScope.academiccourseoptionloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicCourseOptions.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic course options, please try again";
                }
                $rootScope.academiccourseoptionloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Onload
     * @param {type} val
     * @returns {undefined}
     */
    $rootScope.initDepartment = function (val) {
        $rootScope.loadDepartment(val);
    };

    /**
     * onChange
     */
    $rootScope.loadDepartment = function (faculty_id) {
        $rootScope.Departments = [];
        urlPath = '/' + urlPrefix + 'admission/olevel-subject/fetchdepartment';
        params = {faculty_id: faculty_id};
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log('Fetched State: '+ JSON.stringify(resp));
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        //console.log('Fetched State Iterated: '+ JSON.stringify(obj));
                        $rootScope.Departments.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of departments for the selected faculty, please try again";
//               FlicksApp.handlemsgtoast(resp.msg,"error");
                }
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };


    $rootScope.populateComboVal = function (obj_name, obj_val) {
        if (typeof obj_val == 'undefined') {
            switch (obj_name) {
                case 'rs_basic':
                    $rootScope.RegionalStates = [];
                    break;
                case 'rs_spouse':
                    $rootScope.RegionalStateSpouses = [];
                    break;
                case 'rs_sponsor':
                    $rootScope.RegionalStateSponsors = [];
                    break;
                case 'ra_basic':
                    $rootScope.RegionalAreas = [];
                    break;
                case 'ra_spouse':
                    $rootScope.RegionalAreaSpouses = [];
                    break;
                case 'ra_sponsor':
                    $rootScope.RegionalAreaSponsors = [];
                    break;
                case 'ol_basic':
                    $rootScope.OlevelExams = [];
                    break;
                case 'ol_2':
                    $rootScope.OlevelExams2 = [];
                    break;
            }
        }else{
            switch (obj_name) {
                case 'rs_basic':
                    $rootScope.RegionalStates.push(obj_val);
                    break;
                case 'rs_spouse':
                    $rootScope.RegionalStateSpouses.push(obj_val);
                    break;
                case 'rs_sponsor':
                    $rootScope.RegionalStateSponsors.push(obj_val);
                    break;
                case 'ra_basic':
                    $rootScope.RegionalAreas.push(obj_val);
                    break;
                case 'ra_spouse':
                    $rootScope.RegionalAreaSpouses.push(obj_val);
                    break;
                case 'ra_sponsor':
                    $rootScope.RegionalAreaSponsors.push(obj_val);
                    break;
                case 'ol_basic':
                    $rootScope.OlevelExams.push(obj_val);
                    break;
                case 'ol_2':
                    $rootScope.OlevelExams2.push(obj_val);
                    break;
            }
        }
    };

    /**
     * Onload
     * @param {type} val
     * @returns {undefined}
     */
    $rootScope.initRegionalState = function (val, obj_name) {
        $rootScope.loadRegionalState(val, obj_name);
    };


    /**
     * onChange
     */
    // $rootScope.titleloader = false;
    $rootScope.loadRegionalState = function (regional_country_id, obj_name) {

        if (typeof obj_name != 'undefined')
            $rootScope.populateComboVal(obj_name);
        else
            $rootScope.populateComboVal('rs_basic');

        if (typeof regional_country_id == 'undefined')
            return false;

        urlPath = '/' + urlPrefix + 'basic/regional-state/fetch';
        params = {regional_country_id: regional_country_id};
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log('Fetched State: '+ JSON.stringify(resp));
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        //console.log('Fetched State Iterated: '+ JSON.stringify(obj));
                        if (typeof obj_name != 'undefined')
                            $rootScope.populateComboVal(obj_name, obj);
                        else
                            $rootScope.populateComboVal('rs_basic', obj);
                       // $rootScope.RegionalStates.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of regional states for the selected country, please try again";
//               FlicksApp.handlemsgtoast(resp.msg,"error");
                }
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Onload
     * @param {type} val
     * @returns {undefined}
     */
    $rootScope.initRegionalArea = function (val, obj_name) {
        $rootScope.loadregionalarea(val, obj_name);
    };

    /**
     * onChange
     */
    $rootScope.loadregionalarea = function (regional_state_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.populateComboVal(obj_name);
        else
            $rootScope.populateComboVal('ra_basic');

        if (typeof regional_state_id == 'undefined')
            return false;

        //$rootScope.RegionalAreas = [];
        urlPath = '/' + urlPrefix + 'basic/regional-area/fetch';
        params = {regional_state_id: regional_state_id};
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.populateComboVal(obj_name, obj);
                        else
                            $rootScope.populateComboVal('ra_basic', obj);
                       // $rootScope.RegionalAreas.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of regional areas for the selected state, please try again";
//               FlicksApp.handlemsgtoast(resp.msg,"error");
                }
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Onload User Application Module
     * @param {type} val
     * @returns {undefined}
     */
    $rootScope.initUserApplicationModule = function (val) {
        $rootScope.loadUserApplicationModule(val);
    };

    /**
     * onChange to load User Application Module
     */
    $rootScope.moduleloader = false;
    $rootScope.loadUserApplicationModule = function (user_application_id) {
        $rootScope.UserApplicationModules = [];
        urlPath = '/' + urlPrefix + 'access/user-application-module/fetch';
        params = {user_application_id: user_application_id};
        $rootScope.moduleloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.UserApplicationModules.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of user application module, please try again";
                }
                $rootScope.moduleloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };


    $rootScope.initAcademicFaculty = function (session_standard_id, stream, academic_programme_id, academic_centre_id, obj_name) {
        if(session_standard_id > 0 && stream > 0 && academic_programme_id > 0 && academic_centre_id > 0)
            $rootScope.loadAcademicFaculty(session_standard_id, stream, academic_programme_id, academic_centre_id, obj_name);
    };

    /**
     * onChange to load Academic Faculty
     */
    $rootScope.facultyloader = false;
    $rootScope.loadAcademicFaculty = function (session_standard_id, stream, academic_programme_id, academic_centre_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicFaculties2 = [];
        else
            $rootScope.AcademicFaculties = [];
        urlPath = '/' + urlPrefix + 'employee/faculty/fetch';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id};
        $rootScope.facultyloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicFaculties2.push(obj);
                        else
                            $rootScope.AcademicFaculties.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic faculty, please try again";
                }
                $rootScope.facultyloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occured: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initAcademicFacultyUsingFaculty = function (session_standard_id, stream, academic_programme_id, academic_centre_id, standard_faculty_id, obj_name) {
        if(session_standard_id > 0 && stream > 0 && academic_programme_id > 0 && academic_centre_id > 0 && standard_faculty_id > 0)
            $rootScope.loadAcademicFacultyUsingFaculty(session_standard_id, stream, academic_programme_id, academic_centre_id, standard_faculty_id, obj_name);
    };

    /**
     * onChange to load Academic Faculty
     */
    $rootScope.facultyloader = false;
    $rootScope.loadAcademicFacultyUsingFaculty = function (session_standard_id, stream, academic_programme_id, academic_centre_id, standard_faculty_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicFaculties2 = [];
        else
            $rootScope.AcademicFaculties = [];
        urlPath = '/' + urlPrefix + 'employee/faculty/fetch-by-faculty';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id,standard_faculty_id:standard_faculty_id};
        $rootScope.facultyloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicFaculties2.push(obj);
                        else
                            $rootScope.AcademicFaculties.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic faculty, please try again";
                }
                $rootScope.facultyloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occured: ' + JSON.stringify(error));
                }
            });
    };


    // ---------------------------Academic Department--------------------------------
    $rootScope.initAcademicDepartment = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_faculty_id, obj_name) {
        if(session_standard_id > 0 && stream > 0 && academic_programme_id > 0 && academic_centre_id > 0 && academic_faculty_id > 0)
            $rootScope.loadAcademicDepartment(session_standard_id, stream, academic_programme_id, academic_centre_id, academic_faculty_id, obj_name);
    };
    /**   * onChange to load Academic Department  */
    $rootScope.departmentloader = false;
    $rootScope.loadAcademicDepartment = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_faculty_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicDepartments2 = [];
        else
            $rootScope.AcademicDepartments = [];
        urlPath = '/' + urlPrefix + 'employee/department/fetch';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id, academic_faculty_id: academic_faculty_id};
        $rootScope.departmentloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicDepartments2.push(obj);
                        else
                            $rootScope.AcademicDepartments.push(obj);
                    });
                } else {
                    var msg = "Unable to get the list of academic department, please try again";
                }
                $rootScope.departmentloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occured: ' + JSON.stringify(error));
                }
            });
    };

    // ---------------------------Academic Department using standard department--------------------------------
    $rootScope.initAcademicDepartmentUsingDepartment = function (session_standard_id, stream, academic_programme_id, academic_centre_id, standard_department_id, obj_name) {
        if(session_standard_id > 0 && stream > 0 && academic_programme_id > 0 && academic_centre_id > 0 && standard_department_id > 0)
            $rootScope.loadAcademicDepartmentUsingDepartment(session_standard_id, stream, academic_programme_id, academic_centre_id, standard_department_id, obj_name);
    };
    /**   * onChange to load Academic Department  */
    $rootScope.departmentloader = false;
    $rootScope.loadAcademicDepartmentUsingDepartment = function (session_standard_id, stream, academic_programme_id, academic_centre_id, standard_department_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicDepartments2 = [];
        else
            $rootScope.AcademicDepartments = [];
        urlPath = '/' + urlPrefix + 'employee/department/fetch-by-department';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id, standard_department_id:standard_department_id };
        $rootScope.departmentloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicDepartments2.push(obj);
                        else
                            $rootScope.AcademicDepartments.push(obj);
                    });
                } else {
                    var msg = "Unable to get the list of academic department, please try again";
                }
                $rootScope.departmentloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occured: ' + JSON.stringify(error));
                }
            });
    };

    // ---------------------------Academic Department using standard faculty--------------------------------
    $rootScope.initAcademicDepartmentUsingFaculty = function (session_standard_id, stream, academic_programme_id, academic_centre_id, standard_faculty_id, obj_name) {
        if(session_standard_id > 0 && stream > 0 && academic_programme_id > 0 && academic_centre_id > 0 && standard_faculty_id > 0)
            $rootScope.loadAcademicDepartmentUsingFaculty(session_standard_id, stream, academic_programme_id, academic_centre_id, standard_faculty_id, obj_name);
    };
    /**   * onChange to load Academic Department  */
    $rootScope.departmentloader = false;
    $rootScope.loadAcademicDepartmentUsingFaculty = function (session_standard_id, stream, academic_programme_id, academic_centre_id, standard_faculty_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicDepartments2 = [];
        else
            $rootScope.AcademicDepartments = [];
        urlPath = '/' + urlPrefix + 'employee/department/fetch-by-faculty';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id, standard_faculty_id:standard_faculty_id };
        $rootScope.departmentloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicDepartments2.push(obj);
                        else
                            $rootScope.AcademicDepartments.push(obj);
                    });
                } else {
                    var msg = "Unable to get the list of academic department, please try again";
                }
                $rootScope.departmentloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occured: ' + JSON.stringify(error));
                }
            });
    };


    // ---------------------------load  Department on change programme--------------------------------
    $rootScope.initFacultyDepartment = function (val) {
        $rootScope.loadFacultyDepartment(val);
    };
    $rootScope.loadFacultyDepartment = function (academic_programme_id) {
        $rootScope.AcademicDepartments = [];
        urlPath = '/' + urlPrefix + 'employee/department/prog/fetch';
        params = {academic_programme_id: academic_programme_id};
        $rootScope.departmentloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicDepartments.push(obj);
                    });
                } else {
                    var msg = "Unable to get the list of academic department, please try again";
                }
                $rootScope.departmentloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };


    //  -------------------------- Academic Mode of Study    ---------------------------------------
    $rootScope.initAcademicModeStudy = function (val, obj_name) {
        if(val > 0)
            $rootScope.loadAcademicModeStudy(val, obj_name);
    };

    /**
     * onChange to load Academic Mode Study
     */
    $rootScope.modestudyloader = false;
    $rootScope.loadAcademicModeStudy = function (academic_department_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicModeStudies2 = [];
        else
            $rootScope.AcademicModeStudies = [];
        urlPath = '/' + urlPrefix + 'academic/academic-mode-study-standard/fetch';
        params = {academic_department_id: academic_department_id};
        $rootScope.modestudyloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicModeStudies2.push(obj);
                        else
                            $rootScope.AcademicModeStudies.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic mode of entry, please try again";
                }
                $rootScope.modestudyloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Academic Level    ---------------------------------------
    $rootScope.initAcademicLevel = function (val, obj_name) {
        $rootScope.loadAcademicLevel(val, obj_name);
    };

    /**
     * onChange to load Academic Level
     */
    $rootScope.academiclevelloader = false;
    $rootScope.loadAcademicLevel = function (academic_mode_study_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicLevels2 = [];
        else
            $rootScope.AcademicLevels = [];
        urlPath = '/' + urlPrefix + 'academic/academic-level-standard/fetch';
        params = {academic_mode_study_id: academic_mode_study_id};
        $rootScope.academiclevelloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicLevels2.push(obj);
                        else
                            $rootScope.AcademicLevels.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic level, please try again";
                }
                $rootScope.academiclevelloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Academic Level by Programme    ---------------------------------------
    $rootScope.initAcademicLevelByProgramme = function (academic_programme_id, academic_faculty_id, academic_department_id, academic_mode_study_id, hostel_config_id) {
        $rootScope.loadAcademicLevelByProgramme(academic_programme_id, academic_faculty_id, academic_department_id, academic_mode_study_id, hostel_config_id);
    };

    /**
     * onChange to load Academic Level by Programme
     */
    $rootScope.academiclevelloader = false;
    $rootScope.loadAcademicLevelByProgramme = function (academic_programme_id, academic_faculty_id, academic_department_id, academic_mode_study_id, hostel_config_id) {
        $rootScope.AcademicLevels = [];
        urlPath = '/' + urlPrefix + 'academic/academic-level-standard/fetch-by-programme';
        params = {academic_programme_id : academic_programme_id, academic_faculty_id : academic_faculty_id, academic_department_id: academic_department_id, academic_mode_study_id: academic_mode_study_id, hostel_config_id: hostel_config_id};
        $rootScope.academiclevelloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicLevels.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic level, please try again";
                }
                $rootScope.academiclevelloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Olevel Exam    ---------------------------------------
    $rootScope.initOlevelExam = function (val, obj_name) {
        $rootScope.loadOlevelExam(val, obj_name);
    };

    /**
     * onChange to load Olevel Exam
     */
    $rootScope.olevelexamloader = false;
    $rootScope.loadOlevelExam = function (olevel_exam_type_id, obj_name) {
        //$rootScope.OlevelExams = [];
        if (typeof obj_name != 'undefined')
            $rootScope.populateComboVal(obj_name);
        else
            $rootScope.populateComboVal('ol_basic');

        if (typeof olevel_exam_type_id == 'undefined')
            return false;

        urlPath = '/' + urlPrefix + 'admission/olevel-exam/fetch';
        params = {olevel_exam_type_id: olevel_exam_type_id};
        $rootScope.olevelexamloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        //$rootScope.OlevelExams.push(obj);
                        if (typeof obj_name != 'undefined')
                            $rootScope.populateComboVal(obj_name, obj);
                        else
                            $rootScope.populateComboVal('ol_basic', obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic exams, please try again";
                }
                $rootScope.olevelexamloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Academic Mode of Entry    ---------------------------------------
    $rootScope.initAcademicModeEntry = function (val, obj_name) {
        if(val > 0)
            $rootScope.loadAcademicModeEntry(val, obj_name);
    };

    /**
     * onChange to load Academic Faculty
     */
    $rootScope.modeentryloader = false;
    $rootScope.loadAcademicModeEntry = function (academic_programme_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicModeEntries2 = [];
        else
            $rootScope.AcademicModeEntries = [];

        urlPath = '/' + urlPrefix + 'academic/academic-mode-entry-standard/fetch';
        params = {academic_programme_id: academic_programme_id};
        $rootScope.modeentryloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicModeEntries2.push(obj);
                        else
                            $rootScope.AcademicModeEntries.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic mode of entry, please try again";
                }
                $rootScope.modeentryloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    //  -------------------------- Programme Academic Mode of Study    ---------------------------------------
    $rootScope.initProgAcademicModeStudy = function (val, obj_name) {
        $rootScope.loadProgAcademicModeStudy(val, obj_name);
    };

    /**
     * onChange to load Programme Mode of Study
     */
    $rootScope.progmodestudyloader = false;
    $rootScope.loadProgAcademicModeStudy = function (academic_programme_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.ProgAcademicModeStudy2 = [];
        else
            $rootScope.ProgAcademicModeStudy = [];
        urlPath = '/' + urlPrefix + 'academic/academic-mode-study-standard/programme/fetch';
        params = {academic_programme_id: academic_programme_id};
        $rootScope.progmodestudyloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.ProgAcademicModeStudy2.push(obj);
                        else
                            $rootScope.ProgAcademicModeStudy.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic mode of study, please try again";
                }
                $rootScope.progmodestudyloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Onload
     * @param {type} val
     * @returns {undefined}
     */
    $rootScope.initDegreeClasses = function (val) {
        $rootScope.loadDegreeClasses(val);
    };

    /**
     * onChange
     */

    $rootScope.loadDegreeClasses = function (degree_type_id) {
        $rootScope.DegreeClasses = [];
        urlPath = '/' + urlPrefix + 'basic/degree-class/fetch';
        params = {degree_type_id: degree_type_id};
        $rootScope.dcloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log('Fetched Degree Class: '+ JSON.stringify(resp));
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        //console.log('Fetched Degree Class Iterated: '+ JSON.stringify(obj));
                        $rootScope.DegreeClasses.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of degree classes for the selected degree type, please try again";
                }
                $rootScope.dcloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * onChange to load Admission Course
     */
    $rootScope.courseloader = false;
    $rootScope.loadAdmissionCourse = function (session_standard_id, stream_id, academic_programme_id, academic_mode_entry_id, academic_mode_study_id, programme_center_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AdmissionCourses2 = [];
        else
            $rootScope.AdmissionCourses = [];
        urlPath = '/' + urlPrefix + 'admission/fetch-admission-course-list';
        params = {academic_session_standard_id: session_standard_id, stream : stream_id,
            academic_programme_id: academic_programme_id, academic_mode_entry_id: academic_mode_entry_id,
            academic_mode_study_id: academic_mode_study_id, programme_center_id: programme_center_id
        };
        $rootScope.courseloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AdmissionCourses2.push(obj);
                        else
                            $rootScope.AdmissionCourses.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of courses, please try again";
                }
                $rootScope.courseloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error ocuured: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initAcademicProgrammeBySession = function (val, stream, admission, academic, use_programmes, obj_name, recommendation_status) {
        if(val > 0 /*&& stream > 0*/)
            $rootScope.loadAcademicProgrammeBySession(val, stream, admission, academic, use_programmes, obj_name, recommendation_status);
    };

    $rootScope.loadAcademicProgrammeBySession = function (session_standard_id, stream, admission, academic, use_programmes, obj_name, recommendation_status) {
        //$rootScope.AcademicProgrammeBySession = [];
        var stream_id = stream ? stream : 0;
        var cur_admission = admission ? admission : 0;
        var cur_academic = academic ? academic : 0;
        var use_programmes = use_programmes ? use_programmes : 0;
        var recommendation_status = recommendation_status ? recommendation_status : 0;

        if (typeof obj_name != 'undefined' && Boolean(obj_name)/*obj_name.trim().length > 0*/)
            $rootScope.AcademicProgrammeBySession2 = [];
        else
            $rootScope.AcademicProgrammeBySession = [];

        urlPath = '/' + urlPrefix + 'load/programme/fetch-by-session';
        params = {academic_session_standard_id: session_standard_id, stream : stream_id, cur_admission: cur_admission, cur_academic : cur_academic, use_programmes:use_programmes, recommendation_status:recommendation_status};
        $rootScope.academicprogrammeloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined' && Boolean(obj_name)/*obj_name.trim().length > 0*/)
                            $rootScope.AcademicProgrammeBySession2.push(obj);
                        else
                            $rootScope.AcademicProgrammeBySession.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of programme, please try again";
                }
                $rootScope.academicprogrammeloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initSessionStream = function (val, admission, academic, obj_name) {
        if(val > 0)
        $rootScope.loadSessionStream(val, admission, academic, obj_name);
    };

    $rootScope.loadSessionStream = function (session_standard_id, admission, academic, obj_name) {
        var cur_admission = admission ? admission : 0;
        var cur_academic = academic ? academic : 0;

        if (typeof obj_name != 'undefined')
            $rootScope.SessionStream2 = [];
        else
            $rootScope.SessionStream = [];

        urlPath = '/' + urlPrefix + 'load/stream/fetch-by-session';
        params = {academic_session_standard_id: session_standard_id, cur_admission: cur_admission, cur_academic : cur_academic};
        $rootScope.streamloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.SessionStream2.push(obj);
                        else
                            $rootScope.SessionStream.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of stream, please try again";
                }
                $rootScope.streamloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initAcademicSemesterBySessionStreamProgramme = function (session, stream, programme, summer_status) {
        $rootScope.loadAcademicSemesterBySessionStreamProgramme(session, stream, programme, summer_status);
    };

    $rootScope.loadAcademicSemesterBySessionStreamProgramme = function (session_standard_id, stream, programme_id, summer_status) {
        $rootScope.AcademicSemesterBySessionStreamProgramme = [];
        var summer_status = summer_status ? summer_status : 0;
        urlPath = '/' + urlPrefix + 'load/semester/fetch-by-session-stream-programme';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: programme_id, summer_status: summer_status};
        $rootScope.academicsemesterloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicSemesterBySessionStreamProgramme.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of semester, please try again";
                }
                $rootScope.academicsemesterloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initAcademicSummerSemesterBySessionStreamProgramme = function (session, stream, programme) {
        $rootScope.loadAcademicSummerSemesterBySessionStreamProgramme(session, stream, programme);
    };

    $rootScope.loadAcademicSummerSemesterBySessionStreamProgramme = function (session_standard_id, stream, programme_id) {
        $rootScope.AcademicSummerSemesterBySessionStreamProgramme = [];
        urlPath = '/' + urlPrefix + 'load/semester/fetch-summer-by-session-stream-programme';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: programme_id};
        $rootScope.academicsummersemesterloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicSummerSemesterBySessionStreamProgramme.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of summer semester, please try again";
                }
                $rootScope.academicsummersemesterloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initAcademicSemesterBySession = function (session, semester_id, current_admission, current_semester, student_id, summer_status) {
        $rootScope.loadAcademicSemesterBySession(session, semester_id, current_admission, current_semester, student_id, summer_status);
    };

    $rootScope.loadAcademicSemesterBySession = function (session_id, semester_id, current_admission, current_semester, student_id, summer_status) {
        $rootScope.AcademicSemesterBySession = [];
        if(!session_id) return false;
        var semester_id = semester_id ? semester_id : 0;
        var current_admission = current_admission ? current_admission : 0;
        var current_semester = current_semester ? current_semester : 0;
        var student_id = student_id ? student_id : 0;
        var summer_status = summer_status ? summer_status : 0;

        urlPath = '/' + urlPrefix + 'load/semester/fetch-by-session';
        params = {academic_session_id: session_id, academic_semester_id : semester_id, current_admission : current_admission, current_semester: current_semester, student_id: student_id, summer_status: summer_status};
        $rootScope.academicsemesterloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicSemesterBySession.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of semester, please try again";
                }
                $rootScope.academicsemesterloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.initProgrammeCentreAndSemester = function (session, stream, programme) {
        $rootScope.loadApplicantProgrammeCentre(programme);
        $rootScope.loadAcademicSemesterBySessionStreamProgramme(session, stream, programme)
    };

    $rootScope.initStudentCategory = function (level_id, obj_name) {
        $rootScope.loadStudentCategory(level_id, obj_name);
    };

    $rootScope.loadStudentCategory = function (level_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.StudentCategories2 = [];
        else
            $rootScope.StudentCategories = [];
        if(!level_id) return false;

        urlPath = '/' + urlPrefix + 'load/student-category/fetch-by-level';
        params = {academic_level_id: level_id};
        $rootScope.studentcategoryloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.StudentCategories2.push(obj);
                        else
                            $rootScope.StudentCategories.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of student category, please try again";
                }
                $rootScope.studentcategoryloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Initiate to load Academic Course Lecture
     */
    $rootScope.initAcademicCourseLecturer = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_semester_id, emp_id, obj_name) {
        $rootScope.loadAcademicCourseLecturer(session_standard_id, stream, academic_programme_id, academic_centre_id, academic_semester_id, emp_id, obj_name);
    };

    /**
     * onChange to load Academic Course Lecture
     */
    $rootScope.academiccourselecturerloader = false;
    $rootScope.loadAcademicCourseLecturer = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_semester_id, emp_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicCourseLecturers2 = [];
        else
            $rootScope.AcademicCourseLecturers = [];

        urlPath = '/' + urlPrefix + 'load/employee/fetch-course-lecturer';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id, academic_semester_id: academic_semester_id, employee_id: emp_id};
        $rootScope.academiccourselecturerloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicCourseLecturers2.push(obj);
                        else
                            $rootScope.AcademicCourseLecturers.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic course lecturers, please try again";
                }
                $rootScope.academiccourselecturerloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };
    /**
     * Initiate to load Academic Course Lecture
     */
    $rootScope.initAcademicCourseAdmin = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_semester_id, obj_name) {
        $rootScope.loadAcademicCourseAdmin(session_standard_id, stream, academic_programme_id, academic_centre_id, academic_semester_id, obj_name);
    };

    /**
     * onChange to load Academic Course Lecture
     */
    $rootScope.academiccourseadminloader = false;
    $rootScope.loadAcademicCourseAdmin = function (session_standard_id, stream, academic_programme_id, academic_centre_id, academic_semester_id, obj_name) {
        if (typeof obj_name != 'undefined')
            $rootScope.AcademicCourseAdmins2 = [];
        else
            $rootScope.AcademicCourseAdmins = [];

        urlPath = '/' + urlPrefix + 'load/employee/fetch-course-admin';
        params = {session_standard_id: session_standard_id, stream : stream, academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_centre_id, academic_semester_id: academic_semester_id};
        $rootScope.academiccourseadminloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        if (typeof obj_name != 'undefined')
                            $rootScope.AcademicCourseAdmins2.push(obj);
                        else
                            $rootScope.AcademicCourseAdmins.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic course admin, please try again";
                }
                $rootScope.academiccourseadminloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Initiate to load College Provost
     */
    $rootScope.initFacultyProvostStaff = function (faculty_id, active_status) {
        $rootScope.loadFacultyProvostStaff(faculty_id, active_status);
    };

    /**
     * onChange to load College Provost
     */
    $rootScope.facultyprovoststaffloader = false;
    $rootScope.loadFacultyProvostStaff = function (faculty_id, active_status) {
        $rootScope.FacultyProvostStaffs = [];

        urlPath = '/' + urlPrefix + 'load/employee/fetch-faculty-provost-staff';
        params = {faculty_id: faculty_id, active_status : active_status};
        $rootScope.facultyprovoststaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.FacultyProvostStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of college provost, please try again";
                }
                $rootScope.facultyprovoststaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };
    /**
     * onChange to load Programme Director
     */
    $rootScope.programmedirectorstaffloader = false;
    $rootScope.loadProgrammeDirectorStaff = function (academic_programme_id, active_status) {
        $rootScope.ProgrammeDirectorStaffs = [];
        urlPath = '/' + urlPrefix + 'load/programme/fetch-programme-director-staff';
        params = {academic_programme_id: academic_programme_id, active_status : active_status};
        $rootScope.programmedirectorstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.ProgrammeDirectorStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of Programme Director, please try again";
                }
                $rootScope.programmedirectorstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * onChange to load Programme Director
     */
    $rootScope.programmeadmissionofficerstaffloader = false;
    $rootScope.loadProgrammeAdmissionOfficerStaff = function (academic_programme_id, active_status) {
        $rootScope.ProgrammeAdmissionOfficerStaffs = [];
        urlPath = '/' + urlPrefix + 'load/programme/fetch-programme-admission-officer-staff';
        params = {academic_programme_id: academic_programme_id, active_status : active_status};
        $rootScope.programmeadmissionofficerstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.ProgrammeAdmissionOfficerStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of Programme Director, please try again";
                }
                $rootScope.programmeadmissionofficerstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };
    /**
     * Initiate to load Election Chair
     */


    $rootScope.initElectionChairStudent = function (student_type_id, active_status) {
        $rootScope.loadElectionChairStudent(student_type_id, active_status);
    };

    /**
     * onChange to load Election Chair
     */
    /*$rootScope.electionchairstudentloader = false;
    $rootScope.loadElectionChairStudent = function (student_type_id, active_status) {
        $rootScope.ElectionChairStudents = [];

        urlPath = '/' + urlPrefix + 'load/election/fetch-election-chair-student';
        params = {student_type_id: student_type_id, active_status : active_status};
        $rootScope.electionchairstudentloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.ElectionChairStudents.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of Election Chair, please try again";
                }
                $rootScope.electionchairstudentloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };
*/

    $rootScope.initDepartmentHODStaff = function (department_id, active_status) {
        $rootScope.loadDepartmentHODStaff(department_id, active_status);
    };

    /**
     * onChange to load Department HOD
     */
    $rootScope.departmenthodstaffloader = false;
    $rootScope.loadDepartmentHODStaff = function (department_id, active_status) {
        $rootScope.DepartmentHODStaffs = [];

        urlPath = '/' + urlPrefix + 'load/employee/fetch-department-hod-staff';
        params = {department_id: department_id, active_status : active_status};
        $rootScope.departmenthodstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.DepartmentHODStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of department HOD, please try again";
                }
                $rootScope.departmenthodstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Initiate to load School Dean
     */
    $rootScope.initSchoolDeanStaff = function (academic_school_standard_id, active_status) {
        $rootScope.loadSchoolDeanStaff(academic_school_standard_id, active_status);
    };

    /**
     * onChange to load School Dean
     */
    $rootScope.schooldeanstaffloader = false;
    $rootScope.loadSchoolDeanStaff = function (academic_school_standard_id, active_status) {
        $rootScope.SchoolDeanStaffs = [];

        urlPath = '/' + urlPrefix + 'load/employee/fetch-school-dean-staff';
        params = {academic_school_standard_id: academic_school_standard_id, active_status : active_status};
        $rootScope.schooldeanstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.SchoolDeanStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of school dean, please try again";
                }
                $rootScope.schooldeanstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Initiate to load Course Option Head
     */
    $rootScope.initCourseOptionHeadStaff = function (academic_course_option_standard_id,academic_programme_id, academic_programme_centre_id, active_status) {
        $rootScope.loadCourseOptionHeadStaff(academic_course_option_standard_id,academic_programme_id, academic_programme_centre_id, active_status);
    };

    /**
     * onChange to load Course Option Head
     */
    $rootScope.courseoptionheadstaffloader = false;
    $rootScope.loadCourseOptionHeadStaff = function (academic_course_option_standard_id,academic_programme_id, academic_programme_centre_id, active_status) {
        $rootScope.CourseOptionHeadStaffs = [];

        urlPath = '/' + urlPrefix + 'load/course-option/fetch-course-option-head-staff';
        params = {academic_course_option_standard_id: academic_course_option_standard_id,academic_programme_id: academic_programme_id, academic_programme_centre_id: academic_programme_centre_id, active_status : active_status};
        $rootScope.courseoptionheadstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.CourseOptionHeadStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of course option head, please try again";
                }
                $rootScope.courseoptionheadstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.courseoptionstandardbyprogrammeloader = false;
    $rootScope.loadCourseOptionStandardByProgrammeCenter = function (academic_programme_id, academic_programme_center_id, department_id) {
        $rootScope.CourseOptionStandardByProgrammes = [];

        if (typeof department_id == 'undefined') department_id = 0;

        urlPath = '/' + urlPrefix + 'load/course-option/fetch-course-option-standard-by-programme-center';
        params = {academic_programme_id: academic_programme_id, academic_programme_center_id:academic_programme_center_id, department_id:department_id };
        $rootScope.courseoptionstandardbyprogrammeloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.CourseOptionStandardByProgrammes.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of course option head, please try again";
                }
                $rootScope.courseoptionstandardbyprogrammeloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Initiate to load Academic Programme Head
     */
    $rootScope.initAcademicProgrammeHeadStaff = function (academic_programme_id, active_status) {
        $rootScope.loadAcademicProgrammeHeadStaff(academic_programme_id, active_status);
    };

    /**
     * onChange to load Academic Programme Head
     */
    $rootScope.academicProgrammeHeadstaffloader = false;
    $rootScope.loadAcademicProgrammeHeadStaff = function (academic_programme_id, active_status) {
        $rootScope.AcademicProgrammeHeads = [];

        urlPath = '/' + urlPrefix + 'load/academic/fetch-programme-head-staff';
        params = {academic_programme_id: academic_programme_id, active_status : active_status};
        $rootScope.academicProgrammeHeadstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.AcademicProgrammeHeads.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic programme head, please try again";
                }
                $rootScope.academicProgrammeHeadstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };


    /**
     * Initiate to load College Examination Officer
     */
    $rootScope.initFacultyExamOfficerStaff = function (faculty_id, active_status) {
        $rootScope.loadFacultyExamOfficerStaff(faculty_id, active_status);
    };

    /**
     * onChange to load College Examination Officer
     */
    $rootScope.facultyexamofficerstaffloader = false;
    $rootScope.loadFacultyExamOfficerStaff = function (faculty_id, active_status) {
        $rootScope.FacultyExamOfficerStaffs = [];

        urlPath = '/' + urlPrefix + 'load/employee/fetch-exam-officer-staff';
        params = {faculty_id: faculty_id, active_status : active_status};
        $rootScope.facultyexamofficerstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.FacultyExamOfficerStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of college examination officer, please try again";
                }
                $rootScope.facultyexamofficerstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    /**
     * Initiate to load Academic Level Adviser
     */
    $rootScope.initLevelAdviserStaff = function (academic_level_id, active_status) {
        $rootScope.loadLevelAdviserStaff(academic_level_id, active_status);
    };

    /**
     * onChange to load Academic Level Adviser
     */
    $rootScope.leveladviserstaffloader = false;
    $rootScope.loadLevelAdviserStaff = function (academic_level_id, active_status) {
        $rootScope.LevelAdviserStaffs = [];

        urlPath = '/' + urlPrefix + 'load/level/fetch-staff';
        params = {academic_level_id: academic_level_id, active_status : active_status};
        $rootScope.leveladviserstaffloader = true;
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.length > 0) {
                    angular.forEach(resp, function (obj) {
                        $rootScope.LevelAdviserStaffs.push(obj);
                    });
                }
                else {
                    var msg = "Unable to get the list of academic level adviser, please try again";
                }
                $rootScope.leveladviserstaffloader = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $rootScope.accessDenied = function (status) {
        if(status == 403)
            swal('Access Denied', 'Sorry, you do not have access to perform the task or the page is read protected. Contact your administrator.', 'error');
    }

    $rootScope.chkAllUnassigned = function () {
        FlicksApp.ChkAllUnassigned();
    };

    $rootScope.chkAllAssigned = function () {
        FlicksApp.ChkAllAssigned();
    };

    $rootScope.callLoader = function () {
        FlicksApp.setOverlay();
    }

    $http.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    $http.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8;";

});

/**
 * Capitalize a string
 *
 */
//app.filter('capitalize', function() {
//    return function(input, all) {
//      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
//      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
//    }
//  });

/*app.filter('isEmpty', [function() {
    return function(object) {
        return angular.equals({}, object);
    }
}]);*/

app.filter('isEmpty', function () {
    var bar;
    return function (obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                return false;
            }
        }
        return true;
    };
});

/**
 * Check if Controller exit
 */
app.factory('ControllerChecker', ['$controller', function ($controller) {
    return {
        exists: function (controllerName) {
            if (typeof window[controllerName] == 'function') {
                return true;
            }
            try {
                $controller(controllerName);
                return true;
            } catch (error) {
                return !(error instanceof TypeError);
            }
        }
    };
}]);

/**
 * Default Service Library
 */
app.factory('defaultService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    return {
        allPostRequests: function (postUrl, params) { //Post Requests to the server
            var defer = $q.defer();
            var promise = defer.promise;
            $http.post(postUrl, {params: params})
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (error, status) {
                    $rootScope.accessDenied(status);
                    //console.log("An error occurred: " + JSON.stringify(error));
                    defer.resolve(error);
                });

            //return promise object
            return promise;
        },
        allGetRequests: function (url) { //Get Requests to the server
            var defer = $q.defer();
            var promise = defer.promise;
            $http.get(url)
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (error, status) {
                    $rootScope.accessDenied(status);
                    //console.log("An error occurred: " + JSON.stringify(error));
                    defer.resolve(error);
                });

            //return promise object
            return promise;
        },
        allPutRequests: function (putUrl, params) { //PUT Requests to the server
            var defer = $q.defer();
            var promise = defer.promise;
            $http.put(putUrl, {params: params})
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (error, status) {
                    $rootScope.accessDenied(status);
                    //console.log("An error occurred: " + JSON.stringify(error));
                    defer.resolve(error);
                });

            //return promise object
            return promise;
        },
        allDeleteRequests: function (deleteUrl, params) { //PUT Requests to the server
            var defer = $q.defer();
            var promise = defer.promise;
            $http.delete(deleteUrl, {params: params})
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (error, status) {
                    $rootScope.accessDenied(status);
                    //console.log("An error occurred: " + JSON.stringify(error));
                    defer.resolve(error);
                });

            //return promise object
            return promise;
        },
        loadComboRequests: function (postUrl, params) { //Post Requests to the server
            var defer = $q.defer();
            var promise = defer.promise;
            $http.post(postUrl, {params: params})
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (error, status) {
                    $rootScope.accessDenied(status);
                    //console.log("An error occurred: " + JSON.stringify(error));
                    defer.resolve(error);
                });

            //return promise object
            return promise;
        }
    };
}]);

app.directive("initFormVal", function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var attr = attrs.initFormVal || attrs.ngModel || element.attrs('name'),
                val = attrs.value;
            if (attrs.type === "number") {val = parseInt(val)}
            if (attrs.type === "checkbox") {val = String(val) == "true"}
            $parse(attr).assign(scope, val);
        }
    };
});

/*app.filter('trusted',
    function($sce) {
        return function(ss) {
            return $sce.trustAsHtml(ss)
        };
    }
)*/

/**
 * Automatically Set all parameters
 *
 */
//app.directive('makeDirty', function(){
//    return function(scope, elem, attr) {
//        angular.forEach(scope.regForm, function(val, key){
//            // if(!key.match(/\$/)) {
//            //     if(key == 'expiration_date' || key == 'date_of_birth' || key == 'issue_date'){
//            //         val.$touched = true;
//            //         val.$pristine = false;
//            //         val.$dirty = true;
//            //     }
//            // }
//            
//            val.$touched = true;
//            val.$pristine = false;
//            val.$dirty = true;
//        });
//    };
//});
//
//}());