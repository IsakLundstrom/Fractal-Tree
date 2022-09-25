import "./Fractal.css";
import { useState, useRef, useEffect, useCallback } from "react";

export const Fractal = (props) => {
  const [angle, setAngle] = useState(30);
  const [deapth, setDeapth] = useState(5);
  const [leftLength, setLeftLength] = useState(0.7);
  const [rightLength, setRightLength] = useState(0.7);

  const canvasRef = useRef(null);

  const draw = useCallback(
    (ctx, startX, startY, length, dAngle, deapth) => {
      if (deapth < 1) {
        return;
      }
      ctx.moveTo(startX, startY);
      let endX = Math.cos(dAngle) * length + startX;
      let endY = Math.sin(dAngle) * length + startY;
      ctx.strokeStyle = "#DBCFB0";
      ctx.lineTo(endX, endY);
      draw(ctx, endX, endY, length * leftLength, dAngle - (angle * Math.PI) / 180, deapth - 1);
      draw(ctx, endX, endY, length * rightLength, dAngle + (angle * Math.PI) / 180, deapth - 1);
      ctx.stroke();
    },
    [angle, leftLength, rightLength]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.99;

    draw(context, canvas.width / 2, canvas.height * 0.7, (canvas.height / 2) * 0.31, -Math.PI / 2, deapth);
  }, [draw, deapth]);

  return (
    <div className="fractal">
      <canvas ref={canvasRef} {...props}></canvas>
      <div className="controllsContainer">
        <div className="controlls">
          <div className="sliderContainer">
            <h2>Angle</h2>
            <input
              type="range"
              min="0"
              max="180"
              value={angle}
              onChange={(event) => setAngle(event.target.value)}
              className="sliderSpeed"
              id="slider"
              step="5"
            ></input>
            <p>{angle}</p>
          </div>

          <div className="sliderContainer">
            <h2>Deapth</h2>
            <input
              type="range"
              min="0"
              max="10"
              value={deapth}
              onChange={(event) => setDeapth(event.target.value)}
              className="sliderSpeed"
              id="slider"
              step="1"
            ></input>
            <p>{deapth}</p>
          </div>

          <div className="sliderContainer">
            <h2>Left</h2>
            <input
              type="range"
              min="0.1"
              max="0.8"
              value={leftLength}
              onChange={(event) => setLeftLength(event.target.value)}
              className="sliderSpeed"
              id="slider"
              step="0.1"
            ></input>
            <p>{leftLength * 100}%</p>
          </div>

          <div className="sliderContainer">
            <h2>Right</h2>
            <input
              type="range"
              min="0.1"
              max="0.8"
              value={rightLength}
              onChange={(event) => setRightLength(event.target.value)}
              className="sliderSpeed"
              id="slider"
              step="0.1"
            ></input>
            <p>{rightLength * 100}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
