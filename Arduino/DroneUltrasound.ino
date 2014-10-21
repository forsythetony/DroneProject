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
  float inches = convertToInches( val );
  delay( delayVal );
 
  counter += 1;
  
  if( 1 )
  {
    printValue(inches);
  }

  

}

float convertToInches( int value ) {

  float scaling = 5.0 / 1024.0;

  float measuredVoltage = (float)value;

  return (measuredVoltage/scaling);

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

