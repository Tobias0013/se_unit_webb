/* Author(s): Tobias Vinblad */

import React, { useEffect } from "react";
import "./loading.css";

type LoadingProps = {
  text?: string;
  waveSpeed?: number;
  waveHeight?: number;
  className?: string;
};

/**
 * A React functional component that displays a loading animation with a wave effect.
 * Each character of the provided text animates in a wave-like motion.
 *
 * @param props - The properties for the Loading component.
 * @param props.text - The text to display as part of the loading animation. Defaults to "Loading...".
 * @param props.waveSpeed - The speed of the wave animation in seconds. Defaults to 1.5 seconds.
 * @param props.waveHeight - The height of the wave animation in pixels. Defaults to 7.5 pixels.
 * @param props.className - Additional CSS class names to apply to the root element.
 *
 * @returns A JSX element that renders the animated loading text.
 *
 * @remarks
 * - The component dynamically injects a `<style>` tag into the document head to define the animation styles.
 * - The animation styles are removed from the document head when the component unmounts.
 *
 * @example
 * ```tsx
 * <Loading text="Please wait" waveSpeed={2} waveHeight={10} className="custom-loading" />
 * ```
 */
export default function Loading(props: LoadingProps) {
  const text = props.text || "Loading...";
  const waveSpeed = props.waveSpeed || 1.5;
  const waveHeight = props.waveHeight || 7.5;
  const className = props.className || "";

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .loading span {
        display: inline-block;
        animation: wave ${waveSpeed}s ease-in-out infinite;
        animation-fill-mode: both;
      }
      @keyframes wave {
        0% {
          transform: translateY(0);
        }
        50% {
        transform: translateY(-${waveHeight}px);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [text]);

  return (
    <div className={`loading ${className}`}>
      {text.split("").map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char}&nbsp;
        </span>
      ))}
    </div>
  );
}
