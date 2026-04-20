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

// Simple wall-focused scenes - minimal backgrounds where the wall is the main element
// This makes artwork placement natural and realistic
const scenes = [
  {
    id: 'white-minimal',
    name: 'Hvid væg',
    // Pure white/light gray wall - the artwork becomes the focus
    wallColor: '#F8F8F8',
    wallGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 60%, #E8E8E8 100%)',
    floorColor: '#DED4C8',
    floorGradient: 'linear-gradient(180deg, #C8BEB2 0%, #DED4C8 20%, #E8DED4 100%)',
    ambientLight: 'rgba(255,255,255,0.3)',
    shadowIntensity: 0.15,
    isDark: false,
  },
  {
    id: 'warm-beige',
    name: 'Varm beige',
    wallColor: '#F5EDE5',
    wallGradient: 'linear-gradient(180deg, #FAF5F0 0%, #F0E8E0 60%, #E8DED4 100%)',
    floorColor: '#8B7355',
    floorGradient: 'linear-gradient(180deg, #7A6548 0%, #8B7355 20%, #9A8262 100%)',
    ambientLight: 'rgba(255,245,235,0.2)',
    shadowIntensity: 0.18,
    isDark: false,
  },
  {
    id: 'soft-gray',
    name: 'Blød grå',
    wallColor: '#E8E8E8',
    wallGradient: 'linear-gradient(180deg, #F0F0F0 0%, #E5E5E5 60%, #DCDCDC 100%)',
    floorColor: '#A89888',
    floorGradient: 'linear-gradient(180deg, #988878 0%, #A89888 20%, #B8A898 100%)',
    ambientLight: 'rgba(240,240,245,0.2)',
    shadowIntensity: 0.12,
    isDark: false,
  },
  {
    id: 'sage-green',
    name: 'Salvie grøn',
    wallColor: '#D8E0D8',
    wallGradient: 'linear-gradient(180deg, #E5EBE5 0%, #D5DDD5 60%, #C8D4C8 100%)',
    floorColor: '#B8A898',
    floorGradient: 'linear-gradient(180deg, #A89888 0%, #B8A898 20%, #C8B8A8 100%)',
    ambientLight: 'rgba(220,235,220,0.2)',
    shadowIntensity: 0.15,
    isDark: false,
  },
  {
    id: 'charcoal',
    name: 'Mørk antracit',
    wallColor: '#3A3A3A',
    wallGradient: 'linear-gradient(180deg, #454545 0%, #383838 60%, #2D2D2D 100%)',
    floorColor: '#2A2A2A',
    floorGradient: 'linear-gradient(180deg, #252525 0%, #2A2A2A 20%, #303030 100%)',
    ambientLight: 'rgba(60,60,60,0.3)',
    shadowIntensity: 0.4,
    isDark: true,
  },
  {
    id: 'navy',
    name: 'Navy blå',
    wallColor: '#2C3E50',
    wallGradient: 'linear-gradient(180deg, #34495E 0%, #2C3E50 60%, #253545 100%)',
    floorColor: '#6B5A4A',
    floorGradient: 'linear-gradient(180deg, #5A4A3A 0%, #6B5A4A 20%, #7A6A5A 100%)',
    ambientLight: 'rgba(50,70,90,0.2)',
    shadowIntensity: 0.35,
    isDark: true,
  },
];

export default function RoomShowroom({ imageSrc, productTitle, isOpen, onClose, frameStyle = 'none' }: RoomShowroomProps) {
  const [currentScene, setCurrentScene] = useState(0);

  const scene = scenes[currentScene];
  const hasFrame = frameStyle !== 'none';

  const nextScene = () => setCurrentScene((prev) => (prev + 1) % scenes.length);
  const prevScene = () => setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length);

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

  if (!isOpen) return null;

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

        {/* Scene - Clean minimalist room visualization */}
        <div
          className="relative aspect-[16/10] overflow-hidden transition-all duration-700"
          style={{ background: scene.wallGradient }}
        >
          {/* Subtle wall texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Ambient lighting from top-left */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 50% at 25% 10%, ${scene.ambientLight} 0%, transparent 70%)`,
            }}
          />

          {/* Floor with wood texture effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[22%]"
            style={{ background: scene.floorGradient }}
          >
            {/* Wood grain lines */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg,
                    transparent 0px, transparent 60px,
                    rgba(0,0,0,0.15) 60px, rgba(0,0,0,0.15) 61px,
                    transparent 61px, transparent 120px
                  )
                `,
              }}
            />
            {/* Subtle highlight at floor edge */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: scene.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)' }}
            />
          </div>

          {/* Simple furniture silhouette - low credenza/console */}
          <div
            className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[35%] h-[8%]"
            style={{
              background: scene.isDark
                ? 'linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)'
                : 'linear-gradient(180deg, #4A4540 0%, #3A3530 100%)',
              borderRadius: '2px 2px 0 0',
            }}
          >
            {/* Credenza legs */}
            <div
              className="absolute -bottom-[15%] left-[5%] w-[3%] h-[20%]"
              style={{ background: scene.isDark ? '#151515' : '#3A3530' }}
            />
            <div
              className="absolute -bottom-[15%] right-[5%] w-[3%] h-[20%]"
              style={{ background: scene.isDark ? '#151515' : '#3A3530' }}
            />
          </div>

          {/* Decorative plant on credenza */}
          <div className="absolute bottom-[30%] left-[58%] w-[4%] aspect-[1/1.2]">
            <div
              className="absolute bottom-0 left-1/4 right-1/4 h-[35%] rounded-t-sm"
              style={{ background: scene.isDark ? '#2A2520' : '#C4A484' }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[70%] rounded-full"
              style={{ background: scene.isDark ? '#3D4A3D' : '#6B8B6B' }}
            />
          </div>

          {/* THE ARTWORK - centered above credenza */}
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[20%] aspect-[3/4]">
            {/* Wall shadow behind frame - soft and realistic */}
            <div
              className="absolute inset-0"
              style={{
                background: `rgba(0,0,0,${scene.shadowIntensity})`,
                filter: 'blur(25px)',
                transform: 'translate(4%, 5%) scale(1.05)',
              }}
            />

            {/* Frame (if selected) */}
            {hasFrame && (
              <div
                className="absolute -inset-[5%]"
                style={{
                  background: frameStyle === 'oak'
                    ? 'linear-gradient(145deg, #C4956A 0%, #8B5A2B 25%, #6B4423 50%, #8B5A2B 75%, #A67C52 100%)'
                    : frameStyle === 'white'
                    ? 'linear-gradient(145deg, #FFFFFF 0%, #F8F8F8 25%, #ECECEC 50%, #F8F8F8 75%, #FFFFFF 100%)'
                    : 'linear-gradient(145deg, #3D3D3D 0%, #252525 25%, #151515 50%, #252525 75%, #3D3D3D 100%)',
                  boxShadow: scene.isDark
                    ? '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              />
            )}

            {/* White passepartout/mat */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 50%, #F5F5F5 100%)',
                boxShadow: hasFrame
                  ? 'inset 0 1px 3px rgba(0,0,0,0.08)'
                  : scene.isDark
                  ? '0 8px 40px rgba(0,0,0,0.5)'
                  : '0 8px 40px rgba(0,0,0,0.2)',
              }}
            />

            {/* The actual artwork */}
            <div className="absolute inset-[8%] overflow-hidden bg-gray-100">
              <Image
                src={imageSrc}
                alt={productTitle}
                fill
                className="object-cover"
                sizes="400px"
                priority
              />
            </div>

            {/* Glass reflection effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.02) 100%)',
              }}
            />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevScene(); }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-105 ${
              scene.isDark
                ? 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                : 'bg-white/90 hover:bg-white'
            }`}
          >
            <ChevronLeft className={`w-5 h-5 ${scene.isDark ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextScene(); }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-105 ${
              scene.isDark
                ? 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                : 'bg-white/90 hover:bg-white'
            }`}
          >
            <ChevronRight className={`w-5 h-5 ${scene.isDark ? 'text-white' : 'text-gray-700'}`} />
          </button>

          {/* Scene indicators */}
          <div className={`absolute bottom-[25%] left-1/2 -translate-x-1/2 flex gap-2 rounded-full px-3 py-2 ${
            scene.isDark ? 'bg-white/10' : 'bg-black/10'
          } backdrop-blur-sm`}>
            {scenes.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentScene(i); }}
                className={`rounded-full transition-all ${
                  currentScene === i
                    ? `${scene.isDark ? 'bg-white' : 'bg-gray-800'} w-6 h-2`
                    : `${scene.isDark ? 'bg-white/40' : 'bg-gray-400/50'} w-2 h-2 hover:opacity-80`
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
                className={`px-4 py-2 text-sm rounded-full transition-all flex items-center gap-2 ${
                  currentScene === i
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: s.wallColor }}
                />
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
