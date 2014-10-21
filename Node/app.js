var com = require("serialport");
var moment = require('moment');

var plotlyUsername = process.env.PLOTLY_USERNAME;
var plotlyAPIKey = process.env.PLOTLY_APIKEY;

var plotly = require('plotly')( plotlyUsername, plotlyAPIKey );

var serialPort = new com.SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600,
    parser: com.parsers.readline('\n')
});

  
var streamToken = "1l0e05rpv1";
var initData = [{
    x : [],
    y : [],
    stream : {
        token :  streamToken ,
        maxpoints : 10000
    },
    name : "Testing",
    type : "scatter"
}];

var initGraphOptions = {fileopt : "extend", filename : "nodenodenode"};


plotly.plot(initData, initGraphOptions, function (err, msg) {
  
  if (err){
	return console.log(err);  
  } 
  
  console.log(msg);

  var stream1 = plotly.stream( streamToken , function (err, res) {
    console.log(err, res);
    
  });

  serialPort.on('data', function(data) {
	  
	  if( data != "STOP" )
	  {
		  var JSONdata = JSON.parse( data );
		  var value = JSONdata["sensor1"];
		  value = String( value );
		  
		  var writeData = { x : moment().format('h:mm:ss.SS'), y: value };
		  console.log( writeData );
		  stream1.write( JSON.stringify( writeData ) + "\n");
	  }
	  
  });
});
