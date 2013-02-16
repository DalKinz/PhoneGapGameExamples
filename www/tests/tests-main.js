//var phoneGapReady = false;
//var timeoutCounter = 0;

//document.addEventListener("deviceready",function(){phoneGapReady = true},false);


//module('deviceIndependent');
test('hello test', function() { ok(1 == '1','Should pass');});

//module('deviceDependent', {
//  setup: function() {
//      if (timeoutCounter > 4) return;
      
//      while (!phoneGapReady){
//          timeoutCounter++
//          setTimeout(this.setup, 1000);
//      }
//  }
//});
test('getPicture-Success', function() {
    getPicture();
    ok($('#cameraImage').attr('src') != '#');
});

test('getAccelerometerData-Success', function() {
    getAccelerometerData();
    ok($('#popupMessage').html.contains('Acceleration X:'))
});