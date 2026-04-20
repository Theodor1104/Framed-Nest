'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Camera, ZoomIn, ZoomOut, Move } from 'lucide-react';
import Image from 'next/image';

interface ARWallViewerProps {
  imageSrc: string;
  productTitle: string;
  isOpen: boolean;
  onClose: () => void;
  frameStyle?: 'none' | 'black' | 'white' | 'oak';
}

export default function ARWallViewer({ imageSrc, productTitle, isOpen, onClose, frameStyle = 'none' }: ARWallViewerProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(0.4);
  const [position, setPosition] = useState({ x: 50, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasFrame = frameStyle !== 'none';

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Back camera
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Kunne ikke starte kamera. Giv venligst kamera-tilladelse.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setPosition({ x: 50, y: 40 });
      setScale(0.4);
    }
  }, [isOpen, stopCamera]);

  // Handle touch/mouse drag
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleDragMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global event listeners for drag
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

  // Scale controls
  const adjustScale = (delta: number) => {
    setScale(prev => Math.max(0.2, Math.min(0.8, prev + delta)));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Camera video feed */}
      <div ref={containerRef} className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Poster overlay - only show when camera is active */}
        {cameraActive && (
          <div
            className="absolute cursor-move touch-none select-none"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
              width: `${scale * 100}%`,
              maxWidth: '80%',
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {/* Frame */}
            {hasFrame && (
              <div
                className="absolute -inset-[6%] rounded-sm"
                style={{
                  background: frameStyle === 'oak'
                    ? 'linear-gradient(145deg, #C4956A 0%, #8B5A2B 50%, #6B4423 100%)'
                    : frameStyle === 'white'
                    ? 'linear-gradient(145deg, #FFFFFF 0%, #F0F0F0 50%, #E5E5E5 100%)'
                    : 'linear-gradient(145deg, #3D3D3D 0%, #1A1A1A 50%, #0D0D0D 100%)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                }}
              />
            )}

            {/* White mat/passepartout */}
            <div
              className="relative bg-white aspect-[3/4]"
              style={{
                boxShadow: hasFrame ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : '0 10px 40px rgba(0,0,0,0.4)',
              }}
            >
              {/* The actual artwork */}
              <div className="absolute inset-[6%]">
                <Image
                  src={imageSrc}
                  alt={productTitle}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="50vw"
                  draggable={false}
                />
              </div>
            </div>

            {/* Drag indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`p-3 rounded-full bg-black/50 backdrop-blur-sm transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`}>
                <Move className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/60 to-transparent">
            <div className="text-white">
              <h3 className="font-medium text-lg">{productTitle}</h3>
              <p className="text-sm text-white/80">
                {!cameraActive ? 'Tryk for at åbne kameraet' : 'Træk billedet til din væg'}
              </p>
            </div>
            <button
              onClick={() => { stopCamera(); onClose(); }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="absolute top-24 left-4 right-4 bg-red-500/90 text-white p-4 rounded-xl text-center pointer-events-auto">
              {error}
              <button
                onClick={() => setError(null)}
                className="block w-full mt-2 text-sm underline"
              >
                Luk
              </button>
            </div>
          )}

          {/* Start button - shown when camera is not active */}
          {!cameraActive && !error && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/80">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-white text-xl font-medium mb-2">Se plakaten i dit rum</h3>
                <p className="text-white/70 mb-6 max-w-xs mx-auto">
                  Brug dit kamera til at se hvordan plakaten vil se ud på din væg
                </p>
                <button
                  onClick={startCamera}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium text-lg shadow-xl hover:bg-gray-100 transition-colors flex items-center gap-3 mx-auto"
                >
                  <Camera className="w-6 h-6" />
                  Start Kamera
                </button>
              </div>
            </div>
          )}

          {/* Controls when camera is active */}
          {cameraActive && (
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto">
              {/* Instructions */}
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                Træk billedet • Brug knapperne for at ændre størrelse
              </div>

              {/* Scale controls */}
              <div className="flex items-center gap-4 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
                <button
                  onClick={() => adjustScale(-0.05)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Mindre"
                >
                  <ZoomOut className="w-6 h-6 text-gray-700" />
                </button>

                <span className="text-gray-700 font-medium min-w-[50px] text-center">
                  {Math.round(scale * 250)}%
                </span>

                <button
                  onClick={() => adjustScale(0.05)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Større"
                >
                  <ZoomIn className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
