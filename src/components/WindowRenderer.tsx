"use client";

import { AnimatePresence } from "framer-motion";
import ExplorerWindow from "@/components/ExplorerWindow";
import { useWindows } from "@/contexts/WindowContext";
import { appTitles, type AppId } from "@/lib/constants";
import APropos from "@/components/sections/APropos";
import MonParcours from "@/components/sections/MonParcours";
import MesProjets from "@/components/sections/MesProjets";
import MesCompetences from "@/components/sections/MesCompetences";
import Terminal from "@/components/Terminal";
import Notepad from "@/components/Notepad";
import { useEffect, useState } from "react";

function WindowContent({ appId }: { appId: AppId }) {
  switch (appId) {
    case "apropos":
      return <APropos />;
    case "parcours":
      return <MonParcours />;
    case "projets":
      return <MesProjets />;
    case "competences":
      return <MesCompetences />;
    case "terminal":
      return <Terminal />;
    case "notepad":
      return <Notepad />;
  }
}

export default function WindowRenderer() {
  const {
    windows,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updatePosition,
    taskbarHeight,
  } = useWindows();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <AnimatePresence mode="popLayout">
      {windows
        .filter((w) => !w.minimized)
        .map((win) => (
          <ExplorerWindow
            key={win.id}
            title={appTitles[win.appId]}
            windowState={win}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onUpdatePosition={(pos) => updatePosition(win.id, pos)}
            taskbarHeight={taskbarHeight}
            isMobile={isMobile}
          >
            <WindowContent appId={win.appId} />
          </ExplorerWindow>
        ))}
    </AnimatePresence>
  );
}
