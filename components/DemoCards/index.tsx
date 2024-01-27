import { Link } from "@/components/Link";
import { Tooltip } from "@/components/Tooltip";

export function DemoCards() {
  return (
    <div className="flex flex-row items-center flex-wrap gap-2 justify-around mt-8 mb-12 w-full">
      {[
        {
          href: "https://next-auth-example.vercel.app/",
          img: "/img/etc/nextjs.svg",
          name: "Next.js",
          logoWidth: "40",
          wip: false,
          label: "",
        },
        {
          href: "https://sveltekit-auth-example.vercel.app/",
          img: "/img/etc/sveltekit.svg",
          name: "SvelteKit",
          logoWidth: "35",
          wip: true,
          // label: (
          //   <>
          //     Officially supported but not fully documented. Help us{" "}
          //     <a href="https://github.com/nextauthjs/next-auth/issues">
          //       document it.
          //     </a>
          //   </>
          // ),
        },
        {
          href: "https://authjs-express-dev-app.onrender.com/",
          img: "/img/etc/express.svg",
          name: "Express",
          logoWidth: "40",
          wip: true,
          // label: (
          //   <>
          //     Officially supported but not fully documented. Help us{" "}
          //     <a href="https://github.com/nextauthjs/next-auth/issues">
          //       document it.
          //     </a>
          //   </>
          // ),
        },
        // {
        //   href: "https://auth-solid.vercel.app/",
        //   img: "/img/etc/solidstart.svg",
        //   name: "SolidStart",
        //   logoWidth: "45",
        //   wip: true,
        //   label: (
        //     <>
        //       Officially supported but not fully documented. Help us{" "}
        //       <a href="https://github.com/nextauthjs/next-auth/issues">
        //         document it.
        //       </a>
        //     </>
        //   ),
        // },
      ].map(({ href, name, img, logoWidth, wip, label }) => {
        const content = (
          <div className="flex flex-col gap-2" key={name}>
            <Link
              href={`/getting-started/installation?framework=${name.toLowerCase()}`}
              className="flex relative flex-col flex-wrap justify-between items-center p-4 w-28 bg-white rounded-lg border border-solid shadow-lg border-slate-200 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <img alt={name} src={img} width={logoWidth} />
              <div className="mt-3 text-sm">{name}</div>
              {wip ? (
                <div
                  className="absolute py-1 px-3 text-sm font-semibold text-black bg-amber-300 rounded-full shadow-sm"
                  style={{ right: "-30px", top: "-15px" }}
                >
                  Experimental
                </div>
              ) : null}
            </Link>
            <a
              href={href}
              rel="noreferrer"
              target="_blank"
              className="flex justify-center p-2 w-full text-sm rounded-md bg-slate-100 dark:bg-neutral-900"
            >
              View Demo
            </a>
          </div>
        );

        return wip && label ? (
          <Tooltip key={name} label={label}>
            {content}
          </Tooltip>
        ) : (
          content
        );
      })}
    </div>
  );
}
