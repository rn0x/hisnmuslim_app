const CopyElement = require('../modules/CopyElement.js');

module.exports = async (appPath, fs, path) => {

    let hisnmuslim = fs.readJsonSync(path.join(__dirname, '../public/json/hisnmuslim.json'));
    let table = document.getElementById('table');
    let table_tbody = document.getElementById('table_tbody');
    let title_index = document.getElementById('title_index');
    let category_content = document.getElementById('category_content');
    let alrt = document.getElementById('alrt');

    category_content.style.display = 'none'

    /* Create Table */

    for (let item of hisnmuslim) {

        let tr = document.createElement("tr");
        let td_number = document.createElement("td");
        let td_index = document.createElement("td");
        let p_index = document.createElement("p");
        let td_audio = document.createElement("td");
        let bt_audio = document.createElement("button");
        table_tbody.appendChild(tr);
        tr.appendChild(td_number);
        td_number.innerText = item.id
        td_number.className = 'number_index'
        tr.appendChild(td_index);
        td_index.appendChild(p_index);
        p_index.innerText = item.category
        p_index.className = 'category'
        p_index.id = `category_id_${item.id}`
        tr.appendChild(td_audio);
        td_audio.appendChild(bt_audio);
        bt_audio.innerText = 'تشغيل'
        bt_audio.className = 'audio'
        bt_audio.id = `bt_id_${item.id}`
    }

    /* category | audio */

    let bt_audio = Array.from(document.getElementsByClassName('audio'));
    for (let iterator of bt_audio) {

        let id = iterator?.id.split('bt_id_')[1]
        let sound = new Audio(hisnmuslim[id - 1].audio);
        let bt = document.getElementById(iterator.id);

        bt.onclick = e => {
            if (sound && !sound.paused) {
                bt.innerText = 'تشغيل'
                sound.pause();
                sound.currentTime = 0;
            }

            else {
                sound.play()
                bt.innerText = 'إيقاف'
            }
        }

    }

    /* category | content */

    let category = Array.from(document.getElementsByClassName('category'));

    for (let iterator of category) {

        let category_ = document.getElementById(iterator.id);
        let id = iterator?.id.split('category_id_')[1];

        category_.onclick = e => {

            window.scrollTo(0, 0);
            table.style.display = 'none';
            category_content.style.display = 'block'
            title_index.innerText = hisnmuslim[id - 1].category
            let back_el = document.createElement("button");
            category_content.appendChild(back_el);
            back_el.innerText = 'رجوع'
            back_el.id = 'back';

            let num_copy = 1
            let num_text = 1
            let num_li = 1

            for (let item of hisnmuslim[id - 1].array) {

                let category_content_li = document.createElement("li");
                let category_top = document.createElement("div");
                let category_bottom = document.createElement("ul");
                let category_text = document.createElement("p");
                let category_audio = document.createElement("audio");
                let count = document.createElement("li");
                let copy = document.createElement("li");
                let category_bottom_number = document.createElement("span");
                category_content.appendChild(category_content_li);
                category_content_li.id = `category_content_li_id_${num_li++}`
                // category_content_li.className = 'category_content_li'
                category_content_li.classList.add('animate__animated', 'animate__fadeIn', 'category_content_li'); 
                category_content_li.appendChild(category_top);
                category_content_li.appendChild(category_bottom);
                category_top.className = 'category_top'
                category_bottom.className = 'category_bottom'
                category_top.appendChild(category_text);
                category_text.id = `category_text_id_${num_text++}`
                category_text.className = 'category_text'
                category_text.innerText = item.text
                category_top.appendChild(category_audio);
                category_audio.className = 'category_audio'
                category_audio.src = item.audio
                category_audio.controls = true
                category_bottom.appendChild(count);
                count.className = 'count'
                count.innerText = 'التكرار : '
                count.appendChild(category_bottom_number);
                category_bottom_number.className = 'category_bottom_number'
                category_bottom_number.innerText = item.count
                category_bottom.appendChild(copy);
                copy.id = `copy_id_${num_copy++}`
                copy.className = 'copy'
                copy.innerText = 'نسخ'

            }

            let back = document.getElementById('back');
            back.onclick = e => {
                window.location.href = './list.html'
            }

            let copy = Array.from(document.getElementsByClassName('copy'));

            for (let iterator of copy) {

                let copy_ = document.getElementById(iterator.id);
                let id = iterator?.id.split('copy_id_')[1]
                copy_.onclick = e => {
                    console.log(iterator.id);
                    CopyElement(`category_text_id_${id}`);
                    alrt.style.display = 'block'

                    setTimeout(() => {
                        alrt.style.display = 'none'
                    }, 1000);

                }

            }

        }

    }

};