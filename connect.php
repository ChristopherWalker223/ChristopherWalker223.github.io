<?php

$occupation = $_POST['occupation'];
$field = $_POST['field'];
$whySelect = $_POST['whySelect'];
$whyNotSelect = $_POST['whyNotSelect'];
$additionalComments = $_POST['additionalComments'];
$forestValueBox = $_POST['forestValueBox'];
$cityValueBox = $_POST['cityValueBox'];
$noiseValueBox = $_POST['noiseValueBox'];
$oceanValueBox = $_POST['oceanValueBox'];
$rainValueBox = $_POST['rainValueBox'];
$officeValueBox = $_POST['officeValueBox'];
$minutesSpentBox = $_POST['minutesSpentBox'];

$conn = new mysqli('cjwthesis-db.miserver.it.umich.edu','cjw_thesis_survey','OBqEK4vSTM!','cjw_thesis_survey');

if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
}

else{
    $stmt = $conn->prepare("insert into cjw_thesis_survey.Survey_Data(occupation, field, whySelect, whyNotSelect, additionalComments, forestValueBox, cityValueBox, noiseValueBox, oceanValueBox, rainValueBox, officeValueBox, minutesSpentBox) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bind_param("sssssiiiiiii", $occupation, $field, $whySelect, $whyNotSelect, $additionalComments, $forestValueBox, $cityValueBox, $noiseValueBox, $oceanValueBox, $rainValueBox, $officeValueBox, $minutesSpentBox);
    
    $stmt->execute();
    echo "Thank you for participating in this study.";
    $stmt->close();
    $conn->close();
}

?>