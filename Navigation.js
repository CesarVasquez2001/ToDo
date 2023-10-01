import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./screens/Welcome";
import Home from "./screens/tabScreens/Home";
import AddTask from "./screens/tabScreens/AddTask";
import EditTask from "./screens/homeStack/EditTask";
import Information from "./screens/tabScreens/Information"; // Importa la nueva pantalla de detalles de la tarea

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tab Group"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Add Task") {
            iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
          } else if (route.name === "Information") { // Nuevo Tab para detalles de la tarea
            iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Add Task"
        component={AddTask}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Information"
        component={Information} // Agrega la pantalla de detalles de la tarea
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>
  );
}
