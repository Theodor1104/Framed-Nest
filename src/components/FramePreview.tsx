'use client';

import Image from 'next/image';

export type FrameStyle = 'none' | 'oak' | 'black' | 'white' | 'natural' | 'gold';

interface FramePreviewProps {
  imageSrc: string;
  alt: string;
  frameStyle: FrameStyle;
  className?: string;
}

interface FrameConfig {
  outer: string;
  mid: string;
  inner: string;
  highlight: string;
  shadow: string;
  isMetallic: boolean;
  hasWoodGrain: boolean;
}

const frameConfigs: Record<Exclude<FrameStyle, 'none'>, FrameConfig> = {
  gold: {
    outer: '#996515',
    mid: '#C9A227',
    inner: '#E6C84B',
    highlight: '#F5E6A3',
    shadow: '#705010',
    isMetallic: true,
    hasWoodGrain: false,
  },
  oak: {
    outer: '#5C3D1E',
    mid: '#7A5230',
    inner: '#926842',
    highlight: '#B08860',
    shadow: '#3D2810',
    isMetallic: false,
    hasWoodGrain: true,
  },
  black: {
    outer: '#000000',
    mid: '#1a1a1a',
    inner: '#252525',
    highlight: '#3a3a3a',
    shadow: '#000000',
    isMetallic: false,
    hasWoodGrain: false,
  },
  white: {
    outer: '#e8e8e8',
    mid: '#f5f5f5',
    inner: '#fafafa',
    highlight: '#ffffff',
    shadow: '#cccccc',
    isMetallic: false,
    hasWoodGrain: false,
  },
  natural: {
    outer: '#8B7355',
    mid: '#A89070',
    inner: '#C4A882',
    highlight: '#DCC8A8',
    shadow: '#6B5540',
    isMetallic: false,
    hasWoodGrain: true,
  },
};

export default function FramePreview({ imageSrc, alt, frameStyle, className = '' }: FramePreviewProps) {
  // No frame - clean museum print look
  if (frameStyle === 'none') {
    return (
      <div className={`relative ${className}`}>
        {/* Print paper */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.09)',
          }}
        />
        {/* Image with small white border like a real print */}
        <div className="absolute inset-[3%]">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    );
  }

  const config = frameConfigs[frameStyle];

  return (
    <div className={`relative ${className}`}>
      {/* Elegant drop shadow */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.12)',
        }}
      />

      {/* === THIN ELEGANT FRAME === */}

      {/* Frame outer edge - 2.5% */}
      <div
        className="absolute inset-0"
        style={{
          background: config.isMetallic
            ? `linear-gradient(155deg, ${config.highlight} 0%, ${config.mid} 20%, ${config.outer} 45%, ${config.mid} 55%, ${config.highlight} 70%, ${config.mid} 85%, ${config.shadow} 100%)`
            : `linear-gradient(145deg, ${config.highlight} 0%, ${config.mid} 30%, ${config.outer} 70%, ${config.shadow} 100%)`,
        }}
      />

      {/* Metallic shine for gold */}
      {config.isMetallic && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,235,150,0.3) 20%, transparent 40%, rgba(255,235,150,0.2) 60%, transparent 80%)',
            }}
          />
        </>
      )}

      {/* Wood grain for wooden frames */}
      {config.hasWoodGrain && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                88deg,
                transparent 0px,
                transparent 2px,
                rgba(0,0,0,0.15) 2px,
                rgba(0,0,0,0.08) 3px,
                transparent 3px,
                transparent 6px
              )
            `,
          }}
        />
      )}

      {/* Frame inner lip - creates depth at 2.5% */}
      <div
        className="absolute inset-[2.5%]"
        style={{
          background: `linear-gradient(145deg, ${config.shadow} 0%, ${config.outer} 50%, ${config.mid} 100%)`,
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)',
        }}
      />

      {/* Frame innermost edge at 3% */}
      <div
        className="absolute inset-[3%]"
        style={{
          background: `linear-gradient(145deg, ${config.inner} 0%, ${config.mid} 100%)`,
        }}
      />

      {/* === PASSEPARTOUT / MAT === */}

      {/* Mat base - starts at 3.5% */}
      <div
        className="absolute inset-[3.5%]"
        style={{
          backgroundColor: '#FCFBF9',
        }}
      />

      {/* Mat beveled edge effect - top/left light */}
      <div
        className="absolute inset-[3.5%] pointer-events-none"
        style={{
          boxShadow: `
            inset 1px 1px 0 rgba(255,255,255,0.9),
            inset 2px 2px 2px rgba(0,0,0,0.04)
          `,
        }}
      />

      {/* Mat inner shadow - where it meets artwork */}
      <div
        className="absolute inset-[7%]"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.02), inset 1px 1px 3px rgba(0,0,0,0.06)',
          backgroundColor: '#FCFBF9',
        }}
      />

      {/* === ARTWORK === */}

      {/* Image container at 8% */}
      <div className="absolute inset-[8%] overflow-hidden bg-neutral-100">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* === GLASS EFFECTS === */}

      {/* Subtle glass reflection */}
      <div
        className="absolute inset-[8%] pointer-events-none overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              125deg,
              rgba(255,255,255,0.08) 0%,
              rgba(255,255,255,0.03) 30%,
              transparent 50%
            )`,
          }}
        />
      </div>

      {/* Edge highlights on frame corners */}
      <div
        className="absolute top-0 left-0 w-[20%] h-[3%] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${config.highlight}50, transparent)`,
        }}
      />
      <div
        className="absolute top-0 left-0 w-[3%] h-[20%] pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${config.highlight}50, transparent)`,
        }}
      />
    </div>
  );
}
