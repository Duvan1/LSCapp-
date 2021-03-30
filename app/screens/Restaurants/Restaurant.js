import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

export default function Restaurant(props) {
  const { displayName, setShowModal, toastRef, setRealoadUserInfo } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [flexDirection, setflexDirection] = useState("column");

  const onSubmit = () => {
    setShowModal(false);
  };

  const PreviewLayout = ({
    label,
    children,
    values,
    selectedValue,
    setSelectedValue,
  }) => (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[styles.button, selectedValue === value && styles.selected]}
          >
            <ImageBackground
              style={{ width: 35, height: 35 }}
              source={require("../../../assets/icons/esmeralda.png")}
            />
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.container, { [label]: selectedValue }]}>
        {children}
      </View>
    </View>
  );

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <Icon
            type="material-community"
            name={"close"}
            iconStyle={styles.iconRight}
            onPress={() => console.log("click")}
          />
          <StatusBar animated={true} backgroundColor="#61dafb" />
        </View>
        <View style={[styles.box, styles.two]}></View>
      </View>
      <ScrollView>
        <View style={{ height: " 100%", width: "100%" }}>
          <Text
            style={{
              fontSize: 25,
              lineHeight: 24,
              margin: 0,
              textAlign: "center",
              width: "100%",
            }}
          >
            Mira el video y selecciona la seña correcta
          </Text>
          <Video
            ref={video}
            style={{ alignSelf: "center", width: 320, height: 200 }}
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View
            style={{
              marginBottom: 24,
              marginTop: 24,
              borderBottomWidth: 1,
              borderBottomColor: "#A7A7A7",
              borderTopWidth: 1,
              borderTopColor: "#A7A7A7",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 20, color: "#a7a7a7", marginBottom: 5 }}>
                Tu seleción:
              </Text>
              <Button
                title="seleccion"
                buttonStyle={{
                  backgroundColor: "#FFF",
                  borderColor: "#a7a7a7",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                containerStyle={{
                  width: "50%",
                  borderColor: "#a7a7a7",
                  borderTopWidth: 0.5,
                  borderLeftWidth: 1,
                  borderBottomWidth: 3,
                  borderRightWidth: 3,
                  borderBottomEndRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
                titleStyle={{ color: "#a7a7a7" }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 50 }}>
            <PreviewLayout
              label="Selecciona tu respuesta"
              values={["column", "row", "row-reverse", "column-reverse"]}
              selectedValue={flexDirection}
              setSelectedValue={setflexDirection}
            ></PreviewLayout>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "white",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "white",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    borderColor: "#a7a7a7",
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomEndRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "50%",
  },
  selected: {
    backgroundColor: "#62B2EF",
    borderColor: "#5fbdff",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: "500",
    color: "#a7a7a7",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    color: "#555555",
    marginBottom: 10,
    fontSize: 20,
  },
});
