import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db",1);

const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM tasks", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setTaskList(temp);
      });
    });
  };

  let deleteTask = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM tasks WHERE id=?", [id], (tx, results) => {
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            "Success",
            "Task deleted successfully",
            [
              {
                text: "Ok",
                onPress: () => {
                  getData();
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          alert("Please insert a valid Task Id");
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem}>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Priority: {item.priority}</Text>
            <Text style={styles.itemText}>Due Date: {item.dueDate}</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <View style={styles.belowView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditTask", { task: item });
                }}
              >
                <Image
                  source={require("../../assets/images/edit.png")}
                  style={styles.icons}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  deleteTask(item.id);
                }}
              >
                <Image
                  source={require("../../assets/images/delete.png")}
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNewBtn: {
    backgroundColor: "purple",
    width: 150,
    height: 50,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  userItem: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  belowView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    height: 50,
  },
  icons: {
    width: 24,
    height: 24,
  },
});
