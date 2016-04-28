var testUtils = require( "../assert-to-console" );

console.log( JSON.stringify( { assertionCount: 3 } ) );

var spi = require( "../../../../spi" );

spi.open({
    bus: 0,
    frequency: 10000000
}).then(
    function ( SPIBus ) {
        testUtils.assert( "strictEqual", typeof(SPIBus), "object", "SPIBus init successfully" );
        SPIBus.transfer([ 0, 1, 2, 3, 4 ]).then( function () {
          testUtils.assert( "strictEqual", ok, true, "SPIBus.transfer run normally" );
          SPIBus.close()
          testUtils.assert( "strictEqual", ok, true, "SPIBus.close run normally" );
      });
}).catch( error => {
    testUtils.assert( "ok", false, "Could not run open method of interface spi" );
});
