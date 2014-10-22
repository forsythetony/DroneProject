//  Definitions

  //  Pin Values
  #define SENSORPIN1  0
  #define SENSORPIN2  12345

  //  Conversion Defines
  #define INCHESCONV  2
  #define FEETCONV    3
  #define CMCONV      4
  #define RAWCONV     5
  
  // JSON Package Defines
  #define SENSORLABEL1  "sensor1"
  #define SENSORLABEL2  "sensor2"

  //  Time delays
  #define DELAYMAIN  100
  
  
//  Library Includes
#include <JsonGenerator.h>
using namespace ArduinoJson::Generator;

//  Global Variables
int val  = 0;

void setup() {

  Serial.begin(9600);

}

void loop()
{
 
  val = analogRead( SENSORPIN1 );
  delay( DELAYMAIN );
   
  printValue( convertValue( val , RAWCONV ));
  
}

void printValue( float value ) {

  JsonObject<2> object;
  
  object[SENSORLABEL1] = value;
  
  Serial.print(object);
  Serial.print("\n");
}

float convertValue( int value , int conversionType ) {
  
  float fValue  =  (float)value;
  
  float conversionFactor = 0.0;
  
  switch( conversionType ) {
    
    case INCHESCONV: {
      float scaling = 5.0 / 1024.0;
      return fValue/scaling; 
    }
      break;
      
    case FEETCONV: {
      conversionFactor = 10.0;
      return fValue * conversionFactor;
    }
      break;
      
    case CMCONV: {
      conversionFactor = 1.0;
      return fValue * conversionFactor;
    }
      break;
      
    case RAWCONV: {
      return fValue;
    }
      break;
      
    default: {
      return 1.0;
    }
      break;
  }
}
  
