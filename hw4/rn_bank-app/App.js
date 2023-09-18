import * as React from "react";
import { Text, View, Button, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

// AsyncStorage.clear()

function MainPage({ navigation }) {
  return (
    <View>
      <View style={{ marginBottom: 15 }}>
        <Button title="Bank" onPress={() => navigation.navigate("BankPage")} />
      </View>
      <View style={{ marginBottom: 15 }}>
        <Button
          title="Support"
          onPress={() => navigation.navigate("SupportPage")}
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        <Button
          title="Profile"
          onPress={() => navigation.navigate("ProfilePage")}
        />
      </View>
    </View>
  );
}

function ProfilePage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    (async () => {
      const profileInfo = await AsyncStorage.getItem("profileInfo");
      if (profileInfo) {
        const parsedInfo = JSON.parse(profileInfo);
        setName(parsedInfo.name);
        setNumber(parsedInfo.number);
        setSurname(parsedInfo.surname);
        setEmail(parsedInfo.email);
      }
    })();
  }, []);

  const saveInfo = async () => {
    const info = {
      name: name,
      surname: surname,
      email: email,
      number: number,
    };
    setEdit(!edit);
    await AsyncStorage.setItem("profileInfo", JSON.stringify(info));
  };

  const editInfo = () => {
    setEdit(!edit);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={name}
        onChangeText={(text) => setName(text)}
        editable={!edit}
      />
      <TextInput
        placeholder="Surname"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={surname}
        onChangeText={(text) => setSurname(text)}
        editable={!edit}
      />
      <TextInput
        placeholder="Phone number"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={number}
        onChangeText={(text) => setNumber(text)}
        editable={!edit}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        editable={!edit}
      />
      <View style={{ display: edit ? "none" : "block" }}>
        <Button
          title="Save"
          disabled={!name || !surname || !email || !number}
          onPress={saveInfo}
        />
      </View>
      <View style={{ display: edit ? "block" : "none" }}>
        <Button title="Edit" onPress={editInfo} />
      </View>
    </View>
  );
}

function BankPage() {
  const [inputValue, setInputValue] = useState("");
  const [bankMoney, setBankMoney] = useState(0);

  useEffect(() => {
    (async () => {
      const bankMoney = await AsyncStorage.getItem("bankMoney");
      if (bankMoney === null) {
        setBankMoney(0);
      } else {
        setBankMoney(JSON.parse(bankMoney));
      }
    })();
  }, []);

  const setMoneyIntoBank = async () => {
    if (!isNaN(+inputValue)) {
      const finalSum = bankMoney + +inputValue;
      setBankMoney(finalSum);
      setInputValue("");
      await AsyncStorage.setItem("bankMoney", JSON.stringify(finalSum));
    }
  };

  const getMoneyFromBank = async () => {
    if (!isNaN(+inputValue)) {
      const finalSum = bankMoney - +inputValue;
      setBankMoney(finalSum);
      setInputValue("");
      await AsyncStorage.setItem("bankMoney", JSON.stringify(finalSum));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 10 }}>{bankMoney}$</Text>
      <TextInput
        inputMode="numeric"
        keyboardType="numeric"
        placeholder="Sum"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          padding: 10,
        }}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button
        title="Get money"
        onPress={getMoneyFromBank}
        disabled={!inputValue}
      />
      <Button
        title="Set money"
        onPress={setMoneyIntoBank}
        disabled={!inputValue}
      />
    </View>
  );
}

function SupportPage() {
  return (
    <>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ marginBottom: 10 }}>
          1) It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          2) The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          3) It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          4) The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.
        </Text>
      </View>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="BankPage" component={BankPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="SupportPage" component={SupportPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
