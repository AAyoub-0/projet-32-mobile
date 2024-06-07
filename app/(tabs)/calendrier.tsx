import { StyleSheet, View, Text } from "react-native";

const Calendrier = () => {
    return (
        <View style={styles.container}>
            <Text>Calendrier</Text>
        </View>
    )
}
export default Calendrier;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});