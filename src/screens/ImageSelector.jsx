import React, { useState } from "react";
import { Image, View, StyleSheet, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ExpoLibrary from "expo-media-library";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import AddButton from "../components/AddButton";
import { colors } from "../constants/colors";
import { useGetProfileImageQuery, usePostProfileImageMutation } from "../services/shopService";

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [isImageFromCamera, setIsImageFromCamera] = useState(false)
    const [imageURI, setImageURI] = useState("")

    const { localId } = useSelector((state) => state.auth.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const [triggerPostImage, result] = usePostProfileImageMutation()

    const dispatch = useDispatch()

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    }

    const verifyGalleryPermissions = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        return granted
    }

    const pickLibraryImage = async () => {
        try {
            setIsImageFromCamera(false)
            const permissionGallery = await verifyGalleryPermissions()
            if (permissionGallery) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    allowsEditing: true,
                    aspect: [1,1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.2,
                })

                if (!result.canceled){
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
        } catch (error) {
            Alert.alert('Error', 'There was an error connecting to the gallery, try again later.');
        }
    }


    const pickImage = async () => {
        setIsImageFromCamera(true)

        try {
            const permissionCamera = await verifyCameraPermissions()
            
            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2    
                })

                if (!result.canceled){
                    setImageURI(result.assets[0].uri)
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
            
        } catch (error) {
            Alert.alert('Error', 'There was an error connecting to the camera, try again later.');
        }
    };
    
    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image))
            triggerPostImage({image, localId})
            if (isImageFromCamera) {
                const result = await ExpoLibrary.createAssetAsync(imageURI)
            }
            navigation.goBack()
        } catch (error) {
            Alert.alert('Error', 'Could not save the image, try again later.');
        }
    };

    return (
        <>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.webp')}
                    style={styles.logo}
                    />      
            </View>      

            <View style={styles.container}>
        
                {image || imageFromBase ? (
                    <>
                        <Image source={{ uri: image || imageFromBase?.image }} style={styles.image} />
                        <AddButton title="Toma otra foto" onPress={pickImage} />
                        <AddButton title="Elige una foto de la galería" onPress={pickLibraryImage} />
                        <AddButton title="Confirmar foto" onPress={confirmImage} />
                    </>
                ) : (
                    <>
                        <View style={styles.noPhotoContainer}>
                            <Text>No hay foto para mostrar...</Text>
                        </View>
                        <AddButton title="Toma una foto" onPress={pickImage} />
                    </>
                )}
            </View>
        </>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        marginTop: 150,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
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
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.platinum,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
