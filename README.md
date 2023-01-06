# setup-sbt
[![Verify action](https://github.com/Jtalk/setup-sbt/actions/workflows/check.yaml/badge.svg)](https://github.com/Jtalk/setup-sbt/actions/workflows/check.yaml)

Set up your GitHub Actions workflow with a specific version of SBT

## Usage
Input `version` is mandatory and must be the exact version. See [current releases](https://github.com/sbt/sbt/releases) section for a list of available options.

### Basic

Set up the specific version of SBT
```yaml
steps:
- uses: actions/checkout@v2
- uses: Jtalk/setup-sbt@v2
  with:
    version: 1.5.5
- run: sbt --version
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
