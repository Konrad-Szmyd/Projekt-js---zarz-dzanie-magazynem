class product {
   

    constructor(id,name, category, amount, price, about){
       this.id = id;
       this.name = name;
       this.category = category;
       this.amount = amount;
       this.price = price;
       this.about = about;
    }

    getProduct(){
        return(`${this.id} ${this.name} ${this.category} ${this.amount} ${this.price} ${this.about}`);
    }

    setProduct(id,name, category, amount, price, about){
       this.id = id;
       this.name = name;
       this.category = category;
       this.amount = amount;
       this.price = price;
       this.about = about;
    }

    editProduct(id,name, category, amount, price, about){
       this.id = id;
       this.name = name;
       this.category = category;
       this.amount = amount;
       this.price = price;
       this.about = about;
    }

    deleteProduct(name){
       
    }


}


let allProducts = [];
let id=1;

if ("products" in localStorage) { 
   allProducts = JSON.parse(localStorage.getItem('products')); 
   const numberOfProducts = allProducts.length;
   const lastId = allProducts[numberOfProducts - 1].id;
   id = lastId + 1;
} else {
   // dane nie istnieją
}

const numberOfProducts = allProducts.length;
const lastId = allProducts[numberOfProducts - 1].id;
// console.log(lastId); 

// let allProducts = [];
// let id=1;


let allCategories = [];
let allCategoriesNames = ["--Wybierz--"];
let iCat = 1;

if ("category" in localStorage) { 
   allCategories = JSON.parse(localStorage.getItem('category')); 
   console.log(allCategories);
}

allCategories.forEach(category =>{
   if(category != null){
      allCategoriesNames[iCat] = category.name;
      iCat++;
   }
})
console.log(allCategoriesNames);


const tab = document.querySelector('.product__table');
const idT = document.querySelector('#productId');
const name1 = document.querySelector('#productName');
// const selectElement = document.querySelector('.selectElement');

const category = document.querySelector('#productCategory');
const amount = document.querySelector('#productAmount');
const price = document.querySelector('#productPrice');
const about = document.querySelector('#productAbout');


const inputSelect = document.querySelector('.inputSelect');
// const titles = ["--Wybierz--", "Stolarka", "Elektronika", "Agd", "Ksiązki", "kol", "123"];
const titles = allCategoriesNames;
const selectElement = document.createElement('select');

// pageTi.innerHTML = pageTitle.innerHTML;

   titles.forEach(title => {
      if(title != null){
         const option = document.createElement("option");
         option.innerHTML = title;
         selectElement.appendChild(option);
         // console.log(titles);
      }
      });
      inputSelect.appendChild(selectElement);
      // console.log(selectElement.value);



//------------------------------------------------------AddProductButton---------------------------------------------
const addProductButton = document.querySelector('.buttonAdd');
addProductButton.addEventListener('click', () =>{
   const prod = new product(id, name1.value, selectElement.value, amount.value, price.value, about.value);
   allProducts[id] = {
      "id": id,
      "name": prod.name,
      "category": prod.category,
      "amount": prod.amount,
      "price": prod.price,
      "about": prod.about
   } 
   localStorage.setItem('products', JSON.stringify(allProducts));
   id++;
   alert('Dodano produkt do bazy, ID wyznaczone jest automatycznie - nie mozesz go edytować');
   clearAllInputs();
   console.log(allProducts);
})

//----------------------------------------------------ShowAllButton-------------------------------------------------------------
const showAllProducts = document.querySelector('.buttonShow');
showAllProducts.addEventListener('click', () => {
   createTable();
   clearAllInputs();
   
})

// ----------------------------------------------------SearchButton-------------------------------------------------------------
const searchButton = document.querySelector('.buttonSearch');
searchButton.addEventListener('click', () =>{
   tab.innerHTML = "";

   const titles = ["ID", "Nazwa", "Kategoria", "Ilość" , "Cena", "Opis"];
   const tr = document.createElement('tr');
   titles.forEach(title => {
      const th = document.createElement("th");
      th.innerHTML = title;
      tr.appendChild(th);
      });
   tab.appendChild(tr);

   // alert();
   allProducts.forEach(product => {
      if(product != null){
         if(product.id == idT.value || product.name == name1.value || product.category == selectElement.value || product.amount == amount.value || product.price == price.value){
            const tr = document.createElement('tr');
   
            const td6 = document.createElement('td');
            td6.innerHTML = product.id;
            tr.appendChild(td6);
   
            const td1 = document.createElement('td');
            td1.innerHTML = product.name;
            tr.appendChild(td1);
   
            const td2 = document.createElement('td');
            td2.innerHTML = product.category;
            tr.appendChild(td2);
   
            const td3 = document.createElement('td');
            td3.innerHTML = product.amount;
            tr.appendChild(td3);
   
            const td4 = document.createElement('td');
            td4.innerHTML = product.price;
            tr.appendChild(td4);
   
            const td5 = document.createElement('td');
            td5.innerHTML = product.about;
            tr.appendChild(td5);
   
            tab.appendChild(tr);
         }
      }
      
   })
   clearAllInputs();
})

// --------------------------------------------------------------------DelItem--------------------------------------------

const del = document.querySelector('.buttonDel');
del.addEventListener('click', () => {
   delItem();
})

// ----------------------------------------------------------function create table-----------------------------------------
function createTable(){
   tab.innerHTML = "";

   const titles = ["ID","Nazwa", "Kategoria", "Ilość" , "Cena", "Opis"];
   const tr = document.createElement('tr');
   titles.forEach(title => {
      const th = document.createElement("th");
      th.innerHTML = title;
      tr.appendChild(th);
      });
   tab.appendChild(tr);
   
   // console.log(allProducts.length);

   allProducts.forEach(product => {

      if(product != null){
         const tr = document.createElement('tr');

      const td6 = document.createElement('td');
      td6.innerHTML = product.id;
      tr.appendChild(td6);

      const td1 = document.createElement('td');
      td1.innerHTML = product.name;
      tr.appendChild(td1);

      const td2 = document.createElement('td');
      td2.innerHTML = product.category;
      tr.appendChild(td2);

      const td3 = document.createElement('td');
      td3.innerHTML = product.amount;
      tr.appendChild(td3);

      const td4 = document.createElement('td');
      td4.innerHTML = product.price;
      tr.appendChild(td4);

      const td5 = document.createElement('td');
      td5.innerHTML = product.about;
      tr.appendChild(td5);

      tab.appendChild(tr);
      } 

      
   })
}
// ------------------------------------------------------function clearMainInputs---------------------------------------
function clearAllInputs() {
   idT.value = "";
   name1.value = "";
   // category.value="";
   selectElement.value = "--Wybierz--";
   amount.value = "";
   price.value = "";
   about.value = "";
}



// -------------------------------------------------------- function delItem---------------------------------------
function delItem(){
   allProducts.forEach(product => {
      if(product != null){
         if(product.id == idT.value){
            const position = allProducts.indexOf(product);
            // console.log(position);
            allProducts.splice(position, 1);
            // console.log(allProducts);
            alert('Usunięto element');
            localStorage.setItem('products', JSON.stringify(allProducts));
           
         }
      }
      
 
   })
   
}

// ---------------------------------------------------------Edit Panel ----------------------------------------
const editButton = document.querySelector('.buttonEdit');
const idEdit = document.querySelector('#productIdEdit');
const nameEdit = document.querySelector('#productNameEdit');
// const categoryEdit = document.querySelector('#productCategoryEdit');
const amountEdit = document.querySelector('#productAmountEdit');
const priceEdit = document.querySelector('#productPriceEdit');
const aboutEdit = document.querySelector('#productAboutEdit');


const inputEditSelect = document.querySelector('.inputEditSelect');
const selectEditElement = document.createElement('select');
   
titles.forEach(title => {
   const option = document.createElement("option");
   option.innerHTML = title;
   selectEditElement.appendChild(option);
   });
   inputEditSelect.appendChild(selectEditElement);
   console.log(selectEditElement.value);


editButton.addEventListener('click', ()=>{
   showEditPanel();
   allProducts.forEach(product =>{
      if(product != null){
         if(product.id == idT.value){
            idEdit.value = product.id;
            nameEdit.value = product.name;
            selectEditElement.value = product.category;
            amountEdit.value = product.amount;
            priceEdit.value = product.price;
            aboutEdit.value = product.about;
         }
      }
      
   })
})

//-----------------------------------------------functionclearEditInputs-----------------------------------------------
function clearEditInputs(){
   idEdit.value = "";
   nameEdit.value = "";
   selectEditElement.value = "--Wybierz--";
   amountEdit.value = "";
   priceEdit.value = "";
   aboutEdit.value = "";
   }

//---------------------------------------------------Edit close Button--------------------------------------------------
const editCloseButton = document.querySelector('.product__edit--close');
editCloseButton.addEventListener('click', () =>{
   clearEditInputs();
   hideEditPanel();
})


//-------------------------------------------------------Edit Save Button---------------------------------------------
const editSaveButton = document.querySelector('.editButton');
editSaveButton.addEventListener('click', ()=>{
   allProducts.forEach(product =>{
      if(product != null){
         if(product.id == idEdit.value){
            // idEdit.value = product.id;
            product.name = nameEdit.value;
            product.category = selectEditElement.value;
            product.amount = amountEdit.value;
            product.price = priceEdit.value;
            product.about = aboutEdit.value;
            alert("Zapisano zmiany");
         }
      }
      
   })
   
})


// ----------------------------------------Function Show && Hide EditPanel-----------------------------------------
function showEditPanel(){
   const editPanel = document.querySelector('.product__edit');
   editPanel.style.display = "flex";
}

function hideEditPanel(){
   const editPanel = document.querySelector('.product__edit');
   editPanel.style.display = "none";
}



