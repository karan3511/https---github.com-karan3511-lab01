import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Switch, TouchableOpacity, StyleSheet } from 'react-native';

const TaskManager = () => {
  
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  
  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTaskTitle, status: false }]);
      setNewTaskTitle('');  
    }
  };

  
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Task Title"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      
      <Button title="Add Task" onPress={addTask} disabled={!newTaskTitle.trim()} />

      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>

            
            <Switch
              value={item.status}
              onValueChange={() => toggleTaskStatus(item.id)}
            />

            
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 18,
  },
  deleteText: {
    color: 'red',
  },
});

export default TaskManager;
