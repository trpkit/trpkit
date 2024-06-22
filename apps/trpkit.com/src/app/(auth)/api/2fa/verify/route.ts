export function POST() {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa not disabled
  // validate user has 2fa not enabled
  // verify code user input
  // generate backup codes (8 codes) and pass into body
  // store 2fa status as enabled
  // create new token with 2fa enabled
  // store 2fa status change event in audit logs for user

  return new Response(null, {
    status: 200,
    // set cookie header for token
  });
}
