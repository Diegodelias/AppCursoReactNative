import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon , Button} from "react-native-elements";
import { validateEmail} from "../../utils/validations";
import { size, isEmpty } from "lodash";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function RegisterForm(props) {
    const { toastRef } =props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue())
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const onSubmit = () => {
        // console.log(size(formData.password))
        if(isEmpty(formData.email)|| isEmpty(formData.password) || isEmpty(formData.repeatPassword)){
            // console.log("Todos los campos son obligatorios");
            toastRef.current.show("Todos los campos son obligatorios")
        } else if(!validateEmail(formData.email)) {
            toastRef.current.show("El email no es correcto")
     
        } else if(formData.password !== formData.repeatPassword) {
            toastRef.current.show("Las contraseñas tiene que ser iguales")
      
        } else if(size(formData.password )< 6){
           
            toastRef.current.show("la contraseña tiene que tener al menos 6 caracteres");
        }
         else {
            setLoading(true)
            firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password)
            .then(response =>{
                setLoading(false)
                navigation.navigate("account");
            })
            .catch(err =>{
                setLoading(false)
                toastRef.current.show("El email ya esta en uso, pruebe con otro");
            })
        }
        
    };
    const onChange = (e,type) =>{
     
    //    setFormData({[type]: e.nativeEvent.text});

    setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    return (

        <View style={ styles.formContainer}>
            <Text>
              <Input  placeholder="Correo electronico" containerStyle={styles.inputForm} 
              onChange={e => onChange(e, "email")}
              rightIcon={
                  <Icon
                  type="material-community"
                  name="at"
                  iconStyle={styles.iconRight}/>
              }/>
              <Input  placeholder="Contraseña" containerStyle={styles.inputForm} password={true}
              secureTextEntry={showPassword ? false : true}
              onChange={e => onChange(e,"password")}
              rightIcon={
                <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" :  "eye-outline"}
                // name="eye-outline"
                iconStyle={styles.iconRight}
                onPress={()=> setShowPassword(!showPassword)}/>
            }
              />
              <Input  placeholder="Repetir contraseña" containerStyle={styles.inputForm} password={true}
              secureTextEntry={showRepeatPassword ? false : true}
              onChange={e => onChange(e,"repeatPassword")}

              rightIcon={
                <Icon
                type="material-community"
                name={showRepeatPassword ? "eye-off-outline" :  "eye-outline"}
                // name="eye-outline"
                iconStyle={styles.iconRight}
                onPress={()=> setShowRepeatPassword(!showRepeatPassword)}/>
            }
              
              />
            </Text>

            <Button title="Unirse" containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister} onPress={onSubmit}/>
            <Loading isVisible={loading} text="creando cuenta" />
        </View>
    )

}

function defaultFormValue() {
    return {
        email: "",
        password:"",
        repeatPassword:"",
    }

}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        marginTop: 30,
    

    },
    inputForm:{
        width: 200,
        marginTop: 20,
    },

    btnContainerRegister:{
        marginTop: 20,
        width:"95%"
    },
    btnRegister:{
        backgroundColor: "#00a680",
    },
    iconRight:{
        color:"#c1c1c1",
    }

})