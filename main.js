function setup(){
    canvas = createCanvas(300, 300)
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('mobileNet', modelLoaded);
}

function modelLoaded(){
    console.log(modelLoaded);
}

function draw(){
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResult);
}

var previous_result = '';

function gotResult(error, results){
  if (error){
      console.error(error);
  }
  else {
    if ((results[0].confidence > 0.5) && ( previous_result != results[0].label)){
    console.log(results);
    previous_result =  results[0].label;
    var synth = window.speechSynthesis;
    speak_data  = 'Object Detected is-' + results[0].label;
    var UtterThis = new SpeechSynthesisUtterance(speak_data);

    document.getElementById("my_object").innerHTML = "object-" + results[0].label;

    document.getElementById("accuracy").innerHTML = "accuracy-" + results[0].confidence.toFixed(3);
    }
  }
}