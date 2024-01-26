import {
  CaretRight,
  Link,
  ShieldStar,
  Browser,
  GithubLogo,
} from "@phosphor-icons/react";

export function Guides() {
  return (
    <section className="flex overflow-hidden justify-center items-center pt-24 pb-12 bg-neutral-950">
      <div className="flex gap-10 justify-between items-start w-full max-w-5xl">
        <div className="flex flex-col flex-1 justify-start items-start">
          <div className="flex justify-between items-center mb-10 w-full">
            <h2 className="text-2xl lg:text-3xl">Popular Guides</h2>
            <a href="/guides" className="text-[#289ef9]">
              See all
            </a>
          </div>
          <ul className="w-full list-none">
            <a href="/guides/configuring-oauth">
              <li className="flex justify-between mb-8 w-full group">
                <div className="flex gap-2">
                  <ShieldStar size={32} />
                  <div className="flex flex-col items-start">
                    Customizing OAuth Providers
                    <span className="text-neutral-300 dark:text-neutral-700">
                      Little description of the guide
                    </span>
                  </div>
                </div>
                <div className="opacity-0 transition duration-300 group-hover:opacity-100">
                  <CaretRight size={32} className="" />
                </div>
              </li>
            </a>
            <a href="/guides/deep-dive/oauth-github-setup">
              <li className="flex justify-between mb-8 w-full group">
                <div className="flex gap-2">
                  <GithubLogo size={32} />
                  <div className="flex flex-col items-start">
                    OAuth with Github
                    <span className="text-neutral-300 dark:text-neutral-700">
                      Little description of the guide
                    </span>
                  </div>
                </div>
                <div className="opacity-0 transition duration-300 group-hover:opacity-100">
                  <CaretRight size={32} className="" />
                </div>
              </li>
            </a>
            <a href="/guides/custom-pages/custom-sign-in">
              <li className="flex justify-between mb-8 w-full group">
                <div className="flex gap-2">
                  <Browser size={32} />
                  <div className="flex flex-col items-start">
                    Custom Signin Page
                    <span className="text-neutral-300 dark:text-neutral-700">
                      Little description of the guide
                    </span>
                  </div>
                </div>
                <div className="opacity-0 transition duration-300 group-hover:opacity-100">
                  <CaretRight size={32} className="" />
                </div>
              </li>
            </a>
          </ul>
        </div>
        <div className="flex flex-col flex-1 justify-start items-start">
          <div className="flex justify-between items-center mb-10 w-full">
            <h2 className="text-2xl lg:text-3xl">Sample Apps</h2>
            <a href="/example-apps" className="text-[#289ef9]">
              See all
            </a>
          </div>
          <ul className="w-full list-none">
            <li className="flex justify-between items-center mb-8 w-full">
              <div className="">Next.js App Router</div>
              <div className="flex gap-4">
                <a
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300"
                  target="_blank"
                  href="https://next-auth-example.vercel.app" rel="noreferrer"
                >
                  <Link size={28} />
                  Visit
                </a>
                <a
                  target="_blank"
                  href="https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs"
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300" rel="noreferrer"
                >
                  <GithubLogo size={28} />
                  Clone
                </a>
              </div>
            </li>
            <li className="flex justify-between items-center mb-8 w-full">
              <div className="">Next.js Pages</div>
              <div className="flex gap-4">
                <a
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300"
                  target="_blank"
                  href="https://next-auth-example.vercel.app" rel="noreferrer"
                >
                  <Link size={28} />
                  Visit
                </a>
                <a
                  target="_blank"
                  href="https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs"
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300" rel="noreferrer"
                >
                  <GithubLogo size={28} />
                  Clone
                </a>
              </div>
            </li>
            <li className="flex justify-between items-center mb-8 w-full">
              <div className="">SvelteKit</div>
              <div className="flex gap-4">
                <a
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300"
                  target="_blank"
                  href="https://sveltekit-auth-example.vercel.app" rel="noreferrer"
                >
                  <Link size={28} />
                  Visit
                </a>
                <a
                  target="_blank"
                  href="https://github.com/nextauthjs/next-auth/tree/main/apps/examples/sveltekit"
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300" rel="noreferrer"
                >
                  <GithubLogo size={28} />
                  Clone
                </a>
              </div>
            </li>
            <li className="flex justify-between items-center mb-8 w-full">
              <div className="">Express</div>
              <div className="flex gap-4">
                <a
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300"
                  target="_blank"
                  href="https://authjs-express-dev-app.onrender.com/" rel="noreferrer"
                >
                  <Link size={28} />
                  Visit
                </a>
                <a
                  target="_blank"
                  href="https://github.com/nextauthjs/next-auth/tree/main/apps/examples/express"
                  className="flex gap-2 items-center p-2 px-4 rounded-md transition duration-300 outline-none focus-visible:ring-2 bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300" rel="noreferrer"
                >
                  <GithubLogo size={28} />
                  Clone
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
