<p align="center" style="margin-top: 48px">
    <a href="https://trpkit.com">
        <img width="200px" src="/apps/trpkit.com/public/branding/logo.svg" alt="Trpkit Logo">
    </a>
</p>
<p align="center">
    The open-source web insights platform.
</p>

## Table of Contents

- [Introduction](#introduction)
  - [Analytics Script](#analytics-script)
  - [End-to-End Encryption](#end-to-end-encryption)
- [Contributing](#contributing)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
- [License](#license)

## Introduction

Trpkit provides comprehensive web analytics while prioritizing user privacy. It enables website owners to understand their traffic, user behavior, and other critical metrics without compromising the privacy of their users.

### Analytics Script

Trpkit's analytics script is cookie-free and completely anonymous. It respects DNT (Do Not Track) and [GPC (Global Privacy Control)](https://globalprivacycontrol.org/) signals by not sending any data besides acknowledging the visit. Users with Javascript disabled are treated the same as those with DNT and GPC signals, ensuring consistent privacy.

### End-to-End Encryption

End-to-end encryption (E2EE) in Trpkit ensures that data transmitted from the user's browser to our servers is encrypted and can only be decrypted by the website owner. Here's how it works:

1. **Account Registration:** When a website owner registers for an account, a master encryption key is derived from their password and other factors. This key is never stored on our servers.
2. **Keychain Creation:** A keychain is created and encrypted with the master key, which is then stored securely. Within this keychain, additional keys are generated.
3. **Site-Specific Key:** One of the keys from the keychain is a public/private key pair associated with the website.
4. **User Data Encryption:** When a user visits a website, the browser data we collect is encrypted on their end using the site-specific public key before being sent to our servers.
5. **Secure Storage:** The encrypted data is stored securely on our servers, associated with the website owner's account.
6. **Decryption by Website Owner:** Only the website owner, with access to their master key, can decrypt this data using the corresponding private key.

## Contributing

For detailed contributing guidelines, refer to our [contributing guide](.github/CONTRIBUTING.md).

### Prerequisites

Before you begin, ensure you have the following installed:

- [MongoDB](https://www.mongodb.com)
- [Node.js](https://nodejs.org) (version 20.x or higher)
- [pnpm](https://pnpm.io)

### Getting Started

1. Clone the repository: `git clone https://github.com/trpkit/trpkit.git`
2. Copy the example environment file and configure it: `cp .env.example .env`
3. Install the dependencies `pnpm i`
4. Start the applications `pnpm run dev`

## Community

Join our community to stay updated and get involved:

* [Discord](https://discord.gg/trpkit)
* [GitHub Discussions](https://github.com/trpkit/trpkit/discussions)
* [X](https://x.com/trpkit)

## License

Trpkit is an open source software licensed under the [AGPL 3.0 license](LICENSE).