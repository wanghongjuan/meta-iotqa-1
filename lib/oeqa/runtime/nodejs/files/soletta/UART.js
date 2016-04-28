var testUtils = require( "../assert-to-console" );

console.log( JSON.stringify( { assertionCount: 3 } ) );

var UART = require( "../../../../uart" );

UART.open({
    port: "ttyS0"
}).then(
    function ( UARTConnection ) {
        testUtils.assert( "strictEqual", typeof(UARTConnection), "object", "UARTConnection init successfully" );
        UARTConnection.write( "UART Test" ).then(
            function () {
                testUtils.assert( "strictEqual", ok, true, "UARTConnection.write() run normally" );
                UARTConnection.close();
                testUtils.assert( "strictEqual", ok, true, "UARTConnection.close() run normally" );
        });
}).catch( error => {
    testUtils.assert( "ok", false, "Could not run open method of interface UART" );
});
