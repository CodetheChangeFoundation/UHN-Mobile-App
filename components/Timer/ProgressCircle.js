import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SetTimeButton from './SetTimeButton';

rotateCircle = (percentage, base_degrees) => {
  const rotateBy = base_degrees + (percentage * 3.6);
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }]
  };
};

convertSeconds = (seconds) => {
  let second = Math.floor(seconds % 3600 % 60);
  if (second <= 9) {
    second = "0" + second;
  }
  return second;
};

convertSecondsToMinutes = (seconds) => {
  let minute = Math.floor(seconds % 3600 / 60);
  return minute;

};

renderSecondLayer = (percentage) => {
  if (percentage > 50) {
    return <View style={[styles.secondProgressLayer, rotateCircle((percentage - 50), 45)]}></View>
  } else {
    return <View style={styles.offsetLayer}></View>
  }
};

export default ProgressCircle = ({ percentage, seconds, increaseTimeHandler, decreaseTimeHandler }) => {
  let firstProgressLayerStyle;
  if (percentage > 50) {
    firstProgressLayerStyle = rotateCircle(50, -135);
  } else {
    firstProgressLayerStyle = rotateCircle(percentage, -135);
  }

  return (
    <View style={styles.baseLayer}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderSecondLayer(percentage)}
      <SetTimeButton changeTimeHandler={increaseTimeHandler}>+15</SetTimeButton>
      <View style={styles.timeLayout}>
        <Text style={styles.timeDisplay}>{convertSecondsToMinutes(seconds)}</Text>
        <Text style={styles.timeDisplay}>:</Text>
        <Text style={styles.timeDisplay}>{convertSeconds(seconds)}</Text>
      </View>
      <SetTimeButton changeTimeHandler={decreaseTimeHandler}>-15</SetTimeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  baseLayer: {
    width: 255,
    height: 255,
    borderWidth: 8,
    borderRadius: 127.5,
    borderColor: '#60a781',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstProgressLayer: {
    width: 255,
    height: 255,
    borderWidth: 8,
    borderRadius: 127.5,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#999b9e',
    borderTopColor: '#999b9e',
    transform: [{ rotateZ: '-135deg' }]
  },
  secondProgressLayer: {
    width: 255,
    height: 255,
    borderWidth: 8,
    borderRadius: 127.5,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#999b9e',
    borderTopColor: '#999b9e',
    transform: [{ rotateZ: '45deg' }]
  },
  offsetLayer: {
    width: 255,
    height: 255,
    borderWidth: 8,
    borderRadius: 127.5,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#60a781',
    borderTopColor: '#60a781',
    transform: [{ rotateZ: '-135deg' }]
  },
  timeLayout: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  timeDisplay: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#67686B',
  }
});