/* ==========================================================================
 * Template: FLKTeam Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLKTeam UI
 * Email: 
 * ========================================================================== */

var FlicksApp = function () {

    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            FlicksApp.getBaseURL();
            FlicksApp.setCSRF();
            FlicksApp.handleCalls();
            FlicksApp.zoomB();
        },

        zoomB: function (){
            var currFFZoom = 0.79;
            var currIEZoom = 80;
            //$('body').css('MozTransform','scale(' + currFFZoom + ')');
            //$('body').css('-moz-transform','scale(' + currFFZoom + ')');
            /*$('body').css('webkit-transform','scale(' + currFFZoom + ')');
            $('body').css('-moz-transform','scale(' + currFFZoom + ')');
            $('body').css('-moz-transform-origin: ','top left');*/
            $('body').css('zoom', ' ' + currIEZoom + '%');
        },
        // =========================================================================
        // SET UP BASE URL
        // =========================================================================
        getBaseURL: function () {
            //--- local ---- //
            /*var getUrl = window.location,
            baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
            return baseUrl;*/

            //--- online --- //
            var getUrl = window.location,
                baseUrl = getUrl.protocol + "//" + getUrl.host ;
            //+ "/" + getUrl.pathname.split('/')[1];
            return baseUrl;
        },
       
        // =========================================================================
        // SET CSRF Token
        // =========================================================================
        setCSRF: function () {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            })
        },
        
        // =========================================================================
        // CHECK AND UNCHECK ALL
        // =========================================================================
        ChkAllUnassigned: function() { 
            var ischecked = $("#chkunassign").is(":checked");
            $(".unassignchk").prop('checked', ischecked);
        },

        ChkAllAssigned: function() { 
            var ischecked = $("#chkassign").is(":checked");
            $(".assignchk").prop('checked', ischecked);
        },
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function() {
            //------ check all available --- //
            $('#chkunassign').on('click', function () {
                FlicksApp.ChkAllUnassigned();
            });
            
            //------ check all assigned --- //
            $('#chkassign').on('click', function () {
                FlicksApp.ChkAllAssigned();
            });
        },
        
        // =========================================================================
        // CLEAR DIV ERROR
        // =========================================================================
        clear_diverror: function () {
            $("#opstatus").removeClass("alert alert-success alert-white rounded");
            $("#opstatus").removeClass("alert alert-danger alert-white rounded");
            $("#opstatus").html('');
        },
        
        // =========================================================================
        // RENDER MSG
        // =========================================================================
        render_msg: function (msg, divid, type) {
            if (divid !== '' && type === '0') {
                $("#" + divid).removeClass("form-control parsley-validated");
                $("#" + divid).addClass("form-control parsley-validated parsley-error");
            }
            //------------ for error message ---------- //
            if (type === '0') {
                var domsg = "<i class='icon-exclamation-sign'></i> <strong>Error!</strong><br>" + msg;
                $("#opstatus").removeClass("alert alert-success alert-white rounded");
                $("#opstatus").addClass("alert alert-danger alert-white rounded");
                $("#opstatus").html(domsg).slideDown("slow");
            }
            //------------- for success message --------- //
            if (type === '1') {
                var domsg = "<i class='icon-check'></i> <strong>Success</strong><br>" + msg;
                $("#opstatus").removeClass("alert alert-danger");
                $("#opstatus").addClass("alert alert-success");
                $("#opstatus").html(domsg).slideDown("slow");
            }
        },

        // =========================================================================
        // FOR AJAX ERROR
        // =========================================================================        
        handleAjaxError: function (request, type, errorThrown)
        {
            var message = "There was an error with the request.\n";
            switch (type) {
                case 'timeout':
                    message += "The request timed out.";
                    break;
                case 'notmodified':
                    message += "The request was not modified but was not retrieved from the cache.";
                    break;
                case 'parsererror':
                    message += "Format is bad.";
                    break;
                default:
                    message += "HTTP Error (" + request.status + " " + request.statusText + ").";
            }
            message += "\n Please try again.";
            alert(message);
        },
        
        //----- to process
        handleRequestData: function(url,actiontype){
            window.location = url;
        },
        
        handlemsgtoast: function(msg,mtype){
            var hmthd = (mtype == "error") ? "fadeOut" : "fadeOut";

            toastr.options = {
                "closeButton": false,
                "debug": false,
                "progressBar": true,
                "preventDuplicates": false,
                "positionClass": "toast-top-center",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "800",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": hmthd
             };

            var $toast = toastr[mtype](msg);
        },


        printNau: function (id, title) {
            var getBaseURL = FlicksApp.getBaseURL();
            var contents = $("#" + id).html();
            var frame1 = $('<iframe />');
            frame1[0].name = "frame1";
            frame1.css({"position": "absolute", "top": "-1000000px", "pointer-events": "none"});
            $("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Print ' + title + '</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/css/bootstrap.min.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/font-awesome/css/font-awesome.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/css/plugins/dataTables/datatables.min.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/css/animate.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/css/style.css" rel="stylesheet">');
//            frameDoc.document.write('<style>.table-condensed{font-size: 9px;}</style>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body>');
            frameDoc.document.write('<script src="'+getBaseURL+'/public/js/jquery-2.1.1.js" />');
            frameDoc.document.write('<script src="'+getBaseURL+'/public/js/bootstrap.min.js" />');
            frameDoc.document.write('</html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 500);
        },

        printNoCss: function (id, title) {
            var getBaseURL = FlicksApp.getBaseURL();
            var contents = $("#" + id).html();
            var frame1 = $('<iframe />');
            frame1[0].name = "frame1";
            frame1.css({"position": "absolute", "top": "-1000000px", "pointer-events": "none"});
            $("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Print ' + title + '</title>');
            frameDoc.document.write('</head><body>');
            /*frameDoc.document.write('<link href="'+getBaseURL+'/public/css/bootstrap.min.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/font-awesome/css/font-awesome.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/css/plugins/dataTables/datatables.min.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/css/animate.css" rel="stylesheet">');
            frameDoc.document.write('<link href="'+getBaseURL+'/public/css/style.css" rel="stylesheet">');*/
//            frameDoc.document.write('<style>.table-condensed{font-size: 9px;}</style>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body>');
            frameDoc.document.write('<script src="'+getBaseURL+'/public/js/jquery-2.1.1.js" />');
            /*frameDoc.document.write('<script src="'+getBaseURL+'/public/js/bootstrap.min.js" />');*/
            frameDoc.document.write('</html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 500);
        },

        setOverlay: function(){
            $(".overlay").css("visibility", "visible");
            $(".loader").css("visibility", "visible");
        },

        offOverlay: function(){
            $(".overlay").css("visibility", "hidden");
            $(".loader").css("visibility", "hidden");
        }
    };
}();

// Call main app init
FlicksApp.init();