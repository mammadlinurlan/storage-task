let addbuttons = document.querySelectorAll(".addBtn");
let sidebar = document.querySelector(".sidebar");
let shoppingCard = document.querySelector(".test");
console.log(shoppingCard);

shoppingCard.onclick = function () {
    if (sidebar.style.height === "0vh") {
        sidebar.style.height = "70vh";
        return;
    }
    sidebar.style.height = "0vh";
}



addbuttons.forEach((btn) => {
    btn.onclick = function (e) {

        e.preventDefault();
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }
        let basket = JSON.parse(localStorage.getItem("basket"))
        let name = this.parentElement.children[0].innerHTML
        let image = this.parentElement.parentElement.children[0].src
        let price = this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML

        let dataid = this.getAttribute("data-id");

        let product = { ID: dataid, name, image, price, count: 1 };

        let photo = document.createElement("img");
        photo.src = image;
        photo.style.width = "60px";
        let section = document.createElement("div");
        section.setAttribute("data-id", dataid);
        section.className = "d-flex align-items-center mb-3";

        let prodName = document.createElement("h4");
        prodName.style.color = "white";
        prodName.style.fontSize = "15px";
        prodName.style.width = "max-content";
        prodName.innerText = name;

        let prodPrice = document.createElement("p");
        prodPrice.style.color = "white";
        prodPrice.style.margin = "0";
        prodPrice.style.width = "max-content";
        prodPrice.className = "ms-2";
        prodPrice.innerText = price;

        let prodCount = document.createElement("p")
        prodCount.style.color = "white";
        prodCount.style.margin = "0";
        prodCount.style.width = "max-content";
        prodCount.className = "ms-2 count";
        prodCount.innerText = product.count;

        



        let existedProd = basket.find(prod => prod.ID == dataid)
        if (existedProd == undefined) {
            basket.push(product);
            section.append(photo);
            section.append(prodName);

            section.append(`${prodPrice.innerText}$`);
            section.append(prodCount);
            sidebar.append(section);
            
        
        } else {
            existedProd.count++;
            const id = existedProd.ID;
            let countElement = document.querySelector(`div[data-id="${id}"] > p.count`);
            console.log(countElement);
            countElement.innerText = existedProd.count;
        }

        localStorage.setItem("basket", JSON.stringify(basket));
        

        totalprice();
        
        counter();

       
    }
})

counter();

function counter() {
    if (localStorage.getItem("basket") == null) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
    let count = document.querySelector(".cardcount");
    let basket = JSON.parse(localStorage.getItem("basket"));
    count.innerHTML = basket.length;
}

totalprice();

function totalprice() {
    if (localStorage.getItem("basket") == null) {
        localStorage.setItem("basket", JSON.stringify([]))
    }

    let total = 0

    let basket = JSON.parse(localStorage.getItem("basket"))

    basket.forEach((prod) => {
        total += prod.price * prod.count
        
    })
    return total; 
    
}




window.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem("basket"));
    items?.forEach((item) => {
        sidebar.innerHTML +=
        `
        <div class="d-flex align-items-center mb-3" data-id="${item.ID}">
            <img src="${item.image}" style="width: 60px;">
            <h4 style="color: white; font-size: 15px; width: max-content;">${item.name}</h4>
            <p class="ms-2" style="color: white; margin: 0px; width: max-content;">${item.price}$</p>
            <p class="ms-2 count" style="color: white; margin: 0px; width: max-content;">${item.count}</p>
        </div>
        `
    });
});
