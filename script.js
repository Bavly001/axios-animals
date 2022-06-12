/*-----------------------Global Variables--------------------*/
/*---------Image Variables---------*/
let male = '/Images/avatar-male.png';
let female = '/Images/female.png';

/*-----------------------------------------------------------*/
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
else if (page == "cat-page") {
    /*----------------Cats Section-------------*/
    img_id = "cats-background";
    axios.get(cat).then(res => image_view(res.data[0].url));
    setInterval(
        function () {
            axios.get(cat).then(res => image_view(res.data[0].url))
        }, 3000
    );
}
/*----------------Dogs Section-------------*/
else if (page == "dog-page") {
    img_id = "dogs-background";
    axios.get(dog).then(res => image_view(res.data.message));
    setInterval(
        function () {
            axios.get(dog).then(res => image_view(res.data.message))
        }, 3000
        );
    }
    
/*----------------Foxes Section-------------*/
else if (page == "fox-page") {
    img_id = "foxes-background";
    axios.get(fox).then(res => image_view(res.data.image));
    setInterval(
        function () {
            axios.get(fox).then(res => image_view(res.data.image))
        }, 3000
    );
}


/*---------Review Router---------*/
else {
    // Adding variables
    let reviews_number = document.getElementsByClassName("review");
    document.getElementById("number").innerHTML = "(" + reviews_number.length + ")";

    let first_name = document.getElementById("first-name");
    let last_name = document.getElementById("last-name");
    let email = document.getElementById("email");
    let gender = document.getElementsByName("gender");
    let comment = document.getElementById("comment");
    let submit = document.getElementById("submit");
    let error_text = document.getElementById("error")

    let reviews_section = document.getElementById("reviews");

    // Change Reviews number

    submit.addEventListener("click", function (e) {
        e.preventDefault();

        if (first_name.value != "" && last_name.value != "" && email.value != "" && (gender[0].checked || gender[1].checked) && comment.value != "") {
            if (error_text.style.display == "block") {
                error_text.style.display = "none";
            }
            const info = document.createElement("div");
            info.className = "personal-info center";

            const avatar_image = document.createElement("img");
            avatar_image.className = "avatar";

            const full_name = document.createElement("h2");
            full_name.className = "full-name";

            const review = document.createElement("div");
            review.className = "review";

            const review_comment = document.createElement("p");
            review_comment.className = "comment";

            if (gender[0].checked) {
                avatar_image.src = male;
            }
            else {
                avatar_image.src = female;
            }

            full_name.textContent = first_name.value + " " + last_name.value;
            review_comment.textContent = comment.value;

            info.appendChild(avatar_image);
            info.appendChild(full_name);
            review.appendChild(info);
            review.appendChild(review_comment);

            reviews_section.appendChild(review);
            document.getElementById("number").innerHTML = "(" + reviews_number.length + ")";

            const elements = document.getElementsByClassName("info");
            Array.from(elements).forEach((element) => {element.value =""});
            gender.forEach((e) => {e.checked = false});
        }
        else {
            error_text.style.display = "block";
        }
    }
    )

}