import React, { useEffect, useRef } from "react";
import { GLView } from "expo-gl";
import * as THREE from "three";
import { Renderer } from "expo-three";
import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader";

interface GLContext extends WebGLRenderingContext {
  endFrameEXP: () => void;
}

interface ThreeDViewerProps {
  structureData: string;
}

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({ structureData }) => {
  const glViewRef = useRef<any>(null);

  useEffect(() => {
    const initializeThree = (gl: GLContext) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

      // Load structure data into Three.js
      const pdbLoader = new PDBLoader();
      pdbLoader.load(
        `data:text/plain;charset=utf-8,${encodeURIComponent(structureData)}`,
        (geometry) => {
          const group = new THREE.Group();
          geometry.geometryAtoms.setAttribute(
            "position",
            geometry.geometryAtoms.attributes.position
          );
          geometry.geometryBonds.setAttribute(
            "position",
            geometry.geometryBonds.attributes.position
          );
          group.add(new THREE.Mesh(geometry.geometryAtoms));
          group.add(new THREE.Mesh(geometry.geometryBonds));
          scene.add(group);
          animate();
        }
      );

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      animate();
    };

    const glContext = glViewRef.current;
    if (glContext) {
      initializeThree(glContext);
    }
  }, [structureData]);

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={(gl: GLContext) => (glViewRef.current = gl)}
    />
  );
};

export default ThreeDViewer;
