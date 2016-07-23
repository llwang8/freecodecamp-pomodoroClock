// freecodecamp - Pomodoro Clock -->

$(document).ready(function(){
    //define global variables
    var setting = '';
    var running = false;
    var breaking = false;
    var sessioning = false;
    var d, timeNow, timeLast, timeRemaining, fraction, water;


    //change break length when  clock is not running
    $('.break').click(function(){
        if (!running){
            setting = $('.break-setting').text()
            $('.break-setting').text(updateSetting(setting, $(this).text()));
        }
    });

    //change session length and update clock's session length when clock is not running
    $('.session').click(function(){
        if (!running) {
            setting = $('.session-setting').text()
            var newSession = updateSetting(setting, $(this).text());
            $('.session-setting').text(newSession);
            $('.countdown').text(newSession);
        }

        timeRemaining = eval($('.session-setting').text()) * 60 * 1000;
        updateDisplay(timeRemaining);
    });

    function updateSetting(setting, operation){
        if (operation === "+"){
            return eval( setting + '+ 1');
        }else {
            if (eval( setting + '- 1') < 0) {
                return 0;
            }else {
                return eval( setting + '- 1');
            }

        }
    }


    //water bubble as background for timer
    $('#demo').waterbubble({
      // bubble size
      radius: 150,
      // border width
      lineWidth: undefined,
      // data to present
      data: 0.06,
      // color of the water bubble
      waterColor: 'rgba(179, 209, 86, 1)',
      // text color
      textColor: 'rgba(255, 255, 255, 0.8)',
      // custom font family
      font: 'normal 36px lato',
      // show wave
      wave: true,
      // custom text displayed inside the water bubble
      txt: undefined,
      // enable water fill animation
      animation: true

    });

    var canvas = document.getElementById('demo');
    canvas.addEventListener('click', function() {
        alert("canvas clicked");
        if (timeRemaining <= 0){
            //return;
            switch();
        }
        if (!running){
            running = true;
            run();
        }else {
            //timeGap = eval($('.countdown').text().slice(-2)) * 1000 + eval($('.countdown').text().slice(0, 2)) * 60 * 1000 ;
            pause();
        }

    }, false);


    function update(){
        if (timeRemaining <= 0){
            //return;
            switch();
        }

        timeNow = (new Date()).getTime();
        timeRemaining = timeRemaining - (timeNow - timeLast);
        timeLast = timeNow;


        if ($('.type') === 'Session'){
            totalTime = eval($('.session-setting').text()) * 60 * 1000;
            water =  'rgba(179, 209, 86, 1)';
        }else {
            totalTime = eval($('.break-setting').text()) * 60 * 1000;
            water = 'rgba(255, 0, 0, 1)';
        }

        fraction = 1 - (timeRemaining / totalTime);

        $('#progress').waterbubble({
            data: fraction,
            animation: false,
            waterColor: water,
        });

        if (timeRemaining <= 0){
            switch();
        }


        updateDisplay(timeRemaining);
          if (running) {
            requestAnimationFrame(update);
        }

    }

    function updateDisplay(t){
        var seconds = pad(Math.floor((t / 1000) % 60));
        var minutes = pad(Math.floor((t / 1000 / 60) % 60));
        $('.countdown').text(minutes + ":" + seconds);
    }

    function pad(val) {
        return ('00' + val).slice(-2);
    }

    function run(){
        if (timeRemaining <= 0){
            switch();
        }

        timeLast = (new Date()).getTime();
        running = true;
        requestAnimationFrame(update);
    }

    function pause(){
        running = false;
    }

    function switch(){
        // session ends and break starts
        if ($('.type').text() === "Session") {
            $('.type').text('Break');
            timeRemaining = eval($('.break-setting').text()) * 60 * 1000;
            run();
        }else {
            //break ends and default setting resets
            $('.type').text('Session');
            $('.break-setting').text(5);
            $('.session-setting').text(25);
            $('.countdown').text('25:00');
            $('#demo').waterbubble({
                data: 0.06,
                animation: false,
                waterColor: 'rgba(179, 209, 86, 1)'
            });
            //timeRemaining = eval($('.session-setting').text()) * 60 * 1000;
        }
    }









// circle timer
    $('.circle').click(function(){
        if (!running ){
            d = new Date();
            timeEnd = d.setMilliseconds(d.getMilliseconds() + timeGap);
            updateClock();
            timeinterval = setInterval(updateClock, 1000);
        }else {
            clearInterval(timeinterval);
            //alert($('.countdown').text().slice(-2));
            //alert($('.countdown').text().slice(0, 2));
            timeGap = eval($('.countdown').text().slice(-2)) * 1000 + eval($('.countdown').text().slice(0, 2)) * 60 * 1000 ;
            //alert(timeGap);

        }
        running = !running;
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
            if (!breaking) {        //session ends
                breaking = true;
                sessioning = false;
                running = true;
                $('.type').text('Break');
                $('.countdown').text($('.break-setting').text());
                timeGap = eval($('.countdown').text()) * 60 * 1000;
                d = new Date();
                timeEnd = d.setMilliseconds(d.getMilliseconds() + timeGap);
                updateClock();
            }else {                 //break ends
                breaking = false;
                sessioning = true;
                running = false;
                $('.type').text('Session');
                $('.countdown').text($('.session-setting').text());
                timeGap = eval($('.countdown').text()) * 60 * 1000;
            }
        }
    }


});



