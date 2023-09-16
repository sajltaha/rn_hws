import React, { useState, useEffect } from "react";
import { Button, View, ScrollView, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import ImageItem from "./components/ImageItem";

// AsyncStorage.clear()

export default function App() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    (async () => {
      const images = await AsyncStorage.getItem("images");
      if (images === null) {
        setImages([]);
        setTimeout(() => {
          setActive(true);
        }, 2000);
      } else {
        setImages(JSON.parse(images));
        setTimeout(() => {
          setActive(true);
        }, 2000);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const image = {
        imageID: uuid.v4(),
        imageUri: uri,
      };
      const newImages = [...images, image];
      setImages(newImages);
      await AsyncStorage.setItem("images", JSON.stringify(newImages));
      setActive(false);
      setTimeout(() => {
        setActive(true);
      }, 2000);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 100,
            alignItems: "center",
            paddingVertical: 40,
          }}
        >
          <Button title="Pick an image" onPress={pickImage} />
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 20, display: active ? "none" : "block" }}
          />
          <View style={{ marginTop: 20 }}>
            {images.map((image) => {
              return (
                <ImageItem
                  key={image.imageID}
                  image={image}
                  active={active}
                  images={images}
                  setImages={setImages}
                />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
