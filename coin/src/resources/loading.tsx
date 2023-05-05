import * as React from "react"
import { SVGProps } from "react"

const LoadingSvg = (loadingProps: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    viewBox="0 0 100 100"
    {...loadingProps}
  >
    <path
      d="M10 50a40 40 0 1 1 80 0"
      style={{
        fill: "none",
        strokeWidth: 8,
      }}
    >
      <animateTransform
        attributeName="transform"
        attributeType="xml"
        dur="1s"
        from="0 50 50"
        repeatCount="indefinite"
        to="360 50 50"
        type="rotate"
      />
    </path>
  </svg>
);

export default LoadingSvg;
