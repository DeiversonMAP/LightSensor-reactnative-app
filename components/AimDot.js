import { View, StyleSheet } from "react-native";
import { BALL_SIZE, POSITIONS } from "../constants/game";

export default function AimDot({ angle }) {
    const rad = (angle * Math.PI) / 180;
    const AIM_LENGTH = 60;
    const cx = POSITIONS.ballStart.x + BALL_SIZE / 2;
    const cy = POSITIONS.ballStart.y + BALL_SIZE / 2;

    return (
        <View
            pointerEvents="none"
            style={[
                styles.dot,
                {
                    left: cx + Math.sin(rad) * AIM_LENGTH - 4,
                    top: cy - Math.cos(rad) * AIM_LENGTH - 4,
                },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    dot: {
        position: "absolute",
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#FFFFFF55",
    },
});
