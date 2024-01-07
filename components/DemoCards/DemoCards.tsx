import { Link } from "../Link/Link";
import { Tooltip } from "../Tooltip/Tooltip";

export function DemoCards() {
  return (
    <div className="mb-12 mt-8 flex w-full flex-row justify-around">
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
        {
          href: "https://authjs-express-dev-app.onrender.com/",
          img: "https://authjs.dev/img/frameworks/express.svg",
          name: "Express",
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
            className="relative flex w-28 flex-col flex-wrap items-center justify-between rounded-lg border border-solid border-slate-200 p-4 shadow-lg bg-white"
            target="_blank"
          >
            <img src={img} width={logoWidth} />
            <div className="mt-3 text-sm">{name}</div>
            {wip ? (
              <div
                className="absolute rounded-full bg-amber-300 px-3 py-1 text-sm font-semibold text-black shadow-sm"
                style={{ right: "-30px", top: "-15px" }}
              >
                Beta
              </div>
            ) : null}
          </Link>
        );

        return wip ? (
          <Tooltip key={name} label={label as string}>
            {content}
          </Tooltip>
        ) : (
          content
        );
      })}
    </div>
  );
}
