/**
 * Due to how semantic-ui-less is organised as a npm package, we need to do
 * some workarounds to make it work with webpack and less. This code only
 * needs to run after semantic-ui-less has been installed, so a script has been
 * added to "postinstall" in package.json that runs this file when
 * "npm install" has been executed.
 *
 * Credit: https://www.arternbutusov.com/webpack-semantic-ui/
 * and http://neekey.net/2016/12/09/integrate-react-webpack-with-semantic-ui-and-theming/
 */

/* eslint no-console: 0 */
const fs = require("fs");

// Relocate default theme.config
if(fs.existsSync("node_modules/semantic-ui-less")) {
    console.log("Patching semantic-ui-less npm package...");

    fs.writeFileSync(
        "node_modules/semantic-ui-less/theme.config",
        "@import '../../app/styles/theme.config';\n",
        "utf8"
    );

    console.log("Done!");
} else {
    console.warn("Could not find semantic-ui-less package. Ignoring patch.");
}
