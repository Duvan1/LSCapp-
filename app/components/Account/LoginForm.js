import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
import firebase from "firebase";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("email invalido.");
    } else {
      setloading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setloading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setloading(false);
          toastRef.current.show("Datos incorrectos.");
        });
    }
  };

  const onChange = (e, type) => {
    // con "...formData" le estoy diciendo que mantenga las propiedades
    // anteriores y con "[type]: e.nativeEvent.text" actualizao ese componente
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
        labelStyle={{ fontWeight: "bold", fontSize: 10 }}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.input}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.input}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="INGRESAR"
        titleStyle={{ fontWeight: "bold", fontSize: 20 }}
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando Sesion" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    borderColor: "#E5E5E5",
    borderWidth: 2,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputForm: {
    width: "100%",
  },
  btnContainerLogin: {
    width: "95%",
    borderColor: "#62B2EF",
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomEndRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  btnLogin: {
    backgroundColor: "#5fbdff",
    borderRadius: 10,
    padding: 15,
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
