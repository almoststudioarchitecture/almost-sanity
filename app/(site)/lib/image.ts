import { scaleLinear} from 'd3-scale'

const scale = scaleLinear([.25, .75], [0, 1]).clamp(true)

export function objectPositionFromHotspot(hotspot: {
    x: number;
    y: number;
  } | undefined) {
  return `${scale(hotspot?.x ?? 0.5) * 100}% ${scale(hotspot?.y ?? 0.5) * 100}%`;
}

export const RESOLUTIONS = [
  2048, // QXGA
  1920, // 1080p
  1668, // Various iPads
  1280, // 720p
  1080, // iPhone 6-8 Plus
  960, // older horizontal phones
  828, // iPhone XR/11
  750, // iPhone 6-8
  640, // older and lower-end phones
];