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
        maxpoints : 25
    },
    name : "newgraph",
    type : "scatter",
    mode : "lines+markers",
    marker : {
	 color: "rgba(31, 119, 180, 0.96)"   
    },
    line : {
		color:"rgba(31, 119, 180, 0.31)"
    }
}];
var layout = {
    "filename": "streamSimpleSensor"
  , "fileopt": "overwrite"
  , "layout": {
		"title": "streaming mock sensor data",
		"xaxis" : {
		title: 'Time'
		, showgrid : false
		, zeroline : false
		, showline: false
		, ticks : ""
		},
		"yaxis" : {
		title: 'Inches'
		, showgrid : true
		, zeroline : false
		, showline: false
		, ticks : ""
		}
  }
  , "world_readable": true
}
var initGraphOptions = {fileopt : "extend", filename : "somethingnew"};

var counter = 0;
var allValues = [];

plotly.plot(initData, layout, function (err, msg) {
  
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
		  

		  //allValues.push( value );
  		  var writeData = { x : moment().format('h:mm:ss.SS'), y: String(convertToFeet( value )) };
		  console.log( writeData );
		  stream1.write( JSON.stringify( writeData ) + "\n");
		 
	  }
	  
  });
});

function convertToFeet( someValue ) {
	
	var inFeet = someValue / 12.0;
	
	return inFeet;
	
}
