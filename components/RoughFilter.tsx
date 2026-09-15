/**
 * A single SVG turbulence filter, mounted once per page, that the card borders
 * reference by id. Displacing the edge a couple of pixels reads as a pen stroke
 * instead of a CSS border, which is what the design calls for.
 */
export default function RoughFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      className="absolute"
    >
      <filter id="rough-edge">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.035 0.045"
          numOctaves={3}
          seed={7}
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={6}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
