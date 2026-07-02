import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BUTTON_AREA } from "../constants/game";

export default function Controls({ angle, fired, onLeft, onRight, onFire }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
            <Text style={styles.angleText}>Ângulo: {angle}°</Text>

            <View style={styles.row}>
                <TouchableOpacity style={styles.btn} onPress={onLeft}>
                    <Text style={styles.btnText}>◀ Esquerda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.fireBtn, fired && styles.disabled]}
                    onPress={onFire}
                    disabled={fired}
                >
                    <Text style={styles.btnText}>🚀 Disparar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={onRight}>
                    <Text style={styles.btnText}>Direita ▶</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#1A1A2E",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 12,
        gap: 12,
    },
    angleText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
    row: {
        flexDirection: "row",
        gap: 12,
        paddingBottom: 12,
    },
    btn: {
        backgroundColor: "#2A2A4A",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
    fireBtn: {
        backgroundColor: "#4A6CF7",
    },
    disabled: {
        opacity: 0.4,
    },
    btnText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 14,
    },
});
