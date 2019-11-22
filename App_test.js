// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import Timer from './Timer'


// export default function App() {
//   const [entered, setEntetedGoal] = useState('');
//   const [courseGoals, setCourseGoals] = useState([]);

//   const goalInputHandler = (textEntered) => {
//     setEntetedGoal(textEntered);
//   };

//   const addGoalHandler = () => {
//     // console.log(entered);
//     // add entered to ...courseGoals(old list of goals)
//     setCourseGoals(currentGoals => [...courseGoals, entered]);
//   }

//   return (
//     <View style={styles.screen}>
//       <View style={styles.inputContainer}>
//         <TextInput 
//         placeholder='course goal'
//         style={styles.input}
//         onChangeText={goalInputHandler}
//         value={entered} 
//         />
//         <Button title="ADD" onPress={addGoalHandler}/>
//       </View>
//       <View>
//         {courseGoals.map((goal) => <Text>{goal}</Text>)}
//       </View>
            
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   screen: {
//     padding: 50,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   input:{
//     width: '80%',
//     borderColor: 'black',
//     borderWidth: 1,
//     padding: 10, 
//   }
   
// });
