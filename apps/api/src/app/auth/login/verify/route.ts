export async function POST() {
  // Client -----> Server
  // clientSession.proof

  // TODO: Validate the proof and derive session

  // Client <----- Server
  // serverSession.proof

  // TODO: Send response back to server

  // TODO: Determine if 2FA is enabled on the account.
  //  No 2FA -> Send KMS salt, KMS keychain and keychain in response
  //  2FA    -> Require client to submit 2FA code or passkey, then send KMS salt, KMS keychain and keychain if successful

  return new Response(null, {
    status: 200,
  });
}
