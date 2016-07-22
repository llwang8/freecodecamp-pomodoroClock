// freecodecamp - Pomodoro Clock -->

$(document).ready(function(){
    //change break length
    var setting = '';
    var running = false;
    $('.break').click(function(){
        setting = $('.break-setting').text()
        $('.break-setting').text(updateSetting(setting, $(this).text()));

    });

    //change session length and update clock's session length
    $('.session').click(function(){
        setting = $('.session-setting').text()
        var newSession = updateSetting(setting, $(this).text());
        $('.session-setting').text(newSession);
        if (!running) {
            $('.countdown').text(newSession);
        }

    });

    function updateSetting(setting, operation){
        if (operation === "+"){
            return eval( setting + '+ 1');
        }else {
            return eval( setting + '- 1');
        }
    }


    //display timer countdown

    var d, timeEnd, timeinterval;
    var timeGap = eval($('.session-setting').text()) * 60 * 1000;
    var running = false;
    var breaking = false;
    var sessioning = false;

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

    //water bubble
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



    //test box background transition
    $('.box').click(function(){
        if (!$('.box').hasClass('box-animation')) {
            $('.box').addClass('box-animation');
            //$('.box').transition({background-position: '10s linear'})
        }else {
            if (!$('.box').clearQueue()){
                $('.box').stop(true, false);
            }else {
                //$('.box').transition().removeClass('stop');
                $('.box').stop(false, true);
            }
        }

        //$('.box').addClass('box-animation');
    });

    $('.box2').click(function(){
        $('.box2').addClass('box2-animation');
    });



});



