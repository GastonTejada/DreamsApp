import React from "react";
import { FlatList, StyleSheet, Pressable, View, Image, Text } from "react-native"
import { useGetActivitiesQuery } from "../services/shopService"
import { colors } from '../constants/colors';
import Card from '../components/Card';
import ActivityItem from "../components/ActivityItem";
import { useDispatch } from 'react-redux';
import { setIdSelected } from "../features/Shop/shopSlice";

const imageMap = {
  // "natacion_infantil": require("../../assets/images/natacion_infantil.webp"),
  // "natacion_adultos": require("../../assets/images/natacion_adulto.webp"),
  // "natacion_bebes": require("../../assets/images/natacion_bebes.webp"),
  // "gimnasia_agua": require("../../assets/images/gimnasia_agua.webp"),
  // "crossfit": require("../../assets/images/crossfit.webp"),
  // "localizada": require("../../assets/images/localizada.webp"),
  // "cycle": require("../../assets/images/cycle.webp"),
  // "funcional": require("../../assets/images/funcional.webp"),
  // "funcional_taebo": require("../../assets/images/funcional_taebo.webp"),
  // "yoga": require("../../assets/images/yoga.webp"),
  // "zumba": require("../../assets/images/zumba.webp"),
  // "musculacion": require("../../assets/images/musculacion.webp"),

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

const Home = ({ route, navigation}) => {

    const dispatch = useDispatch();
    const {data: activities , error, isLoading} = useGetActivitiesQuery()

    const handleNavigate = (activity) => {
      dispatch(setIdSelected(activity.id));
      navigation.navigate('ItemDetail', { activity });
    };    
  
    return (
      <View style={styles.container}>

          <View style={styles.logoContainer}>
              <Image
                  source={require('../../assets/images/logo.webp')}
                  style={styles.logo}
                  />      
          </View>      

          <View style={styles.titleContainer}>
            <Text style={styles.title}>NUESTRAS ACTIVIDADES</Text>
          </View>

          <View style={styles.containerActivities}></View>


            <View style={styles.flatListContainer}>
                  <FlatList
                    data={activities}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Card style={styles.card}>
                      <ActivityItem 
                        activity={{ ...item, imagen: imageMap[item.id] }} 
                        navigation={navigation}                        
                      />
                      </Card>                      
                    )}
                    numColumns={3}
                    columnWrapperStyle={styles.row}                  
                  />
            </View>          
      </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'    
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
  pressable: {
    marginBottom: 0,
    width: '100%',
  },
  titleContainer:{
    justifyContent: 'center',
    alignItems: 'center',    
  },
  title:{
    fontFamily: 'Helvetica',
    fontSize:  18,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 140,
  },
  card: {
    width: '32.5%',
    marginVertical: 5,
    marginHorizontal: 0, 
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  }
})