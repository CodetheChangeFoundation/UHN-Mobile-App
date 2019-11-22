import React from 'react';
import { View, ActivityIndicator} from 'react-native';
import { Text } from 'native-base';

export default Spinner = ({ size }) => {
    console.log("in Spinner " + size);

    return (
        <View style={styles.spinnerStyles}>
            <ActivityIndicator size={size || 'large'}/>
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
