import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepite, setShowPasswordRepite] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      //console.log("no");
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(formData.email)) {
      //console.log("email invalido");
      toastRef.current.show("email invalido.");
    } else if (formData.password !== formData.repeatPassword) {
      //console.log("contraseñas no coinciden");
      toastRef.current.show("contraseñas no coinciden.");
    } else if (size(formData.password) < 6) {
      //console.log("contraseña muy corta");
      toastRef.current.show("contraseña muy corta, minimo 6 caracteres.");
    } else {
      setloading(true);
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setloading(false);
          toastRef.current.show(
            "Usuario creado con éxito, ahora puedes iniciar sesión."
          );
          navigation.navigate("login");
        })
        .catch((err) => {
          setloading(false);
          toastRef.current.show("Error al crear el usuario.");
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
        placeholder="Correo electronico"
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
        password={true}
        secureTextEntry={showPassword ? false : true}
        placeholder="Contraseña"
        inputContainerStyle={styles.input}
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        password={true}
        secureTextEntry={showPasswordRepite ? false : true}
        inputContainerStyle={styles.input}
        placeholder="repetir contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPasswordRepite ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPasswordRepite(!showPasswordRepite)}
          />
        }
      />
      <Button
        buttonStyle={styles.btnRegister}
        title="Unirse"
        titleStyle={{ fontWeight: "bold", fontSize: 20 }}
        containerStyle={styles.btnContainerRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
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
    marginTop: -5,
  },
  btnContainerRegister: {
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
  btnRegister: {
    backgroundColor: "#5fbdff",
    borderRadius: 10,
    padding: 15,
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
