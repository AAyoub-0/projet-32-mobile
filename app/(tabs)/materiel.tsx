import { StyleSheet, View, Text } from "react-native";

const Materiel = () => {
    return (
        <View style={styles.container}>
            <Text>Materiel</Text>
        </View>
    )
}
export default Materiel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});