import { Animated, StyleSheet } from "react-native";
import { BALL_SIZE } from "../constants/game";

export default function Ball({ x, y }) {
    return <Animated.View style={[styles.ball, { left: x, top: y }]} />;
}

const styles = StyleSheet.create({
    ball: {
        position: "absolute",
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: BALL_SIZE / 2,
        backgroundColor: "#4A6CF7",
        shadowColor: "#4A6CF7",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
});
