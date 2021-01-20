import React, { useState } from "react";
import ProgressCircle from "react-native-progress-circle";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

export default function Home() {
  //const disable = true;
  const [disable, setDisable] = useState(true);

  return (
    /*
    <View>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        numColumns={2}
        renderItem={() => (
          <View
            style={{
              flex: 1,
              height: 150,
              borderWidth: 1,
              margin: 20,
            }}
          />
        )}
      />
    </View>
    */
    <View style={{ alignItems: "center" }}>
      <View style={{ position: "absolute" }}>
        <ProgressCircle
          percent={30}
          radius={60}
          borderWidth={8}
          color={disable ? "gray" : "#FFD200"}
          shadowColor="#E4E4E4"
          bgColor="#fff"
        >
          <TouchableOpacity
            style={disable ? styles.iconContainerGray : styles.iconContainer}
            onPress={() => console.log("lkdnsklfsn")}
          >
            <Image
              style={{
                marginTop: 15,
                height: 50,
                width: 50,
              }}
              source={require("../../assets/icons/burguer.png")}
            />
            {disable ? (
              <Image
                style={{
                  position: "absolute",
                  tintColor: "gray",
                  marginTop: 15,
                  opacity: 0.8,
                  height: 50,
                  width: 50,
                }}
                source={require("../../assets/icons/burguer.png")}
              />
            ) : null}
          </TouchableOpacity>
        </ProgressCircle>

        <Image
          source={require("../../assets/icons/crown1.png")}
          style={{ position: "absolute", bottom: 0, right: 4 }}
        />
        {disable ? (
          <Image
            source={require("../../assets/icons/crown1.png")}
            style={{
              position: "absolute",
              bottom: 0,
              right: 4,
              tintColor: "#a7a7a7",
            }}
          />
        ) : null}
        {disable ? null : (
          <Text
            style={{
              position: "absolute",
              bottom: 3,
              right: 19,
              color: "#DB8B00",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            5
          </Text>
        )}
      </View>
      <Text style={{ marginTop: 130, fontSize: 20, fontWeight: "bold" }}>
        Comidas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#FC4848",
    borderRadius: 100,
    width: "80%",
    height: "80%",
    alignItems: "center",
  },
  iconContainerGray: {
    backgroundColor: "gray",
    borderRadius: 100,
    width: "80%",
    height: "80%",
    alignItems: "center",
  },
});
