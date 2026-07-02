import { Dimensions } from "react-native";

const { width: W, height: H } = Dimensions.get("window");

export const SCREEN = { W, H };

export const BALL_SIZE = 30;
export const TARGET_SIZE = 50;
export const OBSTACLE_W = 100;
export const OBSTACLE_H = 20;
export const BUTTON_AREA = 120;
export const SPEED = 6;
export const ANGLE_STEP = 5;

export const POSITIONS = {
    ballStart: {
        x: W / 2 - BALL_SIZE / 2,
        y: H - BUTTON_AREA - BALL_SIZE - 20,
    },
    target: {
        x: W / 2 - TARGET_SIZE / 2,
        y: 60,
    },
    obstacle: {
        x: W / 2 - OBSTACLE_W / 2,
        y: H / 2 - OBSTACLE_H / 2,
    },
};
