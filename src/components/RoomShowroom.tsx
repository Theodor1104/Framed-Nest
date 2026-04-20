'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface RoomShowroomProps {
  imageSrc: string;
  productTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

// Exact pixel coordinates for white mat area in each 382x578 room image
const rooms = [
  {
    id: 'living',
    name: 'Luxury Living',
    description: 'Elegant penthouse living room with boucle sofa',
    image: '/images/room-luxury-living.png',
    // Pixel coords: top-left (114, 50) to bottom-right (268, 283)
    frame: { x: 114, y: 50, width: 154, height: 233 },
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    description: 'Five-star hotel suite with luxury linens',
    image: '/images/room-luxury-bedroom.png',
    frame: { x: 114, y: 50, width: 154, height: 233 },
  },
  {
    id: 'office',
    name: 'Executive Office',
    description: 'Sophisticated home office with walnut desk',
    image: '/images/room-luxury-office.png',
    frame: { x: 117, y: 45, width: 148, height: 242 },
  },
  {
    id: 'dining',
    name: 'Dining Room',
    description: 'Modern dining with forest green accent wall',
    image: '/images/room-luxury-dining.png',
    frame: { x: 110, y: 38, width: 162, height: 260 },
  },
];

export default function RoomShowroom({ imageSrc, productTitle, isOpen, onClose }: RoomShowroomProps) {
  const [currentRoom, setCurrentRoom] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const room = rooms[currentRoom];

  const nextRoom = () => setCurrentRoom((prev) => (prev + 1) % rooms.length);
  const prevRoom = () => setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsLoading(true);

    // Load both images
    const roomImg = new Image();
    const artworkImg = new Image();

    let roomLoaded = false;
    let artworkLoaded = false;

    const drawComposite = () => {
      if (!roomLoaded || !artworkLoaded) return;

      // Set canvas size to match room image
      canvas.width = 382;
      canvas.height = 578;

      // Draw room background
      ctx.drawImage(roomImg, 0, 0, 382, 578);

      // Draw artwork inside frame area
      const { x, y, width, height } = room.frame;
      ctx.drawImage(artworkImg, x, y, width, height);

      setIsLoading(false);
    };

    roomImg.onload = () => {
      roomLoaded = true;
      drawComposite();
    };

    artworkImg.onload = () => {
      artworkLoaded = true;
      drawComposite();
    };

    roomImg.crossOrigin = 'anonymous';
    artworkImg.crossOrigin = 'anonymous';

    roomImg.src = room.image;
    artworkImg.src = imageSrc;

  }, [isOpen, currentRoom, room, imageSrc]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-cream rounded-sm overflow-hidden shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sand/30">
          <div>
            <h3 className="text-lg font-light text-charcoal">Preview in Room</h3>
            <p className="text-sm text-olive">{productTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-olive hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Room visualization with Canvas */}
        <div className="relative bg-neutral-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
              <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
            </div>
          )}

          <canvas
            ref={canvasRef}
            className="w-full h-auto"
            style={{ display: isLoading ? 'none' : 'block' }}
          />

          {/* Navigation arrows */}
          <button
            onClick={prevRoom}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
            aria-label="Previous room"
          >
            <ChevronLeft className="w-5 h-5 text-charcoal" />
          </button>
          <button
            onClick={nextRoom}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
            aria-label="Next room"
          >
            <ChevronRight className="w-5 h-5 text-charcoal" />
          </button>

          {/* Room indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRoom(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentRoom === index
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to room ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Room selector */}
        <div className="p-4 border-t border-sand/30 bg-white/50">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {rooms.map((r, index) => (
              <button
                key={r.id}
                onClick={() => setCurrentRoom(index)}
                className={`px-4 py-2 text-sm transition-all rounded-sm ${
                  currentRoom === index
                    ? 'bg-charcoal text-cream'
                    : 'bg-sand/30 text-olive hover:bg-sand/50'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-olive mt-3">{room.description}</p>
        </div>
      </div>
    </div>
  );
}
