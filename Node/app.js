var com = require("serialport");
var moment = require('moment');
var fs = require('fs');

var plotlyUsername = "forsythetony";
var plotlyAPIKey = "lhgpw8cx5h";

var plotly = require('plotly')( plotlyUsername, plotlyAPIKey );

var serialPort = new com.SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600,
    parser: com.parsers.readline('\n')
});


var fileName = './tmp/hallwayTest_hallwayWithT-B.csv';
  
var streamToken = "0lkrmjtfic";
var initData = [{
    x : [],
    y : [],
    stream : {
        token :  streamToken ,
        maxpoints : 25
    },
    name : "Distance",
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
		"title": "Ultrasound Sensor Reading",
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

/*
plotly.plot(initData, layout, function (err, msg) {
  
  if (err){
	return console.log(err);  
  } 
  
  console.log(msg);

  var stream1 = plotly.stream( streamToken , function (err, res) {
    

  serialPort.on('data', function(data) {
	  
	  if( data != "STOP" )
	  {
		  var JSONdata = JSON.parse( data );
		  var value = JSONdata["sensor1"];
		  

		  //allValues.push( value );
  		  var writeData = { x : moment().format('mm:ss.SS'), y: String(convertToFeet( value )) };
		  console.log( writeData );
		  stream1.write( JSON.stringify( writeData ) + "\n");
		 
	  }
	  
  });
});

*/
fs.writeFile( fileName , "time, distance(ft)\n", function(err) {
	if(err){
		console.log( err );
	} else {
		console.log( "File was saved!" );
	}
});

 serialPort.on('data', function(data) {
	  
	  if( data != "STOP" )
	  {
		  var JSONdata = JSON.parse( data );
		  var value = JSONdata["sensor1"];
		  

		  //allValues.push( value );
  		  var writeData = { "time" : moment().format('hh:mm:ss.SS'), "distance" : String(convertToFeet( value )) };
		  console.log( writeData );
		  
		 var fileAppendData = '"' + writeData["time"] + '" , ' + writeData["distance"] + '\n';
		 
		 fs.appendFile( fileName, fileAppendData , function(err) {
			 
		 });
		 
		  //stream1.write( JSON.stringify( writeData ) + "\n");
		 
	  }
	  
  });
  

  
function convertToFeet( someValue ) {
	
	var inFeet = someValue / 12.0;
	
	return inFeet.toFixed(2);
	
}
