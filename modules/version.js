module.exports = async (appPath, fs, path) => {

    let Vjson = fs.readJsonSync(path.join(appPath, './version.json'));
    let version = document.getElementById('version')

    version.innerText = `v${Vjson?.currentVersion}`

};