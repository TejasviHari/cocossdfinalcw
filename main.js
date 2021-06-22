
status="";
objects=[];




function setup(){
    canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
object_detector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status: Objects detecting.";
}

function modelLoaded(){
    console.log("CocoSSD loaded!");
    status=true;
   
}

function draw(){
    image(video,0,0,380,380);
   if(status!=""){
       r=random(255);
       g=random(255);
       b=random(255);
       object_detector.detect(video,gotResult);
       for(i=0;i<objects.length;i++){
        
           document.getElementById("status").innerHTML="Status: Objects Detected";
           document.getElementById("nobjects").innerHTML="No. of objects detected = "+objects.length;
           fill(r,g,b);
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
           noFill()
           stroke(r,g,b);
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
           
       } 
   }
}


function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects=results;
    }

}