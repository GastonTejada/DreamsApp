// 

import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AddButton from "../components/AddButton";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { useGetActivitiesQuery } from "../services/shopService";

const Home = ({ navigation }) => {
  const { data: actividades, error, isLoading } = useGetActivitiesQuery();

  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const dispatch = useDispatch();
  const { imageCamera, localId, user } = useSelector((state) => state.auth.value);
  const imageFromBase = null;

  const launchCamera = async () => {
    navigation.navigate("Image selector");
  };

  const signOut = async () => {
    try {
      dispatch(clearUser());
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un error con la autenticación. Verifique sus credenciales e intente nuevamente."
      );
    }
  };

  const onSubmit = () => {
    setDireccion("");
    setTelefono("");
    setFechaNac("");
    setActividadSeleccionada("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/logo.webp")} style={styles.logo} />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={imageFromBase || imageCamera ? { uri: imageFromBase?.image || imageCamera } : require("../../assets/images/defaultProfile.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.textUser}>{user ? `User: ${user}` : "User: Sin seleccionar"}</Text>
      </View>
      <AddButton
        onPress={launchCamera}
        title={imageFromBase || imageCamera ? "Modificar foto de perfil" : "Agregar foto de perfil"}
      />
      <View style={styles.form}>
        <Text style={styles.title}>Datos del Usuario</Text>
        <InputForm label={"Dirección"} onChange={setDireccion} />
        <InputForm label={"Teléfono"} onChange={setTelefono} />
        <InputForm label={"Fecha Nac."} onChange={setFechaNac} />
        <Text style={styles.label}>Selecciona una Actividad:</Text>
        <Picker
          selectedValue={actividadSeleccionada}
          onValueChange={(itemValue) => setActividadSeleccionada(itemValue)}
          style={styles.picker}
        >
          {actividades.map((actividad) => (
            <Picker.Item key={actividad.id} label={actividad.nombre} value={actividad.id} />
          ))}
        </Picker>
      </View>
      <SubmitButton style={styles.enviar} onPress={onSubmit} title="Enviar" />
      <AddButton style={styles.cerrarSesion} onPress={signOut} title="Cerrar sesión" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {      
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',              
  },
  logo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%', 
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 140,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: -20,
  },
  textUser: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    marginTop: 5,
  },
  form: {
    width: "90%",
    height: "45%",
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica",
    color: colors.black,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 55,
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  }
});
