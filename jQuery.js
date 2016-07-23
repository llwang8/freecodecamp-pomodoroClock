// freecodecamp - Pomodoro Clock -->

$(document).ready(function(){
    //define global variables
    var setting = '';
    var running = false;
    var breaking = false;
    var sessioning = true;
    var d, timeNow, timeLast, timeRemaining, fraction, water;

    timeRemaining = eval($('.session-setting').text()) * 60 * 1000;

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
            setting = $('.session-setting').text();
            var newSession = updateSetting(setting, $(this).text());
            $('.session-setting').text(newSession);
            $('.countdown').text(newSession);
            sessioning = true;
        }

        timeRemaining = eval($('.session-setting').text()) * 60 * 1000;
        //alert(timeRemaining);
        updateDisplay(timeRemaining);
    });

    function updateSetting(setting, operation){
        if (operation === "+"){
            return eval( setting + '+ 1');
        }else {
            if (eval( setting + '- 1') === 0) {
                return 1;
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
      data: 0.0,
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

    //countdown timer
    var canvas = document.getElementById('demo');
    canvas.addEventListener('click', function() {
        alert("canvas clicked");
        if (timeRemaining <= 0){
            //return;
            switchType();
        }
        if (!running){
            running = true;
            run();
        }else {
            pause();
        }

    }, false);


    function update(){
        if (timeRemaining <= 0){
            //return;
            switchType();
        }

        timeNow = (new Date()).getTime();
        timeRemaining = timeRemaining - (timeNow - timeLast);
        timeLast = timeNow;

        if (sessioning){
            totalTime = eval($('.session-setting').text()) * 60 * 1000;
            water =  'rgba(179, 209, 86, 1)';
        }else {
            totalTime = eval($('.break-setting').text()) * 60 * 1000;
            water = 'rgba(255, 0, 0, 1)';
        }

        fraction = 1 - (timeRemaining / totalTime);

        $('#demo').waterbubble({
            radius: 150,
            data: fraction,
            animation: false,
            waterColor: water,
        });

        if (timeRemaining <= 0){
            switchType();
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
            switchType();
        }

        timeLast = (new Date()).getTime();
        running = true;
        requestAnimationFrame(update);
    }

    function pause(){
        running = false;
    }

    function switchType(){
        // session ends and break starts
        if (sessioning) {
            breaking = true;
            sessioning = false;
            $('.type').text('Break!');
            timeRemaining = eval($('.break-setting').text()) * 60 * 1000;
        }else {
            //break ends and default setting resets
            breaking = false;
            sessioning = true;
            $('.type').text('Session');
            $('.break-setting').text(5);
            $('.session-setting').text(25);
            $('.countdown').text('25:00');
            $('#demo').waterbubble({
                data: 0.06,
                animation: false,
                waterColor: 'rgba(179, 209, 86, 1)'
            });
            timeRemaining = eval($('.session-setting').text()) * 60 * 1000;
        }
        run();
    }

});


