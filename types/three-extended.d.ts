declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera } from 'three';
  export class OrbitControls {
    constructor(object: Camera, domElement: HTMLElement);
    update(): void;
    dispose(): void;
    enableDamping: boolean;
    dampingFactor: number;
    screenSpacePanning: boolean;
    minDistance: number;
    maxDistance: number;
    enablePan: boolean;
    enableZoom: boolean;
    enableRotate: boolean;
    // Add other properties/methods as needed
  }
}
