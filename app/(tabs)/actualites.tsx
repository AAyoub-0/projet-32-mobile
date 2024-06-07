import { StyleSheet, View, Text } from "react-native";

const Actualites = () => {
    return (
        <View style={styles.container}>
            <Text>Actualités</Text>
        </View>
    )
}
export default Actualites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});