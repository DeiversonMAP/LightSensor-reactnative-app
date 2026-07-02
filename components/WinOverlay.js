import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WinOverlay({ onReset }) {
    return (
        <View style={styles.overlay}>
            <Text style={styles.title}>🎉 Acertou o alvo!</Text>
            <TouchableOpacity style={styles.btn} onPress={onReset}>
                <Text style={styles.btnText}>Jogar de novo</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#00000099",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#FFF",
    },
    btn: {
        backgroundColor: "#4A6CF7",
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 14,
    },
    btnText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
