export function POST() {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa enabled
  // verify 2fa code
  // disable 2fa
  // create new token with updated 2fa status

  return new Response(null, {
    status: 200,
    // set cookie header for token
  });
}
