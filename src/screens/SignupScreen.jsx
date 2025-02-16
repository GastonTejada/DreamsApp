import { Pressable, StyleSheet, Text, View, Image  } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { colors } from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { signupSchema } from "../validations/authSchema";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const dispatch = useDispatch()

    const [triggerSignUp, result] = useSignUpMutation()

    useEffect(()=> {
        if (result.isSuccess) {            
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken
                })
            )
        }
    }, [result])

    const togglePasswordVisibility = () => {
        setIsPasswordSecure(!isPasswordSecure);
    };    

    const onSubmit = () => {
        try {
            setErrorMail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            const validation = signupSchema.validateSync({email, password, confirmPassword})
            triggerSignUp({email, password, returnSecureToken: true})
        } catch (err) {
            switch (err.path) {
                case "email":
                    setErrorMail(err.message)
                    break;
                case "password":
                    setErrorPassword(err.message)
                case "confirmPassword":
                    setErrorConfirmPassword(err.message)
                default:
                    break;
            }
        }
    };

    return (
        <View style={styles.main}>         
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.webp')}
                    style={styles.logo}
                />
                {/* <View style={styles.lineUnderLogo} />  */}
            </View>              
            <View style={styles.container}>
                <Text style={styles.title}>Registrarse</Text>
                <InputForm
                    label={"email"}
                    onChange={setEmail}
                    error={errorMail}
                />
                <InputForm
                    label={"password"}
                    onChange={setPassword}
                    error={errorPassword}
                    // isSecure={true}
                    isSecure={isPasswordSecure}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
                <InputForm
                    label={"confirm password"}
                    onChange={setconfirmPassword}
                    error={errorConfirmPassword}
                    // isSecure={true}
                    isSecure={isPasswordSecure}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
                <SubmitButton onPress={onSubmit} title="Enviar" />
                {/* <View style={styles.containerSub}>     
                    <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.subLink}>Inciar sesión</Text>
                    </Pressable>
                </View>     */}
            </View>            
        </View>
    );
};

export default SignupScreen;

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
        //backgroundColor: colors.darkDreams,
        justifyContent: 'center',
        alignItems: 'center',      
      },
      logo: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '65%', 
      },
          lineUnderLogo: {
        width: '100%',
        height: 5,
        backgroundColor: '#89B3D9',
        position: 'absolute',
        bottom: 80,
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
    },
    title: {
        fontSize: 22,
        fontFamily: "Josefin",
        color: colors.black,
    },
    containerSub: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        position: 'absolute',
        bottom: -80,
    },
    sub: {
        fontSize: 16,
        fontFamily: "Josefin",
        color: colors.black,
    },
    subLink: {
        fontSize: 18,
        fontFamily: "Josefin",
        fontWeight: 'bold',
        color: colors.red,
    },
});
