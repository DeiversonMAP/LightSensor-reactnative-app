import { View, StyleSheet } from "react-native";
import { OBSTACLE_W, OBSTACLE_H, POSITIONS } from "../constants/game";

export default function Obstacle() {
    return (
        <View
            style={[styles.obstacle, { left: POSITIONS.obstacle.x, top: POSITIONS.obstacle.y }]}
        />
    );
}

const styles = StyleSheet.create({
    obstacle: {
        position: "absolute",
        width: OBSTACLE_W,
        height: OBSTACLE_H,
        backgroundColor: "#F7A94A",
        borderRadius: 4,
    },
});
