const urlBase = 'http://makeup-api.herokuapp.com/api/v1/products.json';
var url = urlBase;
var novaDiv;

function clearSearch() {
	
	if ( document.getElementById('divBlush') !== null ) {
		document.getElementById('divBlush').remove();
	}
	if ( document.getElementById('divLipstick') !== null ) {
		document.getElementById('divLipstick').remove();
	}
	clearDivProduct()
	url = urlBase;
	
}

function clearDivProduct() {
	if ( document.getElementById('divProduct') !== null ) {
		document.getElementById('divProduct').remove();
	}
}

function buscaMarca(id) {
	
	clearSearch();
	
	url = urlBase + "?brand=" + id;
	mostraOpcoes(id);
	
}

function mostraOpcoes(id) {
	
	var divOptions = document.getElementById('options');
	
	divBlush = document.createElement("div");
	divBlush.id = "divBlush";
	divBlush.classList.add("col-sm");
	divOptions.appendChild(divBlush);
	
	let btnBlush = document.createElement("button");
	btnBlush.innerHTML = "Blush";
	btnBlush.type = "button";
	btnBlush.id = "blush";
	btnBlush.classList.add("btn", "btn-outline-info");
	btnBlush.onclick = function () {
		buscaProdutos(btnBlush.id);
	};
	divBlush.appendChild(btnBlush);
	
	divLipstick = document.createElement("div");
	divLipstick.id = "divLipstick";
	divLipstick.classList.add("col-sm");
	divOptions.appendChild(divLipstick);
	
	let btnLipstick = document.createElement("button");
	btnLipstick.innerHTML = "Lipstick";
	btnLipstick.type = "button";
	btnLipstick.id = "lipstick";
	btnLipstick.classList.add("btn", "btn-outline-info");
	btnLipstick.onclick = function () {
		buscaProdutos(btnLipstick.id);
	};
	divLipstick.appendChild(btnLipstick);

}

function buscaProdutos(brandId){
	
	clearDivProduct();
		
	url = url + "&product_type=" + brandId;
	console.log("url 2: " + url);
	
	fetch(url)
		.then(data => {
			return data.json();
		})
		.then(post => {
			montaProdutos(post);
		});
}

function montaProdutos(produtos) {
			
	var divAll = document.getElementById('divAll');
	
	let divProduct = document.createElement("div");
	divProduct.id = "divProduct";
	divAll.appendChild(divProduct);
		
	for (var produto in produtos) {

		let divProducts = document.createElement("div");
		divProduct.appendChild(divProducts);

		let initialLine = document.createElement("HR");
		divProducts.appendChild(initialLine);
		
		let prodName = document.createElement("p");
		prodName.innerHTML = "nome: " + produtos[produto].name;
		divProducts.appendChild(prodName);
		
		let prodPrice = document.createElement("p");
		prodPrice.innerHTML = "preço: " + produtos[produto].price;
		divProducts.appendChild(prodPrice);
		
		let prodImage = document.createElement("p");
		let imageLink = produtos[produto].image_link;
		prodImage.innerHTML = "imagem: <a href=" + imageLink + " target ='_blank'>" + imageLink + "</a>";
		divProducts.appendChild(prodImage);
		
		let prodDesc = document.createElement("p");
		prodDesc.innerHTML = "descrição: " + produtos[produto].description;
		divProducts.appendChild(prodDesc);
		
		let prodColor = document.createElement("p");
		if ( produtos[produto].product_colors.length !== 0 ) {
			prodColor.innerHTML = "cor: " + produtos[produto].product_colors[0].colour_name;
		} else {
			prodColor.innerHTML = "cor: COR NÃO DISPONÍVEL";
		}
		divProducts.appendChild(prodColor);

	};
	
}