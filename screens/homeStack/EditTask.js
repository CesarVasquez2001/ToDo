import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import Button from "../../components/default/Button";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db",1);

export default function EditTask({ route, navigation }) {
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    priority: "",
    dueDate: "",
    description: "",
  });

  useEffect(() => {
    const { task } = route.params;
    setTaskDetails(task);
    navigation.setOptions({ title: task.name }); // Cambia el título
    // Resto del código...
  }, [route.params]);

  const handleEditTask = () => {
    try {
      if (
        taskDetails.name === "" ||
        taskDetails.dueDate === "" ||
        taskDetails.description === ""
      ) {
        throw Error("Please fill in all fields");
      }

      if (taskDetails.priority === "") {
        throw Error("Priority cannot be empty");
      }

      const priority = parseInt(taskDetails.priority);
      if (isNaN(priority) || priority < 0 || priority > 9) {
        throw Error("Priority must be a number between 0 and 9");
      }

      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE tasks SET name=?, priority=?, dueDate=?, description=? WHERE id=?",
          [
            taskDetails.name,
            priority,
            taskDetails.dueDate,
            taskDetails.description,
            taskDetails.id,
          ],
          (_, result) => {
            console.log("Task edited successfully");
            Alert.alert("Success", "Task edited successfully", [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]);
          },
          (_, error) => {
            console.error("Error editing task", error);
            Alert.alert("Error", "An error occurred while editing the task");
          }
        );
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskDetails.name}
          onChangeText={(text) =>
            setTaskDetails({ ...taskDetails, name: text })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Priority (0-9)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter priority"
          value={taskDetails.priority.toString()}
          onChangeText={(text) =>
            setTaskDetails({ ...taskDetails, priority: text })
          }
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Due Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter due date"
          value={taskDetails.dueDate}
          onChangeText={(text) =>
            setTaskDetails({ ...taskDetails, dueDate: text })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={{ ...styles.input, height: 80 }}
          placeholder="Enter description"
          value={taskDetails.description}
          onChangeText={(text) =>
            setTaskDetails({ ...taskDetails, description: text })
          }
          multiline={true}
          numberOfLines={2}
        />
      </View>
      <Button label="Edit Task" onPress={handleEditTask} theme="primary" />
    </ScrollView>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
};
