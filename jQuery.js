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
    var running = true;
    var d = new Date();
    var timeGap = eval($('.timer').text());
    var timeEnd = d.setMinutes(d.getMinutes() + timeGap);
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);

    $('.countdown').click(function(){
        running = !running;
        if (running){
            timeEnd = d.setMilliseconds(d.getMilliseconds() + timeGap);
            updateClock();
            timeinterval = setInterval(updateClock, 1000);
        }else {
            clearInterval(timeinterval);
            //alert($('.countdown').text().slice(-2));
            alert($('.countdown').text().slice(0, 2));
            timeGap = eval($('.countdown').text().slice(-2)) * 1000 + eval($('.countdown').text().slice(0, 2)) * 60 * 1000;
            //alert(timeGap);

        }
    });

    function getTimeRemaining(){
        var t = timeEnd  - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);

        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function updateClock(){
        var t = getTimeRemaining();
        $('.countdown').text(('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2));
        if (t.total <= 0){
            clearInterval(timeinterval);
        }
    }


});


//test timer countdown

//var d = new Date();
//var endtime = d.setMinutes(d.getMinutes()+ eval('30'));
//console.log(d);
//console.log(endtime);

//var t = endtime - Date.parse(new Date());
//console.log(t);
//console.log(typeof t);

//var seconds = Math.floor((t / 1000) % 60);
//var minutes = Math.floor((t / 1000 / 60) % 60);
//console.log("minutes:" + minutes + "  seconds:" + seconds);

/*
var d = new Date();
var endtime = d.setMinutes(d.getMinutes()+ eval('1'));
updateClock();
var timeinterval = setInterval(updateClock, 1000);

    function getTimeRemaining(){
        var t = endtime - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);

        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function updateClock(){
        var t = getTimeRemaining();
        console.log(('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2));
        if (t.total <= 0){
            clearInterval(timeinterval);
        }
    }
*/
