// https://docs.openstatus.dev/api-server/status-widget
import { z } from "zod";

const statusEnum = z.enum([
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
]);

const statusSchema = z.object({ status: statusEnum });

const dictionary = {
  operational: {
    label: "Operational",
    color: "bg-green-500",
  },
  degraded_performance: {
    label: "Degraded Performance",
    color: "bg-yellow-500",
  },
  partial_outage: {
    label: "Partial Outage",
    color: "bg-yellow-500",
  },
  major_outage: {
    label: "Major Outage",
    color: "bg-red-500",
  },
  unknown: {
    label: "Unknown",
    color: "bg-gray-500",
  },
  under_maintenance: {
    label: "Under Maintenance",
    color: "bg-gray-500",
  },
} as const;

export async function StatusWidget() {
  const res = await fetch("https://api.openstatus.dev/public/status/trpkit", {
    next: { revalidate: 60 }, // cache request for 60 seconds
  });
  const data = await res.json();
  const parsed = statusSchema.safeParse(data);

  if (!parsed.success) {
    return null;
  }

  const key = parsed.data.status;
  const { label, color } = dictionary[key];

  return (
    <a
      className="inline-flex max-w-fit items-center gap-2 rounded-md border border-slate-800 px-3 py-1 text-sm"
      href="https://trpkit.openstatus.dev"
      target="_blank"
      rel="noopener noreferrer">
      {label}
      <span className="relative flex size-2">
        {parsed.data.status === "operational" ? (
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full ${color} opacity-75 duration-1000`}
          />
        ) : null}
        <span className={`relative inline-flex size-2 rounded-full ${color}`} />
      </span>
    </a>
  );
}
