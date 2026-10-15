# Lyric Video Template (9:16 Reels)

## Setup (once)
1. Install Node.js 18+ from nodejs.org
2. Open this folder in a terminal (or in Claude Code) and run:
   npm install

## Make a video
1. Put your clip in public/ as background.mp4
2. Open src/lyrics.ts, then type your lines and start times
3. Preview with live editing:   npm run studio
4. Export the MP4:              npm run render   → out/lyric-video.mp4

## Tips
- Find timings: play the song in `npm run studio`, pause at each line, and note the second.
- Styles: 'glow' (cinematic), 'karaoke' (word-by-word), 'minimal' (small, lowercase).
- Punjabi script: Gurmukhi falls back to "Noto Sans Gurmukhi". Install it on your computer if the letters look wrong.
- Video already has the song? Keep song: null.
