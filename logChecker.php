<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>switches</title>
  <meta name="" content="">

</head>
<body>

<form style ="position: fixed; right:0;bottom:0" method="post" action="">
  <select name="GPON" id="GPON">
    <option value="GPON1 ">GPON1 </option>
    <option value="GPON2 ">GPON2 </option>
    <option value="GPON3 ">GPON3 </option>
    <option value="GPON4 ">GPON4 </option>
    <option value="GPON5 ">GPON5 </option>
    <option value="GPON6 ">GPON6 </option>
    <option value="GPON7 ">GPON7 </option>
    <option value="GPON8 ">GPON8 </option>
    <option value="GPON9 ">GPON9 </option>
    <option value="GPON10">GPON10 </option>
    <option value="GPON11">GPON11 </option>
    <option value="GPON12">GPON12 </option>
    <option value="GPON13">GPON13 </option>
    <option value="GPON14">GPON14 </option>
    <option value="GPON15">GPON15 </option>
    <option value="GPON16">GPON16 </option>   
    <option value="GPON17">GPON17 </option>
    <option value="GPON18">GPON18 </option>
    <option value="GPON19">GPON19 </option>
    <option value="GPON20">GPON20 </option>
    <option value="GPON21">GPON21 </option>
    <option value="GPON22">GPON22 </option>
    <!--<option value="GPON23">GPON23</option>-->
    <option value="GPON24">GPON24 </option>
 
  </select>
<input type="submit" name="form1" value="CHECK GPON LOG">

</form>

<?php

$switches = file_get_contents("switches/switches");
$switchesArray = array(); 
$lastActionArray =array();

if(isset($_POST["form1"])) {
	global $switches;
	global $switchesArray;
	global $lastActionArray;		
	$logFile = "/var/log/olt.log";
	$logFile1 = "/var/log/olt.log.1";
	if(strpos($_POST["GPON"], "GPON") !== false ){
	$gpon = $_POST["GPON"];
	}else{
	die("this script has been stopped , because somebody's doing something nasty!");
	}
	$switches = str_replace( "(" . $gpon,"<span id='scrollHere'>(" .$gpon . "</span>",$switches);
	$switchesArray = explode("\n", $switches); 
	checkLog($gpon,$logFile);
	checkLog($gpon,$logFile1);
   	displaySwitches($lastActionArray,$switchesArray);

   }else{
	print "<pre>";
	print $switches;
	print "</pre>";
 }


function checkLog($gpon,$logFile) {
	global $lastActionArray;
	$log = shell_exec("cat " . $logFile . " | grep ". $gpon);
	$logArray = explode("\n", $log);
	$logArrayReverse = array_reverse($logArray);
	$macRegEx = "/[a-zA-Z0-9_]{4}\.[a-zA-Z0-9_]{4}.[a-zA-Z0-9_]{4}/";
	foreach ($logArrayReverse as &$value) {
	if(preg_match($macRegEx,$value)) { 		
		preg_match($macRegEx, $value, $macs);
		if (!array_key_exists($macs[0],$lastActionArray)){			
			if(strpos($value, 'deregistered') !== false || strpos($value, 'authenticated') !== false){
				$lastActionArray[$macs[0]] = $value;
			}

		}
		}		
	}
}

function displaySwitches($lastActionArray,$switchesArray) {
	global $switchesArray;
	global $lastActionArray;
	foreach ($lastActionArray as $key => $value) {	 
	 	foreach ($switchesArray as $id => $line) {			
    			if(strpos($line, $key) !== false ){				
			if(strpos($value, 'deregistered') !== false && strpos($line, '#') === false){
				$switchesArray[$id] =   "<span style='background-color:#FFBFBF'>" .$line. " DEREG: " .substr($value,0,16). "</span>";
			}elseif (strpos($value, 'authenticated') !== false  && strpos($line, '#') === false) {
				$switchesArray[$id] =   "<span style='background-color:#daf1da'>" .$line. " AUTH:  " .substr($value,0,16) . "</span>";
			}
			}
		}
	}
	$output = "";
	foreach ($switchesArray as $id => $line) {
		$output = $output . $line . "\n";		
	}
	print "<pre>" . $output . "</pre>";
}

?>
<script>
document.getElementById('scrollHere').scrollIntoView();
document.getElementById('GPON').value = "<?php echo $_POST['GPON'];?>";
</script>
</body>
</html>



