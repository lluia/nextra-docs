import { Link } from "@/components/Link";
import { Tooltip } from "@/components/Tooltip";

export function DemoCards() {
  return (
    <div className="flex flex-row justify-around mt-8 mb-12 w-full">
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
            className="flex relative flex-col flex-wrap justify-between items-center p-4 w-28 bg-white rounded-lg border border-solid shadow-lg dark:border-gray-800 border-slate-200 dark:bg-neutral-900"
            target="_blank"
          >
            <img alt={name} src={img} width={logoWidth} />
            <div className="mt-3 text-sm">{name}</div>
            {wip ? (
              <div
                className="absolute py-1 px-3 text-sm font-semibold text-black bg-amber-300 rounded-full shadow-sm"
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
