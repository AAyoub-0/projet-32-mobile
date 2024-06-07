import { StyleSheet, View, Text } from "react-native";

const Demande = () => {
    return (
        <View style={styles.container}>
            <Text>Demande de matériel</Text>
        </View>
    )
}
export default Demande;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});