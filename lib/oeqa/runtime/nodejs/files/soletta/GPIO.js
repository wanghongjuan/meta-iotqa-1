var testUtils = require( "../assert-to-console" );

console.log( JSON.stringify( { assertionCount: 3 } ) );

var GPIO = require('../../../../gpio');
var pin3 = null;

GPIO.open({
    pin: 3,
    direction: "out",
    activeLow: true,
    pullup: true,
    edge: "rising"})
.then(
    function (pin) {
    testUtils.assert("deepEqual", typeof(pin), "object", "GPIOPin init successfully" )
    pin3 = pin;
    pin.write(true);
    testUtils.assert("deepEqual", pin, pin3, "GPIOPin write method work fine");
    pin.onchange = function(event) {
        testUtils.assert("strictEqual", event.value, 3, "GPIO pin value is as expected");
    };
    pin.close();
}).catch((error) => {
    testUtils.assert("ok", false, "Could not run open method of interface GPIO " + error);
});
