import {Composition} from 'remotion';
import {LyricVideo} from './LyricVideo';
import {settings} from './lyrics';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="LyricVideo"
    component={LyricVideo}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={Math.ceil(settings.durationSeconds * 30)}
  />
);
