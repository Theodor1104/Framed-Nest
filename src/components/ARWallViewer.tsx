'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Camera, ZoomIn, ZoomOut, Move, Smartphone } from 'lucide-react';
import Image from 'next/image';
import * as THREE from 'three';

interface ARWallViewerProps {
  imageSrc: string;
  productTitle: string;
  isOpen: boolean;
  onClose: () => void;
  frameStyle?: 'none' | 'black' | 'white' | 'oak';
}

type ARMode = 'checking' | 'webxr' | 'simple' | 'unsupported';

export default function ARWallViewer({ imageSrc, productTitle, isOpen, onClose, frameStyle = 'none' }: ARWallViewerProps) {
  const [arMode, setArMode] = useState<ARMode>('checking');
  const [sessionActive, setSessionActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);
  const [scale, setScale] = useState(1);
  const [wallDetected, setWallDetected] = useState(false);

  // Simple mode state
  const [simplePosition, setSimplePosition] = useState({ x: 50, y: 40 });
  const [simpleScale, setSimpleScale] = useState(0.4);
  const [isDragging, setIsDragging] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // WebXR refs
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const xrSessionRef = useRef<any>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const posterGroupRef = useRef<THREE.Group | null>(null);
  const reticleRef = useRef<THREE.Mesh | null>(null);
  const hitTestSourceRef = useRef<any>(null);
  const referenceSpaceRef = useRef<any>(null);

  const hasFrame = frameStyle !== 'none';

  // Check WebXR support
  useEffect(() => {
    const checkSupport = async () => {
      if (!isOpen) return;

      // Check for WebXR with required features
      if ('xr' in navigator) {
        try {
          const xr = (navigator as any).xr;
          const supported = await xr.isSessionSupported('immersive-ar');
          if (supported) {
            setArMode('webxr');
            return;
          }
        } catch (e) {
          console.log('WebXR check failed:', e);
        }
      }

      // Fallback to simple camera mode (widely supported)
      setArMode('simple');
    };

    checkSupport();
  }, [isOpen]);

  // Load texture for poster
  const loadTexture = useCallback((): Promise<THREE.Texture> => {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = 'anonymous';
      loader.load(imageSrc, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        resolve(tex);
      }, undefined, reject);
    });
  }, [imageSrc]);

  // Create 3D poster with frame
  const createPosterGroup = useCallback(async (): Promise<THREE.Group> => {
    const texture = await loadTexture();
    const group = new THREE.Group();

    // Poster dimensions (meters) - A2 size approximately
    const width = 0.42;
    const height = 0.594;
    const frameDepth = 0.025;
    const frameThickness = hasFrame ? 0.03 : 0;

    // Frame
    if (hasFrame) {
      const frameColor = frameStyle === 'oak' ? 0x8B5A2B : frameStyle === 'white' ? 0xF0F0F0 : 0x1A1A1A;
      const frameMat = new THREE.MeshStandardMaterial({ color: frameColor, roughness: 0.7 });

      const totalW = width + frameThickness * 2;
      const totalH = height + frameThickness * 2;

      // Frame pieces
      const topGeo = new THREE.BoxGeometry(totalW, frameThickness, frameDepth);
      const top = new THREE.Mesh(topGeo, frameMat);
      top.position.set(0, height / 2 + frameThickness / 2, 0);
      group.add(top);

      const bottomGeo = new THREE.BoxGeometry(totalW, frameThickness, frameDepth);
      const bottom = new THREE.Mesh(bottomGeo, frameMat);
      bottom.position.set(0, -height / 2 - frameThickness / 2, 0);
      group.add(bottom);

      const leftGeo = new THREE.BoxGeometry(frameThickness, height, frameDepth);
      const left = new THREE.Mesh(leftGeo, frameMat);
      left.position.set(-width / 2 - frameThickness / 2, 0, 0);
      group.add(left);

      const rightGeo = new THREE.BoxGeometry(frameThickness, height, frameDepth);
      const right = new THREE.Mesh(rightGeo, frameMat);
      right.position.set(width / 2 + frameThickness / 2, 0, 0);
      group.add(right);
    }

    // White mat
    const matGeo = new THREE.PlaneGeometry(width, height);
    const matMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const mat = new THREE.Mesh(matGeo, matMat);
    mat.position.z = 0.001;
    group.add(mat);

    // Artwork
    const artWidth = width * 0.85;
    const artHeight = height * 0.85;
    const artGeo = new THREE.PlaneGeometry(artWidth, artHeight);
    const artMat = new THREE.MeshStandardMaterial({ map: texture });
    const art = new THREE.Mesh(artGeo, artMat);
    art.position.z = 0.002;
    group.add(art);

    return group;
  }, [loadTexture, hasFrame, frameStyle]);

  // ========== WebXR Mode ==========
  const startWebXR = async () => {
    if (!canvasRef.current) return;

    try {
      setError(null);
      const xr = (navigator as any).xr;

      // Create Three.js renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      rendererRef.current = renderer;

      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambient);
      const directional = new THREE.DirectionalLight(0xffffff, 0.8);
      directional.position.set(1, 1, 1);
      scene.add(directional);

      // Create reticle (ring that shows where poster will be placed)
      const reticleGeo = new THREE.RingGeometry(0.08, 0.1, 32);
      reticleGeo.rotateX(-Math.PI / 2);
      const reticleMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8
      });
      const reticle = new THREE.Mesh(reticleGeo, reticleMat);
      reticle.visible = false;
      scene.add(reticle);
      reticleRef.current = reticle;

      // Create poster (hidden until placed)
      const posterGroup = await createPosterGroup();
      posterGroup.visible = false;
      scene.add(posterGroup);
      posterGroupRef.current = posterGroup;

      // Request XR session
      const session = await xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['plane-detection', 'dom-overlay'],
        domOverlay: containerRef.current ? { root: containerRef.current } : undefined,
      });
      xrSessionRef.current = session;

      await renderer.xr.setSession(session);

      // Get reference spaces
      const refSpace = await session.requestReferenceSpace('local-floor');
      referenceSpaceRef.current = refSpace;

      const viewerSpace = await session.requestReferenceSpace('viewer');
      const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
      hitTestSourceRef.current = hitTestSource;

      setSessionActive(true);

      // Camera
      const camera = new THREE.PerspectiveCamera();

      // Animation loop
      const onFrame = (time: number, frame: any) => {
        session.requestAnimationFrame(onFrame);

        const pose = frame.getViewerPose(refSpace);
        if (!pose) return;

        // Update camera
        const view = pose.views[0];
        camera.matrix.fromArray(view.transform.matrix);
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.updateMatrixWorld(true);

        // Hit testing - find surfaces
        if (hitTestSourceRef.current && reticleRef.current && !placed) {
          const results = frame.getHitTestResults(hitTestSourceRef.current);

          if (results.length > 0) {
            const hit = results[0];
            const hitPose = hit.getPose(refSpace);

            if (hitPose) {
              reticleRef.current.visible = true;
              reticleRef.current.matrix.fromArray(hitPose.transform.matrix);
              reticleRef.current.matrix.decompose(
                reticleRef.current.position,
                reticleRef.current.quaternion,
                reticleRef.current.scale
              );
              setWallDetected(true);
            }
          } else {
            reticleRef.current.visible = false;
            setWallDetected(false);
          }
        }

        renderer.render(scene, camera);
      };

      session.requestAnimationFrame(onFrame);

      // Handle session end
      session.addEventListener('end', () => {
        setSessionActive(false);
        setPlaced(false);
        setWallDetected(false);
        xrSessionRef.current = null;
      });

    } catch (err: any) {
      console.error('WebXR error:', err);
      setError(err.message || 'Kunne ikke starte AR');
      // Fall back to simple mode
      setArMode('simple');
    }
  };

  // Place poster on detected surface
  const placeOnWall = () => {
    if (!reticleRef.current || !posterGroupRef.current || !reticleRef.current.visible) return;

    const reticle = reticleRef.current;
    const poster = posterGroupRef.current;

    // Position poster at reticle, raised up to be on wall
    poster.position.copy(reticle.position);
    poster.position.y += 0.9; // Raise to wall height

    // Make poster face the viewer (rotate to stand upright)
    poster.quaternion.copy(reticle.quaternion);
    poster.rotateX(Math.PI / 2);

    poster.scale.setScalar(scale);
    poster.visible = true;
    reticle.visible = false;

    setPlaced(true);
  };

  const resetPlacement = () => {
    if (posterGroupRef.current && reticleRef.current) {
      posterGroupRef.current.visible = false;
      setPlaced(false);
    }
  };

  const adjustWebXRScale = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
    if (posterGroupRef.current && placed) {
      posterGroupRef.current.scale.setScalar(newScale);
    }
  };

  const endWebXR = async () => {
    if (xrSessionRef.current) {
      await xrSessionRef.current.end();
    }
    onClose();
  };

  // ========== Simple Camera Mode ==========
  const startSimpleCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setSessionActive(true);
      }
    } catch (err) {
      setError('Kunne ikke starte kamera. Giv venligst tilladelse.');
    }
  };

  const stopSimpleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setSessionActive(false);
  };

  // Simple mode drag handlers
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rect = containerRef.current.getBoundingClientRect();
    setSimplePosition({
      x: Math.max(10, Math.min(90, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(10, Math.min(90, ((clientY - rect.top) / rect.height) * 100)),
    });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Cleanup
  useEffect(() => {
    if (!isOpen) {
      stopSimpleCamera();
      if (xrSessionRef.current) {
        xrSessionRef.current.end();
      }
      setArMode('checking');
      setSessionActive(false);
      setPlaced(false);
      setSimplePosition({ x: 50, y: 40 });
      setSimpleScale(0.4);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Unsupported
  if (arMode === 'unsupported') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95" onClick={onClose}>
        <div className="bg-white rounded-xl p-6 max-w-md text-center" onClick={e => e.stopPropagation()}>
          <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Ikke understøttet</h3>
          <p className="text-gray-600 mb-4">Din enhed understøtter ikke kamera-adgang.</p>
          <button onClick={onClose} className="px-6 py-2 bg-gray-900 text-white rounded-lg">Luk</button>
        </div>
      </div>
    );
  }

  // Loading
  if (arMode === 'checking') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p>Tjekker AR-understøttelse...</p>
        </div>
      </div>
    );
  }

  // ========== WebXR UI ==========
  if (arMode === 'webxr') {
    return (
      <div ref={containerRef} className="fixed inset-0 z-50 bg-black">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Overlay UI */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-auto bg-gradient-to-b from-black/70 to-transparent">
            <div className="text-white">
              <h3 className="font-medium text-lg">{productTitle}</h3>
              <p className="text-sm text-white/80">
                {!sessionActive ? 'Tryk start for at begynde' :
                 placed ? 'Plakat placeret!' :
                 wallDetected ? 'Overflade fundet! Tryk for at placere' :
                 'Peg kameraet på en væg...'}
              </p>
            </div>
            <button onClick={endWebXR} className="p-2 bg-white/20 backdrop-blur rounded-full">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="absolute top-24 left-4 right-4 bg-red-500 text-white p-4 rounded-xl text-center pointer-events-auto">
              {error}
            </div>
          )}

          {/* Start button */}
          {!sessionActive && !error && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <button onClick={startWebXR} className="px-8 py-4 bg-white text-black rounded-xl font-medium text-lg flex items-center gap-3">
                <Camera className="w-6 h-6" />
                Start AR Kamera
              </button>
            </div>
          )}

          {/* Controls */}
          {sessionActive && (
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto">
              {/* Wall detection indicator */}
              {!placed && (
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  wallDetected ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                }`}>
                  {wallDetected ? '✓ Overflade fundet' : '○ Søger efter overflade...'}
                </div>
              )}

              {/* Scale controls when placed */}
              {placed && (
                <div className="flex items-center gap-4 bg-white/90 backdrop-blur rounded-full px-6 py-3">
                  <button onClick={() => adjustWebXRScale(-0.1)} className="p-2">
                    <ZoomOut className="w-6 h-6" />
                  </button>
                  <span className="min-w-[60px] text-center font-medium">{Math.round(scale * 100)}%</span>
                  <button onClick={() => adjustWebXRScale(0.1)} className="p-2">
                    <ZoomIn className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Action button */}
              {placed ? (
                <button onClick={resetPlacement} className="px-6 py-3 bg-white text-black rounded-xl font-medium flex items-center gap-2">
                  <Move className="w-5 h-5" /> Flyt plakat
                </button>
              ) : wallDetected ? (
                <button onClick={placeOnWall} className="px-8 py-4 bg-white text-black rounded-xl font-medium text-lg">
                  Placer på væg
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ========== Simple Camera UI ==========
  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black">
      <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

      {/* Poster overlay */}
      {sessionActive && (
        <div
          className="absolute cursor-move touch-none select-none"
          style={{
            left: `${simplePosition.x}%`,
            top: `${simplePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${simpleScale * 100}%`,
            maxWidth: '80%',
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {hasFrame && (
            <div className="absolute -inset-[6%] rounded-sm" style={{
              background: frameStyle === 'oak' ? 'linear-gradient(145deg, #C4956A 0%, #8B5A2B 50%, #6B4423 100%)'
                : frameStyle === 'white' ? 'linear-gradient(145deg, #FFF 0%, #F0F0F0 50%, #E5E5E5 100%)'
                : 'linear-gradient(145deg, #3D3D3D 0%, #1A1A1A 50%, #0D0D0D 100%)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }} />
          )}
          <div className="relative bg-white aspect-[3/4]" style={{ boxShadow: hasFrame ? 'none' : '0 10px 40px rgba(0,0,0,0.5)' }}>
            <div className="absolute inset-[6%]">
              <Image src={imageSrc} alt={productTitle} fill className="object-cover pointer-events-none" sizes="50vw" draggable={false} />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`p-3 rounded-full bg-black/50 transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`}>
              <Move className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* UI */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-auto bg-gradient-to-b from-black/70 to-transparent">
          <div className="text-white">
            <h3 className="font-medium text-lg">{productTitle}</h3>
            <p className="text-sm text-white/80">{sessionActive ? 'Træk billedet til din væg' : 'Tryk for at starte kamera'}</p>
            <p className="text-xs text-yellow-400 mt-1">Simpel tilstand (din enhed understøtter ikke fuld AR)</p>
          </div>
          <button onClick={() => { stopSimpleCamera(); onClose(); }} className="p-2 bg-white/20 backdrop-blur rounded-full">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {error && (
          <div className="absolute top-28 left-4 right-4 bg-red-500 text-white p-4 rounded-xl text-center pointer-events-auto">
            {error}
          </div>
        )}

        {!sessionActive && !error && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/80">
            <button onClick={startSimpleCamera} className="px-8 py-4 bg-white text-black rounded-xl font-medium text-lg flex items-center gap-3">
              <Camera className="w-6 h-6" />
              Start Kamera
            </button>
          </div>
        )}

        {sessionActive && (
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto">
            <div className="bg-black/50 backdrop-blur rounded-full px-4 py-2 text-white text-sm">
              Træk billedet • Brug +/- for størrelse
            </div>
            <div className="flex items-center gap-4 bg-white/95 backdrop-blur rounded-full px-6 py-3 shadow-xl">
              <button onClick={() => setSimpleScale(s => Math.max(0.2, s - 0.05))} className="p-2 hover:bg-gray-100 rounded-full">
                <ZoomOut className="w-6 h-6 text-gray-700" />
              </button>
              <span className="text-gray-700 font-medium min-w-[50px] text-center">{Math.round(simpleScale * 250)}%</span>
              <button onClick={() => setSimpleScale(s => Math.min(0.8, s + 0.05))} className="p-2 hover:bg-gray-100 rounded-full">
                <ZoomIn className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
