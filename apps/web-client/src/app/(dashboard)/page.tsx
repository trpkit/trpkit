import ChartLineSVG from "@components/(dashboard)/ChartLineSVG";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";

// TODO: This can be removed once we fetch the data from the API
function generateRandomDataPoints(): number[] {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 1401) + 100);
}

// TODO: These stats should be fetched from the API
const stats = [
  {
    name: "Visitors",
    value: "1235",
    dataPoints: generateRandomDataPoints(),
    change: "3.2%",
    changeType: "increase",
  },
  {
    name: "Requests",
    value: "2330",
    dataPoints: generateRandomDataPoints(),
    change: "7.2%",
    changeType: "decrease",
  },
  {
    name: "Bounce rate",
    value: "16.2%",
    dataPoints: generateRandomDataPoints(),
    change: "3.8%",
    changeType: "increase",
  },
  {
    name: "Session duration",
    value: "2m 10s",
    dataPoints: generateRandomDataPoints(),
    change: "5.3%",
    changeType: "increase",
  },
];

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-6 text-gray-700">{stat.name}</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-4xl font-semibold tracking-tight text-gray-900">{stat.value}</p>
                <p
                  className={cn(
                    stat.changeType === "increase" ? "text-green-600" : "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}>
                  {stat.changeType === "increase" ? (
                    <ArrowTrendingUpIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-green-500 mr-1"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowTrendingDownIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-red-500 mr-1"
                      aria-hidden="true"
                    />
                  )}
                  {stat.change}
                </p>
              </div>
              <div className="w-full h-12 mt-4">
                <ChartLineSVG dataPoints={stat.dataPoints} width={200} height={32} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
