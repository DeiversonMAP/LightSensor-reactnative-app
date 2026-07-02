import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useGameLoop } from "./hooks/useGameLoop";
import Ball from "./components/Ball";
import Target from "./components/Target";
import Obstacle from "./components/Obstacle";
import AimDot from "./components/AimDot";
import Controls from "./components/Controls";
import WinOverlay from "./components/WinOverlay";

export default function App() {
    const { ballX, ballY, angle, hit, fired, changeAngle, fire, reset } = useGameLoop();

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Target />
                <Obstacle />
                {!fired && <AimDot angle={angle} />}
                <Ball x={ballX} y={ballY} />
                {hit && <WinOverlay onReset={reset} />}
                <Controls
                    angle={angle}
                    fired={fired}
                    onLeft={() => changeAngle(-1)}
                    onRight={() => changeAngle(1)}
                    onFire={fire}
                />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D1A",
    },
});
