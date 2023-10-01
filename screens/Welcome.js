import React, { useEffect } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

export default function SplashScreen({ navigation }) {
  const handlePress = () => {
    // Navega a la pestaña principal cuando se presiona el botón
    navigation.navigate("Tab Group");
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")} // Cambia la ruta por la de tu imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.contentTop}>
          <Text style={styles.title}>ToDo App</Text>
          <Text style={styles.description}>A simple app to manage your tasks</Text>
        </View>
        <View style={styles.contentBottom}>
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // Alinea los elementos en el espacio vertical
    alignItems: "center",
    paddingVertical: 50, // Espacio en la parte superior e inferior
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo semitransparente
  },
  contentTop: {
    alignItems: "center",
  },
  contentBottom: {
    marginBottom: 30, // Espacio en la parte inferior
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
