function setQuestion(){$(".response").val(""),$(".answer").text(""),$(".timer").text(""),$(".question-title").text("Question "+(questionCount+1)),$(".question-count").text(questionCount);var t=operators[Math.round(Math.random()*(operators.length-1))];firstBit=Math.round(Math.random()*maxBit),secondBit="<<"!==t&&">>"!==t&&">>>"!==t?Math.round(Math.random()*maxBit):Math.round(3*Math.random())+1;var e="";switch(e="~"!==t?firstBit+" "+t+" "+secondBit:t+firstBit,$(".question-specific").text(e+"?"),t){case operators[0]:answer=firstBit<<secondBit;break;case operators[1]:answer=firstBit>>secondBit;break;case operators[2]:answer=firstBit>>>secondBit;break;case operators[3]:answer=~firstBit;break;case operators[4]:answer=firstBit&secondBit;break;case operators[5]:answer=firstBit|secondBit;break;case operators[6]:answer=firstBit^secondBit;break;default:console.error("Oh shit, that's not an operator we recognize!")}var n=firstBit.toString(2),o=secondBit.toString(2),s="";if(n.length>o.length){for(var i=0;i<n.length-o.length;i++)s+="0";o=s+o}else if(o.length>n.length){for(var i=0;i<o.length-n.length;i++)s+="0";n=s+n}$(".bit-one").text(n),"~"!==t&&"<<"!==t&&">>"!==t&&">>>"!==t?$(".bit-two").text(o):$(".bit-two").text(""),isAnswered=!1,clearInterval(countdownInterval)}function checkAnswer(){response=parseInt($(".response").val());var t="";questionCount++,$(".question-count").text(questionCount),answer===response?(points++,$(".points-count").text(points),t+="Correct!"):t+="Incorrect!",t+=" The answer was "+answer,isAnswered=!0,$(".answer").text(t),setTimeout(removeQuestion,3e3),countdown=3,countdownInterval=setInterval(countdownTime,1e3),countdownTime(),points%5===0&&2147483647>=2*maxBit+1&&2*maxBit+1>=-2147483647&&(maxBit=2*maxBit+1),$(".level-count").text(Math.floor(points/5)+1),$(".tweet-link").show();var e="I reached level "+Math.floor(points/5)+", and got "+points+" out of "+questionCount+" correct in the bitwise operators test! I'm such a fucking nerd.",n="https://twitter.com/intent/tweet?text="+encodeURIComponent(e);n+="&url="+encodeURIComponent("https://jepster-dk.github.io/bitwise-operators-and-you/"),$(".tweet-link").attr("href",n)}function removeQuestion(){$(".question-container").addClass("remove-q"),setTimeout(setQuestion,750),setTimeout(function(){$(".question-container").removeClass("remove-q")},1499)}function countdownTime(){$(".timer").text("Getting new question in "+countdown+" seconds"),0!==countdown&&countdown--}var answer=0,response=0,points=0,questionCount=0,isAnswered=!1,firstBit=0,secondBit=0,maxBit=15,operators=["<<",">>",">>>","~","&","|","^"];$(document).ready(function(){$(".points-count").text(points),$(".level-count").text(Math.floor(points/5)+1),setQuestion(),$(".answer-form").on("submit",function(t){t.preventDefault(),isAnswered||""===$(".response").val()||checkAnswer()}),$(".toggle-bits").click(function(t){t.preventDefault(),$(".bit-one, .bit-two").slideToggle(300),"Show as bits"===$(this).text()?$(this).text("Hide bits"):$(this).text("Show numbers as bits")})});var countdownInterval,countdown=0;