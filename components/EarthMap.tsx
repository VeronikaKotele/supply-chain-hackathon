import { useEffect, useRef, useState } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export function EarthMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BABYLON.Engine | null>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
      engineRef.current = engine;

      const createScene = () => {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.08, 1);

        // Camera
        const camera = new BABYLON.ArcRotateCamera(
          "camera",
          Math.PI / 2,
          Math.PI / 2.5,
          4,
          BABYLON.Vector3.Zero(),
          scene
        );
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 2.5;
        camera.upperRadiusLimit = 8;
        camera.wheelPrecision = 50;

        // Lights
        const light1 = new BABYLON.HemisphericLight(
          "light1",
          new BABYLON.Vector3(1, 1, 0),
          scene
        );
        light1.intensity = 0.7;

        const light2 = new BABYLON.PointLight(
          "light2",
          new BABYLON.Vector3(-2, 2, -2),
          scene
        );
        light2.intensity = 0.5;

        // Create Earth sphere
        const earth = BABYLON.MeshBuilder.CreateSphere(
          "earth",
          { diameter: 2, segments: 64 },
          scene
        );

        // Earth material with texture
        const earthMaterial = new BABYLON.StandardMaterial("earthMat", scene);
        
        // Create a procedural texture for Earth
        const earthTexture = new BABYLON.DynamicTexture(
          "earthTexture",
          { width: 2048, height: 1024 },
          scene
        );
        const ctx = earthTexture.getContext();
        
        // Create a gradient background (ocean blue)
        const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
        gradient.addColorStop(0, "#1e3a8a");
        gradient.addColorStop(0.5, "#2563eb");
        gradient.addColorStop(1, "#1e3a8a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 2048, 1024);
        
        // Draw continents (simplified representation)
        ctx.fillStyle = "#15803d";
        
        // Africa approximation
        ctx.beginPath();
        ctx.ellipse(1150, 550, 150, 200, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Europe approximation
        ctx.beginPath();
        ctx.ellipse(1100, 350, 100, 80, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Asia approximation
        ctx.beginPath();
        ctx.ellipse(1400, 400, 250, 150, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // North America approximation
        ctx.beginPath();
        ctx.ellipse(500, 350, 180, 200, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // South America approximation
        ctx.beginPath();
        ctx.ellipse(600, 650, 100, 180, 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Australia approximation
        ctx.beginPath();
        ctx.ellipse(1600, 700, 120, 90, 0, 0, Math.PI * 2);
        ctx.fill();
        
        earthTexture.update();

        earthMaterial.diffuseTexture = earthTexture;
        earthMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.4);
        earthMaterial.specularPower = 32;
        earth.material = earthMaterial;

        // Atmosphere glow effect
        const glowLayer = new BABYLON.GlowLayer("glow", scene);
        glowLayer.intensity = 0.5;

        // Create atmosphere sphere
        const atmosphere = BABYLON.MeshBuilder.CreateSphere(
          "atmosphere",
          { diameter: 2.1, segments: 32 },
          scene
        );
        const atmosphereMaterial = new BABYLON.StandardMaterial(
          "atmosphereMat",
          scene
        );
        atmosphereMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.5, 1);
        atmosphereMaterial.alpha = 0.1;
        atmosphere.material = atmosphereMaterial;

        // Add rotation animation
        scene.registerBeforeRender(() => {
          earth.rotation.y += 0.001;
          atmosphere.rotation.y += 0.001;
        });

        // Add stars in background
        const starfield = BABYLON.MeshBuilder.CreateSphere(
          "starfield",
          { diameter: 20, segments: 32 },
          scene
        );
        const starfieldMaterial = new BABYLON.StandardMaterial(
          "starfieldMat",
          scene
        );
        
        const starTexture = new BABYLON.DynamicTexture(
          "starTexture",
          { width: 1024, height: 1024 },
          scene
        );
        const starCtx = starTexture.getContext();
        starCtx.fillStyle = "#000";
        starCtx.fillRect(0, 0, 1024, 1024);
        
        // Draw stars
        starCtx.fillStyle = "#fff";
        for (let i = 0; i < 500; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 2;
          starCtx.beginPath();
          starCtx.arc(x, y, size, 0, Math.PI * 2);
          starCtx.fill();
        }
        starTexture.update();
        
        starfieldMaterial.diffuseTexture = starTexture;
        starfieldMaterial.emissiveTexture = starTexture;
        starfieldMaterial.backFaceCulling = false;
        starfield.material = starfieldMaterial;

        return scene;
      };

      const scene = createScene();
      sceneRef.current = scene;

      engine.runRenderLoop(() => {
        if (sceneRef.current) {
          sceneRef.current.render();
        }
      });

      setIsLoading(false);

      const handleResize = () => {
        engine.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        
        // Properly stop render loop
        if (engineRef.current) {
          engineRef.current.stopRenderLoop();
        }
        
        // Dispose scene first
        if (sceneRef.current) {
          sceneRef.current.dispose();
          sceneRef.current = null;
        }
        
        // Then dispose engine
        if (engineRef.current) {
          engineRef.current.dispose();
          engineRef.current = null;
        }
      };
    } catch (err) {
      console.error("Failed to initialize Babylon.js:", err);
      setError("Failed to load 3D Earth. Please try refreshing the page.");
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-200 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-200 bg-gray-900 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading 3D Earth...</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}