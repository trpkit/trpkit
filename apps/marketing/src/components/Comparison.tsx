import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

const comparison = {
  sites: [
    {
      name: "Trpkit",
    },
    {
      name: "Google Analytics",
    },
    {
      name: "Others",
    },
  ],
  sections: [
    {
      name: "Encryption and security",
      items: [
        {
          name: "Encryption at rest and in transit",
          sites: {
            Trpkit: true,
            "Google Analytics": true,
            Others: true,
          },
        },
        {
          name: "End-to-end encrypted storage",
          sites: {
            Trpkit: true,
            "Google Analytics": false,
            Others: false,
          },
        },
        {
          name: "End-to-end encrypted sharing",
          sites: {
            Trpkit: true,
            "Google Analytics": false,
            Others: false,
          },
        },
        {
          name: "Zero-knowledge authentication",
          sites: {
            Trpkit: true,
            "Google Analytics": false,
            Others: false,
          },
        },
        {
          name: "Two-factor verification",
          sites: {
            Trpkit: true,
            "Google Analytics": true,
            Others: true,
          },
        },
        {
          name: "Passkey verification",
          sites: {
            Trpkit: true,
            "Google Analytics": true,
            Others: false,
          },
        },
        {
          name: "Custom server location<sup>1</sup>",
          sites: {
            Trpkit: true,
            "Google Analytics": false,
            Others: false,
          },
        },
        {
          name: "Isolate EU traffic<sup>1</sup>",
          sites: {
            Trpkit: true,
            "Google Analytics": false,
            Others: false,
          },
        },
      ],
    },
  ],
};

export default function Comparison() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full px-5 py-24 sm:py-32">
      <div className="relative z-10">
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold tracking-tight text-white">
          Why security conscious companies prefer Trpkit
        </h1>
        <p className="mx-auto mt-4 max-w-4xl text-center text-lg leading-8 text-white/60">
          See how Trpkit compares against Google Analytics when it comes to security, privacy and
          data handling. If you value your users' privacy as much as we do, this comparison will
          help you make the right choice.
        </p>
      </div>
      <div className="relative pt-14">
        <section className="hidden lg:block">
          <h2 className="sr-only">Feature comparison</h2>
          <div className="grid grid-cols-4 gap-x-8 before:block">
            {comparison.sites.map((site, index) => (
              <div key={index} aria-hidden={true} className="-mt-px">
                <p className="text-center text-sm font-semibold leading-6 text-white">
                  {site.name}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-16">
            {comparison.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold leading-6 text-white">{section.name}</h3>
                <div className="relative -mx-8 mt-2">
                  <table className="relative w-full border-separate border-spacing-x-8">
                    <thead>
                      <tr className="text-left">
                        <th scope="col">
                          <span className="sr-only">Feature</span>
                        </th>
                        {comparison.sites.map((site, index) => (
                          <th key={index} scope="col">
                            <span className="sr-only">{site.name}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <th
                            scope="row"
                            className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-300">
                            <span dangerouslySetInnerHTML={{ __html: item.name }} />
                            {itemIndex !== section.items.length - 1 ? (
                              <div className="absolute inset-x-8 mt-3 h-px bg-slate-800" />
                            ) : null}
                          </th>
                          {comparison.sites.map((site, siteIndex) => (
                            <td key={siteIndex} className="relative w-1/4 px-4 py-0 text-center">
                              <span className="relative h-full w-full py-3">
                                {typeof item.sites[site.name] === "string" ? (
                                  <span
                                    className="text-sm leading-6 text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: item.sites[site.name] }}
                                  />
                                ) : (
                                  <>
                                    {item.sites[site.name] === true ? (
                                      <CheckIcon
                                        className="mx-auto h-5 w-5 text-blue-500"
                                        aria-hidden={true}
                                      />
                                    ) : (
                                      <XMarkIcon
                                        className="mx-auto h-5 w-5 text-gray-400"
                                        aria-hidden={true}
                                      />
                                    )}

                                    <span className="sr-only">
                                      {item.sites[site.name] === true ? "Yes" : "No"}
                                    </span>
                                  </>
                                )}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-y-2 text-xs text-gray-400">
          <span>
            <sup>1</sup>This feature will be available at market release.
          </span>
        </div>
      </div>
    </div>
  );
}
