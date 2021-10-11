import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import firebase from "firebase/app";
// import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';


export default function InfoUser(props){
    const {userInfo : { uid ,photoURL , displayName, email, toastRef }} = props;

        const changeAvatar = async () => {
            const resultPermission = await Camera.requestPermissionsAsync();
          
            const resultPermissionCamera = resultPermission.status;
          
            // console.log(resultPermission)
            // const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
            if(resultPermissionCamera === "denied"){
                toastRef.current.show("Es necesario acpetar los permisos de la galeria ")
            }else {
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowEdition: true,
                    aspect: [4, 3]
                })

                // console.log(result);
                if(result.cancelled){
                    toastRef.current.show("Has cerrado la seleccion de imagenes")
                } else {
                    uploadImage(result.uri).then(() => {
                        console.log("Imagen subida")
                    }).catch(()=>{
                        toastRef.current.show("Error al actualizar el avatar.")
                    })

                }
            }

        }
 
   const uploadImage = async (uri) =>{
       const response = await fetch(uri);
    //    console.log(JSON.stringify(response));
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`avatar/${uid}`)
      return ref.put(blob)


   }
    return(
       
        <View style={styles.viewUserInfo}>
            <View style={styles.avatarPosicion}>
              <Avatar 
            onPress={changeAvatar} size={55}  rounded 
            chevron
             overlaycontainerStyle={styles.userInfoAvatar} 
            
             source={
                 photoURL ? { uri: photoURL} : require("../../../assets/img/avatar-default.jpg")
             }
             showEditButton={true}
             />
             </View>
     
            <View>
        
                <Text style={styles.displayName}> {displayName ? displayName  : "Anonimo" }</Text>
                <Text>{email ? email : "Social Login"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar:{
        // marginRight:20,
        backgroundColor: "#737070",
    },
    displayName:{
        fontWeight:"bold",
        paddingBottom: 5,
    },
    avatarPosicion:{
      
        marginRight:30
     
    }

})