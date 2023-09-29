import * as React from "react";
import Navigation from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");

export default function App() {
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority INTEGER, dueDate TEXT, description TEXT);",
        [],
        () => console.log("Table created successfully"),
        (error) => console.error("Error creating table", error)
      );
    });
  };

  // Crea la tabla al iniciar la aplicación
  React.useEffect(() => {
    createTable();
  }, []);

  return <Navigation />;
}

// Resto del código sin cambios
