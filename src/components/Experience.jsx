import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

export const Experience = () => {
  const { scene } = useGLTF("./models/human/model.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // console.log("Mesh Name:", child.name);

        if (child.name === "Object_10") {
          child.material = new THREE.MeshStandardMaterial({
            color: "red",
            metalness: 0.5,
            roughness: 0.5,
          });
        } else if (child.name === "Object_10") {
          child.material = new THREE.MeshStandardMaterial({
            color: "green",
            metalness: 0.5,
            roughness: 0.5,
          });
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return (
    <>
      <OrbitControls />
      <primitive object={scene} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>
  );
};

useGLTF.preload("./models/airplane/model.glb");
