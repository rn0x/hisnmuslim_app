module.exports = (shell) => {

    const telegram = document.getElementById('telegram');
    const github = document.getElementById('github');

    telegram.addEventListener('click', e => {
        shell.openExternal('https://t.me/binattia')
    });

    github.addEventListener('click', e => {
        shell.openExternal('https://github.com/rn0x/hisnmuslim_app')
    });
};