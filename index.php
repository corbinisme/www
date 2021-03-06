<!doctype html>
<!--
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->
<?php
if(isset($_REQUEST['c'])){
  $title = $_REQUEST['c'];
} else {
  $title = "ucg";
}
$brand = "ucg";
if(isset($_REQUEST['c'])){
  $brand = $_REQUEST['c'];
}
$favicon = "/www/brands/". $brand . "/icon.png"
?>
<html class="no-js" lang="en">
<head> 
    <!--
        Customize this policy to fit your own app's needs. For more guidance, see:
            https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
        Some notes:
            * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
            * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
            * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
                * Enable inline JS: add 'unsafe-inline' to default-src
        -->

  
  <title><?php echo $title;?> Hymnal</title>

  <!--<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
-->
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta charset="utf-8">
  <meta name="viewport" id="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        
       

   <link rel="stylesheet" href="assets/css/fixpack.css" />
   <link rel="stylesheet" href="assets/css/reset.css">
   <link rel="stylesheet" href="assets/font-awesome.min.css" />
   <link rel="stylesheet" href="assets/css/style.css">
   
   <link href="jplayer/dist/skin/blue.monday/css/jplayer.blue.monday.min.css" rel="stylesheet" type="text/css" />
   <link rel="stylesheet" href="assets/jplayer/jplayer.css" />
   <link rel="stylesheet" href="assets/css/jquery.dataTables.css" >
   <meta property="og:title" content="<?php echo $brand;?> Hymnal" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://hymnal.corbinrose.com/www/index.php?c=<?php echo $brand;?>" />

   <meta property="og:image" content="https://hymnal.corbinrose.com<?php echo $favicon ;?>" />
<style>
</style>
</head>
<body class="<?php echo $title;?>">

<header class="headerTop mainPage" >
    <div class="ui-bar ui-bar-a">
      <ul class="navvy">
        <li class="first"><a href="javascript:;" class="hamburger">&equiv;</a></li>
        <li class="currentApp custom-btns">
          <h1 class="lefty">
          <span id="brand"><em><?php echo $title;?></em> Hymnal</span>
          <a href="javascript:;" class="left" id="information">
              <span class="fa fa-info-circle"></span></a>
          </h1>
        </li>
        
        <!--
        <li class="custom-btns"><a href="javascript:;">
          <span class="fa fa-cog"></span></a>
        </li>

      -->
      
    
        <li class="custom-btns">
            <a href="javascript:;" class="searcher" id="searcher">
              <span class="fa fa-search"></span></a>
          
        </li>
        <li class="custom-btns">
          
            <a href="javascript:;" id="byNumber">
              <span>#</span></a>
        </li>
        
      </ul>
    </div>
   
   
   <div class="dropdown">
      <ul>
        <li class="active">
          <a href="javascript:;" rel="en">English</a>
        </li>
        <!--
        <li><a href="javascript:;" rel="es">Espa&ntilde;ol</a></li>
        <li><a href="javascript:;" rel="fr">Fran&ccedil;ais</a></li>
        <li><a href="javascript:;" rel="pg">Portugu&ecirc;s</a></li>
        
        <li><a href="javascript:;" rel="de">Deutsch</a></li>
        
        
        <li><a href="javascript:;" rel="asl">ASL</a></li>
        
        <li class="divider"></li>
        <li><a href="javascript:;" rel="ByText">Search by Title</a></li>
        <li><a href="javascript:;" rel="ByNumer">Search by Number</a></li>
        -->

      </ul>
    </div>

  
   <div class="ui-bar-b hymnalSelection">
    <div id="selectbox">
      <select name="hymnSelect" id="hymnSelect">
            <option value="0">select hymn</option>
      </select>
    </div>

   </div>
  
    </div>
  </header>

<div class="wrapper mainPage" id="home">
  
 
  <div role="content" class="main ui-content">
    <div id="loader">
      <a href="index.html" class="loadSpinner"><span class="fa fa-spinner fa-spin"></span></a>
    </div>
    <div id="sunsetContent"></div>
    <div id="holyDayContent">

    </div>
  </div>

  <footer id="footerBot">
    <ul>
      <?php if($title=="ucg2"){
        ?>
        <li class="extraLink">
        <a href="javascript:;" class="shareIcon contrastIcon" id="contrast">
          <span class="fa fa-lightbulb-o"></span>
        </a>
      
        <div class="btn-group">
          <a href="javascript:;" class="musicIcon shareIcon" id="music">
            <span class="fa fa-music"></span>
          </a>
          <a href="javascript:;" class="musicIcon shareIcon" id="musicVocal">
            <span class="fa fa-users"></span>
          </a>
        </div>
      </li>
      <?php

      } else {
        ?>
         <li>
        <a href="javascript:;" class="shareIcon contrastIcon" id="contrast">
          <span class="fa fa-lightbulb-o"></span></a>
      </li>
      <li>
        <a href="javascript:;" class="musicIcon shareIcon" id="music"><span class="fa fa-music"></span></a>
      </li>
      <?php
      }
      ?>
      
      <li class="musicCell">
        <div class="musicPlayer" id="musicPlayer">
    
      <div id="jquery_jplayer_1" class="jp-jplayer"></div>
      <div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">
        <div class="jp-type-single">
          <div class="jp-gui jp-interface">
            <div class="jp-controls">
              <button class="jp-play" role="button" tabindex="0">play</button>
              <button class="jp-stop" role="button" tabindex="0">stop</button>
            </div>
            <div class="jp-progress">
              <div class="jp-seek-bar">
                <div class="jp-play-bar"></div>
              </div>
            </div>
           
            <div class="jp-time-holder">
             
            </div>
          </div>
          
          <div class="jp-no-solution">
            <span>Update Required</span>
            To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
          </div>
        </div>
</div>      

        </div>
      </li>
      <li>
        <a href="javascript:;" class="biggerText textSize"><span class="fa fa-plus"></span></a>
        <a href="javascript:;" class="smallerText textSize"><span class="fa fa-minus"></span></a>
      </li>
    </ul>
  </footer>
</div>

</div>

<div class="wrapper v2 hidePage" id="search">

  <!--<div class="overlay"></div>-->
   <div id="loader2" class="searchWrap">
    <a href="javascript:;" class="shareClose"><span class="fa fa-times-circle"></span></a>
      
      <div class="searchWrapper" id="tocWrap">
      <!--
      <input type="text" autofocus name="searchField" id="searchField"  />
 
-->
    </div>
    </div>
  </div>
</div>

<div class="wrapper hidePage"  id="numSearch">
  <!--<div class="overlay"></div>-->
 <div class="wrapForm">
  <a href="javascript:;" class="shareClose"><span class="fa fa-times-circle"></span></a>
  <h2>Search By Number</h2>
    <form id="formByNum" name="formByNum" action="">
      <div class="byNumWrap ui-bar-b clearfix">
        <input type="number" id="nums" autofocus />
        <input type="submit" value="GO" class="goBtn" />
        
      </div>
    </form>
  </div>
</div>
<div class="wrapper hidePage pagePad" id="copyrightPage">
  <div class="wrapForm">
    <a href="javascript:;" class="shareClose"><span class="fa fa-times-circle"></span></a>
    
    

  </div>
</div>
<div class="wrapper hidePage pagePad" id="sharePage">
  <div class="wrapForm">
    <a href="javascript:;" class="shareClose"><span class="fa fa-times-circle"></span></a>
    <!--
    <ul>
      <li><a href="#" id="facebookShare" target="_blank"><span class="fa fa-facebook"></span> Facebook</a></li>
      <li><a href="#" id="twitterShare" target="_blank"><span class="fa fa-twitter"></span> Twitter</a></li>
      
      <li><a href="javascript:;" id="emailShare"><span class="fa fa-globe"></span> Email</a>
        <input id="emailShareURL" type="text" >
      </li>
 
    </ul> 
  -->
  <ul class="tabs clearfix">
    <li class="current">
      <a href="javascript:;" id="aboutTextTab" class="tabNav"><span class="icon"></span>About</a>
    </li>
    <li>
      <a href="javascript:;" id="copyrightTab" class="tabNav"><span class="icon">&copy;
      </span>Copyright</a>
    </li>
  </ul> 
  <div class="tabsContentWrapper">

  <div id="aboutText" class="tabContent active">
    <span class="loader fa fa-spinner fa-spin"></span>
  </div>


  <div id="copyright" class="tabContent">
    <span class="fa fa-spinner fa-spin loader"></span>
  </div>

  </div>

  </div>
</div>
  <script type="text/javascript" src="cordova.js"></script>
 
 <script src="assets/js/jquery-1.9.min.js"></script>
 <script src="config_<?php echo $title;?>.js"></script>

 <script>

  var env="localhost";

<?php if(isset($_REQUEST['lang'])){
  echo 'var superlang = "' . $_REQUEST['lang'] . '";';
  echo "\n";
} else {
  ?>
  
  <?php
}
if(isset($_REQUEST['hymn'])){
  echo 'var start = "' . $_REQUEST['hymn'] . '";';
  echo "\n";
} else {
  ?>
  var start= "001";
  <?php
}
?>
 var env="localhost";
 </script>


  <script src="lang/en/list_<?php echo $title; ?>.js"></script>
  <?php if($title=="ucg"){?>
  <script src="lang/es/list_<?php echo $title; ?>.js"></script>
  <script src="lang/pg/list_<?php echo $title; ?>.js"></script>
  <script src="lang/fr/list_<?php echo $title; ?>.js"></script>
  <script src="lang/de/list_<?php echo $title; ?>.js"></script>
  <?php }?>


  <script src="lang/en/lyrics_<?php echo $title;?>.js"></script>
  <?php if($title=="ucg"){?>
  <script src="lang/es/lyrics_<?php echo $title;?>.js"></script>
  <script src="lang/pg/lyrics_<?php echo $title;?>.js"></script>
  <script src="lang/fr/lyrics_<?php echo $title;?>.js"></script>
  <script src="lang/de/lyrics_<?php echo $title;?>.js"></script>
  <?php }?>

  <script src="assets/js/main.js" 
    type="text/javascript"></script>
  
  <script src="assets/js/jquery-ui.js"></script>
  <script src="assets/js/autocomplete.js"></script>

  <script type="text/javascript" 
    src="jplayer/dist/jplayer/jquery.jplayer.min.js">
  </script>


<script src="assets/js/dataTables.js"></script>
<script src="assets/js/app.js" type="text/javascript"></script>
<script>

</script>

  </body>
  </html>
