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
  songStartAt: 10,                // skip this many seconds into the song
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
  // Garry Sandhu – Eid: paste your lines here (Gurmukhi or Roman both work)
  {start: 0.5, text: 'Eid Mubarak'},
  {start: 3.5, text: 'Line 1 of the song'},
  {start: 7.0, text: 'Line 2 of the song'},
  {start: 10.5, text: 'Line 3 of the song', end: 14.5},
];
