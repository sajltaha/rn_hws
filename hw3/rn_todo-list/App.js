import {
  Animated,
  Button,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import uuid from "react-native-uuid";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const fadeAnim = useRef(new Animated.Value(10)).current;

  const post = () => {
    setModalVisible(!modalVisible);
  };

  const addPost = () => {
    const task = {
      taskID: uuid.v4(),
      title: inputValue,
    };
    setTasks([...tasks, task]);
    setInputValue("");
    setModalVisible(false);
  };

  const deletePost = (id) => {
    const tasksUpdated = tasks.filter((task) => {
      return task.taskID !== id;
    });
    setTasks(tasksUpdated);
  };

  const inputChange = (text) => {
    setInputValue(text);
  };

  useEffect(() => {
    // Animated.timing(fadeAnim, {
    //   toValue: 30,
    //   duration: 5000,
    //   useNativeDriver: true,
    // }).start();
  }, [fadeAnim]);

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop: 40,
        }}
      >
        <Button title="Add Task" onPress={post} />
        <View
          style={{
            marginTop: 15,
          }}
        >
          <View
            style={{
              height: "100%",
            }}
          >
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.taskID}
              renderItem={({ item }) => {
                return (
                  <>
                    <TouchableOpacity
                      key={item.taskID}
                      onLongPress={() => deletePost(item.taskID)}
                    >
                      <Text
                        style={{
                          padding: 10,
                          textAlign: "center",
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              }}
            />
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Text"
            style={{
              padding: 10,
              width: 70,
            }}
            onChangeText={inputChange}
            value={inputValue}
          />
          <Button title="Add" disabled={!inputValue} onPress={addPost} />
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Button title="Close" onPress={post} />
          </View>
        </View>
      </Modal>
    </>
  );
}

// <Animated.View
//   style={{
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   }}
// >
//   <Animated.Text style={{
//     fontSize: `${fadeAnim}px`
//   }}>Text</Animated.Text>
// </Animated.View>
