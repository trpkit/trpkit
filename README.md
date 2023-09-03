<p align="center" style="margin-top: 48px">
    <a href="https://github.com/trpkit/trpkit">
        <img src="./apps/marketing/public/branding/github-banner-early-access.jpg" alt="Trpkit Logo" width="100%">
    </a>
</p>
<p align="center">
    The open-source Google Analytics alternative.
    <br />
    <a href="https://trpkit.com">Learn more</a>
</p>

## About Trpkit

[Trpkit](https://trpkit.com) is an open-source, privacy-first web analytics solution that's cookie-free and end-to-end encrypted. We're on a mission to tighten security, facilitate compliance in data handling, and enhance collaboration, all while ensuring you remain in complete control of your data.

## Contributing

Please see our [contributing guide](.github/CONTRIBUTING.md).

### Good First Issues

We have a list of [help wanted](https://github.com/trpkit/trpkit/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) issues that contain small features and bugs which have a relatively limited scope. This is a great place to get started, gain experience, and get familiar with our contributions process.

### Prerequisites

Before diving into the code, make sure you have the following prerequisites installed:

1. **Node.js**: Trpkit requires Node.js version 18 or newer. You can download it from [Node.js official website](https://nodejs.org/).
2. **MongoDB**: Ensure MongoDB is up and running. If you need to install it, refer to the [official MongoDB documentation](https://docs.mongodb.com/manual/installation/).
3. **pnpm**: Trpkit uses pnpm for package management. If you need to install it, refer to the [official pnpm documentation](https://pnpm.io/installation).
4. **Docker & docker compose**: While not required, Docker and docker compose are highly recommended for local development. If you need to install it, refer to the [official Docker documentation](https://docs.docker.com/get-docker/).

### Quickstart

> The quickstart assumes you will be using [Docker](https://docs.docker.com/get-docker/) and [docker compose](https://docs.docker.com/compose/) for spinning up MongoDB and Inbucket.

1. Clone the repository with `git clone https://github.com/trpkit/trpkit.git`
2. Spin up MongoDB and Inbucket with `pnpm run dx`
3. Start the applications with `pnpm run dev`
   1. You may need to configure `.env` in different applications, check to see if they have an `.env.example`
   2. You can view the web client at http://localhost:3000
   3. You can view the API application at http://localhost:3001
   4. You can view the marketing application at http://localhost:3002

## Repository Activity

![Alt](https://repobeats.axiom.co/api/embed/5fa039fa8f8b05e18a7278f2db41e792387f366a.svg "Repobeats analytics image")

## License

Trpkit is an open source software licensed under the [AGPL 3.0 license](LICENSE).