import Image from "next/image";
import Marquee from "react-fast-marquee";

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
    <Marquee
      className=""
      style={{
        padding: "70px 0px",
        height: "236px",
        maskImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)",
      }}
      direction="right"
      autoFill
    >
      <ul
        className="flex flex-row justify-center items-center"
        style={{ rowGap: calculatedLogosGap, marginRight: calculatedLogosGap }}
      >
        {imageUrls.map((url) => (
          <li
            className="list-none"
            key={url}
            style={{
              width: `${logoSize * logoMagnifyBy}px`,
              height: `${logoSize * logoMagnifyBy}px`,
            }}
          >
            <div
              key={url}
              style={{
                boxShadow:
                  "0px 0px 10px -5px rgba(255, 255, 255, 0.14), 0px 0px 25px -5px rgba(255, 255, 255, 0.30)",
                width: `${logoSize}px`,
                height: `${logoSize}px`,
                transition: "0.2s ease-in-out",
              }}
              className="rounded-3xl overflow-hidden relative select-none"
            >
              <img src={url} key={url} alt="Example Company" />
            </div>
          </li>
        ))}
      </ul>
    </Marquee>
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
