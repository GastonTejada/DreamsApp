import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions, Image , FlatList} from 'react-native';
import Card from './Card';
import { colors } from '../constants/colors';
import { useGetActivitiesQuery } from "../services/shopService";
import ActivityItem from "../components/ActivityItem"

const { width: screenWidth } = Dimensions.get('window');

const CategoryItem = ({ activity, navigation }) => {

  const [activities, setActivities] = useState([]);

  const { data: activityFetched, error: errorFromFetch, isLoading } = useGetActivitiesQuery(activity);

  useEffect(() => {
    if (activityFetched) {
      setActivities(activityFetched);
    }
  }, [activityFetched]);

  // const renderItem = ({ item }) => (
  //   <View style={styles.slide}>
  //     <Image source={{ uri: item.imagen }} style={styles.image} />
  //   </View>
  // );
  
  return (
    <Card style={styles.card}>
      <FlatList
        data={Array.isArray(activities) ? activities : []}
        renderItem={({ item }) => <ActivityItem activity={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        numColumns={3}  // Muestra 3 columnas
        columnWrapperStyle={styles.row} // Espaciado uniforme
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth,
    marginVertical: 5,
    marginHorizontal: 0, 
  },
  text: {
    color: colors.platinum,
    textAlign: 'left',
    justifyContent: 'flex-start',
    fontSize: 22,
    marginStart: 30,
    marginTop:30,
  },
  pressable: {
    marginBottom: 0,
    width: '100%',
  },
  slide: {
    height: 240,
    width: screenWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    top: -40,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
  },
});

export default CategoryItem;
