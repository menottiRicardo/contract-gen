import React, { ReactElement, useRef } from "react";

const useOnDraw = () => {
  const canvasRef: any = useRef(null);

  function setCanvasRef(ref: any) {
    if (!ref) return;

    canvasRef.current = ref;
    initMouseMoveListener();
  }

  function initMouseMoveListener() {
    const mouseMoveListener = (e: any) => {
      
      const point = computePointInCanvas(e.clientX, e.clientY)
      console.log("here", point);
    };
    window.addEventListener("mousemove", mouseMoveListener);
  }

  function computePointInCanvas(clientX: number, clientY: number) {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    }
    return null;
  }
  return setCanvasRef;
};

export default useOnDraw;
