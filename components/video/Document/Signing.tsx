import React from "react";
import useOnDraw from "../../../src/hooks/useOnDraw";

const Signing = () => {
  const setCanvasRef = useOnDraw();
  return (
    <div className="bg-gray-300 h-screen">
        hola
      <canvas
        width={"200rem"}
        height={"200rem"}
        style={{ border: "1px solid black" }}
        ref={setCanvasRef}
      ></canvas>
    </div>
  );
};

export default Signing;
