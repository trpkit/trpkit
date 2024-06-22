export function POST() {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa disabled
  // create 2fa secret and pass into body
  // store 2fa status as pending
  // create new token with 2fa enabled (indicates 2fa is pending)
  // store 2fa status change event in audit logs for user

  return new Response(null, {
    status: 200,
    // set cookie header for token
  });
}

export function DELETE() {
  // validate user is logged in
  // validate user exists
  // validate user has 2fa not disabled
  // validate user has 2fa not enabled
  // store 2fa status as disabled
  // create new token with 2fa disabled (indicates 2fa setup was cancelled)
  // store 2fa status change event in audit logs for user

  return new Response(null, {
    status: 204,
    // set cookie header for token
  });
}
