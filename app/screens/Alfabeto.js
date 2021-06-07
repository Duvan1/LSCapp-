import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { Video, AVPlaybackStatus } from "expo-av";

export default function Alfabeto(props) {
  const { setShowModal, setIsLoading } = props;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <ScrollView style={{ paddingTop: 20 }}>
      <View
        style={{
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 40,
          marginTop: "auto",
        }}
      >
        <Icon
          type="material-community"
          name={"close"}
          iconStyle={styles.iconRight}
          onPress={() => setShowModal(false)}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Tabla con configuraciones manuales
        </Text>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 60, height: 85 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fa.jpg?alt=media&token=a1b59c5d-48a1-4413-b9d6-0beac3f8b5c2",
              }}
            />
            <Text>Mano en A</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 70, height: 95 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fab.jpg?alt=media&token=f48a9338-c050-4b05-895d-406b94ba8121",
              }}
            />
            <Text>Mano en Ab</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 45, height: 100 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fb.jpg?alt=media&token=a2c3f448-fd10-42de-861e-d34e637f6a33",
              }}
            />
            <Text>Mano en B</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 70, height: 100 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fb-.jpg?alt=media&token=d6dbab45-555c-4cf8-8447-48df39ef1534",
              }}
            />
            <Text>Mano en B°</Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 80, height: 60 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2FBb.jpg?alt=media&token=3462aa9d-9c5e-4731-bcc1-764bfa6e95bf",
              }}
            />
            <Text>Mano en Bb</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 70, height: 80 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fbc.jpg?alt=media&token=7aa0f806-3eb5-4303-a5c4-c4301bb38bad",
              }}
            />
            <Text>Mano en Bc </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 70, height: 80 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fc.jpg?alt=media&token=c9a06018-1602-47a8-aa31-254c0c8b2738",
              }}
            />
            <Text>Mano en C</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 50, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fd.jpg?alt=media&token=a33137dd-3f8c-460f-bbd9-fe86a5b9daca",
              }}
            />
            <Text>Mano en D</Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 40, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Ff.jpg?alt=media&token=bc4686b9-f59b-43a3-ac21-5112bfd7d8a0",
              }}
            />
            <Text>Mano en F</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 50, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fg.jpg?alt=media&token=b37aa172-53f9-4c24-806b-668b1ecdd76f",
              }}
            />
            <Text>Mano en G </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 45, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fh.jpg?alt=media&token=dcfc3445-94e3-4299-af09-c63dd654be3d",
              }}
            />
            <Text>Mano en H</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 50, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fi.jpg?alt=media&token=8537b73b-7867-402e-898c-32073a9a1da2",
              }}
            />
            <Text>Mano en I</Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 45, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fk.jpg?alt=media&token=04fc31d8-da98-48fb-84cc-e33e4d531916",
              }}
            />
            <Text>Mano en K</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 60, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fl.jpg?alt=media&token=0873fd82-89f8-40e8-928b-0907c0459030",
              }}
            />
            <Text>Mano en L </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 55, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fm.jpg?alt=media&token=c04bf6d6-8128-4aa8-ae8a-0dd7a45c3941",
              }}
            />
            <Text>Mano en M</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 50, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fn.jpg?alt=media&token=f52dcab5-ef40-4b42-bdc4-ce4ba6040026",
              }}
            />
            <Text>Mano en N</Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 80, height: 80 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fo.jpg?alt=media&token=829a1880-a2a0-4ce7-bc90-b1da411f020e",
              }}
            />
            <Text>Mano en O</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 60, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fq.jpg?alt=media&token=6ba652c2-f7f9-453b-9224-65fcda1f89fc",
              }}
            />
            <Text>Mano en Q </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 40, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fr.jpg?alt=media&token=e59e32d5-c2f8-4343-9481-320f0ce89223",
              }}
            />
            <Text>Mano en R</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 50, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Ft.jpg?alt=media&token=396b1749-be53-4781-964d-9ac7f49bcc4e",
              }}
            />
            <Text>Mano en T</Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 40, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fu.jpg?alt=media&token=c84178aa-293e-43b9-b7e1-1b768a7258b5",
              }}
            />
            <Text>Mano en U</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 45, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fv.jpg?alt=media&token=c7be8fce-ef9b-4c63-aa99-e31e374566cd",
              }}
            />
            <Text>Mano en V </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 50, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fv-.jpg?alt=media&token=4b811a35-714d-4bb6-947c-c8eefa6d8541",
              }}
            />
            <Text>Mano en V°</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 40, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fw.jpg?alt=media&token=ca7ddef7-c63e-4113-b331-b88887d50d07",
              }}
            />
            <Text>Mano en W</Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 80, height: 80 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2Fy.jpg?alt=media&token=40d59c14-f1a7-4790-b9ad-0bee82585e4e",
              }}
            />
            <Text>Mano en Y</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 55, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2FØ.jpg?alt=media&token=d85e4bd8-87cb-4c67-9561-1b7e398f64a5",
              }}
            />
            <Text>Mano en Ø</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 40, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2F1.jpg?alt=media&token=fb2e6a24-6548-4ea2-a25d-7a31a220e11d",
              }}
            />
            <Text>Mano en 1</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 60, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2F3.jpg?alt=media&token=d824727e-b862-4192-8277-4262972cb84d",
              }}
            />
            <Text>Mano en 3°</Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 55, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2F4.jpg?alt=media&token=70658e3e-1d21-409c-b00a-6f05fac3cc03",
              }}
            />
            <Text>Mano en 4</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 65, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2F5.jpg?alt=media&token=6933fbc6-ef59-49fe-8559-d17905d2e8fc",
              }}
            />
            <Text>Mano en 5</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginRight: 10,
            }}
          >
            <Image
              style={{ width: 60, height: 90 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Falfabeto%2F5-.jpg?alt=media&token=ae28bce0-f67b-414d-ad95-1e58f6d3a16a",
              }}
            />
            <Text>Mano en 5°</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconRight: {
    marginLeft: "90%",
  },
  container: {
    flex: 1,
  },
});
