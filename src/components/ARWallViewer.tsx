'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Camera, RotateCcw, Move, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';

interface ARWallViewerProps {
  imageSrc: string;
  productTitle: string;
  isOpen: boolean;
  onClose: () => void;
  frameStyle?: 'none' | 'black' | 'white' | 'oak';
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// WebXR types - using any for browser compatibility
type XRSession = any;
type XRReferenceSpace = any;
type XRHitTestSource = any;
type XRFrame = any;

export default function ARWallViewer({ imageSrc, productTitle, isOpen, onClose, frameStyle = 'none' }: ARWallViewerProps) {
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [arActive, setArActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<XRSession | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const posterRef = useRef<THREE.Mesh | null>(null);
  const reticleRef = useRef<THREE.Mesh | null>(null);
  const hitTestSourceRef = useRef<XRHitTestSource | null>(null);
  const localSpaceRef = useRef<XRReferenceSpace | null>(null);

  // Check WebXR support
  useEffect(() => {
    const checkSupport = async () => {
      if (navigator.xr) {
        try {
          const supported = await navigator.xr.isSessionSupported('immersive-ar');
          setArSupported(supported);
        } catch {
          setArSupported(false);
        }
      } else {
        setArSupported(false);
      }
    };
    checkSupport();
  }, []);

  // Load poster texture
  const loadPosterTexture = useCallback((): Promise<THREE.Texture> => {
    return new Promise((resolve, reject) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = 'anonymous';
      textureLoader.load(
        imageSrc,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          resolve(texture);
        },
        undefined,
        reject
      );
    });
  }, [imageSrc]);

  // Create poster mesh with frame
  const createPosterMesh = useCallback(async () => {
    const texture = await loadPosterTexture();

    // Poster dimensions (in meters) - approximately A2 size
    const posterWidth = 0.42;
    const posterHeight = 0.594;
    const frameWidth = frameStyle !== 'none' ? 0.03 : 0;

    const group = new THREE.Group();

    // Frame (if selected)
    if (frameStyle !== 'none') {
      const frameColor = frameStyle === 'oak' ? 0x8B5A2B : frameStyle === 'white' ? 0xF5F5F5 : 0x1A1A1A;
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: frameColor,
        roughness: frameStyle === 'oak' ? 0.8 : 0.3,
        metalness: 0.1
      });

      // Frame sides
      const frameDepth = 0.02;
      const totalWidth = posterWidth + frameWidth * 2;
      const totalHeight = posterHeight + frameWidth * 2;

      // Top
      const topFrame = new THREE.Mesh(
        new THREE.BoxGeometry(totalWidth, frameWidth, frameDepth),
        frameMaterial
      );
      topFrame.position.set(0, posterHeight / 2 + frameWidth / 2, frameDepth / 2);
      group.add(topFrame);

      // Bottom
      const bottomFrame = new THREE.Mesh(
        new THREE.BoxGeometry(totalWidth, frameWidth, frameDepth),
        frameMaterial
      );
      bottomFrame.position.set(0, -posterHeight / 2 - frameWidth / 2, frameDepth / 2);
      group.add(bottomFrame);

      // Left
      const leftFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, posterHeight, frameDepth),
        frameMaterial
      );
      leftFrame.position.set(-posterWidth / 2 - frameWidth / 2, 0, frameDepth / 2);
      group.add(leftFrame);

      // Right
      const rightFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, posterHeight, frameDepth),
        frameMaterial
      );
      rightFrame.position.set(posterWidth / 2 + frameWidth / 2, 0, frameDepth / 2);
      group.add(rightFrame);
    }

    // White passepartout
    const matGeometry = new THREE.PlaneGeometry(posterWidth, posterHeight);
    const matMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.9 });
    const mat = new THREE.Mesh(matGeometry, matMaterial);
    mat.position.z = 0.001;
    group.add(mat);

    // Poster image
    const imageWidth = posterWidth * 0.85;
    const imageHeight = posterHeight * 0.85;
    const posterGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
    const posterMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.5
    });
    const poster = new THREE.Mesh(posterGeometry, posterMaterial);
    poster.position.z = 0.002;
    group.add(poster);

    return group;
  }, [loadPosterTexture, frameStyle]);

  // Start AR session
  const startAR = async () => {
    if (!navigator.xr || !canvasRef.current) {
      setError('WebXR ikke tilgængelig');
      return;
    }

    try {
      setError(null);

      // Initialize Three.js
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      rendererRef.current = renderer;

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(0, 2, 1);
      scene.add(directionalLight);

      // Create reticle (placement indicator)
      const reticleGeometry = new THREE.RingGeometry(0.1, 0.12, 32);
      reticleGeometry.rotateX(-Math.PI / 2);
      const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
      reticle.visible = false;
      scene.add(reticle);
      reticleRef.current = reticle;

      // Create poster (initially hidden)
      const posterMesh = await createPosterMesh();
      posterMesh.visible = false;
      scene.add(posterMesh);
      posterRef.current = posterMesh as unknown as THREE.Mesh;

      // Request AR session
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test', 'local-floor'],
        optionalFeatures: ['dom-overlay'],
      });
      sessionRef.current = session;

      // Set up render state
      const gl = renderer.getContext();
      await renderer.xr.setSession(session);

      // Get reference spaces
      const referenceSpace = await session.requestReferenceSpace('local-floor');
      localSpaceRef.current = referenceSpace;

      const viewerSpace = await session.requestReferenceSpace('viewer');
      if (session.requestHitTestSource) {
        const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
        hitTestSourceRef.current = hitTestSource;
      }

      setArActive(true);

      // Render loop
      const camera = new THREE.PerspectiveCamera();

      const onXRFrame = (time: number, frame: XRFrame) => {
        const session = frame.session;
        session.requestAnimationFrame(onXRFrame);

        const pose = frame.getViewerPose(referenceSpace);
        if (!pose) return;

        // Hit test for surface detection
        if (hitTestSourceRef.current && reticleRef.current && !placed) {
          const hitTestResults = frame.getHitTestResults(hitTestSourceRef.current);
          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            const hitPose = hit.getPose(referenceSpace);
            if (hitPose) {
              reticleRef.current.visible = true;
              reticleRef.current.matrix.fromArray(hitPose.transform.matrix);
              reticleRef.current.matrix.decompose(
                reticleRef.current.position,
                reticleRef.current.quaternion,
                reticleRef.current.scale
              );
            }
          } else {
            reticleRef.current.visible = false;
          }
        }

        // Update camera from XR
        const view = pose.views[0];
        camera.matrix.fromArray(view.transform.matrix);
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.updateMatrixWorld(true);

        renderer.render(scene, camera);
      };

      session.requestAnimationFrame(onXRFrame);

      // Handle session end
      session.addEventListener('end', () => {
        setArActive(false);
        setPlaced(false);
        sessionRef.current = null;
      });

    } catch (err) {
      console.error('AR Error:', err);
      setError('Kunne ikke starte AR. Sørg for at give kamera-tilladelse.');
      setArActive(false);
    }
  };

  // Place poster at reticle position
  const placePoster = () => {
    if (reticleRef.current && posterRef.current && reticleRef.current.visible) {
      posterRef.current.position.copy(reticleRef.current.position);
      posterRef.current.position.y += 0.8; // Raise to wall height
      posterRef.current.quaternion.copy(reticleRef.current.quaternion);
      // Rotate to face viewer (stand upright on wall)
      posterRef.current.rotateX(Math.PI / 2);
      posterRef.current.visible = true;
      posterRef.current.scale.setScalar(scale);
      reticleRef.current.visible = false;
      setPlaced(true);
    }
  };

  // Reset placement
  const resetPlacement = () => {
    if (posterRef.current && reticleRef.current) {
      posterRef.current.visible = false;
      reticleRef.current.visible = true;
      setPlaced(false);
    }
  };

  // Adjust scale
  const adjustScale = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
    if (posterRef.current && placed) {
      posterRef.current.scale.setScalar(newScale);
    }
  };

  // Stop AR session
  const stopAR = async () => {
    if (sessionRef.current) {
      await sessionRef.current.end();
      sessionRef.current = null;
    }
    setArActive(false);
    setPlaced(false);
    onClose();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.end();
      }
    };
  }, []);

  if (!isOpen) return null;

  // Fallback for unsupported devices
  if (arSupported === false) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95" onClick={onClose}>
        <div className="bg-white rounded-xl p-6 max-w-md text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">AR ikke tilgængelig</h3>
          <p className="text-gray-600 mb-4">
            Din enhed eller browser understøtter ikke AR-funktionen.
            Prøv med en nyere smartphone og Chrome eller Safari browser.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Luk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black">
      {/* AR Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/50 to-transparent">
          <div className="text-white">
            <h3 className="font-medium">{productTitle}</h3>
            <p className="text-sm text-white/70">
              {!arActive ? 'Tryk start for at åbne kamera' : placed ? 'Plakat placeret!' : 'Peg på en væg og tryk for at placere'}
            </p>
          </div>
          <button
            onClick={stopAR}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="absolute top-20 left-4 right-4 bg-red-500/90 text-white p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Start button */}
        {!arActive && !error && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <button
              onClick={startAR}
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium text-lg shadow-xl hover:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <Camera className="w-6 h-6" />
              Start AR Kamera
            </button>
          </div>
        )}

        {/* Controls when AR is active */}
        {arActive && (
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto">
            {/* Scale controls */}
            {placed && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <button
                  onClick={() => adjustScale(-0.1)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-sm min-w-[60px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => adjustScale(0.1)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* Main action button */}
            <div className="flex gap-4">
              {placed ? (
                <button
                  onClick={resetPlacement}
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-medium shadow-xl flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Flyt plakat
                </button>
              ) : (
                <button
                  onClick={placePoster}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium text-lg shadow-xl flex items-center gap-2"
                >
                  <Move className="w-5 h-5" />
                  Placer her
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
