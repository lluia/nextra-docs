import { Pre } from "nextra/components";
import { ChangeEventHandler, useState } from "react";

interface CallbackURLGeneratorProps {
  defaults: {
    protocol: string;
    origin: string;
    basePath: string;
    provider: string;
  };
}

function CallbackURLGenerator(props: CallbackURLGeneratorProps) {
  const { defaults } = props;
  const [url, setURL] = useState(defaults);

  function handleChange(name: string) {
    return function (
      e: Parameters<ChangeEventHandler<HTMLInputElement | HTMLSelectElement>>[0]
    ) {
      setURL((url) => ({ ...url, [name]: e.target.value }));
    };
  }

  return (
    <div className="outline outline-gray-300 p-2">
      <p className="my-2">
        Copy the callback URL below to your OAuth application.
      </p>
      <div className=" flex gap-3 items-center">
        <span>
          <select
            defaultValue={defaults.protocol}
            className="p-1"
            onChange={handleChange("protocol")}
            value={url.protocol}
          >
            <option>https://</option>
            <option>http://</option>
          </select>
          <label className="text-xs italic">protocol</label>
        </span>
        <span className="">
          <input
            onChange={handleChange("origin")}
            className="p-1 bg-slate-100 border"
            defaultValue={defaults.origin}
          />
          <label className="text-xs italic">origin</label>
        </span>
        <span>
          <input
            onChange={handleChange("basePath")}
            className="p-1 bg-slate-100 border"
            defaultValue={defaults.basePath}
          />
          <label className="text-xs italic">basePath</label>
        </span>
        <span className="flex-1">
          <select
            defaultValue={defaults.provider}
            className="p-1"
            onChange={handleChange("provider")}
            value={url.provider}
          >
            <option>github</option>
            <option>auth0</option>
          </select>
          <label className="text-xs italic">provider</label>
        </span>
      </div>

      <Pre data-copy="" className="bg-slate-100">
        <code className="px-2">
          {url.protocol || "https"}
          {url.origin || "localhost:3000"}/{url.basePath || "auth"}/callback/
          {url.provider || "provider"}
        </code>
      </Pre>
    </div>
  );
}

export { CallbackURLGenerator };
