// Infinite scroll handler
window.onscroll = () => {
    console.log("scroll")
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        query(count)
        .then(book=>{
            if (book != null) add_book(book.filename)
        })
        count++
    }
}


addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
        console.log("click")
        // First get price
        fetch("./products.json")
        .then(response=> response.json())
        .then(items=> {
            items = items.books
            item = items.filter(x=>x.filename==event.target.id)[0]

            var width = event.target.width
            var height = event.target.height
            var descriptor = document.createElement("div")
            descriptor.className = "imgDescriptor"
            var string = "Name: " + item.name + "<br>Price: " + item.price
            descriptor.innerHTML = string
            event.target.parentNode.replaceChild(descriptor, event.target)
        })
        
    }
});



var count = 0

// filter results button handler
function newQuery() {
    console.log("Button press")
    count = 0

    // Clear contents
    document.getElementById("product_container").innerHTML = ""

    for (let x = 0; x < 4; x++) {
        query(count)
        .then(book=>{
            if (book != null) add_book(book.filename)
        })
        count++
    }
    
}

// Gets new queries
function query(itemCount) {
    var category = document.getElementById("category").value
    var name = document.getElementById("name").value;
    // Get json parse
    
    return fetch("./products.json")
    .then(response=> response.json())
    .then(items=> {
        items = items.books
        return items
    })
    .then(items=> {
        console.log("Filter by category")
        var filteredArray;
        if (category != "all") {
            filteredArray = items.filter(x=>x.category==category)
        }
        else filteredArray = items
        return filteredArray
    })
    .then(items=> {
        console.log("Filter by name")
        var filteredArray;
        if (name != "") {
            var filteredArray = items.filter(x=>x.name.includes(name))
        }
        else filteredArray = items
        return filteredArray
    })
    .then(items=> {
        console.log("Get nth item")
        if (itemCount >= items.length) {
            return null
        }
        else {
            return items[itemCount]
        }
    })
}


function add_book(filename) {
    var img = document.createElement('img');
    console.log(filename)
    img.src = filename;
    img.className = "product";
    img.id = filename
    document.getElementById('product_container').appendChild(img);
}