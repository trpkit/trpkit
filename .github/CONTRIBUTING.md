# Contributing to Trpkit

Thank you for taking the time to consider making a contribution to Trpkit!

What follows is a set of guidelines for contributing to Trpkit and its repositories. These are mostly guidelines, not rules. Use your best judgment.

#### Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Making Contributions](#making-contributions)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements and Features](#suggesting-enhancements-and-features)
    - [Pull Requests](#pull-requests)
- [Style Guides](#style-guides)
    - [Git Commit Messages](#git-commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [opensource@trpkit.com](mailto:opensource@trpkit.com).

## Making Contributions

### Reporting Bugs

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, [please include as many details as possible](#submitting-a-bug-report). Please fill out the template completely, since doing so helps contributors resolve issues faster.

#### Before Submitting A Bug Report

- Search [previous issues](https://github.com/trpkit/trpkit/issues) to see if the problem you are experiencing has already been reported. If it has and the issue is still open, comment on that issue instead of opening a new one.
- Try reproducing the problem on the latest commit in the [main](https://github.com/trpkit/trpkit/tree/main) branch.

#### Submitting A Bug Report

When submitting a bug report issue, keep these guidelines in mind so that the problem can be resolved as swiftly as possible.

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the exact steps that reproduce the problem in as many details as possible. When listing steps, explain how you did each step.
- Describe the behavior you observed after following the steps and point out exactly what the problem is with that behavior. Explain what behavior you expected.
- Provide specific examples to demonstrate the steps.
- If possible, include screenshots and animated GIFs which demonstrate the problem.

### Suggesting Enhancements and Features

Before creating enhancement suggestions, please check [this list](#before-submitting-a-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, [please include as many details as possible](#submitting-a-suggestion).

#### Before Submitting A Suggestion

- Check to see if the enhancement or feature you're thinking of has already been completed for an upcoming release.
- Search [previous suggestions](https://github.com/trpkit/trpkit/issues) to see if your enhancement or feature has already been suggested. If it has and the issue is still open, comment on that issue instead of opening a new one.

#### Submitting A Suggestion

- Use a clear and descriptive title for the issue to identify the enhancement or feature you are suggesting.
- Provide a step-by-step description of the suggested enhancement or feature in as many details as possible.
- Provide specific examples to demonstrate the steps.
- Explain why this enhancement would be useful to most Trpkit users.

### Pull Requests

In order to have your pull request considered for review, it must meet the following requirements:

- Compliance with the [style guides](#style-guides). If your pull request doesn't comply with one or more of the style guides, you'll be asked to bring it to compliance before your pull request will be considered for merging.
- Completed documentation and tests, if applicable.

> The reviewer(s) of your pull request may request changes or ask you to complete additional tasks, tests, or other changes before your pull request will be accepted and merged.

## Style Guides

### Git Commit Messages

- Follow [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Allowed commit types are: `build:`, `chore:`, `ci:`, `docs:`, `feat:` `fix:`, `pref:`, `refactor:`, `revert:`, `style:`, and `test:`. Commit types should be in lowercase. If a commit fits into multiple commit types, go back and make multiple commits whenever possible.
- Use the imperative mood (i.e. "Move function to..." not "Moves function to...").
- Use the present tense (i.e. "Add feature" not "Added feature").
- Keep commits discrete. Avoid including multiple unrelated changes in a single commit.
- Keep commits self-contained. Avoid spreading a single change across multiple commits.
- Reference issues and pull requests liberally after the first line.