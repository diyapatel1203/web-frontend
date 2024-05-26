let arr = ["img/t4.webp", "img/t6.webp"]

let currentindex = 0;

setInterval(() => {
    currentindex = (currentindex + 1) % arr.length
    document.querySelector("#imgchange").src = arr[currentindex]
}, 3000);

let array = ["img/t1.webp", "img/t3.webp"]
let changeimg = 0;
setInterval(() => {
    changeimg = (changeimg + 1) % array.length
    document.querySelector("#change").src = array[changeimg]
}, 3000)

let index = ["img/t5.webp", "img/i10.webp", "img/t2.webp"]

let count = 0;

setInterval(() => {
    count = (count + 1) % index.length
    document.querySelector("#changeimage").src = index[count]
}, 3000)

// CART

let cartdata
    function Fetchdata() 
    {
            fetch("https://web-backend-j72p.onrender.com/cart")
            .then((res) => res.json())
            .then((data) => {
                cardlist(data)
                cartdata = data
                
            }).catch((err) => console.log(err))
    }
    Fetchdata()
    function cardlist(data) {
        const store = data.map((el) => singlecard(el.image, el.price, el.name,el.id))
        document.getElementById("cartdatas").innerHTML = store.join("")
    }
    function singlecard(image, price, name,id) {
        let cart = `
        <div class="d-flex mt-3" style="border:1px solid gray; padding:5px">
            <div class="col-2">
                <img src="${image}" alt="" style="height:120px; width:120px" > 
            </div>
            <div class="col-9" style="margin-left:50px">
                <p>${price}</p>
                <p>${name}</p>
                <button data-id="${id}" class="cart-button mt-2" style="margin-left:80%; border:none; background-color:white;">DELETE</button>
            </div>
        </div>
        `
        return cart;
    }

    //  Delete 

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-button")) {
            DeleteData(e.target.dataset.id);
        }
    })

    function DeleteData(id) {
        fetch(`https://web-backend-j72p.onrender.com/cart/${id}`, {
            method: 'DELETE',
        })

            .then((res) => res.json())
            .then((data) => {
                alert("Deleted..")
                console.log(data)
            })
            .catch((err) => console.log(err))
    }


// login

const login = document.getElementById("login")


login.addEventListener("submit", (e) => {
    e.preventDefault()

    let arr=JSON.parse(localStorage.getItem("data")) || []
    let valid = true

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    let obj = {
        email,
        password
    }
    arr.push(obj)

    if (email == "") {
        valid = false
        document.getElementById("emailerror").innerText = "Email is Required"
    }
    else {
        document.getElementById("emailerror").innerText = ""
    }

    if (password == "") {
        valid = false
        document.getElementById("passerror").innerText = "Password is Required"
    }
    else {
        document.getElementById("passerror").innerText = ""
    }

    if (valid) {
        alert("Form Submitted...")
        localStorage.setItem("data", JSON.stringify(arr))

    }
    else {
        alert("User Not Filed Some Input Filed")
    }
})