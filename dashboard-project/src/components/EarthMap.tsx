import React, { useEffect, useRef, useState } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/babylonjs.loaders.min.js";

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

      const createScene = async () => {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.08, 1);

        // Camera
        const camera = new BABYLON.ArcRotateCamera(
          "camera",
          Math.PI / 2,
          Math.PI / 2.5,
          15,
          BABYLON.Vector3.Zero(),
          scene
        );
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 8;
        camera.upperRadiusLimit = 30;
        camera.wheelPrecision = 50;
        camera.panningSensibility = 0;

        // Lights
        const light1 = new BABYLON.HemisphericLight(
          "light1",
          new BABYLON.Vector3(1, 1, 0),
          scene
        );
        light1.intensity = 0.8;

        const light2 = new BABYLON.DirectionalLight(
          "light2",
          new BABYLON.Vector3(-1, -2, -1),
          scene
        );
        light2.intensity = 0.6;

        const light3 = new BABYLON.PointLight(
          "light3",
          new BABYLON.Vector3(5, 5, 5),
          scene
        );
        light3.intensity = 0.3;

        // Add stars in background
        const starfield = BABYLON.MeshBuilder.CreateSphere(
          "starfield",
          { diameter: 100, segments: 32 },
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
        for (let i = 0; i < 800; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 2 + 0.5;
          const alpha = Math.random() * 0.5 + 0.5;
          starCtx.globalAlpha = alpha;
          starCtx.beginPath();
          starCtx.arc(x, y, size, 0, Math.PI * 2);
          starCtx.fill();
        }
        starTexture.update();
        
        starfieldMaterial.diffuseTexture = starTexture;
        starfieldMaterial.emissiveTexture = starTexture;
        starfieldMaterial.backFaceCulling = false;
        starfield.material = starfieldMaterial;

        try {
          // Load the Earth model from Sketchfab
          // Model URL: https://sketchfab.com/3d-models/lowpoly-earth-5f6ea1111fda4cf6a7b36cf4ce200d1b
          const result = await BABYLON.SceneLoader.ImportMeshAsync(
            "",
            "/models/",
            "LowPolyEarth2.obj",
            scene
          );

          // Get the loaded mesh
          const earthMesh = result.meshes[0];
          
          if (earthMesh) {
            // Center the model
            earthMesh.position = BABYLON.Vector3.Zero();
            
            // Scale if needed (adjust based on the model size)
            const boundingInfo = earthMesh.getHierarchyBoundingVectors();
            const size = boundingInfo.max.subtract(boundingInfo.min);
            const maxDimension = Math.max(size.x, size.y, size.z);
            const scaleFactor = 10 / maxDimension;
            earthMesh.scaling = new BABYLON.Vector3(scaleFactor, scaleFactor, scaleFactor);

            // Add rotation animation
            scene.registerBeforeRender(() => {
              earthMesh.rotation.y += 0.002;
            });

            // Enhance materials if needed
            result.meshes.forEach((mesh) => {
              if (mesh.material) {
                const material = mesh.material as BABYLON.PBRMaterial | BABYLON.StandardMaterial;
                if (material instanceof BABYLON.StandardMaterial) {
                  material.specularPower = 64;
                }
              }
            });

            setIsLoading(false);
          } else {
            throw new Error("No mesh found in the loaded model");
          }
        } catch (loadError) {
          console.error("Error loading 3D model:", loadError);
          
          // Fallback: Create a simple procedural Earth
          const earth = BABYLON.MeshBuilder.CreateSphere(
            "earth",
            { diameter: 10, segments: 64 },
            scene
          );

          const earthMaterial = new BABYLON.StandardMaterial("earthMat", scene);
          
          const earthTexture = new BABYLON.DynamicTexture(
            "earthTexture",
            { width: 2048, height: 1024 },
            scene
          );
          const ctx = earthTexture.getContext();
          
          // Create ocean gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
          gradient.addColorStop(0, "#1e3a8a");
          gradient.addColorStop(0.5, "#2563eb");
          gradient.addColorStop(1, "#1e3a8a");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 2048, 1024);
          
          // Draw continents
          ctx.fillStyle = "#15803d";
          
          // Africa
          ctx.beginPath();
          ctx.ellipse(1150, 550, 150, 200, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Europe
          ctx.beginPath();
          ctx.ellipse(1100, 350, 100, 80, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Asia
          ctx.beginPath();
          ctx.ellipse(1400, 400, 250, 150, 0.3, 0, Math.PI * 2);
          ctx.fill();
          
          // North America
          ctx.beginPath();
          ctx.ellipse(500, 350, 180, 200, -0.3, 0, Math.PI * 2);
          ctx.fill();
          
          // South America
          ctx.beginPath();
          ctx.ellipse(600, 650, 100, 180, 0.2, 0, Math.PI * 2);
          ctx.fill();
          
          // Australia
          ctx.beginPath();
          ctx.ellipse(1600, 700, 120, 90, 0, 0, Math.PI * 2);
          ctx.fill();
          
          earthTexture.update();

          earthMaterial.diffuseTexture = earthTexture;
          earthMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.4);
          earthMaterial.specularPower = 32;
          earth.material = earthMaterial;

          // Atmosphere
          const glowLayer = new BABYLON.GlowLayer("glow", scene);
          glowLayer.intensity = 0.5;

          const atmosphere = BABYLON.MeshBuilder.CreateSphere(
            "atmosphere",
            { diameter: 10.5, segments: 32 },
            scene
          );
          const atmosphereMaterial = new BABYLON.StandardMaterial(
            "atmosphereMat",
            scene
          );
          atmosphereMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.5, 1);
          atmosphereMaterial.alpha = 0.1;
          atmosphere.material = atmosphereMaterial;

          // Add rotation
          scene.registerBeforeRender(() => {
            earth.rotation.y += 0.002;
            atmosphere.rotation.y += 0.002;
          });

          setIsLoading(false);
          setError("Using fallback Earth model. See console for model loading details.");
        }

        return scene;
      };

      createScene().then((scene) => {
        sceneRef.current = scene;

        engine.runRenderLoop(() => {
          if (sceneRef.current) {
            sceneRef.current.render();
          }
        });
      });

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

  if (error && !sceneRef.current) {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-200 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <p className="mb-4">{error}</p>
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
        <div className="absolute inset-0 flex items-center justify-center text-white z-10 bg-gray-900 bg-opacity-90">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading 3D Earth Model...</p>
            <p className="text-sm text-gray-400 mt-2">This may take a moment</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm z-20">
          {error}
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}