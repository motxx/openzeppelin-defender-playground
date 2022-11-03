import { build } from "esbuild";
import glob from "glob";
const entryPoints = glob.sync('./autotasks/relay/index.ts');

build({
  bundle: true,
  entryPoints,
//  outdir: '../build/',
  platform: 'node',
  external: [
    "ethers",
    "web3",
    "axios",
    "defender-relay-client",
  ],
  watch: false,
});
