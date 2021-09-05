import * as core from "@actions/core";
import * as constants from "./constants";
import * as path from "path";
import download from "./download";

async function run() {
  const version = core.getInput(constants.INPUT_VERSION, { required: true });
  const skipCache = core.getBooleanInput(constants.INPUT_SKIP_CACHE);

  const downloadLink = `https://github.com/sbt/sbt/releases/download/v${version}/sbt-${version}`;
  const installedPath = await download(downloadLink, version, skipCache);

  core.addPath(path.join(installedPath, "sbt", "bin"));

  core.info("");
  core.info("SBT configuration:");
  core.info(`  Version: ${version}`);
  core.info("");
}

run().catch((error) => {
  core.setFailed(error.message);
});
