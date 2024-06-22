export function POST() {
  // validate request
  // validate srp (verifier len 344, salt len 44)
  // check if email already exists
  // store user record
  // store register event in audit logs for user
  // create token and set as header to log user in

  return new Response(null, {
    status: 201,
    // set cookie header for token
  });
}
