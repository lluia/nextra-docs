import { memo, useEffect, useState } from "react";
import Img from "next/image";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import manifest from "../../pages/data/manifest.json";

const clamp = (min, num, max) => Math.min(Math.max(num, min), max);
const logoSize = 96; // px

function changeScale() {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    return clamp(30, Number((40 + width * 0.01).toFixed(2)), 80);
  }
}

function changeLogoCount() {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    return clamp(10, Number((10 + width * 0.005).toFixed(0)), 30);
  }
}

export default memo(() => {
  const [scale, setScale] = useState(changeScale);
  const [logoCount, setLogoCount] = useState(changeLogoCount);

  useEffect(() => {
    // Window resize handling
    function handleEvent() {
      setScale(changeScale);
      setLogoCount(changeLogoCount);
    }

    window.addEventListener("resize", handleEvent);
    return () => window.removeEventListener("resize", handleEvent);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <Marquee
        onFinish={() => null}
        onInit={() => null}
        direction="ltr"
        key="1"
        velocity={5}
        scatterRandomly
        resetAfterTries={200}
      >
        {Object.entries(manifest.providers)
          .sort(() => Math.random() - 0.5)
          .filter((_, i) => i < logoCount)
          .map(([key, name]) => (
            <Motion
              key={`company-${key}`}
              backgroundColors={{
                earth: "transparent",
                solarSystem: "transparent",
                buffer: "transparent",
              }}
              initDeg={randomIntFromInterval(0, 360)}
              direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
              velocity={10}
              radius={scale}
            >
              <Img
                src={`/img/providers/${key}.svg`}
                className="opacity-40 grayscale dark:invert"
                width={logoSize}
                height={logoSize}
                alt={`${name} logo`}
              />
            </Motion>
          ))}
      </Marquee>
    </div>
  );
});
