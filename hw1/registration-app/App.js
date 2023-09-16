import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [visible, setVisible] = useState(false);

  const actionWithInfo = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
      setEmail("");
      setNumber("");
      setUsername("");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text>Registration</Text>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            placeholder="Username"
          />
          <TextInput
            value={number}
            onChangeText={(text) => setNumber(text)}
            style={styles.input}
            placeholder="Phone number"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Email"
          />
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Button
              title="Show"
              onPress={actionWithInfo}
              disabled={!username || !number || !email}
            />
          </View>
        </View>
      </View>
      <Modal animationType="fade" visible={visible}>
        <View style={styles.centeredView}>
          <Text style={styles.infoText}>Username: {username}</Text>
          <Text style={styles.infoText}>Phone number: {number}</Text>
          <Text style={styles.infoText}>Email: {email}</Text>
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Button title="Close" onPress={actionWithInfo} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 15,
    width: 120,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    backgroundColor: "silver",
    padding: 5,
    marginTop: 15,
    borderRadius: 10,
  },
});
