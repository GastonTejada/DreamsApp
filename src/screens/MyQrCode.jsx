import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import { colors } from "../constants/colors";

const MyQrCode = ({ navigation }) => {
  const dispatch = useDispatch();
  const { localId, user } = useSelector((state) => state.auth.value);

  // Definir el DNI para el QR
  const dni = user ? "24516593" : "DNI: Sin seleccionar";

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/logo.webp")} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textUser}>{user ? `Gaston Tejada` : "User: Sin seleccionar"}</Text>
        <Text style={styles.textVence}>{user ? `Vence Cuota: 13/04/2025` : "User: Sin seleccionar"}</Text>
      </View>
      <View style={styles.qrContainer}>
        <QRCode 
          value={dni}
          size={180} 
        />
        <Text style={styles.textDni}>{dni}</Text>
      </View>
    </View>
  );
};

export default MyQrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: 'center',
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
  textContainer:{
    justifyContent: 'center',
    alignItems: 'center',    
    gap: 15,
  },
  textUser: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
  textVence: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    backgroundColor: 'red',
    height: '30%',
    width: '90%',
    padding: 15,
  },
  qrContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  textDni: {
    fontSize: 38,
    marginTop: 50,
    fontWeight: 'bold',
  }
});
