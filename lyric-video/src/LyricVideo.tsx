import React from 'react';
import {
  AbsoluteFill, Audio, OffthreadVideo, interpolate, spring,
  staticFile, useCurrentFrame, useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/CormorantGaramond';
import {lyrics, settings} from './lyrics';

const {fontFamily} = loadFont('italic', {weights: ['500', '600']});
const FONT = `${fontFamily}, "Noto Sans Gurmukhi", serif`;

const lineEnd = (i: number) =>
  lyrics[i].end ?? lyrics[i + 1]?.start ?? lyrics[i].start + 4;

const Line: React.FC<{text: string; start: number; end: number}> = ({text, start, end}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - start * fps;
  const total = (end - start) * fps;
  if (local < 0 || local > total) return null;

  const fade = interpolate(local, [0, 10, total - 10, total], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const rise = spring({frame: local, fps, config: {damping: 200}});
  const y = interpolate(rise, [0, 1], [40, 0]);
  const blur = interpolate(rise, [0, 1], [10, 0]);
  const {style, textColor, accentColor, fontSize} = settings;

  const base: React.CSSProperties = {
    fontFamily: FONT, fontStyle: 'italic', fontWeight: 600,
    fontSize: style === 'minimal' ? fontSize * 0.6 : fontSize,
    lineHeight: 1.15, color: textColor, textAlign: 'center',
    padding: '0 90px', opacity: fade,
    transform: `translateY(${y}px)`, filter: `blur(${blur}px)`,
  };

  if (style === 'glow') {
    return (
      <div style={{...base, textShadow: `0 0 18px ${accentColor}AA, 0 0 48px ${accentColor}55, 0 4px 12px #000A`}}>
        {text}
      </div>
    );
  }

  if (style === 'minimal') {
    return (
      <div style={{...base, fontWeight: 500, letterSpacing: 1, textShadow: '0 2px 10px #000C'}}>
        {text.toLowerCase()}
      </div>
    );
  }

  // karaoke: words light up one by one across the line's duration
  const words = text.split(' ');
  const progress = interpolate(local, [0, total * 0.85], [0, words.length], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <div style={{...base, textShadow: '0 3px 12px #000C'}}>
      {words.map((w, i) => {
        const on = Math.min(1, Math.max(0, progress - i));
        return (
          <span key={i} style={{
            color: on > 0.5 ? accentColor : textColor,
            opacity: 0.45 + on * 0.55,
            display: 'inline-block',
            transform: `scale(${1 + on * 0.06})`,
            marginRight: '0.28em',
          }}>{w}</span>
        );
      })}
    </div>
  );
};

export const LyricVideo: React.FC = () => {
  const {fps} = useVideoConfig();
  const lower = settings.position === 'lower';
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <OffthreadVideo
        src={staticFile(settings.video)}
        muted={settings.song !== null}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
      {settings.song && (
        <Audio src={staticFile(settings.song)} startFrom={Math.round(settings.songStartAt * fps)} />
      )}
      {/* soft shade so text stays readable on bright footage */}
      <AbsoluteFill style={{
        background: lower
          ? 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 45%)'
          : 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 65%)',
      }} />
      {lyrics.map((l, i) => (
        <AbsoluteFill key={i} style={{
          justifyContent: lower ? 'flex-end' : 'center',
          alignItems: 'center',
          paddingBottom: lower ? 380 : 0, // clears Instagram's caption area
        }}>
          <Line text={l.text} start={l.start} end={lineEnd(i)} />
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
};
