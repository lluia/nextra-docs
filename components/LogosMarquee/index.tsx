import Marquee from "react-fast-marquee";
import { join } from "path";

/*
 the logos have a hover effect that increases their size slightly
 when using transform scale, the images become blurry (because the browser is trying to scale the image up itself)
 instead we are simply increasing the images width/height on hover
 we are also increasing the width/height of the image container to prevent the logos causing each other to move
 */

const logoSize = 96; // px
const logoMagnifyBy = 1.1;
const logosGap = 68; // px

const extraSpace = logoSize * logoMagnifyBy - logoSize;
const calculatedLogosGap = `${logosGap - extraSpace}px`;

export function LogosMarquee() {
  return (
    <div className="py-24 w-full">
      <Marquee
        direction="right"
        gradient={true}
        gradientWidth={300}
        gradientColor="#171717"
        autoFill
      >
        {imageUrls.map((url) => (
          <div
            key={url}
            style={{
              marginRight: "1rem",
              width: `${logoSize}px`,
              height: `${logoSize}px`,
              transition: "0.2s ease-in-out",
            }}
            className="relative select-none"
          >
            <img
              className="rounded-3xl shadow-lg shadow-neutral-950"
              src={url}
              key={url}
              alt="Example Company"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

const imageUrls = [
  "/img/providers-2/stripe.webp",
  "/img/providers-2/spacex.webp",
  "/img/providers-2/openai.webp",
  "/img/providers-2/discord.webp",
  "/img/providers-2/plaid.webp",
  "/img/providers-2/notion.webp",
  "/img/providers-2/linear.webp",
  "/img/providers-2/revolut.webp",
  "/img/providers-2/klarna.webp",
];
