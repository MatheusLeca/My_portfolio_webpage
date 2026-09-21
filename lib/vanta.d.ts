// three@0.128.0 is required by vanta@0.5.24 (unmaintained since 2021):
// newer three majors remove APIs Vanta calls. Do not upgrade three alone.
declare module "vanta/dist/vanta.dots.min" {
  const DOTS: (opts: Record<string, unknown>) => { destroy: () => void };
  export default DOTS;
}
declare module "three/build/three.min.js";
