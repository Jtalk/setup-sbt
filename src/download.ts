import {
  downloadTool,
  extractZip,
  extractTar,
  cacheDir,
  find,
} from "@actions/tool-cache";

const SBTToolName = "sbt";

export type ArchivePath = string;
export type UnpackedPath = string;
export type RemotePath = string;
export type RemotePathWithoutExtension = string;

export default async function download(
  path: RemotePathWithoutExtension,
  version: string,
  skipCache: boolean
): Promise<UnpackedPath> {
  const { extension, unpack } = platformArchiver();
  if (!skipCache) {
    const cachedPath = find(SBTToolName, version);
    if (cachedPath) return cachedPath;
  }
  const fullPath = `${path}.${extension}`;
  const downloadedArchivePath = await downloadTool(fullPath);

  const unpackedPath = await unpack(downloadedArchivePath);
  return cacheDir(unpackedPath, SBTToolName, version);
}

type PlatformArchiverReturn = {
  extension: string;
  unpack: (path: ArchivePath) => Promise<UnpackedPath>;
};
function platformArchiver(): PlatformArchiverReturn {
  if (process.platform === "win32") {
    return { extension: "zip", unpack: extractZip };
  } else {
    return { extension: "tgz", unpack: extractTar };
  }
}
