/*-----------------------Global Variables--------------------*/

let page = document.body.id; //variable to identify the route 

let dog = "https://dog.ceo/api/breeds/image/random";
let fox = "https://randomfox.ca/floof/";
let cat = "https://api.thecatapi.com/v1/images/search";

// Button scroll to top  
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

// Function to send links to image source
function image_view(img_url) {
    document.getElementById(img_id).src = img_url;
}


/*---------Index Router---------*/

/*-------Top Section-------*/
if (page == "home") {

    img_id = "background"
    axios.get(cat).then((res) => image_view(res.data[0].url));

    let array_axios_getters = [];
    function array_axios_get() {
        axios.get(fox).then((res) => array_axios_getters.push(res.data.image));
        axios.get(dog).then((res) => array_axios_getters.push(res.data.message));
        axios.get(cat).then((res) => array_axios_getters.push(res.data[0].url));
    }


    setInterval(function () {
        if (array_axios_getters.length <= 0) {
            array_axios_get();
        } else {
            image_view(array_axios_getters.pop());
        }
    }, 3000);
}

/*---------Animals Router---------*/
if (page == "fox-page") {
    img_id = "foxes-background";
    axios.get(fox).then(res => image_view(res.data.image));
    setInterval(
        function () {
            axios.get(fox).then(res => image_view(res.data.image))
        }, 3000
    );
}

