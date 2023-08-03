var formProductName = document.getElementById("pn");
var formProductPrice = document.getElementById("pp");
var formProductCategory = document.getElementById("pc");
var formProductEvaluation = document.getElementById("pe");
var productNameWarning = document.getElementById("productNameWarning");
var productPriceWarning = document.getElementById("productPriceWarning");
var productCategoryWarning = document.getElementById("productCategoryWarning");
var productEvaluationWarning = document.getElementById("productEvaluationWarning");
var updBtn = document.getElementById("updBtn");
var addBtn = document.getElementById("addBtn");
var allProducts = [];
var productUpdate;


if (localStorage.getItem("allProducts") != null) {
    allProducts = JSON.parse(localStorage.getItem("allProducts"))
    displayAllProducts()
}


function addProduct() {

    if (validateProduct() == true) {
        var product = {
            name: formProductName.value,
            price: Number(formProductPrice.value),
            category: formProductCategory.value,
            evaluation: formProductEvaluation.value
        }
        allProducts.push(product);
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        displayAllProducts();
        clearForm();
    }
    else {
        validateProduct();
    }

}

function getupdateProduct(i) {
    updBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
    clearWrongValidation();
    addInputIsValid()
    formInputGreen()
    formProductName.value = allProducts[i].name;
    formProductPrice.value = allProducts[i].price;
    formProductCategory.value = allProducts[i].category;
    formProductEvaluation.value = allProducts[i].evaluation;
    productUpdate = i;
    scroll({
        top:0
    })
}

function updateProduct() {

    updBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    if (validateProduct() == true) {
        var product = {
            name: formProductName.value,
            price: Number(formProductPrice.value),
            category: formProductCategory.value,
            evaluation: formProductEvaluation.value
        }
        allProducts.splice(productUpdate, 1, product);
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        displayAllProducts();
        clearForm();

    } else {
        updBtn.classList.remove("d-none");
        addBtn.classList.add("d-none");
        validateProduct();
    }

}

function clearForm() {
    formProductName.value = "";
    formProductPrice.value = "";
    formProductCategory.value = "";
    formProductEvaluation.value = "";
    removeInputIsValid()
}

function displayAllProducts() {

    var productsBox = "";
    for (i = 0; i < allProducts.length; i++) {
        productsBox += `<tr>
            <th>${i}</th>
            <th>${allProducts[i].name}</th>
            <th>${allProducts[i].price}</th>
            <th>${allProducts[i].category}</th>
            <th>${allProducts[i].evaluation}</th>
            <th><button class="btn btn-info" onclick="getupdateProduct(${i})" >Update</button></th>
            <th><button class="btn btn-danger" onClick="deleteProduct(${i})" >Delete</button></th>
        </tr>`
    }
    document.getElementById("tbody").innerHTML = productsBox;
}

function searchProduct(test) {

    var searchBox = "";

    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(test.toLowerCase()) == true) {
            searchBox += `<tr>
            <th>${i}</th>
            <th>${allProducts[i].name}</th>
            <th>${allProducts[i].price}</th>
            <th>${allProducts[i].category}</th>
            <th>${allProducts[i].evaluation}</th>
            <th><button class="btn btn-info" onclick="getupdateProduct(${i})" >Update</button></th>
            <th><button class="btn btn-danger" onClick="deleteProduct(${i})" >Delete</button></th>
            </tr>`
        }
        document.getElementById("tbody").innerHTML = searchBox;
    }
}

function deleteProduct(index) {
    allProducts.splice(index, 1);
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    displayAllProducts();
}


/* ==================== FORM VALIDATION ==================== */



var productNameRegex = /^[A-Z]([0-9]*[a-z A-Z]){2,}[0-9]*$/;
var productPriceRegex = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;
var productCategoryRegex = /^([0-9]*[a-z A-Z]){3,}[0-9]*$/;
var productEvaluationRegex = /^(Bad|Moderate|Good|V.Good|Excellent)$/i;


function validateProduct() {
    if (productNameRegex.test(formProductName.value) == false) {
        return (productNameWarning.classList.remove("d-none"), formProductName.classList.add("is-invalid"))

    }

    else if (productPriceRegex.test(formProductPrice.value) == false) {
        return (productPriceWarning.classList.remove("d-none"), formProductPrice.classList.add("is-invalid"))
    }
    else if (productCategoryRegex.test(formProductCategory.value) == false) {
        return (productCategoryWarning.classList.remove("d-none"), formProductCategory.classList.add("is-invalid"))
    }

    else if (productEvaluationRegex.test(formProductEvaluation.value) == false) {
        return (productEvaluationWarning.classList.remove("d-none"), formProductEvaluation.classList.add("is-invalid"))
    }

    return true;
}


formProductName.addEventListener('input', validateNameInput)
function validateNameInput() {
    if (productNameRegex.test(formProductName.value) == false) {
        formProductName.style.color = "red"
        formProductName.classList.add("is-invalid")
        productNameWarning.classList.remove("d-none")
    } else {
        formProductName.style.color = "green"
        formProductName.classList.replace("is-invalid", "is-valid")
        productNameWarning.classList.add("d-none")
    }
}

formProductPrice.addEventListener('input', validatePriceInput)
function validatePriceInput() {
    if (productPriceRegex.test(formProductPrice.value) == false) {
        formProductPrice.style.color = "red"
        formProductPrice.classList.add("is-invalid")
        productPriceWarning.classList.remove("d-none")
    } else {
        formProductPrice.style.color = "green"
        formProductPrice.classList.replace("is-invalid", "is-valid")
        productPriceWarning.classList.add("d-none")
    }
}

formProductCategory.addEventListener('input', validateCategoryInput)
function validateCategoryInput() {
    if (productCategoryRegex.test(formProductCategory.value) == false) {
        formProductCategory.style.color = "red"
        formProductCategory.classList.add("is-invalid")
        productCategoryWarning.classList.remove("d-none")
    } else {
        formProductCategory.style.color = "green"
        formProductCategory.classList.replace("is-invalid", "is-valid")
        productCategoryWarning.classList.add("d-none")
    }
}

formProductEvaluation.addEventListener('input', validateEvaluationInput)
function validateEvaluationInput() {
    if (productEvaluationRegex.test(formProductEvaluation.value) == false) {
        formProductEvaluation.style.color = "red"
        formProductEvaluation.classList.add("is-invalid")
        productEvaluationWarning.classList.remove("d-none")
    } else {
        formProductEvaluation.style.color = "green"
        formProductEvaluation.classList.replace("is-invalid", "is-valid")
        productEvaluationWarning.classList.add("d-none")
    }
}

function clearWrongValidation() {
    doNotDisplayWarning()
    removeInputIsValid()
    removeInputIsInvalid()
}

function formInputGreen() {
    formProductName.style.color = "green";
    formProductPrice.style.color = "green";
    formProductCategory.style.color = "green";
    formProductEvaluation.style.color = "green";
}

function addInputIsValid() {
    formProductName.classList.add("is-valid");
    formProductPrice.classList.add("is-valid");
    formProductCategory.classList.add("is-valid");
    formProductEvaluation.classList.add("is-valid");
}

function removeInputIsValid() {
    formProductName.classList.remove("is-valid");
    formProductPrice.classList.remove("is-valid");
    formProductCategory.classList.remove("is-valid");
    formProductEvaluation.classList.remove("is-valid");
}


function removeInputIsInvalid() {
    formProductName.classList.remove("is-invalid");
    formProductPrice.classList.remove("is-invalid");
    formProductCategory.classList.remove("is-invalid");
    formProductEvaluation.classList.remove("is-invalid");
}

function doNotDisplayWarning() {
    productNameWarning.classList.add("d-none")
    productPriceWarning.classList.add("d-none")
    productCategoryWarning.classList.add("d-none")
    productEvaluationWarning.classList.add("d-none")
}