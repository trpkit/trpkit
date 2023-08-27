import { XCircleIcon } from "@heroicons/react/20/solid";

export default function ErrorNotification({ errors }: { errors: string[] }) {
  return (
    <div className="rounded-md bg-red-400/10 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-500">
            There was an error with your submission
          </h3>
          <div className="mt-2 text-sm text-red-400">
            <ul className="list-disc space-y-1 pl-5">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
