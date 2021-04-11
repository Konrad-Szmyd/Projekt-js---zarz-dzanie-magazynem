// ---------------------------------------------------------CATEGORY------------------------------------------------------

class categories{

   constructor(id, name, about){
      this.id = id;
      this.name = name;
      this.about = about;
   }

}
// -----------------------------------Pobranie kategorii z localStorage-----------------------------------------
let allCategories = [];
let idCat = 1;

if ("category" in localStorage) { 
   allCategories = JSON.parse(localStorage.getItem('category')); 
   const numberOfCategories = allCategories.length;
   const lastId = allCategories[numberOfCategories - 1].id;
   idCat = lastId + 1;
} else {
   // dane nie istnieją
}

const numberOfCategories = allCategories.length;
const lastId = allCategories[numberOfCategories - 1].id;

// ------------------------------------Pobranie produktów z localStorage-----------------------------------------
let allProducts = [];

if ("products" in localStorage) { 
   allProducts = JSON.parse(localStorage.getItem('products')); 
   console.log(allProducts);
}
 


// console.log(lastId); 

// let allProducts = [];
// let id=1;

const tabCat = document.querySelector('.category__table');
const idCateg = document.querySelector('#categoryId');
const nameCat = document.querySelector('#categoryName');
const aboutCat = document.querySelector('#categoryAbout');

// aboutCat.value = "coś";

//------------------------------------------------------AddCategoryButton---------------------------------------------
const buttonCategoryAdd = document.querySelector('.buttonCategoryAdd');
buttonCategoryAdd.addEventListener('click', () =>{
//    alert();
   const cat = new categories(idCat, nameCat.value, aboutCat.value);
   allCategories[idCat] = {
      "id": idCat,
      "name": cat.name,
      "about": cat.about
   } 
   localStorage.setItem('category', JSON.stringify(allCategories));
   idCat++;
   alert('Dodano kategorię do bazy, ID wyznaczone jest automatycznie - nie mozesz go edytować');
   clearAllInputs();
   console.log(allCategories);
})

//----------------------------------------------------ShowAllButton-------------------------------------------------------------
const showAllCategories = document.querySelector('.buttonCategoryShow');
showAllCategories.addEventListener('click', () => {
   createTable();
   clearAllInputs();
   
})


// ----------------------------------------------------------function create table-----------------------------------------
function createTable(){
    tabCat.innerHTML = "";
 
    const titles = ["ID","Nazwa","Opis"];
    const tr = document.createElement('tr');
    titles.forEach(title => {
       const th = document.createElement("th");
       th.innerHTML = title;
       tr.appendChild(th);
       });
    tabCat.appendChild(tr);
    
    // console.log(allProducts.length);
 
    allCategories.forEach(category => {
 
       if(category != null){
          const tr = document.createElement('tr');
 
          
          const td1 = document.createElement('td');
          td1.innerHTML = category.id;
          tr.appendChild(td1);
          
          const td2 = document.createElement('td');
          td2.innerHTML = category.name;
          tr.appendChild(td2);
          
          const td3 = document.createElement('td');
          td3.innerHTML = category.about;
          tr.appendChild(td3);

        tabCat.appendChild(tr);
         } 
 
       
    })
}

// ------------------------------------------------------function clearMainInputs---------------------------------------
function clearAllInputs() {
   idCateg.value = "";
   nameCat.value = "";
   aboutCat.value = "";
}

// -------------------------------------------------------- function delItem---------------------------------------
function delItem(){
   let i = 0;
   allProductsCategory = [];
   allProducts.forEach(product =>{
      if(product != null){
         allProductsCategory[i] = product.category;
      }
   })

   // console.log(allProductsCategory);


   allCategories.forEach(category => {
      if(category != null){
         if(category.id == idCateg.value){
            allProductsCategory.forEach(ProductCateg =>{
               if(ProductCateg != category.name){
                  const position = allCategories.indexOf(category);
                  // console.log(position);
                  allCategories.splice(position, 1);
                  // console.log(allProducts);
                  alert('Usunięto element');
                  localStorage.setItem('category', JSON.stringify(allCategories));
               } else {
                  alert("Nie mozna usunąć kategori ponieważ w bazie istnieje przynajmniej jeden produkt o tej kategori")
               }
            })
            
           
         }
      }
      
 
   })
   
}

// --------------------------------------------------------------------DelItem--------------------------------------------

const del = document.querySelector('.buttonCategoryDel');
del.addEventListener('click', () => {
   delItem();
})


// ----------------------------------------------------SearchButton-------------------------------------------------------------
const searchButton = document.querySelector('.buttonCategorySearch');
searchButton.addEventListener('click', () =>{
   tabCat.innerHTML = "";

   const titles = ["ID", "Nazwa", "Opis"];
   const tr = document.createElement('tr');
   titles.forEach(title => {
      const th = document.createElement("th");
      th.innerHTML = title;
      tr.appendChild(th);
      });
   tabCat.appendChild(tr);

   // alert();
   allCategories.forEach(category => {
      if(category != null){
         if(category.id == idCateg.value || category.name == nameCat.value || category.about == aboutCat.value){
            const tr = document.createElement('tr');
   
            const td1 = document.createElement('td');
            td1.innerHTML = category.id;
            tr.appendChild(td1);
   
            const td2 = document.createElement('td');
            td2.innerHTML = category.name;
            tr.appendChild(td2);
   
            const td3 = document.createElement('td');
            td3.innerHTML = category.about;
            tr.appendChild(td3);
   
            tabCat.appendChild(tr);
         }
      }
      
   })
   clearAllInputs();
})


// ---------------------------------------------------------Edit Panel ----------------------------------------
const editButton = document.querySelector('.buttonCategoryEdit');
const idEdit = document.querySelector('#categoryIdEdit');
const nameEdit = document.querySelector('#categoryNameEdit');
const aboutEdit = document.querySelector('#categoryAboutEdit');

editButton.addEventListener('click', ()=>{
   showEditPanel();
   allCategories.forEach(category =>{
      if(category != null){
         if(category.id == idCateg.value){
            idEdit.value = category.id;
            nameEdit.value = category.name;
            aboutEdit.value = category.about;
         }
      }
      
   })
})

//-----------------------------------------------functionclearEditInputs-----------------------------------------------
function clearEditInputs(){
   idEdit.value = "";
   nameEdit.value = "";
   aboutEdit.value = "";
   }

//---------------------------------------------------Edit close Button--------------------------------------------------
const editCloseButton = document.querySelector('.category__edit--close');
editCloseButton.addEventListener('click', () =>{
   clearEditInputs();
   hideEditPanel();
})


//-------------------------------------------------------Edit Save Button---------------------------------------------
const editSaveButton = document.querySelector('.editButton');
editSaveButton.addEventListener('click', ()=>{
   allCategories.forEach(category =>{
      if(category != null){
         if(category.id == idEdit.value){
            // idEdit.value = product.id;
            category.name = nameEdit.value;
            category.about = aboutEdit.value;
            alert("Zapisano zmiany");
         }
      }
      
   })
   
})


// ----------------------------------------Function Show && Hide EditPanel-----------------------------------------
function showEditPanel(){
   const editPanel = document.querySelector('.category__edit');
   editPanel.style.display = "flex";
}

function hideEditPanel(){
   const editPanel = document.querySelector('.category__edit');
   editPanel.style.display = "none";
}
