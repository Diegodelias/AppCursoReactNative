import React from 'react';
import { StyleSheet, View } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import { map } from "lodash";

export default function AccountOptions(props) {
    const { userInfo, toastRef } = props;
   
    // console.log(menuOptions);

   const selectedComponent = (key) =>{
       console.log("Click!!")
        console.log(key)
   }
   const menuOptions = generateOptions(selectedComponent);
    return (
        <View>

            {map(menuOptions, (menu, index) => (
                <ListItem key={index} containerStyle={styles.menuItem} onPress={menu.onPress}>
                 <Icon name={menu.iconNameLeft} type = {menu.iconType} color = {menu.iconColorLeft}/>
                  <ListItem.Content>
                
                    <ListItem.Title>{menu.title}</ListItem.Title>
            
                    </ListItem.Content>
                <Icon type = {menu.iconType}  name={menu.iconNameRight} color={menu.iconColorRight}/>
                

                </ListItem>

            ))}
           

        </View>
    )
}

 function generateOptions(selectedComponent){
     return [
         {
             title: "Cambiar Nombre y Apellidos",
             iconType: "material-community",
             iconNameLeft: "account-circle",
             iconColorLeft: "#ccc",
             iconNameRight: "chevron-right",
             iconColorRight: "#ccc",
             onPress: () => selectedComponent("displayName")
             

         },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("email")
            

        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
             iconNameLeft: "account-circle",
             iconColorLeft: "#ccc",
             iconNameRight: "chevron-right",
             iconColorRight: "#ccc",
             onPress: () => selectedComponent("password")
             
        },
     ]
 }

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",

    }
})