/*---------Index Router---------*/
/*-------Top Section-------*/
let dog = "https://dog.ceo/api/breeds/image/random";
let fox = "https://randomfox.ca/floof/";
let cat = "https://api.thecatapi.com/v1/images/search";

axios.get(cat).then((res) => image_view(res.data[0].url));

let array_axios_getters = [];
function array_axios_get() {
    axios.get(fox).then((res) => array_axios_getters.push(res.data.image));
    axios.get(dog).then((res) => array_axios_getters.push(res.data.message));
    axios.get(cat).then((res) => array_axios_getters.push(res.data[0].url));
}

function image_view(img_url) {
    document.getElementById("background").src = img_url;
}

setInterval(function () {
    if (array_axios_getters.length <= 0) {
        array_axios_get();
    } else {
        image_view(array_axios_getters.pop());
    }
}, 3000);

/*-------Animals Section-------*/
var top_button = document.getElementById("top-button");


window.onscroll = function () {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        top_button.style.transform = "translateX(30px)";
        top_button.style.opacity = "100%";
    }
    else {
        top_button.style.transform = "translateX(-30px)";
        top_button.style.opacity = "0%";
    }
}
top_button.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}