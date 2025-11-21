import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGame } from "./lib/stores/useGame";
import "@fontsource/inter";

import { CyberScene } from "./components/CyberScene";
import { MenuScreen } from "./components/MenuScreen";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { CompletionScreen } from "./components/CompletionScreen";
import { SoundManager } from "./components/SoundManager";

function App() {
  const { phase } = useGame();

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "default"
        }}
      >
        <Suspense fallback={null}>
          <CyberScene />
        </Suspense>
      </Canvas>

      {phase === 'menu' && <MenuScreen />}
      {(phase === 'playing' || phase === 'showingExplanation') && <QuestionDisplay />}
      {phase === 'completed' && <CompletionScreen />}
      
      <SoundManager />
    </div>
  );
}

export default App;
