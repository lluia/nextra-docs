import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col items-center px-6 my-8 mx-auto w-full text-gray-600 dark:text-gray-100 max-w-[90rem]">
      <div className="flex justify-between mb-2 w-full">
        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-black">About Auth.js</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="/overview">Introduction</a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://vercel.com?utm_source=authjs&utm_campaign=oss"
              >
                <Image
                  alt="Powered by Vercel"
                  style={{ marginTop: "8px" }}
                  height="32"
                  width="167"
                  src="https://raw.githubusercontent.com/nextauthjs/next-auth/main/docs/static/img/powered-by-vercel.svg"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-black">Download</h3>
          <ul className="flex flex-col gap-2">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/nextauthjs/next-auth"
            >
              GitHub
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.npmjs.com/package/next-auth"
            >
              NPM
            </a>
          </ul>
        </div>
        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-black">Acknowledgements</h3>
          <ul className="flex flex-col gap-2">
            <a href="/contributors">Contributors</a>
            <a href="/sponsors">Sponsors</a>
          </ul>
        </div>
      </div>
      <div className="flex-grow mx-auto text-gray-400 dark:text-gray-500">
        Auth.js &copy; Balázs Orbán and Team - {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Footer;
