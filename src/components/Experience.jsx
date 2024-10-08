import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { useEffect } from "react";

export const Experience = () => {
  const { scene } = useGLTF("./models/airplane/model.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Log each mesh name
        console.log("Mesh Name:", child.name);

        // Apply color to specific parts by name
        if (child.name === "wing") {
          // Replace with the actual name of the part
          child.material = new THREE.MeshStandardMaterial({
            color: "red",
            metalness: 0.5,
            roughness: 0.5,
          });
        } else if (child.name === "Fuselage") {
          // Another example
          child.material = new THREE.MeshStandardMaterial({
            color: "green",
            metalness: 0.5,
            roughness: 0.5,
          });
        }
        // Add additional conditions for other parts as needed

        // Ensure the material updates
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

// Optionally preload your model
// useGLTF.preload("./models/airplane/model.glb");
