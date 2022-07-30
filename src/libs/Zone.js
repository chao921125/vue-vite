import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Text, Image, Line } from "react-konva";
import useImage from "use-image";

export default function Zone(props) {
  const ref = useRef(null);
  const [stroke, setStroke] = useState("black");
  const [out, setOut] = useState(true);

  useEffect(() => {
    if (props.x + props.pointX < 0 && !out) {
      // console.log(`out:${props.x} ${props.y}`)
      setOut(true);
    }

    if (props.x + props.pointX > 0 && out) {
      // console.log(`out:${props.x} ${props.y}`)
      setOut(false);
    }
  }, []);

  useEffect(() => {
    if (props.x == 50 && props.y == 50) {
      console.log(props.pointX, props.pointY);

      if (props.x + props.pointX < 0 && !out) {
        // console.log(`out:${props.x} ${props.y}`)
        setOut(true);
      }

      if (props.x + props.pointX > 0 && out) {
        // console.log(`out:${props.x} ${props.y}`)
        setOut(false);
      }
    }
  }, [props.pointX, props.pointY]);

  //   useEffect(() => {
  //     if (props.x == 50 && props.y == 50) {
  //       console.log(out ? "out" : "in");
  //     }
  //   }, [out]);
  const getName = () => {
    // let i = props.name +1;
    let xIndex = Math.floor(props.name / 11);
    return (
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"][props.name % 11] +
      ["1", "2", "3", "4", "5", "6", "7", "8"][xIndex]
    );
  };
  const [image] = useImage("/map_slices/" + getName() + ".png");

  return (
    <>
      {props.scale < 0.1 && (
        <>
          <Rect
            ref={ref}
            onClick={(_) => {
              props.onClick && props.onClick();
            }}
            x={props.x}
            y={props.y}
            width={200}
            height={200}
            fill={props.inPoly?"green":"black"}
            stroke={stroke}
            strokeWidth={2}
          ></Rect>
          <Text
            fontSize={24}
            fill="white"
            x={props.x + 25}
            y={props.y + 25}
            text={getName()}
          />
        </>
      )}

      {props.scale >= 0.1 && (
        <>
          <Image
            image={image}
            x={props.x}
            y={props.y}
            width={200}
            height={200}
            shadowColor="white"
            shadowBlur={2}
            onClick={(_) => {
              console.log(getName());
              props.onClick && props.onClick(getName());
            }}
          />
          <Text
            fontSize={24}
            fill={props.inPoly?"green":"red"}
            x={props.x + 25}
            y={props.y + 25}
            text={getName().toUpperCase()}
          />
        </>
      )}
    </>
  );
}
