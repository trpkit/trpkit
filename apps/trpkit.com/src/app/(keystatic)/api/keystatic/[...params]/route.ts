import config, { showAdminUI } from "@/keystatic/keystatic.config";
import { makeRouteHandler } from "@keystatic/next/route-handler";

export const { GET, POST } = (() => {
  function notFound() {
    return new Response(null, {
      status: 404,
    });
  }

  if (!showAdminUI) return { GET: notFound, POST: notFound };

  return makeRouteHandler({
    config,
  });
})();
