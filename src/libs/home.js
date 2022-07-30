import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Zone from "./Zone";
export default function Home() {
  const stage = useRef(null);
  const [scale, setScale] = useState(0.6);
  const [items, setItems] = useState([]);
  const [moveStart, setMoveStart] = useState({ x: 0, y: 0 });
  const [point, setPoint] = useState({ x: 0, y: 0 });

  const [zone, setZone] = useState(null);

  function isPtInPoly(x, y, poly) {
    var iSum = 0,
      iCount;
    var dLon1, dLon2, dLat1, dLat2, dLon;
    if (poly.length < 3) {
      return false;
    }
    iCount = poly.length;
    for (var i = 0; i < iCount; i++) {
      if (i == iCount - 1) {
        dLon1 = poly[i].x;
        dLat1 = poly[i].y;
        dLon2 = poly[0].x;
        dLat2 = poly[0].y;
      } else {
        dLon1 = poly[i].x;
        dLat1 = poly[i].y;
        dLon2 = poly[i + 1].x;
        dLat2 = poly[i + 1].y;
      }
      //以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
      if ((y >= dLat1 && y < dLat2) || (y >= dLat2 && y < dLat1)) {
        if (Math.abs(dLat1 - dLat2) > 0) {
          //得到 A点向左射线与边的交点的x坐标：
          dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - y)) / (dLat1 - dLat2);
          if (dLon < x) iSum++;
        }
      }
    }
    if (iSum % 2 != 0) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    let items = generateShapes();
    setItems(items);
  }, []);

  function generateShapes() {
    return [...Array(88)].map((_, i) => ({
      id: i,
      x: (i % 11) * 200 + 100,
      y: Math.floor(i / 11) * 200 + 100,
    }));
  }

  return (
    <div>
      <Stage
        ref={stage}
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={(e) => {
          e.evt.preventDefault();
        }}
      >
        <Layer width={window.innerWidth} height={window.innerHeight}>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill="grey"
          />
        </Layer>
        <Layer
          x={0}
          y={0}
          width={12 * 200}
          height={9 * 200}
          draggable={true}
          onWheel={(e) => {
            let newScale = scale - e.evt.deltaY / 1000;
            if (newScale > 0.2 && newScale < 3) {
              setScale(scale - e.evt.deltaY / 1000);
            }
          }}
          scaleX={scale}
          scaleY={scale}
          onDragStart={(e) => {
            setMoveStart({ x: e.evt.offsetX, y: e.evt.offsetY });
          }}
          onDragEnd={(e) => {
            let x = e.evt.offsetX - moveStart.x;
            let y = e.evt.offsetY - moveStart.y;

            setPoint({
              x: point.x + x,
              y: point.y + y,
            });
          }}
        >
          <Rect x={0} y={0} width={12 * 200} height={9 * 200} fill="white" />
          {items.map((item) => {
            return (
              <Zone
                onClick={(e) => {
                    setZone(e)
                }}
                inPoly={isPtInPoly(item.x, item.y, [
                  { x: 300, y: 300 },
                  { x: 1200, y: 300 },
                  { x: 1600, y: 600 },
                  { x: 1200, y: 1200 },
                  { x: 300, y: 1200 },
                ])}
                key={item.id}
                name={item.id}
                x={item.x}
                y={item.y}
                pointX={point.x}
                pointY={point.y}
                scale={scale}
              />
            );
          })}
        </Layer>
      </Stage>
      {zone && <div style={{position:"absolute",right:'100px',top:'100px',height:'200px',width:'200px',backgroundColor:'black'}}>
        <img src={'/map_slices/'+zone+".png"} width="200px" height="200px"/>
        </div>}

    </div>
  );
}
