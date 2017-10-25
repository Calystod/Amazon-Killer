var productTitle = document.getElementById("productTitle").innerHTML;
var ISBN = $( ".content ul li:contains('ISBN-13')" ).text().split(':')[1].replace(/[^0-9]/g, '');
var getting = browser.storage.local.get("country");
console.log(getting);
var country = getting.then(function(result) { return result.country || "france";}, function(error) { new Error("Promise shouldn't be resolve")});
console.log(country);
var url = {
    "france": [
        {
            "name": "Place des libraires.fr",
            "url": 'http://www.placedeslibraires.fr/dlivre.php?gencod=ISBN_REPLACE&rid=',
            "logo": "placedeslibraires.png"
        },
        {
            "name": "La Librairie.com",
            "url": "http://www.lalibrairie.com/tous-les-livres/liste.html?recherche=ISBN_REPLACE&searchLang=fra&rapidSearch=1",
            "logo": "lalibrairie.png"
        }
    ],
    "quebec": [
        {
            "name": "Les libraires.ca",
            "url": 'http://www.leslibraires.ca/recherche/?t=&a=&e=&c=&i=ISBN_REPLACE&f=&ip=',
            "logo": "leslibraires.png"
        }
    ]
};

console.log("Charge");
console.log(url);
console.log(ISBN);
console.log(country);

var content = "";
for (let bookstore of url[country]) {
    console.log("COUCOU");
    content += '<div class="a-button-stack">' +
        '<a href=""' + bookstore['url'].replace("ISBN_REPLACE", ISBN) + '" target="_blank">' +
        '<span class="a-button a-spacing-small a-button-primary a-button-icon">' +
        '<span class="a-button-inner">' +
        '<i style="background-image:url(' + bookstore['logo'] + '); background-size:25px 25px; background-position: center;" class="a-icon a-icon-cart"></i>' +
        '<span class="a-button-text" aria-hidden="true">' +
        'Acheter en librairie ' + bookstore['name'] +
        '</span>' +
        '</span>' +
        '</span>' +
        '</a>' +
        '</div>';
}

console.log(content);

$('#buyNewInner').after(button);

 
window.addEventListener("load", function() {
    browser.extension.sendMessage({
        type: "dom-loaded", 
        data: {
			productTitle : ISBN
        }
    });
}, true);