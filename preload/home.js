const CopyElement = require('../modules/CopyElement.js');

module.exports = async (appPath, fs, path) => {

    let hisnmuslim = fs.readJsonSync(path.join(__dirname, '../public/json/hisnmuslim.json'));
    let alrt = document.getElementById('alrt');
    let random_top_title = document.getElementById('random_top_title');
    let random_top = document.getElementById('random_top');
    let random_audio = document.getElementById('random_audio');
    let random_bt = document.getElementById('random_bt');
    let random_copy = document.getElementById('random_copy');
    let random_category = hisnmuslim[Math.floor(Math.random() * hisnmuslim.length)];
    let random_text = random_category.array[Math.floor(Math.random() * random_category.array.length)];

    random_top_title.innerText = random_category.category
    random_top.innerText = random_text.text
    random_audio.src = random_text.audio

    random_bt.onclick = () => {
        let random_category = hisnmuslim[Math.floor(Math.random() * hisnmuslim.length)];
        let random_text = random_category.array[Math.floor(Math.random() * random_category.array.length)];
        random_top_title.innerText = random_category.category
        random_top.innerText = random_text.text
        random_audio.src = random_text.audio
    }

    random_copy.onclick = () => {
        let random_top = document.getElementById('random_top');
        navigator.clipboard.writeText(random_top.innerText);
        alrt.style.display = 'block'

        setTimeout(() => {
            alrt.style.display = 'none'
        }, 1000);
    }

};