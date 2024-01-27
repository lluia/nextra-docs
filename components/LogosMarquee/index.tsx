import Marquee from "react-fast-marquee";
import Img from "next/image";
import manifest from "../../pages/data/manifest.json";

const logoSize = 96; // px

export function LogosMarquee() {
  return (
    <div className="py-2 w-full">
      <Marquee
        direction="right"
        gradient={true}
        gradientWidth={300}
        gradientColor="#171717"
        autoFill
      >
        {Object.entries(manifest.providers)
          .sort(() => Math.random() - 0.5)
          .map(([key, name]) => (
            <div
              key={key}
              style={{ width: logoSize, height: logoSize }}
              className="flex p-3 select-none mr-4 bg-white dark:bg-gray-400 rounded-3xl shadow-lg shadow-neutral-950"
            >
              <Img
                className="drop-shadow-lg"
                src={`/img/providers/${key}.svg`}
                width={logoSize}
                height={logoSize}
                alt={`${name} logo`}
              />
            </div>
          ))}
      </Marquee>
    </div>
  );
}
