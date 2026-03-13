"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  return (
    <Center>
      <primitive object={cloned} />
    </Center>
  );
}

function ModelSwapper({ url }: { url: string }) {
  const { invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Trigger a re-render when url changes
  useEffect(() => {
    invalidate();
  }, [url, invalidate]);

  return (
    <group ref={groupRef}>
      <Suspense fallback={<LoadingFallback />}>
        <Model key={url} url={url} />
      </Suspense>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial
        color="#e8e0c4"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

interface ModelViewerProps {
  glbUrl: string;
}

const ModelViewer = ({ glbUrl }: ModelViewerProps) => {
  return (
    <div className="h-full w-full" style={{ touchAction: "pan-y" }}>
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0.4, 2.5],
          fov: 32,
          near: 0.1,
          far: 100,
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} />

        <Environment preset="studio" environmentIntensity={0.4} />

        <ModelSwapper url={glbUrl} />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={6}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
