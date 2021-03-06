import React , { useState } from "react";
import { StyleSheet, View , Text} from "react-native";
import {Input , Button} from "react-native-elements";
import{ size } from "lodash";
import { reauthenticate } from "../../utils/api"
import firebase from "firebase/app";

export default function ChangePasswordForm(props) {
    const {setShowModal, toastRef} = props;

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setformData] = useState( defaultValue())
    const [errors, setErrors] =useState({})
    const [isLoading, setIsloading] = useState(false)
    const onChange = (e,type) => {
        
        setformData
        ({...formData,[type]: e.nativeEvent.text});
    }
    const onSubmit =    async () => {
        let isSetErrors = true;
        let errorsTemp = {};
        // setErrors= ({});
        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword ){
            errorsTemp = {
                password: !formData.password ? "la contraseña no puede estar vacía.": "",
                newPassword: !formData.newPassword ? "la contraseña no puede estar vacía.":"",
                repeatNewPassword: !formData.newPassword ? "la contraseña no puede estar vacía.":"",

            }
        } else if(formData.newPassword !== formData.repeatNewPassword) {

            errorsTemp = {
                    newPassword: "Las contraseñas no son iguales",
                    repeatNewPassword: "Las contraseñas no son iguales"
            };


        } else if (size(formData.newPassword ) < 6) {
            errorsTemp = {
                newPassword: "La contraseña tiene que ser mayor a 5 caracteres",
                repeatNewPassword: "La contraseña tiene que ser mayor a 5 caracteres"
            };


        } else {
            setIsloading(true);
            await reauthenticate(formData.password).then(async() => {
               await  firebase.auth().currentUser.updatePassword(formData.newPassword).then(()=>{
                        
                        firebase.auth().signOut();
                        isSetErrors(false);
                        setIsloading(false);
                        setShowModal(false);
                        // setIsloading(false);

                }).catch(() => {
                    errorsTemp = {
                        other:"Error al actualizar la contraseña"
                    
                    }

                    
                
                })
            })
            
            .catch((err)=>{
                console.log(err)
                errorsTemp = {

                    password: "La contraseña no es correcta"

                }
                setIsloading(false);
                
            })           
         

        }
        isSetErrors && setErrors(errorsTemp);
    }
    return (
        <View style={styles.view}>
            <Input
            placeholder="Contraseña actual"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={showPassword ? false : true }
            rightIcon={{
                type: "material-community",
                name: showPassword ? "eye-off-outline" : "eye-outline" ,
                color: "#c2c2c2",
                onPress: () => setShowPassword(!showPassword)
            }}
            onChange={
                e => onChange(e, "password")
            }
            errorMessage={errors.password}
            />

            <Input
            placeholder="Nueva contraseña"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={showPassword ? false : true }
            rightIcon={{
                type: "material-community",
                name: showPassword ? "eye-off-outline" : "eye-outline" ,
                color: "#c2c2c2",
                onPress: () => setShowPassword(!showPassword)
            }}
            onChange={
                e => onChange(e, "newPassword")
            }

            
            errorMessage={errors.newPassword}

            

            
            />
            
            <Input

            placeholder="Repetir Nueva contraseña"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={showPassword ? false : true }
            rightIcon={{
                type: "material-community",
                name: showPassword ? "eye-off-outline" : "eye-outline" ,
                color: "#c2c2c2",
                onPress: () => setShowPassword(!showPassword)
            }}
            onChange={
                e => onChange(e, "repeatNewPassword")
            }

            errorMessage={errors.repeatNewPassword}
            />

            <Button 
            title="Cambiar contraseña"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress = {onSubmit}
            loading={isLoading}
            />
           
            <Text>{errors.other}</Text>
        </View>
    )
}

function defaultValue(){
    return {
        password:"",
        newPassword:"",
        repeatNewPassword:""

    }

}
const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop:20,
        width: "95%"
    },
    btn:{
        backgroundColor:"#00a680"
    }
})