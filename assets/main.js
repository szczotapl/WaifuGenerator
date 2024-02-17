const randomImage= document.querySelector(".random-image"),
	  randomWaifu = document.querySelector(".random-waifu"),
	  randomWaifuNsfw = document.querySelector(".random-waifu-nsfw"),
	  formSelect = document.querySelector(".form-select"),
	  formSelectNsfw = document.querySelector(".form-select-nsfw"),
	  nsfwToggle = document.querySelector("#nsfwToggle"),
	  imageWrapper = document.querySelector('.image-wrapper')
document.querySelector(".sfw").style.display = "flex"
document.querySelector(".nsfw").style.display = "none"

formSelect.addEventListener('change', generateWaifu)
formSelectNsfw.addEventListener('change', generateWaifu)

let checkboxNsfw = document.querySelector('input[type=checkbox]');    

nsfwToggle.addEventListener('change', ()=>{
	if (checkboxNsfw.checked) {
		document.querySelector(".nsfw").style.display = "flex"
		document.querySelector(".sfw").style.display = "none"
		generateWaifu()
	} else {
		document.querySelector(".sfw").style.display = "flex"
		document.querySelector(".nsfw").style.display = "none"
		generateWaifu()
	}
	
})

const loading = './assets/load.svg'
randomImage.src = loading

randomWaifu.addEventListener("click",generateWaifu);
randomWaifuNsfw.addEventListener("click",generateWaifu)

function generateWaifu() {
	randomImage.src = loading
	if (document.querySelector(".sfw").style.display == "flex") {
		fetchWaifu()
	} else if (document.querySelector(".nsfw").style.display == "flex") {
		fetchWaifuNsfw()
	}
}

async function fetchWaifu() {
	let category = formSelect.value;

	await fetch(`https://api.waifu.pics/sfw/${category}`)
		.then(response => response.json())
		.then(quote =>  {
			randomImage.src = quote.url
	})
}

async function fetchWaifuNsfw() {
	let category = formSelectNsfw.value;
	await fetch(`https://api.waifu.pics/nsfw/${category}`)
		.then(response => response.json())
		.then(quote =>  {
			randomImage.src = quote.url
	})
}

async function copyImg() {
	var imgElement = document.getElementsByClassName("random-image");
    imgElement.addEventListener("click", function() {
        var imgUrl = imgElement.src;
        window.open(imgUrl, "_blank");
    });
}


generateWaifu()