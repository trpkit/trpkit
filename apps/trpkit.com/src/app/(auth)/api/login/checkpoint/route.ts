export function POST() {
  // validate user is logged in
  // validate user exists
  // check if token 2fa is already verified and return master salt if so
  // validate user has 2fa enabled
  // verify if code is correct
  // create new token with 2fa enabled

  return new Response(null, {
    status: 200,
    // set cookie header for token
  });
}
