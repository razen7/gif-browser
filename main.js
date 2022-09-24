const apiKey = 'api_key=MKQqPEjJ3pJHMihOmc6BSH1lbHlR4qfQ';
let groupA = 'search';
let category = 'gifs';
let gifUrl = () => `https://api.giphy.com/v1/${category}/${groupA}?${apiKey}${groupA === 'search' ? '&limit=20&q' : '&s'}=`;

const button = document.getElementById('search-button');
const inputBox = document.getElementById('search-text');
const imgContainer = document.querySelector('.images-container');
const loadingDiv = `
        <div class="loading-container">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>`;
button.addEventListener('click', (e) => {
    e.preventDefault();
    let keyWord = inputBox.value;
    // console.log(keyWord);
    imgContainer.innerHTML = loadingDiv;
    fetch(gifUrl() + keyWord)
        .then(response => response.json())
        .then(obj => obj.data)
        .then(data => {
            imgContainer.innerHTML = '';
            if (groupA === 'search') {
                data.forEach(obj => {
                    let img = document.createElement('img');
                    img.src = obj.images.downsized.url;
                    imgContainer.append(img);
                });
            } else if (groupA === 'translate') {
                if(data){
                    let img = document.createElement('img');
                    img.src = data.images.original.url;
                    imgContainer.append(img);
                } else{
                    imgContainer.append('no results available from api at this moment');
                }
                
            }

        })
})

function funcGroupA(e) {
    let elems = document.querySelector(".groupA").children;
    [].forEach.call(elems, function (el) {
        el.classList.remove("active");
    });
    e.target.classList.add('active');
    groupA = e.target.id;
    console.log(gifUrl());
}

function changeCategory(e) {
    let elems = document.querySelector(".category").children;
    [].forEach.call(elems, function (el) {
        el.classList.remove("active");
    });
    e.target.classList.add('active');
    category = e.target.id;
}