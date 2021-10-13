import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import firebase from "firebase/app";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";
import 'firebase/storage';  




export default function InfoUser(props){
    const {userInfo : { uid ,photoURL , displayName, email},setLoading, setLoadingText} = props;
     
        const { toastRef } = props; 

        console.log(props.userInfo);
        const changeAvatar = async () => {
          
            // const resultPermission = await Permissions.askAsync(Permissions.CAMERA);
       
            // const resultPermissionCamera = resultPermission.status;


            const resultPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
            const resultPermissionCamera = resultPermission.status;

            // console.log(resultPermissionCamera)
          
            // console.log(resultPermission)
            // const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
            if(resultPermissionCamera !== "granted"){
            
                toastRef.current.show("Es necesario acpetar los permisos de la galeria ")
            }
            else {
                // const result = await ImagePicker.launchImageLibraryAsync({
                //     allowEdition: true,
                //     aspect: [4, 3]
                // })

               
                   const resultado = await ImagePicker.launchImageLibraryAsync({
                        
                      allowsEditing: true,
                      aspect: [4, 3],
                      quality: 1,
                    

                     })
                //    ({
                //     //   mediaTypes: ImagePicker.MediaTypeOptions.All,
                //       allowsEditing: true,
                //       aspect: [4, 3],
                //     //   quality: 1,
                //     });
               

                console.log("resultado" + JSON.stringify(resultado));
                if(resultado.cancelled){
                    toastRef.current.show("Has cerrado la seleccion de imagenes")
                    
                } else {
                  

                    uploadImage(resultado.uri)

                    .then(() => {
                        updatePhotoUrl();
                    }).catch((res)=>{
                        console.log(res)
                        console.log("error")
                                   toastRef.current.show("Error al actualizar el avatar.")
                                   
                    })

                }
         
        }
    }
   const uploadImage = async (uri) =>{
       setLoadingText("Actualizando avatar")
       setLoading(true);
     
       const response = await fetch(uri);
 
       
      const blob = await response.blob();
      console.log("blob:" + JSON.stringify(blob));
      const ref = firebase.storage().ref().child(`avatar/${uid}`)
      return ref.put(blob)


   }

   const updatePhotoUrl = () =>{
       firebase.storage().ref(`avatar/${uid}`).getDownloadURL()
       .then(async (response) => {
            const update = {
                photoURL: response
            };
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
       })
       .catch(()=> {
           toastRef.current.show("Error al actualizar el Avatar")
       })

   }
    return(
       
        <View style={styles.viewUserInfo}>
            <View style={styles.avatarPosicion}>
              <Avatar 
            onPress={changeAvatar} 
            size={55}  
            rounded 
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