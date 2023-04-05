
let element = document.querySelector('.text');
let author = document.querySelector('.author');
var quoteBtn = document.querySelector(".quotebtn");
var quoteBtnText = document.querySelector(".quotebtnText");
var soundBtn = document.querySelector(".soundBtn");
var copyBtn = document.querySelector(".copyBtn");
var twitterBtn = document.querySelector(".twitterBtn");
const dropdown = document.querySelector('.dropdown');
const searchBox = document.querySelector('.textBox');
let authorName = document.querySelector('.author-name');
let authorDetails = document.querySelector('.author-text');

const options = {
	method: 'GET',
    
	headers: {
		'X-RapidAPI-Key': '284edcd0b4msh07d10cef507db90p11682cjsna268e76e21a0',
		'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
	}
};

function show(language){
    searchBox.value = language;
    if(language == "English"){
        localStorage.setItem("lan","en");
        localStorage.setItem("lan_show","English");
    }else if(language == "Spanish"){
        localStorage.setItem("lan","es");
        localStorage.setItem("lan_show","Spanish");
    }else if(language == "Portuguese"){
        localStorage.setItem("lan","pt");
        localStorage.setItem("lan_show","Portuguese");
    }else if(language == "Italian"){
        localStorage.setItem("lan","it");
        localStorage.setItem("lan_show","Italian");
    }else if(language == "German"){
        localStorage.setItem("lan","de");
        localStorage.setItem("lan_show","German");
    }else if(language == "French"){
        localStorage.setItem("lan","fr");
        localStorage.setItem("lan_show","French");
    }else{
        localStorage.setItem("lan","en");
    }
    
}

searchBox.value = localStorage.getItem("lan_show");




dropdown.onclick = function(){
    dropdown.classList.toggle('active');
}


function quotegenerator(lan) {
    quoteBtn.classList.add("loading");
    quoteBtnText.innerHTML = "Generateing"
    
    fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code='+lan, options)
	.then(response => 
        response.json())
	.then(result => {

        console.log(result);
        element.innerText = '" ' + result.content + ' "';
        author.innerHTML  = "~ "+result.originator.name;
        quoteBtn.classList.remove("loading");
        quoteBtnText.innerHTML = "New Quote";

        authorName.innerHTML = result.originator.name;
        authorDetails.innerHTML = result.originator.description;
    }
    )
	.catch(err => console.error(err));

    
}

soundBtn.addEventListener('click',()=>{
    var msg = new SpeechSynthesisUtterance();
    msg.text = element.innerHTML;
    window.speechSynthesis.speak(msg);
});

copyBtn.addEventListener('click',()=>{
    navigator.clipboard.writeText(element.innerHTML);
})
twitterBtn.addEventListener('click',()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${element.innerHTML}`;
    window.open(tweetUrl, "_blank");
})

if(searchBox.value == ''){
    quoteBtn.addEventListener('click',quotegenerator("en"));
}else{
    quoteBtn.addEventListener('click',quotegenerator(localStorage.getItem("lan")));
}

// quoteBtn.addEventListener('click',quotegenerator(localStorage.getItem("lan")));




    
