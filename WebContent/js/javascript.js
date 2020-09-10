var req;
var isIE;
var completeField;
var completeTable;
var autoRow;
var composerId;
var composerTable;

function init() {
    completeField = document.getElementById("complete-field");
    completeTable = document.getElementById("complete-table");
    autoRow = document.getElementById("auto-row");
	composerTable = document.getElementById("composerTable");
    completeTable.style.top = getElementY(autoRow) + "px";
}

function doCompletion() {

    var url = "autocomplete?action=complete&id=" + escape(completeField.value);
//var url = "http://dummy.restapiexample.com/api/v1/employees";
// var url = "https://reqres.in/api/products/3";
    req = initRequest();
    req.open("GET", url, true);
    req.onreadystatechange = callback;
    req.send(null);
}

function initRequest() {
    if (window.XMLHttpRequest) {
        if (navigator.userAgent.indexOf('MSIE') != -1) {
            isIE = true;
        }
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        isIE = true;
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function callback() {
    clearTable();

    if (req.readyState == 4) {
        if (req.status == 200) {
            parseMessages(req.responseXML);
        }
    }
}

function appendComposer(firstName,lastName,composerId) {

    var row;
    var cell;
    var linkElement;
    
    if (isIE) {
        completeTable.style.display = 'block';
        row = completeTable.insertRow(completeTable.rows.length);
        cell = row.insertCell(0);
    } else {
        completeTable.style.display = 'table';
        row = document.createElement("tr");
        cell = document.createElement("td");
        row.appendChild(cell);
        completeTable.appendChild(row);
    }

    cell.className = "popupCell";

    linkElement = document.createElement("a");
    linkElement.className = "popupItem";
    linkElement.setAttribute("onClick", "doCompletionJson(); return false;");
    linkElement.setAttribute("href", "#");
    linkElement.appendChild(document.createTextNode(firstName + " " + lastName));
    cell.appendChild(linkElement);
}

function clearTable() {
    if (completeTable.getElementsByTagName("tr").length > 0) {
        completeTable.style.display = 'none';
        for (loop = completeTable.childNodes.length -1; loop >= 0 ; loop--) {
            completeTable.removeChild(completeTable.childNodes[loop]);
        }
    }
}

function getElementY(element){
    
    var targetTop = 0;
    
    if (element.offsetParent) {
        while (element.offsetParent) {
            targetTop += element.offsetTop;
            element = element.offsetParent;
        }
    } else if (element.y) {
        targetTop += element.y;
    }
    return targetTop;
}

function parseMessages(responseXML) {
    
    // no matches returned
    if (responseXML == null) {
        return false;
    } else {

        var composers = responseXML.getElementsByTagName("composers")[0];

        if (composers.childNodes.length > 0) {
            completeTable.setAttribute("bordercolor", "black");
            completeTable.setAttribute("border", "1");
    
            for (loop = 0; loop < composers.childNodes.length; loop++) {
                var composer = composers.childNodes[loop];
                var firstName = composer.getElementsByTagName("firstName")[0];
                var lastName = composer.getElementsByTagName("lastName")[0];
                composerId = composer.getElementsByTagName("id")[0];
                appendComposer(firstName.childNodes[0].nodeValue,
                    lastName.childNodes[0].nodeValue,
                    composerId.childNodes[0].nodeValue);
                
            }
        }
    }
}

function doCompletionJson() {

  $.get("composer?action=look&id=" + composerId.childNodes[0].nodeValue,  // url
      function (data, textStatus, jqXHR) {  
	callbackJson(data);// success callback
          //alert('status: ' + textStatus + ', data:' + data);
    });
/** 
    var url = "composer?action=look&id=" + composerId.childNodes[0].nodeValue;
    req = initRequest();
    req.open("GET", url, true);
    req.onreadystatechange = callbackJson;
    req.send(null); 
*/
}


function callbackJson(json) {
	clearTable();
	clearTableJson();
    if (req.readyState == 4) {
        if (req.status == 200) {
			var jsonObj = json;//JSON.parse(req.responseText);
			appendComposerJson('First Name: ',jsonObj.firstName);
			appendComposerJson('Last Name: ',jsonObj.lastName);
			appendComposerJson('ID: ',jsonObj.id);
			appendComposerJson('Category: ',jsonObj.category);

        }
    }
}

function appendComposerJson(name, value) {
    var row;
    var td1;
	var td2;
	composerTable.style.display = 'table';
    row = document.createElement("tr");
    td1 = document.createElement("td");
 	td2 = document.createElement("td");
    td1.appendChild(document.createTextNode(name));
    td2.appendChild(document.createTextNode(value));
    row.appendChild(td1);
	row.appendChild(td2);
    composerTable.appendChild(row);
	
}

function clearTableJson() {
  	if (composerTable.getElementsByTagName("tr").length > 0) {
        composerTable.style.display = 'none';
        for (loop = composerTable.childNodes.length -1; loop >= 0 ; loop--) {
            composerTable.removeChild(composerTable.childNodes[loop]);
        }
    }
}
