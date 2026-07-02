import { View, Text, StyleSheet } from "react-native";
import { TARGET_SIZE, POSITIONS } from "../constants/game";

export default function Target() {
    return (
        <View style={[styles.target, { left: POSITIONS.target.x, top: POSITIONS.target.y }]}>
            <Text style={styles.emoji}>🎯</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    target: {
        position: "absolute",
        width: TARGET_SIZE,
        height: TARGET_SIZE,
        alignItems: "center",
        justifyContent: "center",
    },
    emoji: { fontSize: 36 },
});
