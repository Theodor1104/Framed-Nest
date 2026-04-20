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

// Clean wall scenes with consistent poster placement
const scenes = [
  {
    id: 'white-minimal',
    name: 'Hvid væg',
    wallColor: '#FAFAFA',
    wallTexture: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
    floorColor: '#E8E0D8',
    floorType: 'wood-light',
    lighting: 'soft',
    accent: null,
  },
  {
    id: 'warm-beige',
    name: 'Varm beige',
    wallColor: '#F5F0EA',
    wallTexture: 'linear-gradient(180deg, #FAF7F2 0%, #EDE8E0 100%)',
    floorColor: '#8B7355',
    floorType: 'wood-dark',
    lighting: 'warm',
    accent: 'plant-right',
  },
  {
    id: 'sage-green',
    name: 'Salvie grøn',
    wallColor: '#D4DDD4',
    wallTexture: 'linear-gradient(180deg, #DDE5DD 0%, #C8D4C8 100%)',
    floorColor: '#C4B8A8',
    floorType: 'wood-natural',
    lighting: 'natural',
    accent: 'plant-left',
  },
  {
    id: 'dark-charcoal',
    name: 'Mørk væg',
    wallColor: '#3D3D3D',
    wallTexture: 'linear-gradient(180deg, #454545 0%, #353535 100%)',
    floorColor: '#2D2D2D',
    floorType: 'dark',
    lighting: 'dramatic',
    accent: null,
  },
  {
    id: 'soft-pink',
    name: 'Blød rosa',
    wallColor: '#F5E6E0',
    wallTexture: 'linear-gradient(180deg, #FAF0EC 0%, #EED8D0 100%)',
    floorColor: '#D4C4B8',
    floorType: 'wood-light',
    lighting: 'soft',
    accent: 'vase-right',
  },
  {
    id: 'navy-blue',
    name: 'Navy blå',
    wallColor: '#2C3E50',
    wallTexture: 'linear-gradient(180deg, #34495E 0%, #2C3E50 100%)',
    floorColor: '#8B7355',
    floorType: 'wood-dark',
    lighting: 'moody',
    accent: 'books-left',
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

  const isDark = scene.lighting === 'dramatic' || scene.lighting === 'moody';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Se på din væg</h3>
            <p className="text-sm text-gray-500">{productTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scene */}
        <div
          className="relative aspect-[16/10] overflow-hidden transition-all duration-500"
          style={{ background: scene.wallTexture }}
        >
          {/* Wall texture overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Lighting effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: scene.lighting === 'warm'
                ? 'radial-gradient(ellipse at 30% 20%, rgba(255,240,200,0.3) 0%, transparent 60%)'
                : scene.lighting === 'dramatic'
                ? 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)'
                : scene.lighting === 'moody'
                ? 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.2) 0%, transparent 50%)'
                : 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)',
            }}
          />

          {/* Floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[25%]"
            style={{
              background: scene.floorType === 'wood-light'
                ? `linear-gradient(180deg, ${scene.floorColor} 0%, ${scene.floorColor}dd 100%)`
                : scene.floorType === 'wood-dark'
                ? `linear-gradient(180deg, ${scene.floorColor} 0%, ${scene.floorColor}cc 100%)`
                : `linear-gradient(180deg, ${scene.floorColor} 0%, ${scene.floorColor}ee 100%)`,
            }}
          >
            {/* Wood grain texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 80px)`,
              }}
            />
          </div>

          {/* Shadow on floor from poster */}
          <div
            className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[25%] h-[8%]"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
              transform: 'translateX(-50%) scaleY(0.3)',
            }}
          />

          {/* THE POSTER */}
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[22%] aspect-[3/4]">
            {/* Wall shadow behind frame */}
            <div
              className="absolute inset-0 translate-x-2 translate-y-3"
              style={{
                background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)',
                filter: 'blur(12px)',
              }}
            />

            {/* Frame */}
            {hasFrame && (
              <div
                className="absolute -inset-[4%]"
                style={{
                  background: frameStyle === 'oak'
                    ? 'linear-gradient(135deg, #A67C52 0%, #8B5A2B 50%, #6B4423 100%)'
                    : frameStyle === 'white'
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 50%, #E5E5E5 100%)'
                    : 'linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 50%, #0D0D0D 100%)',
                  boxShadow: isDark
                    ? '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              />
            )}

            {/* Passepartout / Mat */}
            <div
              className="absolute inset-0 bg-white"
              style={{
                boxShadow: hasFrame ? 'none' : (isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.15)'),
              }}
            />

            {/* Artwork */}
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

            {/* Glass reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 40%)',
              }}
            />
          </div>

          {/* Accent elements */}
          {scene.accent === 'plant-right' && (
            <div className="absolute bottom-[25%] right-[15%] w-[8%] aspect-[1/1.5]">
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[30%] bg-[#8B7355] rounded-t-sm" />
              <div className="absolute top-0 left-0 right-0 h-[75%] bg-[#6B8E6B] rounded-full" />
            </div>
          )}

          {scene.accent === 'plant-left' && (
            <div className="absolute bottom-[25%] left-[12%] w-[10%] aspect-[1/1.8]">
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[25%] bg-[#C4A484] rounded-t-sm" />
              <div className="absolute top-0 left-[10%] right-[10%] h-[80%] bg-[#5D7A5D] rounded-full" />
            </div>
          )}

          {scene.accent === 'vase-right' && (
            <div className="absolute bottom-[25%] right-[18%] w-[4%] aspect-[1/2]">
              <div className="absolute bottom-0 left-0 right-0 h-full bg-[#E8D4C8] rounded-t-full rounded-b-lg" />
              <div className="absolute top-[10%] left-[20%] right-[20%] h-[30%] bg-[#7A8B6E]" />
            </div>
          )}

          {scene.accent === 'books-left' && (
            <div className="absolute bottom-[25%] left-[15%] flex gap-[2px]">
              <div className="w-[1.5%] aspect-[1/4] bg-[#C4A484]" />
              <div className="w-[1.2%] aspect-[1/3.5] bg-[#8B7355]" />
              <div className="w-[1.8%] aspect-[1/4.5] bg-[#D4C4B0]" />
            </div>
          )}

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevScene(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextScene(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 flex gap-2">
            {scenes.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentScene(i); }}
                className={`h-1.5 rounded-full transition-all ${
                  currentScene === i
                    ? (isDark ? 'bg-white w-6' : 'bg-gray-800 w-6')
                    : (isDark ? 'bg-white/40 w-1.5' : 'bg-gray-400/50 w-1.5')
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
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
