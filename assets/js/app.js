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
	hymn: 1,
	init: function(){
		app.getConfig();
		app.eventBindings();
		//app.initJplayer();
		app.makeDropdown();
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


	    $(".contrastIcon").on("click", function(){
	      $("body").toggleClass("dim");

	    });
	    
	    $(".custom-btns a").on("click", function(){
	      $(".custom-btns a").removeClass("current");
	      $(this).toggleClass("current");
	      $("#musicPlayer").hide();
	      $("#search").hide();
	      $("#numSearch").hide();
	      $("#copyrightPage").hide();
	      //$("#musicPlayer").hide();
	      $("#home").hide();

	      if($(this).attr("id")=="byNumber"){
	        $("#numSearch").show();
	        $(".hymnalSelection").hide();
	        //$("#footerBot").hide();
	        $("#numSearch #nums").val("").focus();
	        $("#numSearch .overlay").css("height", $(window).height());
	      } else if($(this).attr("id")=="searcher") {
	        $("#search").show();
	        $(".hymnalSelection").hide();

	        $("#searchField").val("").focus();
	        //$("#footerBot").hide();
	        $("#search .overlay").css("height", $(window).height());
	      } else if($(this).attr("id")=="copyright") {
	        
	        $("#copyrightPage").show();
	         $("#copyrightText").load("copyright.html");
	      } else {
	        $("#home").show();
	        
	        var valu = $("#hymnSelect").val();
	        valu = parseInt(valu, 10);
	        
	        var hymnURL = path + "?hymn="+valu;
	        var shareFB = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(hymnURL);
	        $("#facebookShare").attr("href", shareFB);
	        var shareTW = "https://twitter.com/intent/tweet?source=webclient&text=check%20out%20this%20Sabbath%20song%3A%2" + encodeURIComponent(hymnURL);
	        $("#twitterShare").attr("href", shareTW);
	        $("#emailShareURL").attr("value",hymnURL);
	        $("#home").hide();
	        $("#sharePage").show();
	      	console.log(shareFB + "\n" + shareTW);
	        $("#aboutText").load("about.html");
	        
	        
	      }

	    });

	},
	makeDropdown(){
	  var lang = app.lang;
	  var hymn = app.hymn;
	  var scriptPath = "lang/" + lang + "/list.js";
	  $("#tocWrap").html("");

	  switch(lang){
	    case 'en': var title = title_en; break;
	    case 'es': var title = title_es; break;
	    case 'pg': var title = title_pg; break;
	    case 'fr': var title = title_fr; break;
	    case 'de': var title = title_de; break;
	    case 'asl': var title = title_asl; break;
	    default: var title = title_en; break;
	  }
	  

	  if(title){
	    
	      $("#hymnSelect").html("");
	      var $toc = $(document.createElement("table"));
	          $toc.attr("id", "toc");
	          $toc.append("<thead><tr><th>Title</th><th>Page</th></tr></thead>");
	      var $tbody = $(document.createElement("tbody"));
	      for(var i=0; i<title.length; i++){
	        var num = i+1;
	        if(num<100){
	          num = "0"+num;
	        }
	        if(num<10){
	          num = "0"+num;
	        }
	        var $option = $(document.createElement("option"));
	        $option.attr("value", num);
	        $option.html(title[i]); 
	        $("#hymnSelect").append($option);

	        var $row = $(document.createElement("tr"));
	        var name = title[i];
	        name = name.substring(name.indexOf(")")+2,name.length);
	        $firstCell = $(document.createElement("td"));
	        $link = $(document.createElement("a"));
	        $link.attr("href", "javascript:loadSearch('"+num+"');").html(name).addClass("searchLink");
	        $firstCell.append($link);

	        $lastCell = $(document.createElement("td"));
	        $lastCell.html(num);
	        $row.append($firstCell, $lastCell);
	        //$row.append("<td>"+num+"</td>");
	        $tbody.append($row);
	      }
	      $toc.append($tbody);
	        
	      console.log("dataTable: " + typeof dataTable)
	      $("#tocWrap").append($toc);
	      $('#toc').dataTable().fnDestroy();
	      $("#toc").dataTable({
	        'iDisplayLength': 195,
	        language: {
	          searchPlaceholder: "Search records"
	         },
	         "dom": '<"filter"f>t<"clear">'
	      });

	      if(hymn==0) {
	        startRandom();
	      } else {
	        $("#hymnSelect").val(hymn).change();
	      }
	    
	  } else {
	    // false
	  }

	},
	initJplayer: function(){
		var player = $("#jquery_jplayer_1").jPlayer({
	    /*
	    ready: function () {
	      $(this).jPlayer("setMedia", {
	        title: "Hymn",
	        mp3: hymn
	      });
	      
	    },
	    */
	    swfPath: "dist/jplayer",
	    supplied: "mp3",
	    wmode: "window",
	    useStateClassSkin: true,
	    autoBlur: false,
	    smoothPlayBar: true,
	    autoPlay: true,
	    keyEnabled: true,
	    remainingDuration: true,
	    toggleDuration: true
	  });
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