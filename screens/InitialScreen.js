import React from "react";
import { useEffect } from "react";
import { Actions } from "react-native-router-flux";
import { AppLoading } from "expo";


const InitialScreen = () => {
  useEffect(() => {
    console.log("initial")
    Actions.loading();
  });

  return <AppLoading />;
}

export default InitialScreen; 