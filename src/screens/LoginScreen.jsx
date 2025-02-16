import { Pressable, StyleSheet, Text, View, Platform, Alert, Image } from "react-native"
import React, { useState, useEffect } from "react"
import { colors } from "../constants/colors"
import InputForm from "../components/InputForm"
import SubmitButton from "../components/SubmitButton"
import { useSignInMutation } from "../services/authService"
import { setUser } from "../features/User/userSlice"
import { useDispatch } from "react-redux"
import { insertSession } from "../persistence"

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState()
    
    const [password, setPassword] = useState()
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const dispatch = useDispatch()

    const [triggerSignIn, result] = useSignInMutation()    
    
    useEffect(() => {
        if (result?.data && result.isSuccess) {
                
        (async ()=> {
            try {
                // if (Platform.OS !== 'web') {
                //     const response = await insertSession({
                //         email  : result.data.email,
                //         localId: result.data.localId,
                //         token  : result.data.idToken,
                //     })
                // }
                dispatch(
                    setUser({                                                
                        email  : result.data.email,                        
                        localId: result.data.localId,
                        idToken: result.data.idToken,
                    })
                )
            } catch (error) {
                Alert.alert('Error','Hubo un error de conexión con la BD, inténtelo nuevamente más tarde');
            }
        })()
        }
    }, [result])

    const togglePasswordVisibility = () => {
        setIsPasswordSecure(!isPasswordSecure);
    };
    
    const onSubmit = () => {            
       triggerSignIn({ email, password })        
    }
    return (
        <View style={styles.main}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.webp')}
                    style={styles.logo}
                />      
                {/* <View style={styles.lineUnderLogo} />            */}
            </View>     
            <View style={styles.container}>
                                        
                <Text style={styles.title}>Inicia sesión</Text>
                <InputForm
                    label={"email"}
                    onChange={setEmail}
                    error={""}         
                />
                <InputForm
                    label={"password"}
                    onChange={setPassword}
                    error={""}
                    // isSecure={true}
                    isSecure={isPasswordSecure}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
                <SubmitButton onPress={onSubmit} title="Enviar" />
                {/* <Text style={styles.sub}>¿No tienes cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Registrate</Text>
                </Pressable> */}
            </View>        
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",        
        backgroundColor: colors.white,                
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
        height: '55%',
    },
    lineUnderLogo: {
        width: '100%',
        height: 5,
        backgroundColor: '#89B3D9',
        position: 'absolute',
        // marginTop: '65%',
    },    
    headerTitle: {
      color: colors.black,
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
        // borderColor: colors.board,
        // borderWidth : 3,       
    },
    title: {
        fontSize: 22,
        fontFamily: "Josefin",
        color: colors.black,
    },
    sub: {
        fontSize: 16,
        color: colors.black,
    },
    subLink: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.red,
    },
})

//*------------------------------------------------------------------------

// import { Pressable, StyleSheet, Text, View, Platform, Alert, Image } from "react-native";
// import React, { useState, useEffect } from "react";
// import { colors } from "../constants/colors";
// import InputForm from "../components/InputForm";
// import SubmitButton from "../components/SubmitButton";
// import { useSignInMutation } from "../services/authService";
// import { setUser } from "../features/User/userSlice";
// import { useDispatch } from "react-redux";
// import { insertSession } from "../persistence";

// const LoginScreen = ({ navigation }) => {
//     const [email, setEmail]                       = useState('');
//     const [password, setPassword]                 = useState('');
//     const [isPasswordSecure, setIsPasswordSecure] = useState(true);

//     const dispatch = useDispatch();
//     const [triggerSignIn, result] = useSignInMutation();

//     useEffect(() => {
//         // if (result?.error) {
//         //     Alert.alert('Error', 'Hubo un error con la autenticación. Verifique sus credenciales e intente nuevamente.');
//         // }

//         if (result?.data && result.isSuccess) {
//             (async () => {
//                 try {
//                     if (Platform.OS !== 'web') {
//                         const response = await insertSession({
//                             email: result.data.email,
//                             localId: result.data.localId,
//                             token: result.data.idToken,
//                         });
    
//                     }

//                     dispatch(
//                         setUser({
//                             email: result.data.email,
//                             idToken: result.data.idToken,
//                             localId: result.data.localId,
//                         })
//                     );
//                 } catch (error) {
//                     Alert.alert('Error', 'Hubo un error de conexión con la BD, inténtelo nuevamente más tarde');
//                 }
//             })();
//         }
//     }, [result]);

//     const togglePasswordVisibility = () => {
//         setIsPasswordSecure(!isPasswordSecure);
//     };

//     const onSubmit = () => {
//         if (!email || !password) {
//             Alert.alert('Error', 'Por favor complete todos los campos.');
//             return;
//         }
//         triggerSignIn({ email, password });
//     };

//     return (
//         <View style={styles.main}>
//             <View style={styles.logoContainer}>
//                 <Image
//                     source={require('../images/urbe22.png')}
//                     style={styles.logo}
//                 />
//                 <Text style={styles.headerTitle}>Comunidades</Text>
//             </View>     
//             <View style={styles.container}>
//                 <Text style={styles.title}>Inicia sesión</Text>
//                 <InputForm
//                     label={"email"}
//                     onChange={setEmail}
//                     error={""}         
//                 />
//                 <InputForm
//                     label={"password"}
//                     onChange={setPassword}
//                     error={""}
//                     isSecure={isPasswordSecure}
//                     togglePasswordVisibility={togglePasswordVisibility}
//                 />
//                 <SubmitButton onPress={onSubmit} title="Enviar" />
//                 <View style={styles.containerSub}>                    
//                     <Text style={styles.sub}>¿No tienes cuenta?</Text>
//                     <Pressable onPress={() => navigation.navigate("Signup")}>
//                         <Text style={styles.subLink}>Registrate</Text>
//                     </Pressable>
//                 </View>            
//             </View>        
//         </View>
//     );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//     main: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",        
//         backgroundColor: colors.white,        
//     },
//     logoContainer: {    
//       alignItems: 'center',
//       top: -120,
//       backgroundColor: colors.blue,        
//     },
//     logo: {
//       width: 200,
//       height: 40,      
//     },
//     headerTitle: {
//       color: colors.black,
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     container: {
//         width: "90%",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: colors.white,
//         gap: 15,
//         paddingVertical: 20,
//         borderRadius: 10,
//     },
//     title: {
//         fontSize: 22,
//         fontFamily: "Josefin",
//         color: colors.black,
//     },
//     containerSub: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 5,
//         position: 'absolute',
//         bottom: -120,
//     },
//     sub: {
//         fontSize: 16,
//         color: colors.black,
//     },
//     subLink: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: colors.red,
//     },
// });
