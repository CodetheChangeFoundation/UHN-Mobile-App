import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default Spinner = ({ size }) => {
  console.log("in Spinner " + size);

  return (
    <View style={styles.spinnerStyles}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
}

const styles = {
  spinnerStyles: {
    flex: 1,
    justifyContent: "center",
    alignItem: 'center',
  }
};