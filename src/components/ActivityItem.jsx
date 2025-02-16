import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import { colors } from "../constants/colors";
import { useDispatch } from 'react-redux'
import { setIdSelected } from "../features/Shop/shopSlice"
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth  } = Dimensions.get("window");

const ActivityItem = ({ 
  activity,
  setActivitySelected = () => {},
  navigation }) => {

  const dispatch = useDispatch()
  const handleNavigate = () => {         
      dispatch(setIdSelected(activity.id))    
      navigation.navigate('ItemDetail', {activityId: activity.id})
    }
  
  

  return (
  
    <View>
      <Pressable style={styles.container} onPress={handleNavigate}>
          <Image source={activity.imagen} style={styles.image} />           
          <Text style={styles.text}>{activity.nombre}</Text>
      </Pressable>
    </View>    

  );
};

const styles = StyleSheet.create({
  cardContainer: {        
    flexDirection: 'column',
    height: 220,
    width: screenWidth / 3.25,
    justifyContent: 'flex-start',
    alignContent: 'center',
    borderWidth: 0.5,
    borderBottomColor: colors.platinum,
    borderEndColor: colors.platinum,                
    overflow: 'hidden',    
    margin: 2.2,
  },
  container: {
    width: screenWidth * 0.3,
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 98,
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: colors.orange,    
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    color: 'white',
  },
});

export default ActivityItem;