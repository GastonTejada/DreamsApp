import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import Navigator from "./src/navigation/Navigator"
import { Provider } from "react-redux"
import store  from "./src/store/index"
import { initSQLiteDB } from "./src/persistence"
import { colors } from "./src/constants/colors"
import { useFonts } from "expo-font"

// (async ()=> {
//   try {
//       if (Platform.OS !== 'web') {
//           const response = await initSQLiteDB()                         
//       }
//   } catch (error) {    
//   }
// })()

export default function App() {

  const [fontsLoaded, fontError] = useFonts({  
    Helvetica: require("./assets/Fonts/Helvetica-Regular.ttf"),
    Josefin  : require("./assets/Fonts/JosefinSans-Regular.ttf"),
    Lobster  : require("./assets/Fonts/JosefinSans-Regular.ttf"),    
    PlayFair : require("./assets/Fonts/Playfair_9pt-Regular.ttf"),
    LoraBold : require("./assets/Fonts/Lora-Bold.ttf"),    
  })
  
  if (!fontsLoaded || fontError) {    
    return null
  }

  if (fontsLoaded && !fontError) {

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor= '#F28705'/>      
          <Provider store={store}>
            <Navigator/>
          </Provider>        
      </SafeAreaView>          


    )
  } 
}



const styles = StyleSheet.create({
  containerAux: {
    flex: 0,    
    height: Platform.OS === "android" ? StatusBar.currentHeight : 10
  },
  container: {
    flex: 1,    
    backgroundColor: colors.white,
  },
});
