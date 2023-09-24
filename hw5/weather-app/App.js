import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { getWeather } from "./lib/DataProcess";

const weatherConditions = {
  2: "11d",
  3: "09d",
  5: "10d",
  6: "13d",
  7: "50d",
  8: "02d",
};

export default function App() {
  const [cityName, setCityName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const onPress = async () => {
    const response = await getWeather(cityName);
    setWeatherInfo(response);
    setCityName("");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {weatherInfo && (
          <>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${
                  weatherConditions[weatherInfo.id]
                }@2x.png`,
                width: 120,
                height: 120,
              }}
            />
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {weatherInfo.name}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "white",
                  paddingTop: 10,
                }}
              >
                {weatherInfo.date}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 23,
                  fontWeight: 600,
                  color: "white",
                  paddingTop: 30,
                }}
              >
                {weatherInfo.temp} C
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "white",
                  paddingTop: 5,
                }}
              >
                {weatherInfo.main}
              </Text>
            </View>
          </>
        )}
        {!weatherInfo && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: 600,
              color: "white",
            }}
          >
            there weren't any request
          </Text>
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          paddingTop: "50%",
        }}
      >
        <TextInput
          placeholder="City..."
          style={styles.input}
          value={cityName}
          onChangeText={(text) => setCityName(text)}
        />
        <Button
          color={"#176B87"}
          title="Send"
          style={styles.button}
          disabled={!cityName}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#279EFF",
    paddingVertical: 100,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: "white",
    width: 200,
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
