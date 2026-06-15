import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { LightSensor } from "expo-sensors";
import * as Speech from "expo-speech";

const DARK_THRESHOLD = 50;

export default function App() {
    const [illuminance, setIlluminance] = useState(null);
    const [displayedLux, setDisplayedLux] = useState(null);
    const [isDark, setIsDark] = useState(false);

    // Ref para sempre ter o valor mais recente sem depender de closure stale
    const currentLux = useRef(null);

    useEffect(() => {
        const subscription = LightSensor.addListener((data) => {
            currentLux.current = data.illuminance;
            setIlluminance(data.illuminance);
        });

        return () => subscription.remove();
    }, []);

    const handleCapture = () => {
        const lux = currentLux.current;

        if (lux === null) return;

        setDisplayedLux(lux);

        if (lux < DARK_THRESHOLD) {
            setIsDark(true);
            Speech.speak("Está escuro aqui", { language: "pt-BR" });
        } else {
            setIsDark(false);
        }
    };

    const getLuxLabel = (lux) => {
        if (lux === null) return "—";
        if (lux < 10) return "Muito escuro";
        if (lux < 50) return "Escuro";
        if (lux < 200) return "Ambiente interno";
        if (lux < 1000) return "Bem iluminado";
        return "Luz solar";
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            <Text style={[styles.title, isDark && styles.textLight]}>💡 LightSensor</Text>

            {/* Resultado capturado */}
            <View style={[styles.card, isDark && styles.cardDark]}>
                <Text style={[styles.cardLabel, isDark && styles.textMuted]}>
                    Luminosidade capturada
                </Text>
                <Text style={[styles.luxValue, isDark && styles.textLight]}>
                    {displayedLux !== null ? `${displayedLux.toFixed(2)} lux` : "—"}
                </Text>
                <Text style={[styles.luxCategory, isDark && styles.textMuted]}>
                    {getLuxLabel(displayedLux)}
                </Text>
            </View>

            {/* Mensagem de escuridão */}
            {isDark && displayedLux !== null && (
                <View style={styles.alertBox}>
                    <Text style={styles.alertText}>🌑 Está escuro aqui</Text>
                </View>
            )}

            {/* Sensor ao vivo (para referência) */}
            <Text style={[styles.live, isDark && styles.textMuted]}>
                Sensor ao vivo:{" "}
                {illuminance !== null ? `${illuminance.toFixed(2)} lux` : "aguardando..."}
            </Text>

            {/* Botão de captura */}
            <TouchableOpacity
                style={[styles.button, isDark && styles.buttonDark]}
                onPress={handleCapture}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>📸 Capturar leitura</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4FF",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        gap: 20,
    },
    containerDark: {
        backgroundColor: "#0D0D1A",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1A1A2E",
        marginBottom: 8,
    },
    textLight: {
        color: "#E8E8FF",
    },
    textMuted: {
        color: "#8888AA",
    },
    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    cardDark: {
        backgroundColor: "#1A1A2E",
    },
    cardLabel: {
        fontSize: 13,
        color: "#666680",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 8,
    },
    luxValue: {
        fontSize: 48,
        fontWeight: "800",
        color: "#1A1A2E",
        letterSpacing: -1,
    },
    luxCategory: {
        fontSize: 15,
        color: "#888899",
        marginTop: 4,
    },
    alertBox: {
        backgroundColor: "#2D1B4E",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 28,
    },
    alertText: {
        color: "#C8A8FF",
        fontSize: 18,
        fontWeight: "600",
    },
    live: {
        fontSize: 13,
        color: "#888899",
    },
    button: {
        backgroundColor: "#4A6CF7",
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 40,
        marginTop: 8,
    },
    buttonDark: {
        backgroundColor: "#6A4CF7",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});
