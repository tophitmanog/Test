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
  song: null as string | null,    // e.g. 'song.mp3'
  songStartAt: 0,                 // skip this many seconds into the song
  durationSeconds: 15,            // length of the final Reel
  style: 'glow' as Style,         // 'glow' | 'karaoke' | 'minimal'
  position: 'lower' as 'center' | 'lower',
  textColor: '#FFFFFF',
  accentColor: '#FFC86B',         // warm streetlight gold
  fontSize: 78,
};

// start = second the line appears. It stays until the next line starts.
// Add end: 9.5 to any line to make it disappear earlier.
export const lyrics: {start: number; end?: number; text: string}[] = [
  {start: 0.5, text: 'Your first line goes here'},
  {start: 3.5, text: 'Second line of the song'},
  {start: 6.8, text: 'Keep adding lines like this'},
  {start: 10.0, text: 'Last line', end: 14.5},
];
