import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Icon } from "react-native-elements";
import { Video, AVPlaybackStatus } from "expo-av";

export default function Senia() {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <ScrollView style={{ paddingTop: 20 }}>
      <View
        style={{
          marginRight: 20,
          marginLeft: 20,
          marginBottom: "auto",
          marginTop: "auto",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginBottom: 20,
            paddingRight: 10,
            paddingLeft: 10,
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
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
              marginBottom: 30,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              type="material-community"
              name="play"
              color="#5fbdff"
              onPress={() => {
                console.log("aldmlsm");
              }}
            />
            <Text style={{ fontSize: 34, fontWeight: "700", lineHeight: 39 }}>
              {" "}
              Adulto
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#e5e5e5",
            borderBottomWidth: 2,
            borderTopColor: "#e5e5e5",
            borderTopWidth: 2,
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <View
            style={{
              alignItems: "stretch",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}>
              <Text
                style={{
                  color: "#afafaf",
                  fontSize: 17,
                  fontWeight: "700",
                  marginBottom: 15,
                  textTransform: "uppercase",
                }}
              >
                Definición
              </Text>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>
                Significado y glosa
              </Text>
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 30,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 50,
                      }}
                    >
                      <Text>Adj</Text>
                    </View>
                    <View
                      style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}
                    >
                      <Text style={{ fontWeight: "700", lineHeight: 20 }}>
                        Que ha alcanzado su máximo desarrollo físico y psíquico.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 30,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 50,
                      }}
                    ></View>
                    <View
                      style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}
                    >
                      <Text style={{ fontWeight: "700", lineHeight: 20 }}>
                        PRO1 IR SORDO(x3) ADULTO VISITAR
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "500",
                          marginBottom: 0,
                          color: "#afafaf",
                          marginTop: 5,
                        }}
                      >
                        Iba a visitar a los sordos adultos.{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ display: "flex", flexFlow: "row wrap", paddingTop: 20 }}
          >
            <View
              style={{
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: "50%",
                marginBottom: 25,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  lineHeight: 26,
                  marginTop: 0,
                  marginRight: 0,
                  marginBottom: 25,
                  marginLeft: 0,
                }}
              >
                Descripción
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  lineHeight: 29,
                  textAlign: "justify",
                }}
              >
                (El movimiento de la mano indica crecimiento) La mano en ‘5’
                doblada, con los dedos unidos excepto el pulgar, apoya el dorso
                de estos sobre la mejilla. Luego se mueve hacia adelante y hacia
                arriba hasta quedar con la palma hacia atrás y el borde externo
                hacia abajo.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
