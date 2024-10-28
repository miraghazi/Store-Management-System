//(1) بجيب الداتا من خلال id 
let productName=document.getElementById("productName");
let productPrice=document.getElementById("productPrice")
let productCategory=document.getElementById("productCategory")
let productDes=document.getElementById("productDes")
let productimg=document.getElementById("productimg")
let allproduct=[];
var productsearch=document.getElementById("productsearch") //(8)
var editpro=document.getElementById("editpro")
var addNew=document.getElementById("addNew")
var upNew =document.getElementById("upNew")
var upDateIndex;
//(6)  
if(localStorage.getItem('products') !== null)
    { allproduct = JSON.parse(localStorage.getItem('products'))
        displayProduct() }
// (2)object  بسحب قيمه وبضفها ف 
function addproduct(){
var product={
    code:productName.value,
    price:productPrice.value,
    des:productDes.value,
    Category:productCategory.value,
    image:`image/${productimg.files[0]?.name}`

}
allproduct.push(product); 
clearForm()
displayProduct();
localStorage.setItem('products', JSON.stringify(allproduct))
}
// (4)   
function clearForm(){
productName.value=null;
productPrice.value=null;
productCategory.value=null;
productDes.value=null;
productimg.value=null
}
// (5) 
function displayProduct(){
    var cartona=''
for(var i=0;i<allproduct.length;i++){ 
cartona+=`<div class="col-md-4">
            <div class="product">
            <img class="w-100" src="${allproduct[i].image}" alt="">
            <h3 class="h5 mt-2"><span class="fw-bolder">Name:</span>${allproduct[i].code}</h3>
            <h3 class="h5"><span class="fw-bolder">Price:</span> ${allproduct[i].price}</h3>
            <h3 class="h5"><span class="fw-bolder">Category:</span>${allproduct[i].Category}</h3>
            <h3 class="text-secondary mb-2"><span class="fw-bolder">Space:</span>${allproduct[i].des}</h3>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete<i class="fa-solid fa-trash px-3"></i></button>
            <button onclick="updatefn(${i})" class="btn btn-outline-warning btn-sm w-100 my-2"  id="editpro">UpDate<i class="fa-solid fa-pen px-3"></i></button>
            </div> 
           </div>`
        }
        document.getElementById("rowData").innerHTML=cartona;
}
// (7) 
function deleteProduct(deleteIndex){
    allproduct.splice(deleteIndex,1)
    displayProduct()
    localStorage.setItem('products', JSON.stringify(allproduct))  
}
//(8)
function searchProduct()
{   var term=productsearch.value;
    var cartona=''
    for(var i=0;i<allproduct.length;i++)
        { if(allproduct[i].code.toLowerCase().includes(term.toLowerCase()))
            {cartona+=`<div class="col-md-4">
                        <div class="product">
                        <img class="w-100" src="${allproduct[i].image}" alt="">
                        <h3 class="h5 mt-2"><span class="fw-bolder">Name:</span>${allproduct[i].code}</h3>
                        <h3 class="h5"><span class="fw-bolder">Price:</span> ${allproduct[i].price}</h3>
                        <h3 class="h5"><span class="fw-bolder">Category:</span>${allproduct[i].Category}</h3>
                        <h3 class="text-secondary mb-2"><span class="fw-bolder">Space:</span>${allproduct[i].des}</h3>
                        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete<i class="fa-solid fa-trash px-3"></i></button>
                        <button onclick="updatefn(${i})" class="btn btn-outline-warning btn-sm w-100 my-2"  id="editpro">UpDate<i class="fa-solid fa-pen px-3"></i></button>
                        </div> 
                        </div>`
        }
    }   document.getElementById('rowData').innerHTML=cartona;
}
//(9)
function updatefn(id){
    upDateIndex=id
    upNew.classList.remove("d-none");
    addNew.classList.add("d-none");
    productName.value=allproduct[id].code;
    productPrice.value=allproduct[id].price;
    productCategory.value=allproduct[id].Category;
    productDes.value=allproduct[id].des;
    productimg.value=allproduct[id].image;
}
//(10)
function  updateinfo(){
    upNew.classList.add("d-none");
    addNew.classList.remove("d-none");
    allproduct[upDateIndex].code = productName.value;
    allproduct[upDateIndex].price = productPrice.value;
    allproduct[upDateIndex].Category = productCategory.value;
    allproduct[upDateIndex].des = productDes.value;

     displayProduct();
    localStorage.setItem('products', JSON.stringify(allproduct))  ;
    clearForm();
   
}
//(11)
function validationproduct(elemant){

var regex={
    productName:/^[A-Z]?[a-zA-Z0-9 ]{1,9}\s?[a-zA-Z0-9 ]{1,9}$/,
    productPrice:/[1-9][0-9][0-9]/,
    productCategory:/(tv|mobil|laptop|nokia)/,
    productDes: /[a-zA-Z0-9 ]{1,9}$/
}
   if(regex[elemant.id].test(elemant.value))
      {    
            elemant.classList.add('is-valid');
            elemant.classList.remove('is-invalid');
            elemant.nextElementsibling.classList.replace('d-none','d-block')
            clearForm()
      }

     else { 
            elemant.classList.add('is-invalid');
            elemant.classList.remove('is-valid');
            elemant.nextElementSibling.classList.replace('d-block','d-none')     
    }
}



