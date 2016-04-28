var testUtils = require( "../assert-to-console" );

console.log( JSON.stringify( { assertionCount: 3 } ) );

var pwm = require( "../../../../pwm" );

pwm.open({
    device: 0,
    channel: 1,
    period: 1000,
    dutyCycle: 500
}).then(
    function ( PWMPin ) {
        testUtils.assert( "strictEqual", typeof(PWMPin), "object", "PWMPin init successfully" );
        PWMPin.close();
        testUtils.assert( "strictEqual", ok, true, "PWMPin.close run normally" );
}).catch( error => {
    testUtils.assert( "ok", false, "Could not run open method of interface PWM" );
});
