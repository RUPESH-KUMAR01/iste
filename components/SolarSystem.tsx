"use client"

import React, { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Data Structure ─────────────────────────────────────────────────────────

interface Track {
  id: string
  title: string
  image: string
  radius: number
  speed: number
  startAngle?: number
}

interface OrbitalEvent {
  id: number
  title: string
  image: string
  radius: number
  speed: number
  color: string       // accent color rgba base e.g. "0, 229, 255"
  tracks: Track[]
}

const orbitalData: OrbitalEvent[] = [
  {
    id: 0,
    title: "Scotland Yard",
    image: "/scotland_yard.jpeg",
    radius: 300,
    speed: 50,
    color: "0, 229, 255",
    tracks: [
      { id: '0a', title: "Chronicle", image: "/sig-logos/chronicle.png", radius: 110, speed: 18, startAngle: 0 },
    ]
  },
  {
    id: 1,
    title: "SquareOne",
    image: "/square_one.jpeg",
    radius: 300,
    speed: 50,
    color: "255, 159, 28",
    tracks: [
      { id: '1a', title: "Create", image: "/sig-logos/create.png", radius: 108, speed: 18, startAngle: 0 },
      { id: '1b', title: "Credit", image: "/sig-logos/credit.png", radius: 108, speed: 18, startAngle: 72 },
      { id: '1c', title: "Crypt", image: "/sig-logos/crypt.png", radius: 108, speed: 18, startAngle: 144 },
      { id: '1d', title: "Catalyst", image: "/sig-logos/catalyst.png", radius: 108, speed: 18, startAngle: 216 },
      { id: '1e', title: "Charge", image: "/sig-logos/charge.png", radius: 108, speed: 18, startAngle: 288 },
    ]
  },
  {
    id: 2,
    title: "Transcend",
    image: "/transcend.png",
    radius: 300,
    speed: 50,
    color: "217, 70, 239",
    tracks: [
      { id: '2a', title: "Chronicle", image: "/sig-logos/chronicle.png", radius: 108, speed: 18, startAngle: 0 },
      { id: '2b', title: "Clutch", image: "/sig-logos/clutch.png", radius: 108, speed: 18, startAngle: 72 },
      { id: '2c', title: "Concrete", image: "/sig-logos/concrete.png", radius: 108, speed: 18, startAngle: 144 },
      { id: '2d', title: "Create", image: "/sig-logos/create.png", radius: 108, speed: 18, startAngle: 216 },
      { id: '2e', title: "Crypt", image: "/sig-logos/crypt.png", radius: 108, speed: 18, startAngle: 288 },
    ]
  }
]

// ─── Component ──────────────────────────────────────────────────────────────

export const SolarSystem = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pre-compute starting angles for the 3 suns so they're evenly spaced
  const sunStartAngles = [0, 120, 240]

  // ─── Generate all CSS keyframes dynamically ─────────────────────────────
  const generatedStyles = useMemo(() => {
    let css = ''

    // --- Primary orbit keyframes (suns around center) ---
    orbitalData.forEach((sun, i) => {
      const startDeg = sunStartAngles[i]
      const endDeg = startDeg + 360

      // Outer wrapper: handles the orbital rotation
      css += `
        @keyframes sun-orbit-${sun.id} {
          from { transform: rotate(${startDeg}deg) translateX(${sun.radius}px); }
          to   { transform: rotate(${endDeg}deg)   translateX(${sun.radius}px); }
        }
      `

      // Inner wrapper: counter-rotates to keep logo upright
      css += `
        @keyframes sun-counter-${sun.id} {
          from { transform: rotate(-${startDeg}deg); }
          to   { transform: rotate(-${endDeg}deg);   }
        }
      `

      // --- Secondary orbit keyframes (tracks/planets around their parent sun) ---
      sun.tracks.forEach((track) => {
        const tStart = track.startAngle ?? 0
        const tEnd = tStart + 360

        // Orbital rotation around the sun
        css += `
          @keyframes track-orbit-${track.id} {
            from { transform: rotate(${tStart}deg) translateX(${track.radius}px); }
            to   { transform: rotate(${tEnd}deg)   translateX(${track.radius}px); }
          }
        `

        // Counter-rotation: must cancel BOTH the sun's rotation AND the track's own rotation
        // The sun rotates from startDeg to endDeg over sun.speed seconds
        // The track rotates from tStart to tEnd over track.speed seconds
        // We counter-rotate by -(sunAngle + trackAngle) so the logo stays upright.
        // Since these run on separate timers, we handle the track counter-rotation 
        // relative to itself, and let the sun's counter-rotation layer handle the sun part.
        css += `
          @keyframes track-counter-${track.id} {
            from { transform: rotate(-${tStart}deg); }
            to   { transform: rotate(-${tEnd}deg);   }
          }
        `
      })
    })

    // --- Ambient animations ---
    css += `
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 30px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.15); }
        50%      { box-shadow: 0 0 60px rgba(0, 229, 255, 0.7), 0 0 120px rgba(0, 229, 255, 0.3);  }
      }

      @keyframes center-glow {
        0%, 100% { box-shadow: 0 0 60px rgba(0, 229, 255, 0.5), 0 0 120px rgba(0, 229, 255, 0.2), inset 0 0 40px rgba(0, 229, 255, 0.3); }
        50%      { box-shadow: 0 0 100px rgba(0, 229, 255, 0.8), 0 0 200px rgba(0, 229, 255, 0.4), inset 0 0 50px rgba(0, 229, 255, 0.4); }
      }

      @keyframes float-in {
        from { opacity: 0; transform: scale(0.7); }
        to   { opacity: 1; transform: scale(1);   }
      }

      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50%      { opacity: 1;   }
      }

      @keyframes ring-pulse {
        0%, 100% { opacity: 0.15; }
        50%      { opacity: 0.35; }
      }
    `

    return css
  }, [])

  // ─── Static styles ──────────────────────────────────────────────────────
  const staticStyles = `
    .solar-system-root {
      position: relative;
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 5rem 0;
    }

    /* ── Info Card (right panel) ── */
    .ss-info-panel {
      position: absolute;
      left: calc(100% + 20px);
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      width: 260px;
      pointer-events: none;
      animation: float-in 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .ss-info-card {
      background: rgba(8, 10, 20, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      padding: 20px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 229, 255, 0.06);
      overflow: hidden;
      position: relative;
    }

    .ss-info-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      border-radius: 18px 18px 0 0;
    }

    .ss-info-card-image {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .ss-info-card h4 {
      margin: 0;
      font-size: 18px;
      font-weight: 800;
      color: white;
      text-align: center;
      letter-spacing: 0.04em;
    }

    .ss-info-card .ss-info-type {
      margin: 6px 0 0;
      font-size: 11px;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    .ss-info-card .ss-info-divider {
      width: 40px;
      height: 2px;
      margin: 12px auto 0;
      border-radius: 1px;
      opacity: 0.5;
    }

    /* ── Starfield ── */
    .ss-starfield {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .ss-star {
      position: absolute;
      background: white;
      border-radius: 50%;
      animation: twinkle 3s ease-in-out infinite;
    }

    /* ── Container ── */
    .ss-container {
      position: relative;
      width: 800px;
      height: 800px;
      z-index: 10;
    }

    .ss-container.paused .sun-orbit-wrapper,
    .ss-container.paused .sun-counter-wrapper,
    .ss-container.paused .track-orbit-wrapper,
    .ss-container.paused .track-counter-wrapper {
      animation-play-state: paused !important;
    }

    /* ── Orbit rings ── */
    .ss-orbit-ring {
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .ss-orbit-ring--primary {
      border: 1px dashed rgba(0, 229, 255, 0.12);
      box-shadow: 0 0 20px rgba(0, 229, 255, 0.05) inset;
      animation: ring-pulse 6s ease-in-out infinite;
    }

    .ss-orbit-ring--secondary {
      border: 1px dashed rgba(255, 255, 255, 0.08);
    }

    /* ── Center ISTE Bulb ── */
    .ss-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, rgba(0, 229, 255, 0.8), rgba(0, 20, 40, 0.9));
      border: 3px solid rgba(0, 229, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      animation: center-glow 4s ease-in-out infinite, float-in 0.8s ease-out;
      cursor: default;
    }

    .ss-center-img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.3);
    }

    /* ── Sun (primary orbiter) ── */
    .sun-orbit-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      will-change: transform;
    }

    .sun-counter-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      will-change: transform;
    }

    .ss-sun {
      position: absolute;
      width: 90px;
      height: 90px;
      left: -45px;
      top: -45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
      z-index: 30;
    }

    .ss-sun:hover {
      transform: scale(1.18);
    }

    .ss-sun-img {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset -15px -15px 30px rgba(0, 0, 0, 0.5),
                  inset 10px 10px 20px rgba(255, 255, 255, 0.15);
      transition: box-shadow 0.4s ease;
    }

    .ss-sun-highlight {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(circle at 30% 28%, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 10%, rgba(0,0,0,0) 45%);
      mix-blend-mode: screen;
      border-radius: 50%;
    }

    .ss-sun-label {
      position: absolute;
      bottom: -24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease;
      letter-spacing: 0.05em;
      text-shadow: 0 0 12px currentColor;
    }

    .ss-sun:hover .ss-sun-label {
      opacity: 1;
    }

    /* ── Track (secondary orbiter / planet) ── */
    .track-orbit-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      will-change: transform;
    }

    .track-counter-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      will-change: transform;
    }

    .ss-track {
      position: absolute;
      width: 52px;
      height: 52px;
      left: -26px;
      top: -26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s ease, border-color 0.35s ease;
      z-index: 25;
    }

    .ss-track:hover {
      transform: scale(1.25);
      border-color: rgba(255, 255, 255, 0.6);
    }

    .ss-track-img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset -8px -8px 18px rgba(0, 0, 0, 0.5),
                  inset 5px 5px 12px rgba(255, 255, 255, 0.12);
      transition: box-shadow 0.35s ease;
    }

    .ss-track-highlight {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(circle at 30% 28%, rgba(255,255,255,0.2), rgba(0,0,0,0) 40%);
      mix-blend-mode: screen;
      border-radius: 50%;
    }

    .ss-track-label {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 9px;
      font-weight: 600;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease;
      color: rgba(255, 255, 255, 0.85);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .ss-track:hover .ss-track-label {
      opacity: 1;
    }



    /* ── Heading & CTA ── */
    .ss-heading {
      position: absolute;
      top: clamp(2rem, 6vh, 5rem);
      left: 50%;
      transform: translateX(-50%);
      z-index: 40;
      text-align: center;
    }

    .ss-heading h1 {
      margin: 0;
      font-size: clamp(2rem, 5vw, 3.8rem);
      font-weight: 900;
      letter-spacing: 0.25em;
      color: white;
      text-shadow: 0 0 20px rgba(0, 229, 255, 0.35);
    }

    .ss-heading-line {
      margin: 0.6rem auto 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.7), transparent);
      border-radius: 2px;
    }

    .ss-cta {
      position: absolute;
      bottom: clamp(1.5rem, 4vh, 3.5rem);
      left: 50%;
      transform: translateX(-50%);
      z-index: 40;
    }

    .ss-cta a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 32px;
      background: rgba(0, 229, 255, 0.08);
      border: 1px solid rgba(0, 229, 255, 0.3);
      border-radius: 100px;
      color: rgba(0, 229, 255, 0.9);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-decoration: none;
      transition: all 0.35s ease;
      backdrop-filter: blur(8px);
    }

    .ss-cta a:hover {
      background: rgba(0, 229, 255, 0.15);
      border-color: rgba(0, 229, 255, 0.6);
      box-shadow: 0 0 30px rgba(0, 229, 255, 0.2);
      color: white;
      transform: translateY(-2px);
    }

    .ss-cta-arrow {
      transition: transform 0.3s ease;
    }

    .ss-cta a:hover .ss-cta-arrow {
      transform: translateX(4px);
    }
  `

  // ─── Stars (deterministic via index-based seeding) ────────────────────
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const seed = (i * 7919 + 104729) % 100000
      const x = (seed % 1000) / 10
      const y = ((seed * 3 + 17) % 1000) / 10
      const size = ((seed % 25) + 6) / 10
      const delay = ((seed % 30)) / 10
      const opacity = 0.4 + ((seed % 50) / 100)
      return { x, y, size, delay, opacity }
    })
  }, [])

  // ─── Info card state ──────────────────────────────────────────────────
  const [cardInfo, setCardInfo] = useState<{ title: string; type: string; image: string; color: string } | null>(null)

  const handleHoverEnter = (id: string, title: string, type: string, image: string, color: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setHoveredId(id)
    setIsPaused(true)
    setCardInfo({ title, type, image, color })
  }

  const handleHoverLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredId(null)
      setIsPaused(false)
      setCardInfo(null)
    }, 200)
  }

  return (
    <div className="solar-system-root">
      <style>{generatedStyles}</style>
      <style>{staticStyles}</style>

      {/* ── Heading ── */}
      <div className="ss-heading">
        <h1>EVENTS</h1>
        <div className="ss-heading-line" />
      </div>

      {/* ── Starfield ── */}
      <div className="ss-starfield">
        {stars.map((s, i) => (
          <div
            key={`star-${i}`}
            className="ss-star"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: `${s.x}%`,
              top: `${s.y}%`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.6)`
            }}
          />
        ))}
      </div>

      {/* ── Orbital Container ── */}
      <div className={`ss-container ${isPaused ? 'paused' : ''}`}>

        {/* Primary orbit ring */}
        <div
          className="ss-orbit-ring ss-orbit-ring--primary"
          style={{
            width: `${orbitalData[0].radius * 2}px`,
            height: `${orbitalData[0].radius * 2}px`,
          }}
        />

        {/* ── Suns (primary orbiters) ── */}
        {orbitalData.map((sun, idx) => (
          <React.Fragment key={sun.id}>
            {/* Outer wrapper: handles orbital path */}
            <div
              className="sun-orbit-wrapper"
              style={{
                animation: `sun-orbit-${sun.id} ${sun.speed}s linear infinite`,
              }}
            >
              {/* Inner wrapper: counter-rotates to keep content upright */}
              <div
                className="sun-counter-wrapper"
                style={{
                  animation: `sun-counter-${sun.id} ${sun.speed}s linear infinite`,
                }}
              >
                {/* Secondary orbit ring (drawn relative to sun's position) */}
                <div
                  className="ss-orbit-ring ss-orbit-ring--secondary"
                  style={{
                    width: `${(sun.tracks[0]?.radius ?? 100) * 2}px`,
                    height: `${(sun.tracks[0]?.radius ?? 100) * 2}px`,
                    top: '0',
                    left: '0',
                  }}
                />

                {/* The Sun node itself */}
                <div
                  className="ss-sun"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, rgba(${sun.color}, 0.85), rgba(${sun.color}, 0.15))`,
                    border: `2px solid rgba(${sun.color}, 0.5)`,
                    boxShadow: hoveredId === `sun-${sun.id}`
                      ? `0 0 70px rgba(${sun.color}, 0.9), inset 0 0 30px rgba(${sun.color}, 0.4), 0 0 140px rgba(${sun.color}, 0.5)`
                      : `0 0 35px rgba(${sun.color}, 0.5), inset 0 0 20px rgba(${sun.color}, 0.2)`,
                  }}
                  onMouseEnter={() => handleHoverEnter(`sun-${sun.id}`, sun.title, 'Main Event', sun.image, sun.color)}
                  onMouseLeave={handleHoverLeave}
                >
                  <div className="ss-sun-img">
                    <Image
                      src={sun.image}
                      alt={sun.title}
                      width={76}
                      height={76}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                    <div className="ss-sun-highlight" />
                  </div>
                  <div className="ss-sun-label" style={{ color: `rgba(${sun.color}, 1)` }}>
                    {sun.title}
                  </div>
                </div>

                {/* ── Tracks (secondary orbiters / planets) ── */}
                {sun.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="track-orbit-wrapper"
                    style={{
                      animation: `track-orbit-${track.id} ${track.speed}s linear infinite`,
                    }}
                  >
                    {/* Counter-rotate by track's own angle only.
                        The sun's rotation is already cancelled by sun-counter-wrapper,
                        so we don't need to cancel it again here. */}
                    <div
                      className="track-counter-wrapper"
                      style={{
                        animation: `track-counter-${track.id} ${track.speed}s linear infinite`,
                      }}
                    >
                      <div
                        className="ss-track"
                        style={{
                          boxShadow: hoveredId === `track-${track.id}`
                            ? `0 0 40px rgba(${sun.color}, 0.7), inset 0 0 15px rgba(${sun.color}, 0.3)`
                            : `0 0 18px rgba(${sun.color}, 0.35), inset 0 0 8px rgba(${sun.color}, 0.15)`,
                        }}
                        onMouseEnter={() => handleHoverEnter(`track-${track.id}`, track.title, `${sun.title} Track`, track.image, sun.color)}
                        onMouseLeave={handleHoverLeave}
                      >
                        <div className="ss-track-img">
                          <Image
                            src={track.image}
                            alt={track.title}
                            width={42}
                            height={42}
                            className="w-full h-full object-cover"
                            style={{ borderRadius: '50%' }}
                          />
                          <div className="ss-track-highlight" />
                        </div>
                        <div className="ss-track-label">{track.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* ── Central ISTE Bulb ── */}
        <div className="ss-center">
          <div className="ss-center-img">
            <Image
              src="/images/iste_transparent.png"
              alt="ISTE Bulb Logo"
              width={150}
              height={150}
              className="w-full h-full object-contain"
              style={{ borderRadius: '50%' }}
            />
          </div>
        </div>

        {/* ── Info Card (right side) ── */}
        {cardInfo && (
          <div className="ss-info-panel" key={cardInfo.title}>
            <div
              className="ss-info-card"
              style={{
                borderColor: `rgba(${cardInfo.color}, 0.25)`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, transparent, rgba(${cardInfo.color}, 0.8), transparent)`,
                  borderRadius: '18px 18px 0 0',
                }}
              />
              <div
                className="ss-info-card-image"
                style={{
                  boxShadow: `0 0 30px rgba(${cardInfo.color}, 0.4), 0 0 60px rgba(${cardInfo.color}, 0.15)`,
                  border: `2px solid rgba(${cardInfo.color}, 0.4)`,
                }}
              >
                <Image
                  src={cardInfo.image}
                  alt={cardInfo.title}
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <h4>{cardInfo.title}</h4>
              <p className="ss-info-type" style={{ color: `rgba(${cardInfo.color}, 0.9)` }}>
                {cardInfo.type}
              </p>
              <div
                className="ss-info-divider"
                style={{ background: `rgba(${cardInfo.color}, 0.6)` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Explore More CTA ── */}
      <div className="ss-cta">
        <Link href="/events">
          Explore more
          <span className="ss-cta-arrow">→</span>
        </Link>
      </div>
    </div>
  )
}

export default SolarSystem
