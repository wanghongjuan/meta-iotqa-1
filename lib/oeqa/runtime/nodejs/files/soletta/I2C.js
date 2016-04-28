var testUtils = require( "../assert-to-console" );

console.log( JSON.stringify( { assertionCount: 7 } ) );

var i2c = require( "../../../../i2c" );

i2c.open({
    bus: 0x08,
    device: 0x45,
    speed: "400kbps"
}).then(
    function ( I2CBus ) {
      testUtils.assert( "strictEqual", typeof( I2CBus ), "object", "I2CBus init successfully" );
      var reader = I2CBus.read();
      reader.onfinished = function ( I2CReadEvent ) {
        testUtils.assert( "strictEqual", typeof( reader ), "object", "I2CReader init successfully" );
        testUtils.assert( "strictEqual", typeof( I2CReadEvent ), "object", "I2CReadEvent init successfully" );
        testUtils.assert( "strictEqual", I2CReadEvent.length, 5, "I2CReadEvent.length run normally" );
      };

      var writer = I2CBus.write("To be sent as byte array.");
      writer.onfinished = function ( I2CWriteEvent ) {
        testUtils.assert( "strictEqual", typeof( writer ), "object", "I2CWriter init successfully" );
        testUtils.assert( "strictEqual", typeof( I2CWriteEvent ), "object", "I2CWriteEvent init successfully" );
        testUtils.assert( "strictEqual", I2CWriteEvent.length, 6, "I2CWriteEvent.length run normally" );
      };

}).catch( error => {
    testUtils.assert( "ok", false, "Could not run open method of interface i2c" );
});
