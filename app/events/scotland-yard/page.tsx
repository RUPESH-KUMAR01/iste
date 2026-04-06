"use client";
import React from "react";

const GOLD = "#C8860A";
const SAND = "#E8C87A";
const RUST = "#8B2500";
const INK = "#0D0800";
const PAPYRUS = "#1C1000";
const STONE = "#1E160A";

const STATS = [
  { icon: "📅", label: "Date",      value: "21 September 2025" },
  { icon: "📍", label: "Venue",     value: "LHC A" },
  { icon: "👥", label: "Eligibility", value: "BTech First Years" },
  { icon: "🏆", label: "Prize Pool", value: "₹7,500" },
];

const PILLARS = [
  { icon: "🔍", name: "Decode",    sub: "Decipher hidden clues",       accent: GOLD },
  { icon: "🗺️", name: "Navigate",  sub: "Traverse the campus trails",  accent: RUST },
  { icon: "⚖️", name: "Weigh",     sub: "Face the judgement of Osiris", accent: "#6B4C00" },
  { icon: "👁️", name: "Survive",   sub: "Escape before doom falls",    accent: "#5A1A00" },
];

const ROUNDS = [
  { name: "The Hall of Maat",   sub: "Gather and receive your sacred scrolls",         color: GOLD,   tc: INK },
  { name: "The Eye Opens",      sub: "Decode the first cipher — find the hidden path", color: STONE,  tc: "#fff" },
  { name: "The Duat Descent",   sub: "Navigate campus checkpoints under time pressure",color: RUST,   tc: "#fff" },
  { name: "The Heart Weighing", sub: "Solve the final riddle — logic under fire",      color: STONE,  tc: "#fff" },
  { name: "Osiris Judges",      sub: "The last team standing claims glory",            color: "#3B2200", tc: SAND },
];

const POCS = [
  { name: "Sahil",  phone: "9508883828" },
  { name: "Nisarg", phone: "8866475747" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.font-cinzel  { font-family: 'Cinzel', serif; }
.font-crimson { font-family: 'Crimson Pro', serif; }

@keyframes flicker {
  0%,100% { opacity: 1; transform: scale(1); }
  45%     { opacity: 0.4; transform: scale(1.5); }
  55%     { opacity: 0.9; transform: scale(1.2); }
}

@keyframes drift {
  0%,100% { transform: translateY(0) rotate(-0.5deg); }
  50%      { transform: translateY(-12px) rotate(0.5deg); }
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.anim-flicker { animation: flicker 3s ease-in-out infinite; }
.anim-drift   { animation: drift 5s ease-in-out infinite; }
.delay-0 { animation-delay: 0s; }
.delay-1 { animation-delay: 0.8s; }
.delay-2 { animation-delay: 1.5s; }
.delay-3 { animation-delay: 2.2s; }

/* Dot grid — papyrus texture feel */
.papyrus-bg {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(rgba(200,134,10,0.12) 1px, transparent 1px),
    radial-gradient(rgba(200,134,10,0.06) 1px, transparent 1px);
  background-size: 30px 30px, 15px 15px;
  background-position: 0 0, 15px 15px;
  opacity: 0.6;
}

/* Shimmer text */
.shimmer-text {
  background: linear-gradient(90deg, ${SAND} 0%, #fff 40%, ${GOLD} 60%, ${SAND} 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

/* Hieroglyph divider strip */
.hiero-strip {
  display: flex;
  overflow: hidden;
  height: 24px;
  border-top: 1.5px solid rgba(200,134,10,0.35);
  border-bottom: 1.5px solid rgba(200,134,10,0.35);
  align-items: center;
}
.hiero-strip span {
  min-width: 20px; height: 16px;
  margin: 0 2px; flex-shrink: 0;
  border: 1px solid rgba(200,134,10,0.22);
  background: rgba(200,134,10,0.08);
  border-radius: 2px;
}

/* Cards */
.card-egypt {
  position: relative; overflow: hidden;
  transition: transform 0.28s ease, background 0.2s, box-shadow 0.28s;
}
.card-egypt::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: var(--accent, ${GOLD});
  opacity: 0; transition: opacity 0.2s;
}
.card-egypt:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
.card-egypt:hover::before { opacity: 1; }

/* Timeline */
.t-node {
  position: relative;
  transition: background 0.2s;
  border-right: 1px solid rgba(200,134,10,0.1);
}
.t-node:last-child { border-right: none; }

/* Ankh decorative */
.ankh-glow {
  position: absolute; pointer-events: none; border-radius: 50%;
  background: radial-gradient(circle, rgba(200,134,10,0.10) 0%, transparent 70%);
}

/* CTA background runes */
.cta-bg::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(200,134,10,0.1) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.5;
}

/* Scarab floating elements */
.scarab {
  position: absolute;
  font-size: 40px;
  opacity: 0.12;
  pointer-events: none;
}

/* Register button */
.btn-egypt {
  font-family: 'Cinzel', serif;
  display: inline-block; cursor: pointer;
  background: ${GOLD}; color: ${INK};
  padding: 14px 52px; border: none;
  font-size: 16px; letter-spacing: 3px;
  font-weight: 700; border-radius: 3px;
  border-bottom: 4px solid #7A5000;
  box-shadow: 0 8px 30px rgba(200,134,10,0.3);
  transition: transform 0.15s, box-shadow 0.15s, border-bottom-width 0.1s;
  text-transform: uppercase;
}
.btn-egypt:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(200,134,10,0.45);
  border-bottom-width: 2px;
}
.btn-egypt:active {
  transform: translateY(1px);
  border-bottom-width: 1px;
}

/* Ornament line */
.ornament {
  display: flex; align-items: center; gap: 14px;
  color: rgba(200,134,10,0.4); font-size: 12px; letter-spacing: 4px;
}
.ornament::before, .ornament::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,134,10,0.4), transparent);
}

/* Section label */
.section-label {
  font-family: 'Cinzel', serif;
  font-size: 11px; letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

@media(max-width: 960px) {
  .scarab-stack  { display: none !important; }
  .hero-inner    { padding: 80px 24px 120px !important; }
  .stats-grid    { grid-template-columns: 1fr 1fr !important; }
  .section-pad   { padding: 72px 24px !important; }
  .timeline-flex { flex-direction: column !important; border-radius: 14px !important; }
  .t-node        { border-right: none !important; border-bottom: 1px solid rgba(200,134,10,0.1) !important; }
  .footer-inner  { padding: 24px !important; flex-direction: column; gap: 20px; text-align: center; }
}
`;

export default function ScotlandYardPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="font-crimson overflow-x-hidden antialiased" style={{ background: INK, color: "#fff" }}>

        {/* ── HERO ── */}
        <section
          className="hero-inner relative flex items-center overflow-hidden"
          style={{ minHeight: "95vh", padding: "100px 80px", background: `linear-gradient(130deg, ${INK} 0%, ${PAPYRUS} 100%)` }}
        >
          <div className="papyrus-bg" />

          {/* Ambient glow orbs */}
          <div className="ankh-glow" style={{ width: 600, height: 600, left: -200, top: "40%", transform: "translateY(-50%)" }} />
          <div className="ankh-glow" style={{ width: 400, height: 400, right: 100, top: "20%" }} />

          {/* Floating scarabs */}
          <div className="scarab" style={{ right: 90, top: "15%", fontSize: 60 }}>𓂀</div>
          <div className="scarab" style={{ right: 200, bottom: "18%", fontSize: 44 }}>𓆣</div>
          <div className="scarab" style={{ right: 60, bottom: "38%", fontSize: 32 }}>𓅓</div>

          <div className="relative z-10" style={{ maxWidth: 660 }}>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 font-cinzel"
              style={{ border: `1px solid rgba(200,134,10,0.4)`, padding: "6px 20px", marginBottom: 28, fontSize: 12, letterSpacing: 4, color: SAND, borderRadius: 2 }}
            >
              <span className="anim-flicker inline-block" style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
              ISTE NITK · Scotland Yard 2025
            </div>

            <div className="font-cinzel" style={{ fontSize: 13, letterSpacing: 6, color: "rgba(232,200,122,0.55)", marginBottom: 10, textTransform: "uppercase" }}>
              Scotland Yard Presents
            </div>

            <h1
              className="font-cinzel shimmer-text"
              style={{ fontSize: "clamp(62px, 9vw, 110px)", lineHeight: 0.92, letterSpacing: 2, marginBottom: 10 }}
            >The Trials</h1>
            <h1
              className="font-cinzel"
              style={{ fontSize: "clamp(62px, 9vw, 110px)", lineHeight: 0.92, letterSpacing: 2, marginBottom: 20, color: RUST, textShadow: `4px 4px 0 rgba(0,0,0,0.5)` }}
            >of Osiris</h1>

            <div className="ornament" style={{ marginBottom: 28 }}>JUDGEMENT AWAITS</div>

            <p className="font-crimson" style={{ color: "rgba(232,200,122,0.6)", maxWidth: 480, lineHeight: 2, fontSize: 19, fontWeight: 300, marginBottom: 38, fontStyle: "italic" }}>
              The sands of time have spoken. Your wit will be tested. Your conscience weighed.
              Your every step, closer to salvation — or doom.
            </p>

            <button className="btn-egypt">Register Now</button>
          </div>

          {/* Floating stone tablets */}
          <div
            className="scarab-stack absolute flex-col z-10"
            style={{ right: 80, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 14 }}
          >
            {[
              { bg: GOLD,         delay: "delay-0", glyph: "𓂀" },
              { bg: STONE,        delay: "delay-1", glyph: "𓆣" },
              { bg: "#2A1800",    delay: "delay-2", glyph: "𓅓" },
              { bg: RUST,         delay: "delay-3", glyph: "𓁹" },
            ].map(({ bg, delay, glyph }, i) => (
              <div
                key={i}
                className={`anim-drift ${delay}`}
                style={{
                  width: 180, height: 50, borderRadius: 6, background: bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: "rgba(255,255,255,0.4)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
                  borderBottom: "4px solid rgba(0,0,0,0.4)",
                }}
              >{glyph} &nbsp; {glyph} &nbsp; {glyph}</div>
            ))}
          </div>
        </section>

        <HieroStrip color={STONE} />

        {/* ── ABOUT ── */}
        <section className="section-pad border-t border-[rgba(200,134,10,0.08)]" style={{ padding: "96px 80px", background: PAPYRUS }}>
          <div className="section-label" style={{ color: RUST }}>About the Event</div>
          <h2 className="font-cinzel text-white" style={{ fontSize: 52, lineHeight: 0.95, letterSpacing: 2, marginBottom: 14 }}>What Awaits You?</h2>
          <p className="font-crimson" style={{ fontSize: 19, color: "rgba(232,200,122,0.55)", lineHeight: 1.9, fontWeight: 300, maxWidth: 580, marginBottom: 48, fontStyle: "italic" }}>
            A unique treasure hunt exclusive to BTech first-years. Step into the afterlife —
            navigate the campus, decode ciphers, and prove your worth before Osiris himself.
          </p>
          <div className="grid mt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
            {PILLARS.map(p => (
              <div
                key={p.name}
                className="card-egypt"
                style={{
                  "--accent": p.accent,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(200,134,10,0.12)",
                  padding: "28px 24px 24px", borderRadius: 10,
                } as React.CSSProperties}
              >
                <span style={{ fontSize: 28, marginBottom: 14, display: "block" }}>{p.icon}</span>
                <h3 className="font-cinzel text-white" style={{ fontSize: 18, letterSpacing: 2, marginBottom: 8 }}>{p.name}</h3>
                <p className="font-crimson" style={{ fontSize: 15, color: "rgba(232,200,122,0.42)", lineHeight: 1.75 }}>{p.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <HieroStrip color={INK} />

        {/* ── EVENT INFO ── */}
        <section className="section-pad border-t border-[rgba(200,134,10,0.08)]" style={{ padding: "96px 80px" }}>
          <div className="section-label" style={{ color: GOLD }}>Event Info</div>
          <h2 className="font-cinzel text-white" style={{ fontSize: 52, lineHeight: 0.95, letterSpacing: 2, marginBottom: 14 }}>The Sacred Details</h2>
          <p className="font-crimson" style={{ fontSize: 19, color: "rgba(232,200,122,0.48)", lineHeight: 1.9, fontWeight: 300, maxWidth: 560, marginBottom: 48, fontStyle: "italic" }}>
            Know the time, place, and stakes before you dare enter the trials.
          </p>
          <div className="stats-grid grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
            {STATS.map(s => (
              <div
                key={s.label}
                className="flex items-center"
                style={{
                  background: "rgba(255,255,255,0.025)", border: "1px solid rgba(200,134,10,0.1)",
                  padding: "28px 24px", borderRadius: 10, gap: 18,
                  transition: "transform 0.25s, background 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(200,134,10,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 50, height: 50, borderRadius: 8, background: "rgba(200,134,10,0.1)", border: "1px solid rgba(200,134,10,0.2)", fontSize: 22 }}
                >{s.icon}</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(232,200,122,0.3)", marginBottom: 5 }}>{s.label}</div>
                  <div className="font-cinzel text-white" style={{ fontSize: 18, letterSpacing: 1 }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* POC */}
          <div style={{ marginTop: 48 }}>
            <div className="ornament" style={{ marginBottom: 28 }}>Points of Contact</div>
            <div className="flex" style={{ gap: 18, flexWrap: "wrap" }}>
              {POCS.map(poc => (
                <div
                  key={poc.name}
                  style={{ background: "rgba(200,134,10,0.07)", border: "1px solid rgba(200,134,10,0.15)", borderRadius: 10, padding: "18px 32px", display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div className="font-cinzel text-white" style={{ fontSize: 15, letterSpacing: 2 }}>{poc.name}</div>
                  <div className="font-crimson" style={{ fontSize: 17, color: SAND }}>{poc.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HieroStrip color={STONE} />

        {/* ── TIMELINE ── */}
        <section className="section-pad border-t border-[rgba(200,134,10,0.08)]" style={{ padding: "96px 80px", background: PAPYRUS }}>
          <div className="section-label" style={{ color: RUST }}>The Trials</div>
          <h2 className="font-cinzel text-white" style={{ fontSize: 52, lineHeight: 0.95, letterSpacing: 2, marginBottom: 14 }}>Five Chambers</h2>
          <p className="font-crimson" style={{ fontSize: 19, color: "rgba(232,200,122,0.48)", lineHeight: 1.9, fontWeight: 300, maxWidth: 560, marginBottom: 48, fontStyle: "italic" }}>
            Five stages stand between you and Osiris&apos;s blessing. Only the worthy shall pass.
          </p>
          <div
            className="timeline-flex flex overflow-hidden"
            style={{ borderRadius: 12, border: "1px solid rgba(200,134,10,0.12)" }}
          >
            {ROUNDS.map((r, i) => (
              <div
                key={r.name}
                className="t-node flex-1 text-center"
                style={{ padding: "32px 14px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(200,134,10,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div className="font-cinzel" style={{ fontSize: 11, letterSpacing: 4, color: "rgba(232,200,122,0.3)", marginBottom: 10, textTransform: "uppercase" }}>Stage {i + 1}</div>
                <div
                  className="font-cinzel mx-auto flex items-center justify-center"
                  style={{ width: 34, height: 34, borderRadius: 6, marginBottom: 14, fontSize: 13, background: r.color, color: r.tc, borderBottom: "3px solid rgba(0,0,0,0.35)", boxShadow: "0 4px 14px rgba(0,0,0,0.45)" }}
                >{i + 1}</div>
                <h3 className="font-cinzel text-white" style={{ fontSize: 14, letterSpacing: 1, marginBottom: 8, lineHeight: 1.4 }}>{r.name}</h3>
                <p className="font-crimson" style={{ fontSize: 15, color: "rgba(232,200,122,0.38)", lineHeight: 1.6 }}>{r.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <HieroStrip color={GOLD} />

        {/* ── CTA ── */}
        <section
          className="cta-bg text-center relative overflow-hidden border-t border-[rgba(200,134,10,0.1)]"
          style={{ padding: "120px 20px", background: `linear-gradient(130deg, ${PAPYRUS} 0%, ${INK} 100%)` }}
        >
          <div className="scarab" style={{ left: "5%", top: "20%", fontSize: 80, opacity: 0.06 }}>𓂀</div>
          <div className="scarab" style={{ right: "6%", bottom: "15%", fontSize: 70, opacity: 0.06 }}>𓆣</div>

          <div className="relative z-10">
            <div className="ornament" style={{ marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>THE HOUR IS AT HAND</div>
            <h2
              className="font-cinzel text-white"
              style={{ fontSize: "clamp(48px, 6vw, 78px)", letterSpacing: 3, marginBottom: 14, textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}
            >Do You Dare Enter?</h2>
            <p className="font-crimson" style={{ fontSize: 18, color: "rgba(232,200,122,0.45)", marginBottom: 44, fontWeight: 300, fontStyle: "italic" }}>
              The afterlife awaits. Prove your worth and claim eternal glory.
            </p>
            <button className="btn-egypt">Register Now</button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          className="footer-inner flex items-center justify-between"
          style={{ background: "#04030A", padding: "28px 80px", minHeight: 80, borderTop: `2px solid rgba(200,134,10,0.2)` }}
        >
          <div>
            <div className="font-cinzel" style={{ fontSize: 15, letterSpacing: 5, color: GOLD }}>ISTE NITK</div>
            <div className="font-crimson" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>Indian Society for Technical Education · NITK Surathkal</div>
          </div>
          <div className="flex" style={{ gap: 28 }}>
            {["Home", "Events", "Instagram", "Contact"].map(l => (
              <a
                key={l} href="#"
                className="no-underline font-cinzel transition-colors duration-200 hover:text-[#C8860A]"
                style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}
              >{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}

function HieroStrip({ color }: { color: string }) {
  return (
    <div className="hiero-strip" style={{ background: color }}>
      {Array.from({ length: 100 }).map((_, i) => <span key={i} />)}
    </div>
  );
}
