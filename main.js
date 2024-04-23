let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let search = document.getElementById('search');

let mood = 'create';
let tmp;


// get total 
function getTotal(){
        if(price.value != '') {
                let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
                total.innerHTML = result;
                total.style.background = '#040';
        }
        else {
                total.innerHTML = '';
                total.style.background = '#a00';
        }
}

// create product
let dataProducts ;
if(localStorage.product != null){
        dataProducts = JSON.parse(localStorage.product);
} else{
        dataProducts = [] ;
}
create.onclick = function()
{
        let newProduct = {
                title: title.value.toLowerCase(),
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                count: count.value,
                category: category.value.toLowerCase(),
        }
        // the condition for cleaning
        if(title.value != '' && price.value != '' && category.value != '' && newProduct.count < 100)
        {
                 // count
                if(mood == 'create') 
                {
                        if(newProduct.count > 1) 
                        {
                                for(let i=0; i<newProduct.count; i++) 
                                {
                                        dataProducts.push(newProduct);
                                }
                        }
                        else 
                        {
                                dataProducts.push(newProduct);
                        }
                }
                // update
                else  
                {
                        dataProducts[tmp] = newProduct;
                        mood = 'create'
                        create.innerHTML = 'Create';
                        count.style.display = 'block';
                }
                clearData();
        }
        
        
        localStorage.setItem('product', JSON.stringify(dataProducts));
        console.log(dataProducts);

        showData();
}
// clear inputs
function clearData(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
        total.style.background = '#a00';
}

// read
function showData(){
        let table = '' ;
        for(let i=0; i<dataProducts.length; i++) {
                table += `
                <tr> 
                        <td> ${i+1} </td>
                        <td> ${dataProducts[i].title} </td>
                        <td> ${dataProducts[i].category} </td>
                        <td> ${dataProducts[i].price} </td>
                        <td> ${dataProducts[i].taxes} </td>
                        <td> ${dataProducts[i].ads} </dd>
                        <td> ${dataProducts[i].discount}</td>
                        <td> ${dataProducts[i].total} </td>
                        <td> <button onclick='updateElement(${i})' id="update"> update </button> </td>
                        <td> <button onclick='deleteElement(${i})' id="delete"> delete </button> </td>
                </tr>
                ` ;
        }

        document.getElementById('tbody').innerHTML = table;

        let btnDeleteAll = document.getElementById('deleteAll');
        if(dataProducts.length > 0) {
                btnDeleteAll.innerHTML = `
                        <button onclick='deleteAll()'> Delete All (${dataProducts.length}) </button> 
                `;
        }
        else {
                btnDeleteAll.innerHTML = ``;
        }
}
showData();

// delete
function deleteElement(i) {
        dataProducts.splice(i,1);
        // عشان امسح من اللوكال ستوريج - بمسح من الاراي وبعدين بضيف الاراي الجديد فاللوكال ستوريج
        localStorage.product = JSON.stringify(dataProducts);
        // عشان اعمل تحديث للداتا مضطرش اعنل ريفرش عشان يبان اني مسحت
        showData();
}

// delete all
function deleteAll() {
        dataProducts.splice(0);
        localStorage.clear();
        showData();
}

// update

function updateElement(i) {
        title.value = dataProducts[i].title;
        price.value = dataProducts[i].price;
        taxes.value = dataProducts[i].taxes;
        ads.value = dataProducts[i].ads;
        discount.value = dataProducts[i].discount;
        getTotal();
        category.value=dataProducts[i].category;
        count.style.display = 'none';
        create.innerHTML = 'Update';
        
        tmp = i;
        mood = 'update';
        scroll( {
                        top:0,
                        behavior: 'smooth',
                }) ;
        }


// search
let searchMood = 'title';
function getSearchMood(id){
        if(id == 'searchTitle'){
                searchMood='title';
                search.placeholder = 'Search By  Title ...';
        } else {
                searchMood = 'category';
                search.placeholder = 'Search By  Category ...';
        }
        search.focus();
        search.value = '';
        showData();
}
function searchData(value) 
{
        let table = '' ;
        value = value.toLowerCase();

        for(let i=0; i<dataProducts.length; i++) 
        {
                let tableContent = `
                <tr> 
                        <td> ${i} </td>
                        <td> ${dataProducts[i].title} </td>
                        <td> ${dataProducts[i].category} </td>
                        <td> ${dataProducts[i].price} </td>
                        <td> ${dataProducts[i].taxes} </td>
                        <td> ${dataProducts[i].ads} </dd>
                        <td> ${dataProducts[i].discount}</td>
                        <td> ${dataProducts[i].total} </td>
                        <td> <button onclick='updateElement(${i})' id="update"> update </button> </td>
                        <td> <button onclick='deleteElement(${i})' id="delete"> delete </button> </td>
                </tr>
                `;
                if(searchMood == 'title') 
                {
                                if(dataProducts[i].title.includes(value)) 
                                {
                                        table += tableContent;
                                }
                } 
                else 
                {
                                if(dataProducts[i].category.includes(value)) 
                                {
                                        table += tableContent;
                                }
                }
        }
        document.getElementById('tbody').innerHTML = table;
}



console.log(dataProducts);

((((((()))))))