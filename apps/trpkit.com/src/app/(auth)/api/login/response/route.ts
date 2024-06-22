export function POST() {
  // validate server ephemeral exists in db
  // validate user exists
  // create srp session and validate client and server challenges
  // determine if 2fa is needed
  // create token and set as header to log user in
  // store login event in audit logs for user

  return new Response(null, {
    status: 200,
    // set cookie header for token
  });
}
