export async function POST() {
  // Client -----> Server
  // username (email) and clientEphemeral.public

  // TODO: Validate incoming email and ephemeral
  //  If the user doesn't exist, send bogus salt & ephemeral back

  // TODO: Generate server ephemeral

  // TODO: Store server ephemeral secret in database for later use

  // Client <----- Server
  // salt and serverEphemeral.public

  // TODO: Send response back to client
  return new Response(null, {
    status: 200,
  });
}
