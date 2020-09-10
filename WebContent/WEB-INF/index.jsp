<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<!DOCTYPE html>
<html> 
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Auto-Completion using AJAX</title>
 	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/cs/stylesheet.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>    
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/javascript.js"></script>
  </head>
  <body onload="init()"> 
	<h3>Music List</h3>
    <form name="autofillform" action="autocomplete">
      <table border="0" cellpadding="5"> 
        <tbody>
          <tr>
            <td><strong>Composer Name:</strong></td>
                        <td>
                            <input type="text"
                       size="40" 
                       id="complete-field"
                                   onkeyup="doCompletion()">
                        </td>
          </tr>
          <tr>
              <td id="auto-row" colspan="2">
                <table id="complete-table" class="popupBox" />
              </td>
          </tr>
        </tbody>
      </table>
    </form>
    
    <table id="composerTable"/>
 
  </body>
</html>
