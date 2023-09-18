"use client";

import { useEffect, useMemo, useRef } from "react";

interface ChartLineSVGProps {
  dataPoints: number[];
  width: number;
  height: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export default function ChartLineSVG({
  dataPoints,
  width,
  height,
  strokeColor = "black",
  strokeWidth = 2,
}: ChartLineSVGProps) {
  const pathRef = useRef<SVGPathElement | null>(null);

  const maxDataPoint = Math.max(...dataPoints);
  const minDataPoint = Math.min(...dataPoints);

  const paddingY = 0.05 * height; // 5% padding on the Y-axis
  const yScale = (height - 2 * paddingY) / (maxDataPoint - minDataPoint);

  const getY = (value: number): number => height - paddingY - (value - minDataPoint) * yScale;

  // Optimize calculations and only recalculate when dataPoints, width, or height change
  const pathData = useMemo(() => {
    let pathDataParts = [`M0 ${getY(dataPoints[0])}`];

    for (let i = 1; i < dataPoints.length; i++) {
      const x1 = (i - 1) * (width / (dataPoints.length - 1));
      const x2 = i * (width / (dataPoints.length - 1));
      const y1 = getY(dataPoints[i - 1]);
      const y2 = getY(dataPoints[i]);

      const controlPointX1 = x1 + width / (dataPoints.length - 1) / 2;
      const controlPointX2 = x1 + width / (dataPoints.length - 1) / 2;

      pathDataParts.push(`C ${controlPointX1} ${y1}, ${controlPointX2} ${y2}, ${x2} ${y2}`);
    }

    return pathDataParts.join(" ").trim();
  }, [dataPoints, width, height]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length} ${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;

      pathRef.current.getBoundingClientRect();

      pathRef.current.style.transition = "stroke-dashoffset 2s ease-in-out";

      requestAnimationFrame(() => {
        pathRef.current.style.strokeDashoffset = "0";
      });
    }
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ backgroundColor: "transparent", display: "block", boxSizing: "border-box" }}>
      <path ref={pathRef} d={pathData} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
    </svg>
  );
}
