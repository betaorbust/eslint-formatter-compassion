# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 10-21-2018

### Added

-   `no-plusplus` context to the `airbnb` guide.
-   This changelog.
-   Guard for publishing from the root.

### Fixed

-   Actually publish the compiled directory instead of everything.
-   Changed `publish` task to `pub` because NPM will run `npm publish` if you run a script called
    publish 🤦‍♂️.
-   Removed broken `main` entry from package.

### Deprecated

-   Added deprecation notice to `./formatters/index` in favor of direct access.

## [1.0.0] - 10-21-2018

Initial release
