// ============================================================
//  EDIT THIS FILE ONLY
//  1. Put your video in /public as background.mp4
//  2. (Optional) put the song in /public as song.mp3
//  3. Type your lines below with the second each one starts
// ============================================================

export type Style = 'glow' | 'karaoke' | 'minimal';

export const settings = {
  video: 'background.mp4',
  // Set to null to keep the audio already in your video
  song: 'song.mp3' as string | null,
  songStartAt: 31.9,                // skip this many seconds into the song
  durationSeconds: 15,            // length of the final Reel
  style: 'glow' as Style,         // 'glow' | 'karaoke' | 'minimal'
  position: 'lower' as 'center' | 'lower',
  textColor: '#FFFFFF',
  accentColor: '#FFB25C',         // Eid sunset orange
  fontSize: 78,
};

// start = second the line appears. It stays until the next line starts.
// Add end: 9.5 to any line to make it disappear earlier.
export const lyrics: {start: number; end?: number; text: string}[] = [
  // Garry Sandhu - Eid (song 0:32 to 0:47)
  {start: 0.3, text: 'Teri meri arhiye abaad hoje zindagi'},
  {start: 4.3, text: 'Apne ton kohan door rehan ni giley'},
  {start: 8.3, text: 'Tere mukh da deedar mainu Eid warga'},
  {start: 11.3, text: 'Koi farak ni painda chann disey na disey', end: 14.8},
];
