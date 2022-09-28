//below two variables are shared between IsOfferEntryValid and OptInCriOffers functions
var validationFailedControlName = null;
var validationFailedFirstControlName = null; //there may be multiple controls with invalid values this will track only first one where we want to set focus.
var validationControlType = null;
var didcrisubmit = false;
var lastparamXml = "";

//1.) interates for each control in the given offer div
//2.) validates for required validation
//3.) validates for max/min lengths
//4.) updates error msg in related error msg control
function IsOfferEntryValid(divPromptFieldsId) {
    //alert(divPromptFieldsId);
    var isValidPassed = true;
    var tmpisValidPassed = true;
    var rdchkfail=0;
    $(divPromptFieldsId).find("input, select, radio, date").each(function () {
        //isValidPassed=true
        tmpisValidPassed=true
        var controlType = $(this).prop('type');
        var controlName = $(this).attr("name");
        var controlValue = $(this).val();
        var dataQuestion = $(this).attr("data-question");
        var dataRequired = $(this).attr("data-validation-required");
        var dataMinLength = $(this).attr("data-validation-minlength");
        var dataMaxLength = $(this).attr("data-validation-maxlength");
        var dataCriInputType = $(this).attr("data-cri-input-type");
        var dataunacceptableanswer = $(this).attr("data-unacceptableanswer");
		
        var errMsgControlId = "#val_" + controlName;
        //check if inout has required attribute true then check
        //alert(dataRequired);
        //alert("priya " + controlName + "==" + controlType);
        //alert(controlName);
        //alert(controlName +"==" +errMsgControlId);
        if(controlType == 'select-one')
        {
            dataunacceptableanswer=$(this).find("option:selected").attr("data-unacceptableanswer")
        }
        else if( controlType == 'radio' || controlType == 'checkbox')
        {
            dataunacceptableanswer = $("input[name='" + controlName + "']:checked").attr("data-unacceptableanswer")
			
        }
		
        if (controlType == 'text' || controlType == 'checkbox'  || dataCriInputType == 'MULTIPLECHOICE' || controlType == 'date' || controlType == 'cridate' || controlType == 'select-one' || controlType == 'radio') {
            
            if (dataRequired == "true") {
                if (controlType == 'text' || controlType == 'date' || controlType == 'cridate') {
                    if (controlValue == null || controlValue == "") { //show validation control
                        $(errMsgControlId).show();
                        $(errMsgControlId).text(" is required.");
                        validationFailedControlName = controlName;
                        validationControlType = "input";
                        isValidPassed = false;
                        tmpisValidPassed=false;
                    }
                    else {
                        if (rdchkfail==0)
                            $(errMsgControlId).hide();
                    }
                }
                else if (controlType == 'select-one') {
                    if (controlValue == null || controlValue == "" || controlValue == "0") {//show validation control
                        $(errMsgControlId).show();
                        $(errMsgControlId).text( " is required.");
                        validationFailedControlName = controlName;
                        validationControlType = "select";
                        isValidPassed = false;
                        tmpisValidPassed=false;
                    }
                    else {
                        if (rdchkfail==0)
                            $(errMsgControlId).hide();
                    }
                }
                else if (controlType == "radio") {
                    var selectedRadioValue
                    selectedRadioValue = $("input[name='" + controlName + "']:checked").val();
                    if (selectedRadioValue == null || selectedRadioValue == undefined) {
                        //alert("no radio button selectd");
                        //alert(errMsgControlId);
                        $(errMsgControlId).show();
                        $(errMsgControlId).text( " is required.");
                        validationFailedControlName = controlName;
                        validationControlType = "radio";
                        isValidPassed = false;
                        tmpisValidPassed=false;
                    }
                    else {
                        if (rdchkfail==0)
                            $(errMsgControlId).hide();
                    }
                }
                else if (dataCriInputType == 'MULTIPLECHOICE' ||controlType == 'checkbox' ) {
                    var selectedRadioValue
                    selectedRadioValue = $("input[name='" + controlName + "']:checked").val();
                    if (selectedRadioValue == null || selectedRadioValue == undefined) {
                        //alert("no radio button selectd");
                        //alert(errMsgControlId);
                        $(errMsgControlId).show();
                        $(errMsgControlId).text( " is required.");
                        validationFailedControlName = controlName;
                        validationControlType = "radio";
                        isValidPassed = false;
                        tmpisValidPassed=false;
                    }
                    else {
                        if (rdchkfail==0)
                            $(errMsgControlId).hide();
                    }
                }
            }
            

            //check if input has min length attribute and lastvalidation is fine
            if (isValidPassed == true && typeof dataMinLength != 'undefined') {
                // exactly undefined
                if (controlValue.length < parseInt(dataMinLength)) {
                    $(errMsgControlId).show();
                    $(errMsgControlId).text("Minimum required length is: " + dataMinLength);
                    validationFailedControlName = controlName;
                    //validationControlType = controlType;
                    validationControlType = "input";
                    isValidPassed = false;
                    tmpisValidPassed=false;
                }
                else {
                    if (rdchkfail==0)
                        $(errMsgControlId).hide();
                }
            }
           
            //check if input has min length attribute and lastvalidation is fine
            if (isValidPassed == true && typeof dataMaxLength != 'undefined') {
                if (controlValue.length > parseInt(dataMaxLength)) {
                    $(errMsgControlId).show();
                    $(errMsgControlId).text("Maximum allowed length is: " + dataMaxLength);
                    validationFailedControlName = controlName;
                    //validationControlType = controlType;
                    validationControlType = "input";
                    isValidPassed = false;
                    tmpisValidPassed=false;
                }
                else {
                    if (rdchkfail==0)
                        $(errMsgControlId).hide();
                }
            }

            //check if input has min length attribute and lastvalidation is fine
            //alert(errMsgControlId + "=11=" + validationFailedControlName);
            if (isValidPassed == true && dataunacceptableanswer =="true") {
                //alert(errMsgControlId);
                $(errMsgControlId).show();
                $(errMsgControlId).text("Sorry, you can't qualify for this offer based on this selected answer.")
                validationFailedControlName = controlName;
                //validationControlType = "input";
                isValidPassed = false;
                tmpisValidPassed=false;
            }
            else {
                if(validationFailedControlName==null)
                {
                    //alert(errMsgControlId + "=55=" + validationFailedControlName);
                    if (rdchkfail==0)
                        $(errMsgControlId).hide();
                }
            }
            if(isValidPassed==false && (controlType == 'radio' || controlType == 'checkbox'))
            {
                rdchkfail=1;
            }
            if (validationFailedFirstControlName == null) {
                validationFailedFirstControlName = validationFailedControlName;
            }
        }
       
        if (tmpisValidPassed)
        {
            $(this).css("border-color", "#dcdcdc");
            $(this).css("outline", "0");
        }
        else 
        {
            if( controlType == 'radio' || controlType == 'checkbox')
            {
                $("input[name='" + validationFailedControlName + "']:checked").css("outline", "red 1px solid");
			
            }else{
                $(this).css("outline", "red 1px solid");
            }
        }

    });
    //alert(isValidPassed);

    return isValidPassed;

}

///1.) This is called when user clicks on Continue button on SpecialOffersCri.asp page
///2.) checks validations on all selected offers
///3.) if validation failed then returns false
///4.) if offers selected and validation is passed then coreg.net is called to submit offer and true returns
function OptInCriOffers(fromAdmin =0,fromcriembed=0, submitForm="", callsubmitfn=0, frommidpathquest=0) {
    //alert("priya==" + callsubmitfn + "==" +submitForm)
    try {
        var isValidationPassed = true;
        var isFocusAlreadySet = false;
        //validate fields if any validation issue then return false
        //$("input:radio.rdoYes:checked").each(function () {
			
        $(".promptfieldoptions option:selected").each(function () {
				 
            var coregOfferId 
            if(fromcriembed==0)
            { coregOfferId=$(this).val();}
            else
            { coregOfferId=this.value; }
            var promptFields = "";
            var divPromptFieldsId;
            if (frommidpathquest==0)
                divPromptFieldsId = "#divPromptFields_" + coregOfferId;
            else
                divPromptFieldsId = "#divPromptFields";
				
            isValidationPassed = IsOfferEntryValid(divPromptFieldsId);
            //alert(isValidationPassed);
            if (isValidationPassed == false) {
                return isValidationPassed;
            }		
        });
        
        $(".rdoYes:checked").each(function () {
		
            var coregOfferId 
            if(fromcriembed==0)
            { coregOfferId=$(this).val();}
            else
            { coregOfferId=this.value; }

            var promptFields = "";
            var divPromptFieldsId;
            if (frommidpathquest==0)
                divPromptFieldsId = "#divPromptFields_" + coregOfferId;
            else 
                divPromptFieldsId = "#divPromptFields";

            isValidationPassed = IsOfferEntryValid(divPromptFieldsId);
            //alert(isValidationPassed);
            if (isValidationPassed == false) {
                return isValidationPassed;
            }
            if (isValidationPassed == true) {
                if ($(".subjectWellOffers_" + coregOfferId ).length>0) {
                    if($(".subjectWellOffers_" + coregOfferId +":checked").length<=0) {
                        isValidationPassed=false;
                        alert("Please select atleast one option.")
                        validationControlType="subjcheckbox"
                        return false;
                    }

                };
            }
        })
       
        if (isValidationPassed == false ) {
            if ( validationControlType!="subjcheckbox"){
                if (validationControlType == "radio" ) {//incase of radio button just focus don't scroll to top so added these codes'
                    //alert("going to scroll1");
                    var elmnt = document.getElementsByName(validationFailedControlName)[0];
                    elmnt.scrollIntoView({
                        offsetTop: -20,
                    });
                }
                else {
                    if (isFocusAlreadySet == false) {
                        var elmnt = document.getElementsByName(validationFailedFirstControlName)[0];
                        $("html,body").animate(
                            {
                                scrollTop: $(elmnt).offset().top - 150
                            },
                            100);
                        $(validationControlType + "[name = '" + validationFailedFirstControlName + "']").first().focus();
                        //alert("focus set of : " + validationControlType + "[name = '" + validationFailedFirstControlName + "']");
                        isFocusAlreadySet = true;
                    }
                }
            }
            return false;//if validation is false then only `
        }
        else{
            //
			
           
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hr = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (hr < 10) {
                hr = '0' + hr;
            }
            if (min < 10) {
                min = '0' + min;
            }
            if (sec < 10) {
                sec = '0' + sec;
            }

            var currentdate = new Date();
            var datetime = yyyy + "-" + mm + "-" + dd + " " + hr + ":" + min + ":" + sec;
            //alert(datetime);

            //else create msg 
            var paramXml,optin;
            var isAnyOfferSelected = false;
            paramXml = "<SubmitCallsParam>";
            paramXml = paramXml + "<Website>" + $("#hidWebsite").val() + "</Website>";
            paramXml = paramXml + "<CriUniqueID>" + $("#hidCriUniqueID").val() + "</CriUniqueID>";
            paramXml = paramXml + "<TrustedFormCertId>" + $("#hidTrustedFormCertId").val() + "</TrustedFormCertId>"; //MSM-22657
            paramXml = paramXml + "<TrustedFormCertURL>" + "https://cert.trustedform.com/" + $("#hidTrustedFormCertId").val() + "</TrustedFormCertURL>";
            paramXml = paramXml + "<JornayaLeadiD>" + $("#leadid_token").val() + "</JornayaLeadiD>";
            paramXml = paramXml + "$OPTINReplace$";
            optin ="<OptInDateTime>" + datetime + "</OptInDateTime>";
            //alert("priya1 before rdoYes");
            $(".rdoYes:checked").each(function () {
                
                isAnyOfferSelected = true;
                var coregOfferId, sourceplacementid
                if(fromcriembed==0)
                { coregOfferId=$(this).val();}
                else
                { coregOfferId=this.value; }
                //alert("priya coregOfferId: "  +coregOfferId);

                //alert("priya inside rdoYes: "  +$("#hidUid" ).val() +"==" + $("#hidAdUnitID" ).val() + "==" +coregOfferId );
                $.ajax({
                    type: "POST",
                    url: "SaveClickTime.asp?uid="+ $("#hidUid" ).val() +"&adUnitId="+ $("#hidAdUnitID" ).val() +"&coregofferid=" + coregOfferId
                });


                var prepingretunedvalue = "";
                var trust_required = "";
                var promptFields = "";
                var divPromptFieldsId;
                var arrAddedFields = [];
                if (frommidpathquest==0)
                {
                    sourceplacementid = $("#sourceplacementid_" + coregOfferId).val();
                    prepingretunedvalue = $("#prepingretunedvalue_" + coregOfferId).val();
                    trust_required = $("#trust_required_" + coregOfferId).val();
                    divPromptFieldsId = "#divPromptFields_" + coregOfferId;
                }
                else{
                    sourceplacementid = $("#sourceplacementid" ).val();
                    prepingretunedvalue = $("#prepingretunedvalue").val();
                    trust_required = $("#trust_required").val();
                    divPromptFieldsId = "#divPromptFields";
                }
                //alert("priya inside1 rdoYes: " );
                $(divPromptFieldsId).find("input, select").not('.nopromptfield').each(function () {
                    //if radio button then multiple controls will be with same name so avoid same control in next iteration
                    var controlType = $(this).prop('type');
                    var controlName = $(this).attr("name");
                    var InputType = "";
                    var controlId = $(this).attr("id");
                    var fieldName = $(this).attr("name").replace(coregOfferId + "_", ""); //5191_ZRWJC
                    var isAddField = true;
                    var controlValue = "";
                    
                    if (controlType == "radio" ) {
                        //alert($.inArray(controlName, arrAddedFields));
                        if ($.inArray(controlName, arrAddedFields) == -1) { //item not in array
                            controlValue = $("input[name='" + controlName + "']:checked").val();
                            arrAddedFields.push(controlName);
                            //alert(arrAddedFields.length);
                        }
                        else {
                            isAddField = false;//means already added
                        }
                    }
                    else if (controlType == "select-one") {
                        
                        if ($.inArray(controlName, arrAddedFields) == -1) { //item not in array
                            controlValue =$("#" + controlId).val();;
                            arrAddedFields.push(controlName);
                            //alert(arrAddedFields.length);
                        }
                        else {
                            
                            isAddField = false;//means already added
                        }
                    }
                    else if (controlType == "text") {
                        controlValue =controlValue =$("#" + controlId).val();
                    }
                    else if (controlType == "checkbox") {
                        //alert($.inArray(controlName, arrAddedFields));
                        if ($.inArray(controlName, arrAddedFields) == -1) { //item not in array
                            //controlValue = $("input[name='" + controlName + "']:checked").val();
                            //arrAddedFields.push(controlName);
                            //alert(arrAddedFields.length);
                            if ($("input[name='" + controlName + "']").length == 1) {//non multiple-choice scenario
                                //alert("options: " + $("#" + controlId).attr("data-values") );
                                //alert(controlId + "==" + ($("#" + controlId).attr("data-values") != "undefined"))
                                if (($("#" + controlId).attr("data-values") != "") && ($("#" + controlId).attr("data-values") !=undefined)  && ($("#" + controlId).attr("data-values") != "undefined")) {//in case of opt checkbox may have Yes/No so data-options will be Yes::No
                                    var checkboxOptions = $("#" + controlId).attr("data-values");
                                    var optionsArr = checkboxOptions.split("::")
                                    controlValue = document.getElementById(controlId).checked ? optionsArr[0] : optionsArr[1];
                                }
                                else {
                                    controlValue = document.getElementById(controlId).checked ? 'on' : '';
                                }
                            }
                            else {
                                var arrChecked = [];
                                $.each($("input[name='" + controlName + "']:checked"), function () {
                                    arrChecked.push($(this).val()); //there may be multiple checkboxes for a question so array approach has been used
                                });
                                //                            controlValue = arrChecked.join("~!~");
                                controlValue = arrChecked.join(",");
                                InputType = "MultipleChoice";
                            }
                            arrAddedFields.push(controlName);
                            //alert("checked checkboxes are: " + controlValue);
                        }
                        else {
                            isAddField = false;//means already added
                        }
                    }
                    else {
                        
                        controlValue = coregOfferId;
                    }
                    //alert(isAddField);
                    //alert(fieldName + " : " +controlValue)
                    if (isAddField == true && controlValue != "" && controlValue != undefined) {
                        if (promptFields == "") {
                            promptFields = "<PromptField><Name>" + fieldName + "</Name><Value>" + controlValue + "</Value><InputType>" + InputType + "</InputType></PromptField >";
                            //alert(promptFields);
                        }
                        else {
                            promptFields = promptFields + "<PromptField><Name>" + fieldName + "</Name><Value>" + controlValue + "</Value><InputType>" + InputType + "</InputType></PromptField >";
                            //alert(promptFields);
                        }
                    }
                });
                
                var indications
                indications=""
                $(".subjectWellOffers_" + coregOfferId +":checked").each(function () {
                    var coregOfferId
            
                    if(fromcriembed==0)
                    { coregOfferId=$(this).val();}
                    else
                    { coregOfferId=this.value; }
                    //alert("pri coregOfferId"+coregOfferId)
                    if (indications.length>0){
                        indications=indications + ","
                    }
                    indications=indications + coregOfferId
                })
                //alert(indications)
                paramXml = paramXml + "<SubmitCallParam>";
                paramXml = paramXml + "<CoregOfferId>" + coregOfferId +":" + sourceplacementid + "</CoregOfferId>";
                paramXml = paramXml + "<PrepingRetunedValue>" + prepingretunedvalue + "</PrepingRetunedValue>";
                paramXml = paramXml + "<TrustRequired>" + trust_required + "</TrustRequired>";
                paramXml = paramXml + promptFields;
                paramXml = paramXml + "<Indications>"+indications+"</Indications>";
                paramXml = paramXml + "</SubmitCallParam>";
                //alert(paramXml);
            });
            paramXml = paramXml + "</SubmitCallsParam>";
            //alert(paramXml);
            //alert("priya " + isAnyOfferSelected)
            //alert("priya inside2 rdoYes: "+isAnyOfferSelected );
           
            if (isAnyOfferSelected == true && lastparamXml!=paramXml){//  didcrisubmit == false) {
                lastparamXml = paramXml;
                //didcrisubmit = true;
                var xhttp = new XMLHttpRequest();
                var url = "httprequestsNoSession.asp?fromAdmin="+ fromAdmin +"&queue=1&optin="+encodeURIComponent( optin) +"&ops=OptInCriOffers&paramXml=" + encodeURIComponent(paramXml);
                if(fromAdmin==1)
                {
                    //session("OptinResponse")="";
                    url = "httprequestsNoSession.asp?fromAdmin="+ fromAdmin+"&queue=0&optin="+ optin +"&ops=OptInCriOffers&paramXml=" + encodeURIComponent(paramXml);
                }
            
                // alert("priya inside2 rdoYes: " +  url);
                // console.log("priya==" + url);
                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.onreadystatechange = function () {//Call a function when the state changes.
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                   
                        if(submitForm!="")
                        {
                            document.getElementById(submitForm).submit();// Form submission
                        }
                        if(callsubmitfn==1)
                        {
                        
                            submitform();
                        }
                    }
                }
                xhttp.send();
                //alert(url)
            }
            else if (isAnyOfferSelected==false){
                // alert("priya " + isAnyOfferSelected + "==" + submitForm + "==" + callsubmitfn)
                if(submitForm!="")
                {
                    document.getElementById(submitForm).submit();// Form submission
                }
                if(callsubmitfn==1)
                {
                        
                    submitform();
                }
            }

            if(submitForm!="" && isAnyOfferSelected == true)
                return false;
            else 
                return true;
        }
    }
    catch (ex) {
        alert( ex);
        return false;
    }
}



    function OptInMidPathCriOffersForTest(result, fromAdmin =0, coregOfferId=0) {
        try {
            //alert("OptInMidPathCriOffersForTest")
            var isFocusAlreadySet = false;
            //
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hr = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (hr < 10) {
                hr = '0' + hr;
            }
            if (min < 10) {
                min = '0' + min;
            }
            if (sec < 10) {
                sec = '0' + sec;
            }

            var currentdate = new Date();
            var datetime = yyyy + "-" + mm + "-" + dd + " " + hr + ":" + min + ":" + sec;
            //alert(datetime);

            //else create msg 
            var paramXml;
            var isAnyOfferSelected = false;
            paramXml = "<SubmitCallsParam>";
            paramXml = paramXml + "<Website>" + $("#hidWebsite").val() + "</Website>";
            paramXml = paramXml + "<CriUniqueID>" + $("#hidCriUniqueID").val() + "</CriUniqueID>";
            paramXml = paramXml + "<TrustedFormCertId>" + $("#hidTrustedFormCertId").val() + "</TrustedFormCertId>"; //MSM-22657
            paramXml = paramXml + "<TrustedFormCertURL>" + "https://cert.trustedform.com/" + $("#hidTrustedFormCertId").val() + "</TrustedFormCertURL>";
            paramXml = paramXml + "<JornayaLeadiD>" + $("#leadid_token").val() + "</JornayaLeadiD>";
            paramXml = paramXml + "<OptInDateTime>" + datetime + "</OptInDateTime>";
            //$("input:radio.rdoYes:checked").each(function () {
            isAnyOfferSelected = true;
            //var coregOfferId = $(this).val();
            var prepingretunedvalue = "";
            prepingretunedvalue = $("#prepingretunedvalue" ).val();
            var sourceplacementid="";
            sourceplacementid = $("#sourceplacementid" ).val();
            var trust_required = "";
            trust_required = $("#trust_required").val();
            var promptFields = "";
            var divPromptFieldsId;
            var arrAddedFields = [];
            divPromptFieldsId = "#divPromptFields_" + coregOfferId;
            $(divPromptFieldsId).find("input, select").each(function () {
                //if radio button then multiple controls will be with same name so avoid same control in next iteration
                var controlType = $(this).prop('type');
                var controlName = $(this).attr("name");
                var InputType = "";
                var controlId = $(this).attr("id");
                var fieldName = $(this).attr("name").replace(coregOfferId + "_", ""); //5191_ZRWJC
                var isAddField = true;
                var controlValue = "";
                if (controlType == "radio") {
                    //alert($.inArray(controlName, arrAddedFields));
                    if ($.inArray(controlName, arrAddedFields) == -1) { //item not in array
                        controlValue = $("input[name='" + controlName + "']:checked").val();
                        arrAddedFields.push(controlName);
                        //alert(arrAddedFields.length);
                    }
                    else {
                        isAddField = false;//means already added
                    }
                }
                else if (controlType == "checkbox") {
                    //alert($.inArray(controlName, arrAddedFields));
                    if ($.inArray(controlName, arrAddedFields) == -1) { //item not in array
                        //controlValue = $("input[name='" + controlName + "']:checked").val();
                        //arrAddedFields.push(controlName);
                        //alert(arrAddedFields.length);
                        if ($("input[name='" + controlName + "']").length == 1) {//non multiple-choice scenario
                            //alert("options: " + $("#" + controlId).attr("data-values") );
                            //alert(controlId + "==" + ($("#" + controlId).attr("data-values") != "undefined"))
                            if (($("#" + controlId).attr("data-values") != "") && ($("#" + controlId).attr("data-values") !=undefined)  && ($("#" + controlId).attr("data-values") != "undefined")) {//in case of opt checkbox may have Yes/No so data-options will be Yes::No
                                var checkboxOptions = $("#" + controlId).attr("data-values");
                                var optionsArr = checkboxOptions.split("::")
                                controlValue = document.getElementById(controlId).checked ? optionsArr[0] : optionsArr[1];
                            }
                            else {
                                controlValue = document.getElementById(controlId).checked ? 'on' : '';
                            }
                        }
                        else {
                            var arrChecked = [];
                            $.each($("input[name='" + controlName + "']:checked"), function () {
                                arrChecked.push(coregOfferId); //there may be multiple checkboxes for a question so array approach has been used
                            });
                            //                            controlValue = arrChecked.join("~!~");
                            controlValue = arrChecked.join(",");
                            InputType = "MultipleChoice";
                        }
                        arrAddedFields.push(controlName);
                        //alert("checked checkboxes are: " + controlValue);
                    }
                    else {
                        isAddField = false;//means already added
                    }
                }
                else {
                    controlValue =coregOfferId;
                }
                //alert(isAddField);
                //alert(fieldName + " : " +controlValue)
                if (isAddField == true && controlValue != "" && controlValue != undefined) {
                    if (promptFields == "") {
                        promptFields = "<PromptField><Name>" + fieldName + "</Name><Value>" + controlValue + "</Value><InputType>" + InputType + "</InputType></PromptField >";
                        //alert(promptFields);
                    }
                    else {
                        promptFields = promptFields + "<PromptField><Name>" + fieldName + "</Name><Value>" + controlValue + "</Value><InputType>" + InputType + "</InputType></PromptField >";
                        //alert(promptFields);
                    }
                }
            });
            paramXml = paramXml + "<SubmitCallParam>";
            paramXml = paramXml + "<CoregOfferId>" + coregOfferId +":" +sourceplacementid + "</CoregOfferId>";
            paramXml = paramXml + "<PrepingRetunedValue>" + prepingretunedvalue + "</PrepingRetunedValue>";
            paramXml = paramXml + "<TrustRequired>" + trust_required + "</TrustRequired>";
            paramXml = paramXml + promptFields;
            paramXml = paramXml + "</SubmitCallParam>";
            //alert(paramXml);
            //});
            paramXml = paramXml + "</SubmitCallsParam>";
            //alert(paramXml);

            if (isAnyOfferSelected == true && lastparamXml!=paramXml){//  didcrisubmit == false) {
                lastparamXml = paramXml;
                //didcrisubmit = true;
                var xhttp = new XMLHttpRequest();
                //xhttp.onreadystatechange = function () {
                //    if (this.readyState == 4 && this.status == 200) { location.reload(true); }
                //};
                var url = "httprequestsNoSession.asp?fromAdmin="+ fromAdmin +"&queue=1&ops=OptInCriOffers&paramXml=" + encodeURIComponent(paramXml);
                if(fromAdmin==1)
                {
                    //session("OptinResponse")="";
                    url = "httprequestsNoSession.asp?fromAdmin="+ fromAdmin+"&queue=0&ops=OptInCriOffers&paramXml=" + encodeURIComponent(paramXml);
                }
              
                //alert('OptInCriOffers' + url);
                console.log(url);
                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.onreadystatechange = function () {//Call a function when the state changes.
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        
                        alert('post response:' + xhttp.responseText);
                    }
                }
                xhttp.send();
            }
            savedone (result);
            return true;
        }
        catch (ex) {
            alert( ex);
            return false;
        }
    }



        function BlockScreen() {
            $.blockUI({ message: '<div ><center><img src="/imagesMSM/busy.gif"><br>Please wait ...</div><center>' });
        }

        function UnblockScreen() {
            $.unblockUI(); 
        }

        function CreateGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }