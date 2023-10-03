export default function Page() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${months[monthIndex]} ${day}, ${year}`;
  }

  return (
    <>
      <section>
        <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto divide-y divide-slate-800">
            <div className="space-y-16 pb-12">
              <div>
                <h2 className="text-3xl text-white font-semibold">Transparency</h2>
                <p className="pt-6 text-gray-300">
                  Trpkit is committed to your privacy and being transparent about government
                  requests for customer data globally. As stated in our Privacy Policy, all metric
                  data is end-to-end encrypted and to the best of Trpkit's knowledge, Trpkit is
                  unable to decrypt or access it.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-white font-semibold">Requests</h3>
                <p className="pt-6 text-gray-300">No requests as of {formatDate(new Date())}</p>
              </div>
            </div>
            <div className="space-y-16 pt-12">
              <div>
                <h2 className="text-3xl text-white font-semibold">Data privacy</h2>
                <p className="pt-6 text-gray-300">
                  For Trpkit, security and data privacy are of paramount importance. We do not track
                  or anonymize IP addresses or identifiable information when providing analytical
                  services. Trpkit end-to-end encrypts all metric data, unlike all mainstream web
                  analytic providers.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-white font-semibold">Security audits</h3>
                <p className="pt-6 pb-12 text-gray-300">
                  We are planning to undergo security audits regularly. See a comprehensive list
                  below of the audits we have completed.
                </p>
                <table className="w-full divide-y divide-slate-800">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-white">
                        Auditor
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-white">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">TBD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        Late 2024 (TBD)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
