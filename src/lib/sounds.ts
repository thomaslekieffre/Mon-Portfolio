export interface SoundDef {
  frequencies: number[];
  durations: number[];
  volume: number;
  type: OscillatorType;
}

export const SOUNDS: Record<string, SoundDef> = {
  boot: {
    frequencies: [520, 660, 780],
    durations: [0.1, 0.1, 0.2],
    volume: 0.08,
    type: "sine",
  },
  click: {
    frequencies: [800],
    durations: [0.05],
    volume: 0.04,
    type: "square",
  },
  open: {
    frequencies: [400, 600],
    durations: [0.08, 0.12],
    volume: 0.06,
    type: "sine",
  },
  close: {
    frequencies: [600, 350],
    durations: [0.08, 0.1],
    volume: 0.05,
    type: "sine",
  },
  minimize: {
    frequencies: [500, 350],
    durations: [0.06, 0.08],
    volume: 0.04,
    type: "sine",
  },
  maximize: {
    frequencies: [400, 550],
    durations: [0.06, 0.08],
    volume: 0.04,
    type: "sine",
  },
  error: {
    frequencies: [300, 200],
    durations: [0.1, 0.15],
    volume: 0.06,
    type: "sawtooth",
  },
  hover: {
    frequencies: [700],
    durations: [0.03],
    volume: 0.02,
    type: "sine",
  },
  notification: {
    frequencies: [600, 800, 600],
    durations: [0.08, 0.08, 0.12],
    volume: 0.05,
    type: "sine",
  },
  konami: {
    frequencies: [523, 659, 784, 1047],
    durations: [0.12, 0.12, 0.12, 0.3],
    volume: 0.08,
    type: "sine",
  },
};
