// window.open wasn't opening a link in the system browser on iOS, so we have to use this function (requires phonegap.js)
function redirectToSystemBrowser(url) {
  // Wait for Cordova to load
  // open URL in default web browser
  var ref = window.open(encodeURI(url), '_system', 'location=yes');  
}

var lang = "en";

function startRandom(){
  var startVal;
  var random;
  var min=1;
  var max = 191;
  random = Math.floor(Math.random() * (max - min +1)) + min;
  startVal = random;


  var pre = "";
  if(startVal<100) {
    pre="0";
  }
  if(startVal<10){
    pre="00";
  }
  startVal = pre + "" +startVal;

  //startVal=1;
  $("#hymnSelect").val(startVal).change();
  console.log("start "+startVal);
}

function footerPlace() {
  var height = $(window).height(); 
  height-=($("header").height()+$("footer").height());
  $(".main").css("height", height);
}
function submitNum(){
  var variable = $("#nums").val();
  $("#hymnSelect").val(variable).change();
  $("#nums").blur();
  $("#musicPlayer").hide();
}
var path ="";
if(env!="ucg") {
  path = "http://members.ucg.org/files/hymnal/hymnal/";
} else {
  path = "http://corbdesign.com/bucket/HYMNAL/";
}

var espXML ={};
var frXML = {};
var deXML = {};
var pgXML = {};
var aslXML = {};

function makeDropdown(lang, hymn){
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
}

function loadSearch(num){
  $("#loader2 .shareClose").click();
  $("#hymnSelect").val(num).change();
}
$(document).ready(function(){

  
  var hymn = 1;
  $("#jquery_jplayer_1").jPlayer({
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

  
  makeDropdown(lang, 0);
  
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
      //console.log(shareFB + "\n" + shareTW);
        $("#aboutText").load("about.html");
        
        
      }

    });

    $(".contrastIcon").on("click", function(){
      $("body").toggleClass("dim");

    });
    $(".musicIcon").on("click", function(){

       if($("#musicPlayer").is(":visible")) {
          $("#musicPlayer").hide();

      } else{
          
      $("#musicPlayer").show();


            var hymnNum = $("#hymnSelect").val();
            var title = $("#hymnSelect option[value="+hymnNum+"]").html();
            title = title.substring(title.indexOf(")")+1, title.length);
            var songname = hymnNum;
            
        if(hymnNum){   
            hymn = "http://streaming.ucg.org/files/hymnal/hymnal/accompany/mp3/" + hymnNum + ".mp3";
          } else {
            hymn = "http://streaming.ucg.org/files/hymnal/hymnal/accompany/mp3/" + "001" + ".mp3";
            //alert("no hymn selected");
          }

         $('#jquery_jplayer_1').jPlayer('setMedia', {
            mp3: hymn
         }).jPlayer("play");

          }
      });

    $(".shareClose").on("click", function(){
      $("#home").show();
      $("#sharePage").hide();
      $(".custom-btns a").removeClass("current");
      $("#musicPlayer").hide();
      $("#search").hide();
      $("#copyrightPage").hide();
      $("#numSearch").hide();
      $(".hymnalSelection").show();
    });
    
    $(".tabs li a").on("click", function(){
        $par = $(this).parent();
        $(".tabs li").removeClass("current");
        $par.addClass("current");
        var which = $(this).attr("id");
        which= which.substring(0, which.length-3);
        $(".tabContent").removeClass("active");
        $("#"+which).addClass("active");
        if(which == "copyright") {
          $("#copyright").load("copyright.html");
        } else {
          $("#aboutText").load("about.html");
        }

    });
  
    $(".overlay").on("click", function(){
      $(this).parent().hide();
      $(".custom-btns a").removeClass("current");
    });



     $('#formByNum').on("submit", function (evt) {

      evt.preventDefault();
      var variable = $("#nums").val();
      $("#musicPlayer").hide();
      //alert(variable);
      variable = parseInt(variable,10);
      var prepend="";
      if(variable<192&&variable>0) {
        if(variable<100) {
          prepend="0";
        }
        if(variable<10) {
          prepend="00";
        }
        variable = prepend + variable;
        $("#hymnSelect").val(variable).change();
        $("#numSearch").hide();
        $(".custom-btns a").removeClass("current");
        $("#nums").blur();
        $("#home").show();
        $(".hymnalSelection").show();
      } else {
        //alert("try again");
        $("#nums").val("").focus();
      }
      return false;
  });
  
 
  $(".hamburger").on("click", function(){
    $(this).toggleClass("highlight");
    $(".dropdown").toggle();

    $("#byNumber, #searcher").removeClass("current");
        $("#numSearch").hide();
        $("#search").hide();
        $(".hymnalSelection").show();
        //$("#footerBot").show();
  });

  $(".dropdown li a").on("click", function(){
    //$(".currentApp h1 span").html($(this).attr("rel"));
    $(".dropdown").removeClass("open").hide();

    $(".dropdown li a").removeClass("active");
    $(this).addClass("active");
    $("#musicPlayer").hide();
    
    lang = $(this).attr("rel");
    
    var returnHymn = $("#hymnSelect").val();
    makeDropdown(lang, returnHymn);
   // console.log(lang + " | " + returnHymn);
    $("#hymnSelect").val(returnHymn).change();

  });
  

  $(".mainPage #hymnSelect").change(function(){
    var id = $(this).val();
    var file = "hymn"+id;
    // get language support
    console.log(id + " and " + lang);
    if(lang=='es'){
      var result = lyrics_es[file];
      if(result){
        $(".mainPage #loader").html(result);
      } else {
        $(".mainPage #loader").html("Select a hymn!");
      }
    } else if(lang=='fr'){
      var result = lyrics_fr[file];
      if(result){
        $(".mainPage #loader").html(result);
      } else {
        $(".mainPage #loader").html("Select a hymn!");
      }

    } else if(lang=='pg'){
      var result = lyrics_pg[file];
      if(result){
        $(".mainPage #loader").html(result);
      } else {
        $(".mainPage #loader").html("Select a hymn!");
      }
    }  else if(lang=='de'){
      var result = lyrics_de[file];
      if(result){
        $(".mainPage #loader").html(result);
      } else {
        $(".mainPage #loader").html("Select a hymn!");
      }
    } else {
      // english
      var result = lyrics_en[file];
      if(result){
        $(".mainPage #loader").html(result);
      } else {
        $(".mainPage #loader").html("Select a hymn!");
      }
    }
    //var result = lyrics[file];
    
    $("#home").show();
    $("#musicPlayer").hide();

    var share = '<div class="actions"><a href="javascript:;"><i class="fa fa-share-square-o"></i>Share</a><a href="javascript:;"><i class="fa fa-music"></i>Music</a></div>';
    //$(".mainPage #loader").append(share)
    //var load = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/128417090&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>';
    //$(".mainPage #loader").append(load);
    //$(".mainPage #loader").append("<div class='media clearfix'><ul><li><a href=''><img src='assets/music.jpg' /></a></li><li><a href=''><img src='assets/share.jpg' /></a></li></ul></div>");
    //$(".mainPage #loader").load("pages/hymn"+id+".html");
  });

  $("footer a.textSize").on("click", function(){
      var $context = $(".ui-content");
      var size = $context.css("fontSize");
      size = size.substring(0, size.length-2);
      size = parseInt(size,10);
      if($(this).hasClass("smallerText"))  {
        size -=1;
      } else {
        size+=1;
      }
      $context.css("fontSize", size+"px");
  });

   $( "#searchField" ).autocomplete({
      source: searchArray,
      select: function(event, ui){
        var match = ui.item.value;
        var value=0;
        var numVal = match.substring(match.indexOf("(")+1, match.length-1);
        var variable = parseInt(numVal, 10);
      

        var prepend="";
        if(variable<100) {
          prepend="0";
        }
        if(variable<10) {
          prepend="00";
        }
        variable = prepend + variable;

        $("#hymnSelect").val(variable).change();
        $("#searchField").blur();
        $("#home").show();
        $("#search").hide();
        $(".custom-btns a").removeClass("current");
        $( "body, html" ).scrollTop( 0 );
      }
    });

  startRandom();
});

$(window).resize(function(){
  $(".headerTop").css("width", $(window).width() + "px");
});