import { Link } from "../Link/Link";
import { Tooltip } from "../Tooltip/Tooltip";

export function DemoCards() {
  return (
    <div className="flex flex-row justify-around w-full mt-8 mb-12">
      {[
        {
          href: "https://next-auth-example.vercel.app/",
          img: "https://authjs.dev/img/frameworks/nextjs.svg",
          name: "Next.js",
          logoWidth: "40",
          wip: false,
          label: "",
        },
        {
          href: "https://sveltekit-auth-example.vercel.app/",
          img: "https://authjs.dev/img/frameworks/sveltekit.svg",
          name: "Sveltekit",
          logoWidth: "35",
          wip: true,
          label: (
            <>
              Officially supported but not documented. Help us{" "}
              <a href="https://github.com/nextauthjs/next-auth/issues">
                document it.
              </a>
            </>
          ),
        },
        {
          href: "https://auth-solid.vercel.app/",
          img: "https://authjs.dev/img/frameworks/solidstart.svg",
          name: "SolidStart",
          logoWidth: "45",
          wip: true,
          label: (
            <>
              Officially supported but not documented. Help us{" "}
              <a href="https://github.com/nextauthjs/next-auth/issues">
                document it.
              </a>
            </>
          ),
        },
      ].map(({ href, name, img, logoWidth, wip, label }) => {
        const content = (
          <Link
            href={href}
            key={name}
            className="p-4 border border-solid border-slate-200 rounded-lg flex flex-col items-center justify-between w-28 shadow-lg relative"
            target="_blank"
          >
            <img src={img} width={logoWidth} />
            <div className="text-sm mt-3">{name}</div>
            {wip ? (
              <div
                className="absolute px-3 py-1 font-semibold text-sm bg-amber-300 text-black rounded-full shadow-sm"
                style={{ right: "-30px", top: "-15px" }}
              >
                Beta
              </div>
            ) : null}
          </Link>
        );

        return wip ? (
          <Tooltip label={label as string}>{content}</Tooltip>
        ) : (
          content
        );
      })}
    </div>
  );
}
