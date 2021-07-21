# xrm-cli/project

Example Dynamics project utilizing the xrm-cli toolkit. Based on the Sapling Tracking System project given to USDC Business Apps new hires as part of their ramp-up training.

---

## Using the CLI

The `xrm-cli` dist is linked as a local dependency in the project's root package.json file. This allows it to be ran as a node process within the project. The `xrm-cli` dist has been mapped to the `cli` npm script which can be ran with the following syntax:

```
npm run cli [arguments]
```

*Example*

```
npm run cli build plugin-assembly GetTimeZone
```

If using options, a `--` must be added to tell npm to pass the options to `xrm-cli`. Only a single `--` is needed, but it must be given before any options are listed.

*Example*

```
npm run cli typegen -- --help
```