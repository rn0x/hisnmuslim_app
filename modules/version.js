module.exports = async (appPath, fs, path) => {

    let Vjson = fs.readJsonSync(path.join(appPath, './version.json'));
    let version = document.getElementById('version')

    version.innerText = `v${Vjson?.currentVersion}`

    let response = await fetch('https://api.github.com/repos/rn0x/hisnmuslim_app/releases').catch(e => console.log(e))
    let data = await response?.json();
    let { status } = response;
    let latestRelease = data?.[0];
    let Release = latestRelease?.tag_name?.substring(1);

    if (status === 200) {

        if (Vjson?.currentVersion != Release) {
            version.innerText = `v${Vjson?.currentVersion} يتوفر تحديث جديد`
        }

        else {
            version.innerText = `v${Vjson?.currentVersion}`
        }
    }

    else {
        version.innerText = `v${Vjson?.currentVersion}`
    }

};