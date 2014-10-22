//  Personal Definitions

#define INCHESCONV  2
#define FEETCONV    3
#define CMCONV      4
#define RAWCONV     5

//  Library Includes
#include <JsonGenerator.h>
using namespace ArduinoJson::Generator;

int ultraPin = 0;
int val = 0;
int delayVal = 200; // Delay for 200 milliseconds
int counter = 0;

void setup() {

  Serial.begin(9600);

}

void loop()
{
  val = analogRead( ultraPin );
  delay( delayVal );
 
  counter += 1;
  
  printValue( convertValue( val , RAWCONV ));
  
}

void intPrint( int value ) {

  JsonObject<2> object;
  
  object["sensor1"] = value;
  
  Serial.print(object);
  Serial.print("\n");

}
void printValue( float value ) {

  JsonObject<2> object;
  
  object["sensor1"] = value;
  
  Serial.print(object);
  Serial.print("\n");
  
  if( counter ==  99 )
  {
    Serial.print("STOP");
    Serial.print("\n");
  }
  

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
  
