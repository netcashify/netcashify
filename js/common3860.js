function setCookiesFromHasURL() {
    //alert(window.location.hash);
    var strHasString = window.location.hash.toString().split("#")
    //alert(strHasString.length)
    for (var indexMain = 0; indexMain < strHasString.length; indexMain++) {
        var strHasKeyValuePair = strHasString[indexMain].split("&");
        for (var i = 0; i < strHasKeyValuePair.length; i++) {
            //alert(strHasKeyValuePair[i]);
            if (strHasKeyValuePair[i] != "") {
                var strCookiesKeyValuePair = strHasKeyValuePair[i].split("=")
                if (strCookiesKeyValuePair[0] != "") {
                    if (strCookiesKeyValuePair.length > 1) {
                        var strCookiesValue = strCookiesKeyValuePair[1].replace("#tA42", "")
                        setCookie(strCookiesKeyValuePair[0], strCookiesValue, 180);
                    }
                    else {
                        setCookie(strCookiesKeyValuePair[0], "", 180);
                    }
                    //alert("getCookie :: " + getCookie(strCookiesKeyValuePair[0]));
                }
            }
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function jsValidateDate(dateFormat, date) {

	switch (dateFormat) {					
			
		case "MM\/DD\/YYYY" :
		case "MM-DD-YYYY" :
			var day=date.substring(3,5);
	        var month=date.substring(0,2);
	        var year=date.substring(6,10);
			break;
		case "MM\/DD\/YY" :
		case "MM-DD-YY" :
			var day=date.substring(3,5);
	        var month=date.substring(0,2);
	        var year=date.substring(6,8);	
			break;						
		
		case "YYYY/MM/DD" :
		case "YYYY-MM-DD" :
			var day=date.substring(8,10);
	        var month=date.substring(5,7);
	        var year=date.substring(0,4);	
			break;
		case "YYYY/DD/MM" :
		case "YYYY-DD-MM" :
			var day=date.substring(5,7);
	        var month=date.substring(8,10);
	        var year=date.substring(0,4);		
			break;	
		
		case "DD\/MM\/YYYY" :					
		case "DD-MM-YYYY" :
			var day=date.substring(0,2);
	        var month=date.substring(3,5);
	        var year=date.substring(6,10);	
			break;
		case "DD-MM-YY" :
		case "DD\/MM\/YY" :
			var day=date.substring(0,2);
	        var month=date.substring(3,5);
	        var year=date.substring(6,8);	
			break;
			
		case "MMDDYY" :
			var day=date.substring(2,4);
	        var month=date.substring(0,2);
	        var year=date.substring(4,6);	
			break;
		case "MMDDYYYY" :
			var day=date.substring(2,4);
	        var month=date.substring(0,2);
	        var year=date.substring(4,8);	
			break;
		case "DDMMYYYY" :
			var day=date.substring(0,2);
	        var month=date.substring(2,4);
	        var year=date.substring(4,8);	
			break;
		default :
			var day='00';
	        var month='00';
	        var year='0000';	
	}

	//checking each char if its numeric or not
	if(checkNumeric(date)!=true) {
			//alert("Invalid date. Please enter date in DDMMYYYY format ");
			return false;				
	}

    //check month range
	if(month<1 || month>12) {
		//alert("Invalid month. Month should be within the range 1 to 12 ");
		return false;
	}

	//check date range 
	if(day<1|| day>maxDaysForMonthYear(month, year)) {
			//alert("Invalid day. Day should be within the range 1 to "+maxDaysForMonthYear(month, year));
			return false;
	}

	//alert("You have entered valid date. Its "+day+""+month+""+year+". Thank you.");
    return (day+"/"+month+"/"+year);
}

/*
Function returns true if the given year is leap else false
*/
function leapYear(year) {
		if(year%400==0 || (year%4==0 && year%100!=0)){			
			return true;
		}
		else return false;		
}
/*
Function returns maximum days possible with the given month & year 
*/
function maxDaysForMonthYear(month, year) {
		arrDays=new Array(31,29,31,30,31,30,31,31,30,31,30,31);	
		if(leapYear(year)==true) {							
		}
		else {
			arrDays[1]=28;
		}
		return(arrDays[month-1]);
}
/*
Function returns true if the given text is numeric
*/
function checkNumeric(text) {
    for (i = 0; i < text.length; i++) {
        if (isNaN(text.charAt(i))) {
            return false;
        }
    }
    return true;
}


//This function is equal to GetCurrenycVal in MSMSvc.asp, the only diff is that it will read setting values from hiddens
//this requires four hidden hidPEX, hidCURS, hidCURP, hidDECP
function GetCurrenycVal(dollorVal, dolloarDecimal) {
    var curSignS, curSignP, decimalPlaces, retVal;
    curSignS = $("#hidCURS").val();
    curSignP = $("#hidCURP").val();
    decimalPlaces = 0
    if ($.isNumeric($("#hidDECP").val())) {
        decimalPlaces = $("#hidDECP").val();
    }
    if ($.isNumeric($("#hidPEX").val())) {
        var conversionRate, convertedAmt;
        conversionRate = parseFloat($("#hidPEX").val());
        convertedAmt = conversionRate * parseFloat(dollorVal);
        if (convertedAmt == 1) {
            retVal = convertedAmt.toFixed(decimalPlaces) + " " + curSignS;
        }
        else {
            retVal = convertedAmt.toFixed(decimalPlaces) + " " + curSignP;
        }
    }
    else {
        if ($.isNumeric(dolloarDecimal)) {
            if (dolloarDecimal>= 0) {
                retVal ="$" + dollorVal.toFixed(dolloarDecimal);
            }
            else {
                retVal = "$" + dollorVal.toFixed();
            }
         }else {
            retVal = "$" + dollorVal.toFixed();
        }
    }
    return retVal;
}
