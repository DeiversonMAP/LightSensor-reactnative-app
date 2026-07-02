import { useRef, useState, useEffect } from "react";
import { Animated } from "react-native";
import {
    SCREEN,
    BALL_SIZE,
    TARGET_SIZE,
    OBSTACLE_W,
    OBSTACLE_H,
    SPEED,
    ANGLE_STEP,
    POSITIONS,
} from "../constants/game";

export function useGameLoop() {
    const ballX = useRef(new Animated.Value(POSITIONS.ballStart.x)).current;
    const ballY = useRef(new Animated.Value(POSITIONS.ballStart.y)).current;

    const posRef = useRef({ ...POSITIONS.ballStart });
    const velRef = useRef({ vx: 0, vy: 0 });
    const angleRef = useRef(0);
    const movingRef = useRef(false);
    const frameRef = useRef(null);

    const [angle, setAngle] = useState(0);
    const [hit, setHit] = useState(false);
    const [fired, setFired] = useState(false);

    const reset = () => {
        cancelAnimationFrame(frameRef.current);
        movingRef.current = false;
        posRef.current = { ...POSITIONS.ballStart };
        ballX.setValue(POSITIONS.ballStart.x);
        ballY.setValue(POSITIONS.ballStart.y);
        angleRef.current = 0;
        setAngle(0);
        setHit(false);
        setFired(false);
    };

    const changeAngle = (dir) => {
        if (fired) return;
        const newAngle = angleRef.current + dir * ANGLE_STEP;
        angleRef.current = newAngle;
        setAngle(newAngle);
    };

    const fire = () => {
        if (fired) return;
        const rad = (angleRef.current * Math.PI) / 180;
        velRef.current = {
            vx: Math.sin(rad) * SPEED,
            vy: -Math.cos(rad) * SPEED,
        };
        movingRef.current = true;
        setFired(true);
        loop();
    };

    const loop = () => {
        frameRef.current = requestAnimationFrame(() => {
            if (!movingRef.current) return;

            let { x, y } = posRef.current;
            let { vx, vy } = velRef.current;

            x += vx;
            y += vy;

            // Paredes laterais
            if (x <= 0) {
                x = 0;
                vx = Math.abs(vx);
            }
            if (x >= SCREEN.W - BALL_SIZE) {
                x = SCREEN.W - BALL_SIZE;
                vx = -Math.abs(vx);
            }

            // Teto
            if (y <= 0) {
                y = 0;
                vy = Math.abs(vy);
            }

            // Chão
            if (y >= POSITIONS.ballStart.y) {
                y = POSITIONS.ballStart.y;
                vy = -Math.abs(vy);
            }

            // Colisão com obstáculo
            const cx = x + BALL_SIZE / 2;
            const cy = y + BALL_SIZE / 2;
            const { obstacle } = POSITIONS;

            const hitObs =
                cx >= obstacle.x &&
                cx <= obstacle.x + OBSTACLE_W &&
                cy >= obstacle.y - BALL_SIZE / 2 &&
                cy <= obstacle.y + OBSTACLE_H + BALL_SIZE / 2;

            if (hitObs) {
                vy = -vy;
                y += vy;
            }

            // Colisão com alvo
            const { target } = POSITIONS;
            const hitTarget =
                cx >= target.x &&
                cx <= target.x + TARGET_SIZE &&
                cy >= target.y &&
                cy <= target.y + TARGET_SIZE;

            if (hitTarget) {
                movingRef.current = false;
                setHit(true);
                return;
            }

            posRef.current = { x, y };
            velRef.current = { vx, vy };
            ballX.setValue(x);
            ballY.setValue(y);

            loop();
        });
    };

    useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

    return { ballX, ballY, angle, hit, fired, changeAngle, fire, reset };
}
