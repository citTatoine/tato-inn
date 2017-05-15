document.getElementsByClassName("cookButDiv").addEventListener("click", cooktime(this), false);


var finishDiv = document.getElementById("fulfilled");

                function cooktime(elem){
                    elem.onclick = "NOPE";
                    elem.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/54/Blank_Canvas_on_Transparent_Background.png')";

                    var progContainer = document.createElement("div");
                    var progBar = document.createElement("div");
                    var progBarComplete = document.createElement("div");
                    progContainer.className = "col-xs-12 col-sm-12 progress-container";
                    progBar.className = "progress progress-striped active";
                    progBarComplete.className = "progress-bar progress-bar-info";
                    progBarComplete.style.width = "0%";
                    elem.append(progContainer);
                    progContainer.appendChild(progBar);
                    progBar.appendChild(progBarComplete);


                    $(".progress-bar").animate({
                        width: "100%"
                    }, 5000);  
                    
                    var counter = 0;
                    var interval = setInterval(function() {
                        counter++;
                        if (counter == 5) { //change the 5 here to the calculated time 
                            progBarComplete.className += "progress-bar-complete";
                        }
                        if(counter == 6){ //change the 6 here to the calculated time + 1
                            clearInterval(interval);
                            var mainDiv = "#orderdiv" + elem.id;
                            console.log(mainDiv); 
            
                            console.log($(mainDiv +' div:eq(2)').html()); 
                            var ndiv = document.createElement("div");
                            var countndiv = document.createElement("div");
                            ndiv.innerHTML = " <hr /> <br /> <b>Order: " + elem.id + "</b><br /> Items: <br />" + $(mainDiv +' div:eq(2)').html();
                            ndiv.id = "#finisheddiv" + elem.id;
                            ndiv.append(countndiv);
                            finishDiv.append(ndiv);            
                            elem.parentNode.remove();
                            function startTimer(duration, display) {
                                var timer = duration, minutes, seconds;
                                setInterval(function () {
                                    minutes = parseInt(timer / 60, 10)
                                    seconds = parseInt(timer % 60, 10);

                                    minutes = minutes < 10 ? "0" + minutes : minutes;
                                    seconds = seconds < 10 ? "0" + seconds : seconds;

                                    display.text(minutes + ":" + seconds);

                                    if (--timer < 0) {
                                        timer = duration;
                                    }
                                }, 1000);
                            }

                            jQuery(function ($) {
                                var fiveMinutes = 60 * 5,
                                    display = $(countndiv);
                                startTimer(fiveMinutes, display);
                            });
                        }
                    }, 1150);                
                }
$(document).ready(function() {
    
});