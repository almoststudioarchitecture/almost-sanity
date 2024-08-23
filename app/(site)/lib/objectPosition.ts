import { scaleLinear} from 'd3-scale'

const scale = scaleLinear([.25, .75], [0, 1]).clamp(true)

export function objectPositionFromHotspot(hotspot: {
    x: number;
    y: number;
  } | undefined) {
  return `${scale(hotspot?.x ?? 0.5) * 100}% ${scale(hotspot?.y ?? 0.5) * 100}%`;
}