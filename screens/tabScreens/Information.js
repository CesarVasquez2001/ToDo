import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Collapsible from "react-native-collapsible";

export default function Information() {
  const [isCollapsed1, setCollapsed1] = useState(true);
  const [isCollapsed2, setCollapsed2] = useState(true);
  const [isCollapsed3, setCollapsed3] = useState(true);
  const [isCollapsed4, setCollapsed4] = useState(true);

  const toggleCollapse = (section) => {
    switch (section) {
      case 1:
        setCollapsed1(!isCollapsed1);
        break;
      case 2:
        setCollapsed2(!isCollapsed2);
        break;
      case 3:
        setCollapsed3(!isCollapsed3);
        break;
      case 4:
        setCollapsed4(!isCollapsed4);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>
        Empleando React Native implementar una aplicación para el registro de datos. Usted define el propósito de la aplicación. El aplicativo debe reunir cumplir las características:
      </Text>
      <TouchableOpacity onPress={() => toggleCollapse(1)}>
        <View style={styles.sectionBox1}>
          <Text style={styles.sectionHeader}>Registro de Datos</Text>
          <Collapsible collapsed={isCollapsed1}>
            <Text style={styles.sectionContent}>
              La aplicación permitirá al usuario registrar al menos cuatro tipos de datos diferentes. Estos tipos de datos incluirán texto, datos numéricos y fechas seleccionables a través de un calendario.
            </Text>
          </Collapsible>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleCollapse(2)}>
        <View style={styles.sectionBox2}>
          <Text style={styles.sectionHeader}>Almacenamiento Local</Text>
          <Collapsible collapsed={isCollapsed2}>
            <Text style={styles.sectionContent}>
              Los datos registrados por el usuario se almacenarán de forma local en el dispositivo. Para este propósito, se utilizará una tecnología de almacenamiento local como SQLite, Database Room u otra opción similar.
            </Text>
          </Collapsible>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleCollapse(3)}>
        <View style={styles.sectionBox3}>
          <Text style={styles.sectionHeader}>Visualización en Lista</Text>
          <Collapsible collapsed={isCollapsed3}>
            <Text style={styles.sectionContent}>
              La aplicación proporcionará una interfaz que permita al usuario ver todos los datos registrados en forma de lista. Esta lista contendrá una vista resumida de cada conjunto de datos, lo que facilitará una revisión rápida.
            </Text>
          </Collapsible>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleCollapse(4)}>
        <View style={styles.sectionBox4}>
          <Text style={styles.sectionHeader}>Menú de Navegación</Text>
          <Collapsible collapsed={isCollapsed4}>
            <Text style={styles.sectionContent}>
              La aplicación contará con un menú de navegación que permitirá al usuario moverse entre al menos tres interfaces de usuario diferentes. Esto permitirá una experiencia de usuario fluida y una navegación intuitiva, sin la necesidad de un proceso de inicio de sesión.
            </Text>
          </Collapsible>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  intro: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  sectionBox1: {
    backgroundColor: "#FFD700", // Amarillo
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionBox2: {
    backgroundColor: "#FF6347", // Rojo tomate
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionBox3: {
    backgroundColor: "#87CEFA", // Azul claro
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionBox4: {
    backgroundColor: "#98FB98", // Verde claro
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  sectionContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});
