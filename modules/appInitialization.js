const fs = require('fs-extra');
const path = require('path');

module.exports = (appPath, currentVersion) => {

    fs.existsSync(path.join(appPath, "../Hisnmuslim")) ? true :
        fs.mkdirsSync(path.join(appPath, '../Hisnmuslim'), { recursive: true });

    fs.writeJsonSync(path.join(appPath, './version.json'), {
        currentVersion: currentVersion,
        alreadyChecked: false,
        latestRelease: "0.0.0"
    }, { spaces: '\t' });

};