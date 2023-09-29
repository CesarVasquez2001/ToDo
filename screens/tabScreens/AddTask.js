import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import Button from "../../components/default/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");

export default function AddTask({ navigation }) {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [taskDetails, setTaskDetails] = useState({
    name: "",
    priority: "",
    dueDate: "",
    description: "",
  });

  useEffect(() => {
    // Esta función se ejecuta cuando el componente se monta
    setTaskDetails({
      name: "",
      priority: "",
      dueDate: "",
      description: "",
    });
    setDate(null);
  }, []); // El arreglo de dependencias está vacío, por lo que este useEffect solo se ejecuta cuando el componente se monta.

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    setTaskDetails({ ...taskDetails, dueDate: formattedDate });
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleAddTask = () => {
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
          "INSERT INTO tasks (name, priority, dueDate, description) VALUES (?, ?, ?, ?)",
          [
            taskDetails.name,
            priority,
            taskDetails.dueDate,
            taskDetails.description,
          ],
          (_, result) => {
            console.log("Task added successfully");
            tx.executeSql("SELECT * FROM tasks", [], (_, resultSet) => {
              const rows = resultSet.rows;
              for (let i = 0; i < rows.length; i++) {
                console.log(`Task ${i + 1}:`, rows.item(i));
              }
            });
            Alert.alert("Success", "Task added successfully", [
              {
                text: "OK",
                onPress: () => {
                  setTaskDetails({
                    name: "",
                    priority: "",
                    dueDate: "",
                    description: "",
                  });
                  setDate(null);
                  navigation.goBack();
                },
              },
            ]);
          },
          (error) => {
            console.error("Error inserting task", error);
            Alert.alert("Error", "An error occurred while adding the task");
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
          value={taskDetails.priority}
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
          placeholder="Select due date"
          value={taskDetails.dueDate}
          onTouchStart={showDatePickerModal}
          onFocus={showDatePickerModal}
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
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button label="Add Task" onPress={handleAddTask} theme="primary" />
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
