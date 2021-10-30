var prediction1="";
var prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function capture_img(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
    });
}

console.log(ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IQbPLp-o2/model.json",modelloaded);

function modelloaded(){
    console.log("model is loaded");
}

function speak(){
    var synth=window.speechSynthesis;
        speak_data1="The first prediction is"+prediction1;
        speak_data2="and The second prediction is"+prediction2;
        var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
        synth.speak(utter_this);
}

function check(){
    var img=document.getElementById("captured_img");
    classifier.classify(img,got_result);
}

function got_result(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        if(prediction1=="Happy"){
            document.getElementById("update_name").innerHTML= "&#128512;";
        }
        if(prediction1=="Sad"){
            document.getElementById("update_name").innerHTML= "&#128532;";
        }
        if(prediction1=="Angry"){
            document.getElementById("update_name").innerHTML= "&#128545;";
        }
        if(prediction1=="Crying"){
            document.getElementById("update_name").innerHTML= "&#128546;";
        }
         if(prediction2=="Happy"){
            document.getElementById("update_name2").innerHTML= "&#128512;";
            }
         if(prediction2=="Sad"){
            document.getElementById("update_name2").innerHTML= "&#128532;";
            }
        if(prediction2=="Angry"){
            document.getElementById("update_name2").innerHTML= "&#128545;";
            }
        if(prediction2=="Crying"){
            document.getElementById("update_name2").innerHTML= "&#128546;";
         }
         speak();
        }
       
}