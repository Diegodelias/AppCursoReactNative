
import React , { useEffect } from 'react';
import Navigation from './app/navigations/Navigation';
import {firebaseApp} from "./app/utils/firebase";
// import firebase from 'firebase'
// require('firebase/auth')
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(["Setting a timer"]);
export default function App() {
 
  return (
   <Navigation/>
  );
}
