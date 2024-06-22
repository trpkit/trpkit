export function POST() {
  // validate user is logged in
  // create ttl from current token
  // store token in blacklist collection with ttl (using mongodb ttl index)
  // store logout event in audit logs for user

  return new Response(null, {
    status: 202,
    // create set-cookie header for clearing token
  });
}
