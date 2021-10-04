import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopRestaurants from "../screens/Restaurants";


const Stack = createNativeStackNavigator();

export default function topRestaurantsStack(){
    return (
    <Stack.Navigator>

<Stack.Screen name="top-restaurants" component={ TopRestaurants } options={{ title:"Los mejores restaurantes"}}/>

    </Stack.Navigator>
);
}