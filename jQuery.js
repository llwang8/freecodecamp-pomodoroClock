// freecodecamp - Pomodoro Clock -->

$(document).ready(function(){
    //change break length
    var setting = '';
    $('.break').click(function(){
        setting = $('.break-setting').text()
        $('.break-setting').text(updateSetting(setting, $(this).text()));

    });

    //change session length and update clock's session length
    $('.session').click(function(){
        setting = $('.session-setting').text()
        var newSession = updateSetting(setting, $(this).text());
        $('.session-setting').text(newSession);
        $('.timer').text(newSession);

    });

    function updateSetting(setting, operation){
        if (operation === "+"){
            return eval( setting + '+ 1');
        }else {
            return eval( setting + '- 1');
        }
    }

    //canvas circle
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    drawClock();

    function drawClock() {
        ctx.arc(0, 0, radius, 0 , 2*Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    //display timer countdown
    var endtime = Date.parse(new Date()) + eval($('.timer').text()) * 60 * 1000;
    //alert(endtime);
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);

    function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);

        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function updateClock(){
        var t = getTimeRemaining(endtime);
        $('.countdown').text(t.minutes + ":" + t.seconds);
        if (t.total <= 0){
            clearInterval(timeinterval);
        }
    }



});


//test timer countdown
var endtime = Date.parse(new Date()) + eval('3') * 60 * 1000;

var t = Date.parse(endtime) - Date.parse(new Date());
var seconds = Math.floor((t / 1000) % 60);
var minutes = Math.floor((t / 1000 / 60) % 60);
updateClock();
var timeinterval = setInterval(updateClock, 1000);

    function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);

        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function updateClock(){
        var t = getTimeRemaining(endtime);
        console.log(t.minutes + ":" + t.seconds);
        if (t.total <= 0){
            clearInterval(timeinterval);
        }
    }

