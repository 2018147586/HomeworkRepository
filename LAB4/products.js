// Infinite scroll
window.onscroll = () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
       scroll()
   }
}

var count = 0

function newQuery() {
    console.log("Button press")
    count = 0
    query(count)
    .then(book=>{
        if (book != null) add_book(book.filename)
    })
    count++
    query(count)
    .then(book=>{
        if (book != null) add_book(book.filename)
    })
    count++
    
    // add_book(query(count).filename)
    // count = count + 1
    // add_book(query(count).filename)
}

function scroll() {
    query(count)
    .then(book=>{
        if (book != null) add_book(book.filename)
    })
    count++
}

function query(itemCount) {
    var category = document.getElementById("category").value
    console.log(category)
    var name = document.getElementById("name").value;
    console.log(name)
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
        console.log(filteredArray)
        return filteredArray
    })
    .then(items=> {
        console.log("Filter by name")
        var filteredArray;
        if (name != "") {
            var filteredArray = items.filter(x=>x.name.includes(name))
        }
        else filteredArray = items
        console.log(filteredArray)
        return filteredArray
    })
    .then(items=> {
        console.log("Get nth item")
        if (itemCount >= items.length) {
            return null
        }
        else {
            console.log(items[itemCount])
            return items[itemCount]
        }
    })
}


function add_book(filename) {
    var img = document.createElement('img');
    console.log(filename)
    img.src = filename;
    img.class = "product";
    document.getElementById('product_container').appendChild(img);
}