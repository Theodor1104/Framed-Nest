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

// Real room photos from Unsplash with precise artwork placement
const rooms = [
  {
    id: 'living-sofa',
    name: 'Stue med sofa',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=90',
    // Artwork position and perspective
    artwork: {
      top: '8%',
      left: '35%',
      width: '18%',
      height: '28%',
      transform: 'perspective(1000px) rotateY(2deg)',
    },
  },
  {
    id: 'minimal-living',
    name: 'Minimalistisk stue',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=90',
    artwork: {
      top: '12%',
      left: '38%',
      width: '24%',
      height: '32%',
      transform: 'perspective(1000px) rotateY(0deg)',
    },
  },
  {
    id: 'bedroom',
    name: 'Soveværelse',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=90',
    artwork: {
      top: '10%',
      left: '50%',
      width: '20%',
      height: '30%',
      transform: 'perspective(1000px) rotateY(0deg) translateX(-50%)',
    },
  },
  {
    id: 'scandinavian',
    name: 'Skandinavisk indretning',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=90',
    artwork: {
      top: '5%',
      left: '28%',
      width: '22%',
      height: '35%',
      transform: 'perspective(1000px) rotateY(3deg)',
    },
  },
  {
    id: 'modern-living',
    name: 'Moderne stue',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1400&q=90',
    artwork: {
      top: '8%',
      left: '22%',
      width: '20%',
      height: '32%',
      transform: 'perspective(1000px) rotateY(5deg)',
    },
  },
  {
    id: 'cozy-corner',
    name: 'Hyggehjørne',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=90',
    artwork: {
      top: '6%',
      left: '50%',
      width: '26%',
      height: '38%',
      transform: 'perspective(1000px) rotateY(0deg) translateX(-50%)',
    },
  },
];

export default function RoomShowroom({ imageSrc, productTitle, isOpen, onClose, frameStyle = 'none' }: RoomShowroomProps) {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [roomImageLoaded, setRoomImageLoaded] = useState(false);

  const room = rooms[currentRoom];
  const hasFrame = frameStyle !== 'none';

  const nextRoom = () => {
    setRoomImageLoaded(false);
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setRoomImageLoaded(false);
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const goToRoom = (index: number) => {
    if (index !== currentRoom) {
      setRoomImageLoaded(false);
      setCurrentRoom(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevRoom();
      if (e.key === 'ArrowRight') nextRoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Frame styling
  const getFrameStyle = () => {
    if (!hasFrame) return {};
    const frameWidth = '4%';
    const colors = {
      black: { bg: '#1a1a1a', shadow: 'rgba(0,0,0,0.4)' },
      white: { bg: '#f5f5f5', shadow: 'rgba(0,0,0,0.15)' },
      oak: { bg: '#8B5A2B', shadow: 'rgba(0,0,0,0.3)' },
    };
    const color = colors[frameStyle as keyof typeof colors];
    return {
      border: `${frameWidth} solid ${color.bg}`,
      boxShadow: `0 4px 20px ${color.shadow}, inset 0 0 0 1px rgba(255,255,255,0.1)`,
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Se i dit hjem</h3>
            <p className="text-sm text-gray-500">{productTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Room Preview */}
        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
          {/* Room Image */}
          <img
            src={room.image}
            alt={room.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${roomImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setRoomImageLoaded(true)}
          />

          {/* Loading state */}
          {!roomImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          )}

          {/* Artwork overlay */}
          {roomImageLoaded && (
            <div
              className="absolute transition-all duration-300"
              style={{
                top: room.artwork.top,
                left: room.artwork.left,
                width: room.artwork.width,
                height: room.artwork.height,
                transform: room.artwork.transform,
              }}
            >
              {/* Shadow behind frame */}
              <div
                className="absolute -inset-1 bg-black/20 blur-md"
                style={{ transform: 'translateY(4px)' }}
              />

              {/* Frame + Artwork container */}
              <div
                className="relative w-full h-full bg-white"
                style={{
                  ...getFrameStyle(),
                  boxShadow: hasFrame
                    ? `0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)`
                    : `0 4px 16px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)`,
                }}
              >
                {/* Mat/Passepartout */}
                <div
                  className="absolute inset-0 bg-white"
                  style={{
                    padding: hasFrame ? '6%' : '4%',
                  }}
                >
                  {/* Artwork image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={productTitle}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>

                {/* Glass reflection effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, transparent 80%, rgba(255,255,255,0.05) 100%)',
                  }}
                />
              </div>
            </div>
          )}

          {/* Navigation arrows */}
          <button
            onClick={prevRoom}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextRoom}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Room indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {rooms.map((_, i) => (
              <button
                key={i}
                onClick={() => goToRoom(i)}
                className={`h-2 rounded-full transition-all ${
                  currentRoom === i ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Room selector */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-center gap-2 flex-wrap">
            {rooms.map((r, i) => (
              <button
                key={r.id}
                onClick={() => goToRoom(i)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  currentRoom === i
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
