// window.open wasn't opening a link in the system browser on iOS, so we have to use this function (requires phonegap.js)
function redirectToSystemBrowser(url) {
  // Wait for Cordova to load
  // open URL in default web browser
  var ref = window.open(encodeURI(url), '_system', 'location=yes');  
}

var languageMap = {
	"en":"English",
};

var app = {
	brand: "",
	lang: "en",
	languages: null,
	init: function(){
		app.getConfig();
		app.eventBindings();

	},
	getConfig: function(){
		app.brand = config.brand;
	  	$("#brand em").text(app.brand);
	  	$("title").html(app.brand + " hymnal");

	  	var langs = config.langs;
	  	app.languages = langs.split(",").sort();
	  	app.makeLanguageDropdown();
	  	// set languages
	},
	eventBindings: function(){
		
	},
	makeLanguageDropdown: function(){
		console.log(app.languages);
		if(app.languages.length==1){
			// only english
			// hide dropdown
			$(".navvy .first").hide();
		} else {
			var $target = $(".headerTop .dropdown ul");
			$target.html("");
			for(var i=0;i<app.languages.length; i++){
				var thisLang = app.languages[i];
				console.log(app.languages[i]);
				var $li = $(document.createElement("li"));
				var $a = $(document.createElement("a"));
				$a.attr("rel", thisLang);
				$a.html(thisLang + " : " + languageMap[thisLang]);

				$li.append($a);
				$target.append($li);
			}
		}
	},
	
	

}

app.init();