let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submet = document.getElementById('submet');
let mood = 'create'
let tmp;

//#* get total *#//
function getTotal(){
        if(price.value != ''){
                let result = (+price.value + +ads.value + +taxes.value) 
                 - +discount.value;
                total.innerHTML = result;
                total.style.background = "#040";      
        }else{
                total.innerHTML = "";
                total.style.background = "#a00d02"
        }
}
//#* creat prodact #*//
let arrData;
if(localStorage.product !=null){
       arrData = JSON.parse(localStorage.product);
}else{
       arrData = [];
}
submet.onclick = function(){
        let newData ={
                title:title.value.toLowerCase(),
                price:price.value,
                ads:ads.value,
                taxes:taxes.value,
                discount:discount.value,
                total:total.innerHTML,
                count:count.value,
                category:category.value.toLowerCase(),
        }
        if(title.value != ''
                &&price.value != ''
                &&category.value != ''
                &&newData.count <= 100){
                if(mood === 'create'){
                        if(newData.count > 1){
                                for(let i = 0; i < newData.count; i++){
                                        arrData.push(newData);
                                }
                        }else{
                                arrData.push(newData);
                        }
                        
                }else{
                        clearData()
        }
        
                arrData[tmp] = newData;
                mood = 'create';
                submet.innerHTML = 'create';
                count.style.display = 'block'      
        }

        //#* save localstoreg #*//
        localStorage.setItem("product",  JSON.stringify(arrData)),
        readData()
}

//#* cleer input #*//
function clearData(){
        title.value = "";
        price.value = "";
        ads.value = "";
        taxes.value = "";
        discount.value = "";
        total.innerHTML = ""; 
        count.value = "";
        category.value = "";
}
//#* read date #*//
function readData(){
        getTotal()
        let table = '';
        for(let i =0; i < arrData.length; i++){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${arrData[i].title}</td>
                        <td>${arrData[i].price}</td>
                        <td>${arrData[i].taxes}</td>
                        <td>${arrData[i].ads}</td>
                        <td>${arrData[i].discount}</td>
                        <td>${arrData[i].total}</td>
                        <td>${arrData[i].category}</td>
                        <td><button onclick="updateData(${i})" id="ubdate">update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                    </tr>`     
        }
        document.getElementById('tbody').innerHTML = table;
        let btnDelete =document.getElementById('deleteAll');
        if(arrData.length > 0){
                btnDelete.innerHTML = `
                <button onclick="deleteAll()">delete All (${arrData.length}) </button>`
        }else{
                btnDelete.innerHTML = '';
        }

        
}
readData();
//#* delete #*//
function deleteData(i){
        arrData.splice(i,1);
        localStorage.product = JSON.stringify(arrData);
        readData()
  
}
function deleteAll(){
        localStorage.clear();
        arrData.splice(0);
        readData()
}
//#* UP Date #*//
function updateData(i){
        title.value = arrData[i].title;
        price.value = arrData[i].price;
        ads.value = arrData[i].ads;
        taxes.value = arrData[i].taxes;
        discount.value = arrData[i].discount;
        getTotal()
        count.style.display ="none";
        category.value = arrData[i].category;
        submet.innerHTML = 'update';
        mood = 'update';
        tmp = i;
        scroll({
                top:0,
                behavior:'smooth',
        })
}
//#* search #*//
let theSearch = 'title';
let search = document.getElementById('search');
function getSearch(id){
        if(id == 'searchTitle'){
                theSearch = 'title'; 
        }else{
                theSearch = 'category';
        }
        search.placeholder = 'search by '+ theSearch; 
        search.focus() 
        search.value = ''; 
        readData()  
}
function searchData(value){
        let table = '';
        for( let i =0; i < arrData.length; i++){
        if( theSearch == 'title'){
                
                        if(arrData[i].title.includes(value.toLowerCase())){
                                table += `
                                <tr>
                                    <td>${i}</td>
                                    <td>${arrData[i].title}</td>
                                    <td>${arrData[i].price}</td>
                                    <td>${arrData[i].taxes}</td>
                                    <td>${arrData[i].ads}</td>
                                    <td>${arrData[i].discount}</td>
                                    <td>${arrData[i].total}</td>
                                    <td>${arrData[i].category}</td>
                                    <td><button onclick="updateData(${i})" id="ubdate">update</button></td>
                                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                                </tr>`           
                        }
        }else{
                        if(arrData[i].category.includes(value.toLowerCase())){
                                table += `
                                <tr>
                                    <td>${i}</td>
                                    <td>${arrData[i].title}</td>
                                    <td>${arrData[i].price}</td>
                                    <td>${arrData[i].taxes}</td>
                                    <td>${arrData[i].ads}</td>
                                    <td>${arrData[i].discount}</td>
                                    <td>${arrData[i].total}</td>
                                    <td>${arrData[i].category}</td>
                                    <td><button onclick="updateData(${i})" id="ubdate">update</button></td>
                                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                                </tr>`           
                        }
                   
        }
}
        document.getElementById('tbody').innerHTML = table;
}




   
