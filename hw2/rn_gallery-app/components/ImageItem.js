import { useState } from "react";
import { TouchableOpacity, ImageBackground, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ImageItem({ image, active, images, setImages }) {
  const [shortInform, setShortInform] = useState(false);

  const shortInfo = () => {
    setShortInform(true);
    setTimeout(() => {
      setShortInform(false);
    }, 1000);
  };

  const deleteImage = async (id) => {
    const remainedImages = images.filter((image) => {
      if (image.imageID !== id) {
        return image;
      }
    });
    setImages(remainedImages);
    await AsyncStorage.setItem("images", JSON.stringify(remainedImages));
  };

  return (
    <TouchableOpacity
      onLongPress={() => deleteImage(image.imageID)}
      onPress={() => shortInfo()}
    >
      <ImageBackground
        key={image.imageID}
        source={{ uri: image.imageUri }}
        style={{
          width: 200,
          height: 200,
          marginTop: 15,
          display: active ? "block" : "none",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#000000c0",
            display: shortInform ? "block" : "none",
          }}
        >
          Press long to delete
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
