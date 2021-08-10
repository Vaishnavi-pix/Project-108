prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_image' src='"+data_uri+"'>";
    })
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hz40V-YVhM/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is "+prediction1;
    speak_data2="And the second prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
if(error){
console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_hand_gesture_name").innerHTML=results[0].label;
    document.getElementById("result_hand_gesture_name2").innerHTML=results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;
speak();
if(results[0].label == "Good"){
    document.getElementById("update_hand_gesture").innerHTML="&#128077;";
}
if(results[0].label == "Bad"){
    document.getElementById("update_hand_gesture").innerHTML="&#128078;";
}
if(results[0].label == "Victory"){
    document.getElementById("update_hand_gesture").innerHTML="&#9996;";
}
if(results[0].label == "Vulcan Salute"){
    document.getElementById("update_hand_gesture").innerHTML="&#128406;";
}
if(results[0].label == "Ok"){
    document.getElementById("update_hand_gesture").innerHTML="&#128076;";
}
if(results[1].label == "Good"){
    document.getElementById("update_hand_gesture2").innerHTML="&#128077;";
}
if(results[1].label == "Bad"){
    document.getElementById("update_hand_gesture2").innerHTML="&#128078;";
}
if(results[1].label == "Victory"){
    document.getElementById("update_hand_gesture2").innerHTML="&#9996;";
}
if(results[1].label == "Vulcan Salute"){
    document.getElementById("update_hand_gesture2").innerHTML="&#128406;";
}
if(results[1].label == "Ok"){
    document.getElementById("update_hand_gesture2").innerHTML="&#128076;";
}
}
}