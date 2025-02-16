import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import Loader from "../components/Loader";
import { useGetActivitiesByIdQuery } from "../services/shopService"

const imageMap = {
  1: require("../../assets/images/natacion_infantil.webp"),
  2: require("../../assets/images/natacion_adulto.webp"),
  3: require("../../assets/images/natacion_bebes.webp"),
  4: require("../../assets/images/gimnasia_agua.webp"),
  5: require("../../assets/images/crossfit.webp"),
  6: require("../../assets/images/localizada.webp"),
  7: require("../../assets/images/cycle.webp"),
  8: require("../../assets/images/funcional.webp"),
  9: require("../../assets/images/funcional_taebo.webp"),
  10: require("../../assets/images/yoga.webp"),
  11: require("../../assets/images/zumba.webp"),
  12: require("../../assets/images/musculacion.webp"),
};

const ItemDetail = ({ route, navigation }) => {
  
  const {activityId: idSelected} = route.params

  const {data: activity, error, isLoading} = useGetActivitiesByIdQuery(idSelected)

  return (
    <View style={styles.containerPrincipal}>
      {activity ? (
        <>
          <View style={styles.logoContainer}>
              <Image
                  source={require('../../assets/images/logo.webp')}
                  style={styles.logo}
                  />      
          </View>      

          <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>      
              <FontAwesome name="arrow-circle-left" size={36} color={colors.orange} />
            </Pressable>      

          <View style={styles.container}>

            <View style={styles.containerImage}>                  
              <Image source={imageMap[activity.id]} style={styles.image} resizeMode="contain" />
              <Text style={styles.textTitle}>{activity.nombre}</Text>
            </View>    
            <View style={styles.textContainer}>
              <Text style={styles.textCategoria}>Categoría: {activity.categoria}</Text>
              <Text style={styles.text}>Descripción: {activity.descripcion}</Text>
              <Text style={styles.textHorarios}>Horarios:</Text>              
              {Object.entries(activity.horarios).map(([dia, horario]) => (
                <Text key={dia} style={styles.text}>{dia}: {horario}</Text>
              ))}
            </View>
          </View>
        </>
      ) : <Loader />}
    </View>
  );
}

export default ItemDetail;

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    width: '100%',
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
  goBack: {
    flexDirection: "row",
    alignItems: "center",
    width: '30%',
    paddingTop: 50,    
    paddingHorizontal: 20,    
    borderRadius: 5,
    marginBottom: 5,    
  },  
  container: {    
    height: '80%',
    width: '80%',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    backgroundColor: colors.orangeDreams,
    width: '100%',
    height: 290,
    borderWidth: 1,
    borderBottomColor: colors.platinum,
    borderEndColor: colors.platinum,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,    
    marginLeft: 10
  },
  image: {
    width: '95%',
    height: 250,
    // borderRadius: 8,
    borderStartStartRadius: 15,
  },
  textContainer: {
    flexDirection: "column",
    margin: 10,
  },
  textTitle: {    
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
    color: 'white',    
  },
  textCategoria: {
    color: colors.darkDreams,
    fontSize: 16,
    fontFamily: 'Helvetica',
    marginBottom: 10,
  },
  textHorarios: {
    marginTop: 10,
    color: colors.darkDreams,
    fontSize: 16,
    fontFamily: 'Helvetica',
  }
});
