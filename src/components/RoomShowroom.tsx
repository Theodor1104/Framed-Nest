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

interface RoomConfig {
  id: string;
  name: string;
  description: string;
  wallColor: string;
  wallGradient?: string;
  floorColor: string;
  floorGradient?: string;
  ambientLight: string;
  framePosition: {
    top: string;
    left: string;
    width: string;
    height: string;
    transform?: string;
  };
  furniture: FurnitureElement[];
  decor?: DecorElement[];
}

interface FurnitureElement {
  type: 'sofa' | 'bed' | 'desk' | 'chair' | 'table' | 'console' | 'armchair' | 'sideboard';
  position: { bottom: string; left?: string; right?: string; width: string; height: string };
  color: string;
  secondaryColor?: string;
}

interface DecorElement {
  type: 'plant' | 'vase' | 'books' | 'lamp' | 'rug';
  position: { top?: string; bottom?: string; left?: string; right?: string; width: string; height: string };
  color: string;
}

const rooms: RoomConfig[] = [
  {
    id: 'scandinavian-living',
    name: 'Skandinavisk Stue',
    description: 'Lys stue med boucle sofa og naturligt lys',
    wallColor: '#F8F6F3',
    wallGradient: 'linear-gradient(180deg, #FDFCFA 0%, #F5F3EF 60%, #EBE8E3 100%)',
    floorColor: '#E8DFD4',
    floorGradient: 'linear-gradient(180deg, #D4C8BC 0%, #C9BDB0 100%)',
    ambientLight: 'radial-gradient(ellipse at 30% 20%, rgba(255,250,240,0.4) 0%, transparent 50%)',
    framePosition: { top: '8%', left: '50%', width: '28%', height: '42%', transform: 'translateX(-50%)' },
    furniture: [
      { type: 'sofa', position: { bottom: '18%', left: '15%', width: '70%', height: '22%' }, color: '#E8E4DF', secondaryColor: '#D4CFC8' },
    ],
    decor: [
      { type: 'plant', position: { bottom: '18%', right: '8%', width: '12%', height: '28%' }, color: '#7A8B6E' },
      { type: 'lamp', position: { bottom: '40%', left: '5%', width: '6%', height: '20%' }, color: '#2D2D2D' },
    ],
  },
  {
    id: 'luxury-bedroom',
    name: 'Soveværelse',
    description: 'Elegant soveværelse med premium sengetøj',
    wallColor: '#F5F2EE',
    wallGradient: 'linear-gradient(180deg, #FAF8F5 0%, #F0EDE8 70%, #E5E0DA 100%)',
    floorColor: '#C9BFB3',
    floorGradient: 'linear-gradient(180deg, #BFB5A8 0%, #B0A598 100%)',
    ambientLight: 'radial-gradient(ellipse at 70% 30%, rgba(255,248,235,0.3) 0%, transparent 45%)',
    framePosition: { top: '6%', left: '50%', width: '24%', height: '36%', transform: 'translateX(-50%)' },
    furniture: [
      { type: 'bed', position: { bottom: '15%', left: '10%', width: '80%', height: '35%' }, color: '#FFFFFF', secondaryColor: '#E8E4E0' },
    ],
    decor: [
      { type: 'lamp', position: { bottom: '35%', left: '8%', width: '5%', height: '18%' }, color: '#C4A484' },
      { type: 'lamp', position: { bottom: '35%', right: '8%', width: '5%', height: '18%' }, color: '#C4A484' },
    ],
  },
  {
    id: 'modern-office',
    name: 'Kontor',
    description: 'Professionelt hjemmekontor med valnød skrivebord',
    wallColor: '#F0EDE8',
    wallGradient: 'linear-gradient(180deg, #F5F3EF 0%, #E8E4DE 80%, #DDD8D0 100%)',
    floorColor: '#8B7355',
    floorGradient: 'linear-gradient(180deg, #7A6548 0%, #6B5840 100%)',
    ambientLight: 'radial-gradient(ellipse at 60% 25%, rgba(255,252,245,0.35) 0%, transparent 50%)',
    framePosition: { top: '10%', left: '50%', width: '22%', height: '34%', transform: 'translateX(-50%)' },
    furniture: [
      { type: 'desk', position: { bottom: '20%', left: '20%', width: '60%', height: '18%' }, color: '#5C4A3A', secondaryColor: '#4A3C30' },
      { type: 'chair', position: { bottom: '18%', left: '38%', width: '24%', height: '25%' }, color: '#2D2D2D', secondaryColor: '#1A1A1A' },
    ],
    decor: [
      { type: 'plant', position: { bottom: '20%', right: '10%', width: '10%', height: '25%' }, color: '#6B7A5E' },
      { type: 'books', position: { bottom: '38%', left: '22%', width: '8%', height: '6%' }, color: '#C4A484' },
    ],
  },
  {
    id: 'dining-room',
    name: 'Spisestue',
    description: 'Moderne spisestue med statement væg',
    wallColor: '#5C5C4D',
    wallGradient: 'linear-gradient(180deg, #6B6B5A 0%, #5C5C4D 50%, #4D4D40 100%)',
    floorColor: '#A89080',
    floorGradient: 'linear-gradient(180deg, #9A8575 0%, #8B7565 100%)',
    ambientLight: 'radial-gradient(ellipse at 40% 30%, rgba(255,250,240,0.15) 0%, transparent 45%)',
    framePosition: { top: '8%', left: '50%', width: '26%', height: '38%', transform: 'translateX(-50%)' },
    furniture: [
      { type: 'table', position: { bottom: '22%', left: '20%', width: '60%', height: '12%' }, color: '#3D3228', secondaryColor: '#2D2620' },
      { type: 'chair', position: { bottom: '20%', left: '25%', width: '12%', height: '18%' }, color: '#C4A484' },
      { type: 'chair', position: { bottom: '20%', right: '25%', width: '12%', height: '18%' }, color: '#C4A484' },
    ],
    decor: [
      { type: 'vase', position: { bottom: '34%', left: '45%', width: '5%', height: '8%' }, color: '#E8E0D8' },
      { type: 'lamp', position: { top: '5%', left: '48%', width: '8%', height: '15%' }, color: '#2D2D2D' },
    ],
  },
  {
    id: 'minimalist-hallway',
    name: 'Entré',
    description: 'Minimalistisk entré med konsol',
    wallColor: '#FAF8F5',
    wallGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F8F5F0 60%, #F0EBE5 100%)',
    floorColor: '#C4B8A8',
    floorGradient: 'linear-gradient(180deg, #B8AC9C 0%, #A89888 100%)',
    ambientLight: 'radial-gradient(ellipse at 50% 15%, rgba(255,255,250,0.5) 0%, transparent 40%)',
    framePosition: { top: '12%', left: '50%', width: '20%', height: '30%', transform: 'translateX(-50%)' },
    furniture: [
      { type: 'console', position: { bottom: '22%', left: '30%', width: '40%', height: '14%' }, color: '#1A1A1A', secondaryColor: '#2D2D2D' },
    ],
    decor: [
      { type: 'vase', position: { bottom: '36%', left: '35%', width: '4%', height: '10%' }, color: '#C4A484' },
      { type: 'plant', position: { bottom: '36%', right: '32%', width: '6%', height: '12%' }, color: '#7A8B6E' },
    ],
  },
  {
    id: 'reading-nook',
    name: 'Læsehjørne',
    description: 'Hyggeligt læsehjørne med lænestol',
    wallColor: '#EBE6E0',
    wallGradient: 'linear-gradient(180deg, #F5F2ED 0%, #E8E3DC 70%, #DDD6CE 100%)',
    floorColor: '#B8A898',
    floorGradient: 'linear-gradient(180deg, #A89888 0%, #988878 100%)',
    ambientLight: 'radial-gradient(ellipse at 25% 40%, rgba(255,245,225,0.4) 0%, transparent 50%)',
    framePosition: { top: '10%', left: '55%', width: '24%', height: '36%', transform: 'translateX(-50%)' },
    furniture: [
      { type: 'armchair', position: { bottom: '18%', left: '10%', width: '35%', height: '32%' }, color: '#8B7355', secondaryColor: '#7A6348' },
    ],
    decor: [
      { type: 'lamp', position: { bottom: '18%', left: '42%', width: '5%', height: '35%' }, color: '#2D2D2D' },
      { type: 'books', position: { bottom: '18%', right: '15%', width: '12%', height: '30%' }, color: '#C4A484' },
      { type: 'plant', position: { bottom: '48%', right: '12%', width: '8%', height: '15%' }, color: '#6B7A5E' },
    ],
  },
  {
    id: 'gallery-space',
    name: 'Galleri',
    description: 'Rent galleri-rum med fokus på kunsten',
    wallColor: '#FFFFFF',
    wallGradient: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 80%, #F5F5F5 100%)',
    floorColor: '#E0E0E0',
    floorGradient: 'linear-gradient(180deg, #D0D0D0 0%, #C0C0C0 100%)',
    ambientLight: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.6) 0%, transparent 60%)',
    framePosition: { top: '15%', left: '50%', width: '30%', height: '50%', transform: 'translateX(-50%)' },
    furniture: [],
    decor: [
      { type: 'plant', position: { bottom: '15%', left: '8%', width: '10%', height: '30%' }, color: '#7A8B6E' },
    ],
  },
  {
    id: 'cozy-living',
    name: 'Hygge Stue',
    description: 'Varm stue med jordfarver og tekstur',
    wallColor: '#E8E0D8',
    wallGradient: 'linear-gradient(180deg, #F0E8E0 0%, #E0D8D0 60%, #D8CFC5 100%)',
    floorColor: '#A08878',
    floorGradient: 'linear-gradient(180deg, #907868 0%, #806858 100%)',
    ambientLight: 'radial-gradient(ellipse at 35% 35%, rgba(255,240,220,0.35) 0%, transparent 50%)',
    framePosition: { top: '8%', left: '35%', width: '26%', height: '40%' },
    furniture: [
      { type: 'sofa', position: { bottom: '18%', left: '5%', width: '55%', height: '24%' }, color: '#C4A484', secondaryColor: '#B89474' },
      { type: 'sideboard', position: { bottom: '18%', right: '5%', width: '25%', height: '20%' }, color: '#5C4A3A' },
    ],
    decor: [
      { type: 'lamp', position: { bottom: '38%', right: '10%', width: '6%', height: '16%' }, color: '#2D2D2D' },
      { type: 'plant', position: { bottom: '18%', left: '58%', width: '8%', height: '22%' }, color: '#6B7A5E' },
      { type: 'rug', position: { bottom: '12%', left: '10%', width: '50%', height: '8%' }, color: '#D4C4B0' },
    ],
  },
];

export default function RoomShowroom({ imageSrc, productTitle, isOpen, onClose, frameStyle = 'none' }: RoomShowroomProps) {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const room = rooms[currentRoom];
  const hasFrame = frameStyle !== 'none';

  const nextRoom = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prevRoom = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const goToRoom = (index: number) => {
    if (isAnimating || index === currentRoom) return;
    setIsAnimating(true);
    setCurrentRoom(index);
    setTimeout(() => setIsAnimating(false), 400);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-cream rounded-sm overflow-hidden shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-sand/30 bg-white/50">
          <div>
            <h3 className="text-lg sm:text-xl font-light text-charcoal">Se i dit hjem</h3>
            <p className="text-sm text-olive mt-0.5">{productTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-olive hover:text-charcoal hover:bg-sand/20 rounded-full transition-all"
            aria-label="Luk"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Room Visualization */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
          {/* Room Scene */}
          <div
            className={`absolute inset-0 transition-opacity duration-400 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: room.wallGradient || room.wallColor }}
          >
            {/* Ambient Light Effect */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: room.ambientLight }} />

            {/* Floor */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[35%]"
              style={{
                background: room.floorGradient || room.floorColor,
                clipPath: 'polygon(0 30%, 100% 15%, 100% 100%, 0 100%)',
              }}
            />

            {/* Floor reflection */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                clipPath: 'polygon(0 30%, 100% 15%, 100% 100%, 0 100%)',
              }}
            />

            {/* Rugs (behind furniture) */}
            {room.decor?.filter(d => d.type === 'rug').map((decor, i) => (
              <div
                key={`rug-${i}`}
                className="absolute rounded-sm"
                style={{ ...decor.position, background: decor.color, opacity: 0.6 }}
              />
            ))}

            {/* Artwork Frame Container */}
            <div
              className="absolute transition-all duration-500"
              style={{
                ...room.framePosition,
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15)) drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
              }}
            >
              {/* Frame */}
              {hasFrame && (
                <div
                  className="absolute -inset-[6%] rounded-sm"
                  style={{
                    background: frameStyle === 'oak'
                      ? 'linear-gradient(145deg, #A0724A 0%, #8B5A2B 50%, #6B4520 100%)'
                      : frameStyle === 'white'
                      ? 'linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 50%, #E8E8E8 100%)'
                      : 'linear-gradient(145deg, #2D2D2D 0%, #1A1A1A 50%, #0D0D0D 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                />
              )}

              {/* Mat/Passepartout */}
              <div className="absolute -inset-[3%] bg-white" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.03)' }} />

              {/* Artwork */}
              <div className="relative w-full h-full bg-sand/30 overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={productTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                  priority
                />
              </div>

              {/* Glass Reflection */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                }}
              />
            </div>

            {/* Furniture */}
            {room.furniture.map((item, index) => (
              <FurnitureItem key={`furniture-${index}`} item={item} />
            ))}

            {/* Decor (except rugs) */}
            {room.decor?.filter(d => d.type !== 'rug').map((decor, i) => (
              <DecorItem key={`decor-${i}`} item={decor} />
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevRoom}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-charcoal" />
          </button>
          <button
            onClick={nextRoom}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-charcoal" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => goToRoom(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentRoom === index ? 'bg-white w-6 sm:w-8' : 'bg-white/40 hover:bg-white/70 w-1.5 sm:w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Room Selector */}
        <div className="p-4 sm:p-5 border-t border-sand/30 bg-gradient-to-b from-white/80 to-cream">
          <div className="text-center mb-4">
            <h4 className="text-lg font-medium text-charcoal">{room.name}</h4>
            <p className="text-sm text-olive mt-1">{room.description}</p>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {rooms.map((r, index) => (
              <button
                key={r.id}
                onClick={() => goToRoom(index)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm tracking-wide transition-all rounded-sm ${
                  currentRoom === index
                    ? 'bg-charcoal text-cream shadow-md'
                    : 'bg-sand/20 text-olive hover:bg-sand/40 hover:text-charcoal'
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

function FurnitureItem({ item }: { item: FurnitureElement }) {
  const baseStyle = { ...item.position };

  switch (item.type) {
    case 'sofa':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-[5%] right-[5%] h-[45%] rounded-t-lg" style={{ background: item.secondaryColor || item.color }} />
            <div className="absolute bottom-[15%] left-0 right-0 h-[40%] rounded-lg" style={{ background: item.color }} />
            <div className="absolute bottom-[25%] left-[8%] right-[8%] h-[30%] rounded-md opacity-90" style={{ background: item.secondaryColor || item.color }} />
            <div className="absolute bottom-0 left-[10%] w-[3%] h-[15%] rounded-b" style={{ background: '#2D2D2D' }} />
            <div className="absolute bottom-0 right-[10%] w-[3%] h-[15%] rounded-b" style={{ background: '#2D2D2D' }} />
          </div>
        </div>
      );
    case 'bed':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-[10%] right-[10%] h-[35%] rounded-t-sm" style={{ background: item.secondaryColor || '#E8E4E0' }} />
            <div className="absolute top-[30%] left-[5%] right-[5%] h-[50%] rounded-sm" style={{ background: item.color }} />
            <div className="absolute top-[25%] left-[15%] w-[25%] h-[20%] rounded-md" style={{ background: item.color, opacity: 0.95 }} />
            <div className="absolute top-[25%] right-[15%] w-[25%] h-[20%] rounded-md" style={{ background: item.color, opacity: 0.95 }} />
            <div className="absolute bottom-[25%] left-[8%] right-[8%] h-[15%] rounded-sm opacity-80" style={{ background: item.secondaryColor || '#E8E4E0' }} />
          </div>
        </div>
      );
    case 'desk':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 right-0 h-[25%] rounded-sm" style={{ background: item.color }} />
            <div className="absolute top-[20%] left-[5%] w-[4%] h-[80%]" style={{ background: item.secondaryColor || item.color }} />
            <div className="absolute top-[20%] right-[5%] w-[4%] h-[80%]" style={{ background: item.secondaryColor || item.color }} />
          </div>
        </div>
      );
    case 'chair':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-[20%] right-[20%] h-[50%] rounded-t-lg" style={{ background: item.color }} />
            <div className="absolute top-[45%] left-[10%] right-[10%] h-[25%] rounded-md" style={{ background: item.secondaryColor || item.color }} />
            <div className="absolute bottom-0 left-[25%] w-[8%] h-[30%] rounded-b" style={{ background: '#2D2D2D' }} />
            <div className="absolute bottom-0 right-[25%] w-[8%] h-[30%] rounded-b" style={{ background: '#2D2D2D' }} />
          </div>
        </div>
      );
    case 'table':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 right-0 h-[30%] rounded-sm" style={{ background: item.color }} />
            <div className="absolute top-[25%] left-[10%] w-[5%] h-[75%]" style={{ background: item.secondaryColor || item.color }} />
            <div className="absolute top-[25%] right-[10%] w-[5%] h-[75%]" style={{ background: item.secondaryColor || item.color }} />
          </div>
        </div>
      );
    case 'console':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 right-0 h-[20%] rounded-sm" style={{ background: item.color }} />
            <div className="absolute top-[15%] left-[5%] right-[5%] h-[60%]" style={{ background: item.secondaryColor || item.color }} />
            <div className="absolute bottom-0 left-[8%] w-[4%] h-[25%]" style={{ background: item.color }} />
            <div className="absolute bottom-0 right-[8%] w-[4%] h-[25%]" style={{ background: item.color }} />
          </div>
        </div>
      );
    case 'armchair':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-[15%] right-[15%] h-[55%] rounded-t-xl" style={{ background: item.color }} />
            <div className="absolute top-[40%] left-[5%] right-[5%] h-[35%] rounded-lg" style={{ background: item.secondaryColor || item.color }} />
            <div className="absolute top-[30%] left-0 w-[18%] h-[40%] rounded-l-lg" style={{ background: item.color }} />
            <div className="absolute top-[30%] right-0 w-[18%] h-[40%] rounded-r-lg" style={{ background: item.color }} />
            <div className="absolute bottom-0 left-[15%] w-[6%] h-[15%] rounded-b" style={{ background: '#3D3228' }} />
            <div className="absolute bottom-0 right-[15%] w-[6%] h-[15%] rounded-b" style={{ background: '#3D3228' }} />
          </div>
        </div>
      );
    case 'sideboard':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 right-0 h-[15%] rounded-t-sm" style={{ background: item.color }} />
            <div className="absolute top-[10%] left-[3%] right-[3%] h-[70%] rounded-sm" style={{ background: item.color }} />
            <div className="absolute bottom-0 left-[10%] w-[4%] h-[20%]" style={{ background: '#2D2D2D' }} />
            <div className="absolute bottom-0 right-[10%] w-[4%] h-[20%]" style={{ background: '#2D2D2D' }} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

function DecorItem({ item }: { item: DecorElement }) {
  const baseStyle = { ...item.position };

  switch (item.type) {
    case 'plant':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[25%] rounded-b-lg" style={{ background: '#8B7355' }} />
            <div className="absolute top-0 left-0 right-0 h-[80%] rounded-full" style={{ background: item.color }} />
            <div className="absolute top-[10%] left-[10%] right-[10%] h-[60%] rounded-full opacity-80" style={{ background: item.color, filter: 'brightness(1.1)' }} />
          </div>
        </div>
      );
    case 'vase':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-[15%] right-[15%] h-[70%] rounded-b-xl rounded-t-sm" style={{ background: item.color }} />
            <div className="absolute top-[10%] left-[25%] right-[25%] h-[40%]" style={{ background: '#7A8B6E' }} />
          </div>
        </div>
      );
    case 'lamp':
      return (
        <div className="absolute" style={baseStyle}>
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-[10%] right-[10%] h-[40%] rounded-b-lg" style={{ background: item.color === '#2D2D2D' ? '#F5F2ED' : item.color, boxShadow: '0 4px 12px rgba(255,240,200,0.3)' }} />
            <div className="absolute top-[35%] left-[35%] right-[35%] h-[60%] rounded-b" style={{ background: item.color }} />
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[10%] rounded-sm" style={{ background: item.color }} />
          </div>
        </div>
      );
    case 'books':
      return (
        <div className="absolute flex gap-[3%]" style={baseStyle}>
          <div className="flex-1 rounded-sm" style={{ background: item.color }} />
          <div className="flex-1 rounded-sm" style={{ background: '#5C5C4D' }} />
          <div className="flex-1 rounded-sm" style={{ background: '#D4C4B0' }} />
          <div className="flex-1 rounded-sm" style={{ background: '#8B7355' }} />
        </div>
      );
    default:
      return null;
  }
}
