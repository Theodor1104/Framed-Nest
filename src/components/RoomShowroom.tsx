'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface RoomShowroomProps {
  imageSrc: string;
  productTitle: string;
  isOpen: boolean;
  onClose: () => void;
  frameStyle?: 'none' | 'black' | 'white' | 'oak';
}

// Professional mockup scenes - each with specific artwork placement coordinates
// Using high-quality Unsplash room images with precisely defined frame areas
const scenes = [
  {
    id: 'modern-living',
    name: 'Moderne stue',
    // Light living room with sofa - artwork centered above
    backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=90',
    // Frame position as percentage of image dimensions
    frame: { top: 8, left: 35, width: 30, height: 38 },
    shadowColor: 'rgba(0,0,0,0.15)',
    wallTone: 'light',
  },
  {
    id: 'minimalist-white',
    name: 'Hvid minimalistisk',
    // Clean white wall with minimal furniture
    backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=90',
    frame: { top: 12, left: 32, width: 36, height: 45 },
    shadowColor: 'rgba(0,0,0,0.12)',
    wallTone: 'light',
  },
  {
    id: 'scandinavian',
    name: 'Skandinavisk',
    // Scandinavian style room with light wood
    backgroundImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=90',
    frame: { top: 10, left: 28, width: 28, height: 36 },
    shadowColor: 'rgba(0,0,0,0.18)',
    wallTone: 'light',
  },
  {
    id: 'cozy-bedroom',
    name: 'Hyggeligt soveværelse',
    // Bedroom with neutral tones
    backgroundImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=90',
    frame: { top: 8, left: 38, width: 24, height: 32 },
    shadowColor: 'rgba(0,0,0,0.2)',
    wallTone: 'light',
  },
  {
    id: 'dark-elegant',
    name: 'Mørk elegant',
    // Dark moody room
    backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90',
    frame: { top: 15, left: 30, width: 32, height: 40 },
    shadowColor: 'rgba(0,0,0,0.35)',
    wallTone: 'dark',
  },
  {
    id: 'warm-living',
    name: 'Varm atmosfære',
    // Warm toned living space
    backgroundImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=90',
    frame: { top: 6, left: 34, width: 32, height: 40 },
    shadowColor: 'rgba(0,0,0,0.15)',
    wallTone: 'light',
  },
];

export default function RoomShowroom({ imageSrc, productTitle, isOpen, onClose, frameStyle = 'none' }: RoomShowroomProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const scene = scenes[currentScene];
  const hasFrame = frameStyle !== 'none';

  const nextScene = () => {
    setImageLoaded(false);
    setCurrentScene((prev) => (prev + 1) % scenes.length);
  };
  const prevScene = () => {
    setImageLoaded(false);
    setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevScene();
      if (e.key === 'ArrowRight') nextScene();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset loaded state when scene changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentScene]);

  if (!isOpen) return null;

  const isDark = scene.wallTone === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95" onClick={onClose}>
      <div
        className="relative w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Se på din væg</h3>
            <p className="text-sm text-gray-500">{productTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scene - Real Room Photo with Artwork Overlay */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {/* Room background image */}
          <Image
            src={scene.backgroundImage}
            alt={scene.name}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* THE ARTWORK - positioned based on scene coordinates */}
          <div
            className="absolute transition-all duration-500"
            style={{
              top: `${scene.frame.top}%`,
              left: `${scene.frame.left}%`,
              width: `${scene.frame.width}%`,
              height: `${scene.frame.height}%`,
            }}
          >
            {/* Shadow behind the frame on the wall */}
            <div
              className="absolute inset-0 translate-x-[3%] translate-y-[4%]"
              style={{
                background: scene.shadowColor,
                filter: 'blur(20px)',
                transform: 'translate(3%, 4%) scale(1.02)',
              }}
            />

            {/* Frame (if selected) */}
            {hasFrame && (
              <div
                className="absolute -inset-[3%] rounded-sm"
                style={{
                  background: frameStyle === 'oak'
                    ? 'linear-gradient(145deg, #C4956A 0%, #8B5A2B 30%, #6B4423 70%, #8B5A2B 100%)'
                    : frameStyle === 'white'
                    ? 'linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 30%, #E8E8E8 70%, #F5F5F5 100%)'
                    : 'linear-gradient(145deg, #3D3D3D 0%, #1A1A1A 30%, #0A0A0A 70%, #1A1A1A 100%)',
                  boxShadow: `
                    0 8px 32px ${scene.shadowColor},
                    inset 0 1px 0 ${frameStyle === 'black' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)'},
                    inset 0 -1px 0 rgba(0,0,0,0.1)
                  `,
                }}
              />
            )}

            {/* White mat/passepartout */}
            <div
              className="absolute inset-0 bg-white"
              style={{
                boxShadow: hasFrame
                  ? 'inset 0 0 0 1px rgba(0,0,0,0.05)'
                  : `0 8px 32px ${scene.shadowColor}`,
              }}
            />

            {/* The actual artwork */}
            <div className="absolute inset-[6%] overflow-hidden bg-gray-50">
              <Image
                src={imageSrc}
                alt={productTitle}
                fill
                className="object-cover"
                sizes="500px"
                priority
              />
            </div>

            {/* Subtle glass reflection effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.02) 100%)',
              }}
            />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevScene(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/95 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextScene(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/95 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scene indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
            {scenes.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentScene(i); }}
                className={`rounded-full transition-all ${
                  currentScene === i
                    ? 'bg-white w-6 h-2'
                    : 'bg-white/50 w-2 h-2 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scene selector */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-center gap-2 flex-wrap">
            {scenes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentScene(i)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  currentScene === i
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
