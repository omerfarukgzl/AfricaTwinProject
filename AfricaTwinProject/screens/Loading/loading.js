import React from "react";
import { View, ActivityIndicator, } from "react-native";
import styles from './loadingStyles.styles';


const Loading = (props) => {

return(
    <View style={styles.container}>
        <ActivityIndicator  color="blue"/>
    </View>
);
}
export default Loading;