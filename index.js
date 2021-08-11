// content of index.js
const config = require('./config.js');
const hostname = config.hostname;
const port = config.port;
const http = require('http');

console.log('Config: ', config);

const html = `
<html>
    <head>
        <title>iama.city</title>
        <style type="text/css">
            html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                background: black;
            }

            div {
                text-align: center;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }

            div.bg {
                background-size: cover;
                background-repeat: no-repeat;
            }

            h1, h2, h3 {
                position: relative;
                top: 40%;
                text-shadow: black 1px 1px 4px;
            }

            h1 {
                font-size: 6em;
            }

            h2 {
                font-size: 3em;
            }

            a {
                color: white;
            }

            .attribution {
                position: fixed;
                top: unset;
                bottom: 10px;
                right: 10px;
                text-align: right;
                color: white;
                text-shadow: black 0px 0px 45px;
            }

            /* Spinner from here: https://projects.lukehaas.me/css-loaders/ */
            .loader,
            .loader:after {
                border-radius: 50%;
                width: 10em;
                height: 10em;
            }
            .loader {
                margin: 60px auto;
                font-size: 10px;
                position: fixed;
                text-indent: -9999em;
                border-top: 1.1em solid rgba(255, 255, 255, 0.2);
                border-right: 1.1em solid rgba(255, 255, 255, 0.2);
                border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
                border-left: 1.1em solid #ffffff;
                -webkit-transform: translateZ(0);
                -ms-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-animation: load8 1.1s infinite linear;
                animation: load8 1.1s infinite linear;
            }
            @-webkit-keyframes load8 {
                0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }
            @keyframes load8 {
                0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }

        </style>
    </head>
    <body>
        <div class="bg bg0"></div>
        <div class="bg bg1"></div>
        <div class="main-content">
            <h1><a target="_blank" href="https://en.wikipedia.org/wiki/{{cityTitle}}">{{cityName}}</a></h1>
            <h2><a target="_blank" href="https://en.wikipedia.org/wiki/{{countryTitle">{{countryName}}</a></h2>
	    <h3><a href="iama.city">Show me a new city!</a></h3>
        </div>
        <div class="loader">Loading...</div>
        <div class="attribution">Photos pulled from Wikipedia. Click city name to view.</div>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script>
            var imageObjects = [];
            var currImg = -1;
            var ltr = false;

            var $bg0 = null, $bg1 = null;
            
            function loadImage(index, fn) {
                if (index >= imageObjects.length || imageObjects[index].loaded) {
                    return fn();
                }
                img = new Image();
                img.onload = function() {
                    imageObjects[index].loaded = true;
                    fn();
                };
                img.src = imageObjects[index].url;
            }

            function updateBackground() {
                if (imageObjects.length <= 0) {
                    return;
                }

                $('.loader').hide();

                currImg += 1;
                if (currImg >= imageObjects.length) {
                    currImg = 0;
                }

                loadImage(currImg + 1, function () {});

                if ($bg0 === null) {
                    $bg0 = $('.bg0');
                    $bg1 = $('.bg1');
                } else {
                    var tmp = $bg0;
                    $bg0 = $bg1;
                    $bg1 = tmp;
                }

                var width = imageObjects[currImg].width;
                var height = imageObjects[currImg].height;
                
                ltr = !ltr;

                $bg0.css('background-image', 'url("' + imageObjects[currImg].url + '")');
                $bg0.css('background-position-x', ltr ? '0%' : '100%');
                $bg0.css('background-position-y', ltr ? '0%' : '100%');
                
                var hasCalledNext = false;
                $bg0.fadeIn(1000);
                $bg1.fadeOut(1000);
                // Start slide
                $bg0.animate({
                    'background-position-x': ltr ? '100%' : '0%',
                    'background-position-y': ltr ? '100%' : '0%'
                }, {
                    duration: 10000,
                    easing: 'linear',
                    progress: function (animation, progress, msRemaining) {
                        if (msRemaining <= 2000 && !hasCalledNext) {
                            console.log('msRemaining: ' + msRemaining + ' and ' + hasCalledNext);
                            hasCalledNext = true;
                            setTimeout(updateBackground, 0);
                        }
                    },
                    complete: function () {
                    }
                });
            }

            var lastContinueString = null;
            function pageDataCallback(data) {
                var pages = data.query.pages;
                var imageNames = [];

                var keys = Object.keys(pages);
                for (var k = 0; k < keys.length; k++) {
                    var page = pages[keys[k]];

                    var imageObjs = page.images;
                    
                    for (var i = 0; i < imageObjs.length; i++) {
                        imageNames.push(imageObjs[i].title);
                    }
                }

                var queryNamesString = imageNames.join('|');
                var queryString = "https://en.wikipedia.org/w/api.php?format=json&action=query&titles="
                                    + queryNamesString
                                    + "&prop=imageinfo&iiprop=url|dimensions|mime&callback=imageDataCallback&iiurlwidth=1000";

                var scriptString = '<script src="' + queryString + '"><\\/script>';
                $('body').append($(scriptString));

                if (typeof data.continue !== 'undefined') {
                    var continueString = data.continue.imcontinue;
                    console.log('Continue String: ' + continueString);
                    if (continueString !== lastContinueString) {
                        lastContinueString = continueString;
                        var continueUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&titles={{cityTitle}}&prop=images&callback=pageDataCallback&imcontinue=" + continueString;
                        
                        var continueScriptString = '<script src="' + continueUrl + '"><\\/script>';
                        $('body').append($(continueScriptString));
                    }
                }
            }

            var hasLoadedFirstImage = false;
            function imageDataCallback(data) {
                var images = data.query.pages;

                console.log('All images:', images);

                var keys = Object.keys(images);
                for (var k = 0; k < keys.length; k++) {
                    var img = images[keys[k]];
                    if (typeof img.imageinfo === 'undefined' || img.imageinfo.length <= 0) {
                        continue;
                    }
                    var imgInfo = img.imageinfo[0];

                    if (imgInfo.mime === "image/jpeg" && (imgInfo.width * imgInfo.height) > (1000 * 1000)) { // minimum resolution we want to display
                        imageObjects.push({
                            url: imgInfo.thumburl,
                            width: imgInfo.width,
                            height: imgInfo.height,
                            loaded: false,
                            size: imgInfo.size
                        });
                    }
                }

                console.log('image objects: ', imageObjects);
                if (currImg === -1) {
                    currImg = imageObjects.length - 1;
                }

                if (imageObjects.length > 0 && !hasLoadedFirstImage) {
                    hasLoadedFirstImage = true;
                    loadImage(0, updateBackground);
                }
            }

        </script>
        <script src="https://en.wikipedia.org/w/api.php?format=json&action=query&titles={{cityTitle}}&prop=images&callback=pageDataCallback"></script>
    </body>
</html>
`;

const requestHandler = (request, response) => {
  console.log(request.url)
  const index = Math.floor(Math.random()*cities.length)
  const city = cities[index].city;
  const country = cities[index].country;

  const webpage = html.replace(/{{cityName}}/g, city.name)
                        .replace(/{{cityTitle}}/g, city.title)
                        .replace(/{{countryName}}/g, country.name)
                        .replace(/{{countryTitle}}/g, country.title);
  
  response.end(webpage);
}

const server = http.createServer(requestHandler)

server.listen(port, hostname, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

const cities = [
    {
        "city": {
            "title": "Chongqing",
            "name": "Chongqing"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Shanghai",
            "name": "Shanghai"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Delhi",
            "name": "Delhi"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Beijing",
            "name": "Beijing"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Mumbai",
            "name": "Mumbai"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Dhaka",
            "name": "Dhaka"
        },
        "country": {
            "title": "Bangladesh",
            "name": "Bangladesh"
        },
    },
    {
        "city": {
            "title": "Lagos",
            "name": "Lagos"
        },
        "country": {
            "title": "Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "title": "Chengdu",
            "name": "Chengdu"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Karachi",
            "name": "Karachi"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "title": "Guangzhou",
            "name": "Guangzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Istanbul",
            "name": "Istanbul"
        },
        "country": {
            "title": "Turkey",
            "name": "Turkey"
        },
    },
    {
        "city": {
            "title": "Tokyo",
            "name": "Tokyo"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Tianjin",
            "name": "Tianjin"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Moscow",
            "name": "Moscow"
        },
        "country": {
            "title": "Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "title": "S%C3%A3o_Paulo",
            "name": "São Paulo"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Kinshasa",
            "name": "Kinshasa"
        },
        "country": {
            "title": "Democratic_Republic_of_the_Congo",
            "name": "DR Congo"
        },
    },
    {
        "city": {
            "title": "Lahore",
            "name": "Lahore"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "title": "Cairo",
            "name": "Cairo"
        },
        "country": {
            "title": "Egypt",
            "name": "Egypt"
        },
    },
    {
        "city": {
            "title": "Seoul",
            "name": "Seoul"
        },
        "country": {
            "title": "South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "title": "Jakarta",
            "name": "Jakarta"
        },
        "country": {
            "title": "Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "title": "Wenzhou",
            "name": "Wenzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Mexico_City",
            "name": "Mexico City"
        },
        "country": {
            "title": "Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "title": "Lima",
            "name": "Lima"
        },
        "country": {
            "title": "Peru",
            "name": "Peru"
        },
    },
    {
        "city": {
            "title": "London",
            "name": "London"
        },
        "country": {
            "title": "United_Kingdom",
            "name": "United Kingdom"
        },
    },
    {
        "city": {
            "title": "Bangkok",
            "name": "Bangkok"
        },
        "country": {
            "title": "Thailand",
            "name": "Thailand"
        },
    },
    {
        "city": {
            "title": "Xi%27an",
            "name": "Xi&#39;an"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Chennai",
            "name": "Chennai"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Bangalore",
            "name": "Bangalore"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "New_York_City",
            "name": "New York City"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Ho_Chi_Minh_City",
            "name": "Ho Chi Minh City"
        },
        "country": {
            "title": "Vietnam",
            "name": "Vietnam"
        },
    },
    {
        "city": {
            "title": "Hyderabad",
            "name": "Hyderabad"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Shenzhen",
            "name": "Shenzhen"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Suzhou",
            "name": "Suzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Nanjing",
            "name": "Nanjing"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Dongguan",
            "name": "Dongguan"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Tehran",
            "name": "Tehran"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Quanzhou",
            "name": "Quanzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Shenyang",
            "name": "Shenyang"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Bogot%C3%A1",
            "name": "Bogotá"
        },
        "country": {
            "title": "Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "title": "Hong_Kong",
            "name": "Hong Kong"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Baghdad",
            "name": "Baghdad"
        },
        "country": {
            "title": "Iraq",
            "name": "Iraq"
        },
    },
    {
        "city": {
            "title": "Fuzhou",
            "name": "Fuzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Changsha",
            "name": "Changsha"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Wuhan",
            "name": "Wuhan"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Hanoi",
            "name": "Hanoi"
        },
        "country": {
            "title": "Vietnam",
            "name": "Vietnam"
        },
    },
    {
        "city": {
            "title": "Rio_de_Janeiro",
            "name": "Rio de Janeiro"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Qingdao",
            "name": "Qingdao"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Foshan",
            "name": "Foshan"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Zunyi",
            "name": "Zunyi"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Santiago",
            "name": "Santiago"
        },
        "country": {
            "title": "Chile",
            "name": "Chile"
        },
    },
    {
        "city": {
            "title": "Riyadh",
            "name": "Riyadh"
        },
        "country": {
            "title": "Saudi_Arabia",
            "name": "Saudi Arabia"
        },
    },
    {
        "city": {
            "title": "Ahmedabad",
            "name": "Ahmedabad"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Singapore",
            "name": "Singapore"
        },
        "country": {
            "title": "Singapore",
            "name": "Singapore"
        },
    },
    {
        "city": {
            "title": "Shantou",
            "name": "Shantou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Ankara",
            "name": "Ankara"
        },
        "country": {
            "title": "Turkey",
            "name": "Turkey"
        },
    },
    {
        "city": {
            "title": "Yangon",
            "name": "Yangon"
        },
        "country": {
            "title": "Myanmar",
            "name": "Myanmar"
        },
    },
    {
        "city": {
            "title": "Saint_Petersburg",
            "name": "Saint Petersburg"
        },
        "country": {
            "title": "Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "title": "Sydney",
            "name": "Sydney"
        },
        "country": {
            "title": "Australia",
            "name": "Australia"
        },
    },
    {
        "city": {
            "title": "Casablanca",
            "name": "Casablanca"
        },
        "country": {
            "title": "Morocco",
            "name": "Morocco"
        },
    },
    {
        "city": {
            "title": "Melbourne",
            "name": "Melbourne"
        },
        "country": {
            "title": "Australia",
            "name": "Australia"
        },
    },
    {
        "city": {
            "title": "Abidjan",
            "name": "Abidjan"
        },
        "country": {
            "title": "Ivory_Coast",
            "name": "Ivory Coast"
        },
    },
    {
        "city": {
            "title": "Alexandria",
            "name": "Alexandria"
        },
        "country": {
            "title": "Egypt",
            "name": "Egypt"
        },
    },
    {
        "city": {
            "title": "Kolkata",
            "name": "Kolkata"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Surat",
            "name": "Surat"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Johannesburg",
            "name": "Johannesburg"
        },
        "country": {
            "title": "South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "title": "Dar_es_Salaam",
            "name": "Dar es Salaam"
        },
        "country": {
            "title": "Tanzania",
            "name": "Tanzania"
        },
    },
    {
        "city": {
            "title": "Shijiazhuang",
            "name": "Shijiazhuang"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Harbin",
            "name": "Harbin"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Giza",
            "name": "Giza"
        },
        "country": {
            "title": "Egypt",
            "name": "Egypt"
        },
    },
    {
        "city": {
            "title": "%C4%B0zmir",
            "name": "İzmir"
        },
        "country": {
            "title": "Turkey",
            "name": "Turkey"
        },
    },
    {
        "city": {
            "title": "Zhengzhou",
            "name": "Zhengzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "New_Taipei_City",
            "name": "New Taipei City"
        },
        "country": {
            "title": "Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "title": "Los_Angeles",
            "name": "Los Angeles"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Changchun",
            "name": "Changchun"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Cape_Town",
            "name": "Cape Town"
        },
        "country": {
            "title": "South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "title": "Yokohama",
            "name": "Yokohama"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Khartoum",
            "name": "Khartoum"
        },
        "country": {
            "title": "Sudan",
            "name": "Sudan"
        },
    },
    {
        "city": {
            "title": "Guayaquil",
            "name": "Guayaquil"
        },
        "country": {
            "title": "Ecuador",
            "name": "Ecuador"
        },
    },
    {
        "city": {
            "title": "Hangzhou",
            "name": "Hangzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Xiamen",
            "name": "Xiamen"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Berlin",
            "name": "Berlin"
        },
        "country": {
            "title": "Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "title": "Busan",
            "name": "Busan"
        },
        "country": {
            "title": "South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "title": "Ningbo",
            "name": "Ningbo"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Jeddah",
            "name": "Jeddah"
        },
        "country": {
            "title": "Saudi_Arabia",
            "name": "Saudi Arabia"
        },
    },
    {
        "city": {
            "title": "Durban",
            "name": "Durban"
        },
        "country": {
            "title": "South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "title": "Algiers",
            "name": "Algiers"
        },
        "country": {
            "title": "Algeria",
            "name": "Algeria"
        },
    },
    {
        "city": {
            "title": "Kabul",
            "name": "Kabul"
        },
        "country": {
            "title": "Afghanistan",
            "name": "Afghanistan"
        },
    },
    {
        "city": {
            "title": "Hefei",
            "name": "Hefei"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Mashhad",
            "name": "Mashhad"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Pyongyang",
            "name": "Pyongyang"
        },
        "country": {
            "title": "North_Korea",
            "name": "Korea, North"
        },
    },
    {
        "city": {
            "title": "Madrid",
            "name": "Madrid"
        },
        "country": {
            "title": "Spain",
            "name": "Spain"
        },
    },
    {
        "city": {
            "title": "Faisalabad",
            "name": "Faisalabad"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "title": "Baku",
            "name": "Baku"
        },
        "country": {
            "title": "Azerbaijan",
            "name": "Azerbaijan"
        },
    },
    {
        "city": {
            "title": "Tangshan",
            "name": "Tangshan"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Ekurhuleni_Metropolitan_Municipality",
            "name": "Ekurhuleni"
        },
        "country": {
            "title": "South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "title": "Nairobi",
            "name": "Nairobi"
        },
        "country": {
            "title": "Kenya",
            "name": "Kenya"
        },
    },
    {
        "city": {
            "title": "Zhongshan",
            "name": "Zhongshan"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Pune",
            "name": "Pune"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Addis_Ababa",
            "name": "Addis Ababa"
        },
        "country": {
            "title": "Ethiopia",
            "name": "Ethiopia"
        },
    },
    {
        "city": {
            "title": "Jaipur",
            "name": "Jaipur"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Buenos_Aires",
            "name": "Buenos Aires"
        },
        "country": {
            "title": "Argentina",
            "name": "Argentina"
        },
    },
    {
        "city": {
            "title": "Incheon",
            "name": "Incheon"
        },
        "country": {
            "title": "South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "title": "Quezon_City",
            "name": "Quezon City"
        },
        "country": {
            "title": "Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "title": "Toronto",
            "name": "Toronto"
        },
        "country": {
            "title": "Canada",
            "name": "Canada"
        },
    },
    {
        "city": {
            "title": "Kiev",
            "name": "Kiev"
        },
        "country": {
            "title": "Ukraine",
            "name": "Ukraine"
        },
    },
    {
        "city": {
            "title": "Salvador,_Bahia",
            "name": "Salvador"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Rome",
            "name": "Rome"
        },
        "country": {
            "title": "Italy",
            "name": "Italy"
        },
    },
    {
        "city": {
            "title": "Dubai",
            "name": "Dubai"
        },
        "country": {
            "title": "United_Arab_Emirates",
            "name": "United Arab Emirates"
        },
    },
    {
        "city": {
            "title": "Luanda",
            "name": "Luanda"
        },
        "country": {
            "title": "Angola",
            "name": "Angola"
        },
    },
    {
        "city": {
            "title": "Lucknow",
            "name": "Lucknow"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Kaohsiung",
            "name": "Kaohsiung"
        },
        "country": {
            "title": "Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "title": "Kanpur",
            "name": "Kanpur"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Surabaya",
            "name": "Surabaya"
        },
        "country": {
            "title": "Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "title": "Taichung",
            "name": "Taichung"
        },
        "country": {
            "title": "Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "title": "Basra",
            "name": "Basra"
        },
        "country": {
            "title": "Iraq",
            "name": "Iraq"
        },
    },
    {
        "city": {
            "title": "Taipei",
            "name": "Taipei"
        },
        "country": {
            "title": "Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "title": "Chicago",
            "name": "Chicago"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Osaka",
            "name": "Osaka"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Quito",
            "name": "Quito"
        },
        "country": {
            "title": "Ecuador",
            "name": "Ecuador"
        },
    },
    {
        "city": {
            "title": "Chaozhou",
            "name": "Chaozhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Fortaleza",
            "name": "Fortaleza"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Chittagong",
            "name": "Chittagong"
        },
        "country": {
            "title": "Bangladesh",
            "name": "Bangladesh"
        },
    },
    {
        "city": {
            "title": "Bandung",
            "name": "Bandung"
        },
        "country": {
            "title": "Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "title": "Managua",
            "name": "Managua"
        },
        "country": {
            "title": "Nicaragua",
            "name": "Nicaragua"
        },
    },
    {
        "city": {
            "title": "Bras%C3%ADlia",
            "name": "Brasília"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Belo_Horizonte",
            "name": "Belo Horizonte"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Daegu",
            "name": "Daegu"
        },
        "country": {
            "title": "South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "title": "Houston",
            "name": "Houston"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Douala",
            "name": "Douala"
        },
        "country": {
            "title": "Cameroon",
            "name": "Cameroon"
        },
    },
    {
        "city": {
            "title": "Medellin",
            "name": "Medellin"
        },
        "country": {
            "title": "Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "title": "Yaound%C3%A9",
            "name": "Yaoundé"
        },
        "country": {
            "title": "Cameroon",
            "name": "Cameroon"
        },
    },
    {
        "city": {
            "title": "Nagpur",
            "name": "Nagpur"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Cali",
            "name": "Cali"
        },
        "country": {
            "title": "Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "title": "Tashkent",
            "name": "Tashkent"
        },
        "country": {
            "title": "Uzbekistan",
            "name": "Uzbekistan"
        },
    },
    {
        "city": {
            "title": "Nagoya",
            "name": "Nagoya"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Isfahan",
            "name": "Isfahan"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Phnom_Penh",
            "name": "Phnom Penh"
        },
        "country": {
            "title": "Cambodia",
            "name": "Cambodia"
        },
    },
    {
        "city": {
            "title": "Paris",
            "name": "Paris"
        },
        "country": {
            "title": "France",
            "name": "France"
        },
    },
    {
        "city": {
            "title": "Ouagadougou",
            "name": "Ouagadougou"
        },
        "country": {
            "title": "Burkina_Faso",
            "name": "Burkina Faso"
        },
    },
    {
        "city": {
            "title": "Lanzhou",
            "name": "Lanzhou"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Kano",
            "name": "Kano"
        },
        "country": {
            "title": "Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "title": "Dalian",
            "name": "Dalian"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Guatemala_City",
            "name": "Guatemala City"
        },
        "country": {
            "title": "Guatemala",
            "name": "Guatemala"
        },
    },
    {
        "city": {
            "title": "Havana",
            "name": "Havana"
        },
        "country": {
            "title": "Cuba",
            "name": "Cuba"
        },
    },
    {
        "city": {
            "title": "Rawalpindi",
            "name": "Rawalpindi"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "title": "Medan",
            "name": "Medan"
        },
        "country": {
            "title": "Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "title": "Accra",
            "name": "Accra"
        },
        "country": {
            "title": "Ghana",
            "name": "Ghana"
        },
    },
    {
        "city": {
            "title": "Visakhapatnam",
            "name": "Visakhapatnam"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Gujranwala",
            "name": "Gujranwala"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "title": "Jinan",
            "name": "Jinan"
        },
        "country": {
            "title": "China",
            "name": "China"
        },
    },
    {
        "city": {
            "title": "Karaj",
            "name": "Karaj"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Peshawar",
            "name": "Peshawar"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "title": "Minsk",
            "name": "Minsk"
        },
        "country": {
            "title": "Belarus",
            "name": "Belarus"
        },
    },
    {
        "city": {
            "title": "Caracas",
            "name": "Caracas"
        },
        "country": {
            "title": "Venezuela",
            "name": "Venezuela"
        },
    },
    {
        "city": {
            "title": "Sana%27a",
            "name": "Sana&#39;a"
        },
        "country": {
            "title": "Yemen",
            "name": "Yemen"
        },
    },
    {
        "city": {
            "title": "Sapporo",
            "name": "Sapporo"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Tainan",
            "name": "Tainan"
        },
        "country": {
            "title": "Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "title": "Bucharest",
            "name": "Bucharest"
        },
        "country": {
            "title": "Romania",
            "name": "Romania"
        },
    },
    {
        "city": {
            "title": "Curitiba",
            "name": "Curitiba"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Shiraz",
            "name": "Shiraz"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Vienna",
            "name": "Vienna"
        },
        "country": {
            "title": "Austria",
            "name": "Austria"
        },
    },
    {
        "city": {
            "title": "Brazzaville",
            "name": "Brazzaville"
        },
        "country": {
            "title": "Republic_of_the_Congo",
            "name": "Congo Republic"
        },
    },
    {
        "city": {
            "title": "Bhopal",
            "name": "Bhopal"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Almaty",
            "name": "Almaty"
        },
        "country": {
            "title": "Kazakhstan",
            "name": "Kazakhstan"
        },
    },
    {
        "city": {
            "title": "Hamburg",
            "name": "Hamburg"
        },
        "country": {
            "title": "Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "title": "Manila",
            "name": "Manila"
        },
        "country": {
            "title": "Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "title": "Kuala_Lumpur",
            "name": "Kuala Lumpur"
        },
        "country": {
            "title": "Malaysia",
            "name": "Malaysia"
        },
    },
    {
        "city": {
            "title": "Maputo",
            "name": "Maputo"
        },
        "country": {
            "title": "Mozambique",
            "name": "Mozambique"
        },
    },
    {
        "city": {
            "title": "Budapest",
            "name": "Budapest"
        },
        "country": {
            "title": "Hungary",
            "name": "Hungary"
        },
    },
    {
        "city": {
            "title": "Warsaw",
            "name": "Warsaw"
        },
        "country": {
            "title": "Poland",
            "name": "Poland"
        },
    },
    {
        "city": {
            "title": "Lusaka",
            "name": "Lusaka"
        },
        "country": {
            "title": "Zambia",
            "name": "Zambia"
        },
    },
    {
        "city": {
            "title": "Kathmandu",
            "name": "Kathmandu"
        },
        "country": {
            "title": "Nepal",
            "name": "Nepal"
        },
    },
    {
        "city": {
            "title": "Tabriz",
            "name": "Tabriz"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Hyderabad,_Pakistan",
            "name": "Hyderabad"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "title": "Palembang",
            "name": "Palembang"
        },
        "country": {
            "title": "Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "title": "Tijuana",
            "name": "Tijuana"
        },
        "country": {
            "title": "Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "title": "Patna",
            "name": "Patna"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Montreal",
            "name": "Montreal"
        },
        "country": {
            "title": "Canada",
            "name": "Canada"
        },
    },
    {
        "city": {
            "title": "Davao_City",
            "name": "Davao City"
        },
        "country": {
            "title": "Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "title": "Harare",
            "name": "Harare"
        },
        "country": {
            "title": "Zimbabwe",
            "name": "Zimbabwe"
        },
    },
    {
        "city": {
            "title": "Barcelona",
            "name": "Barcelona"
        },
        "country": {
            "title": "Spain",
            "name": "Spain"
        },
    },
    {
        "city": {
            "title": "Maracaibo",
            "name": "Maracaibo"
        },
        "country": {
            "title": "Venezuela",
            "name": "Venezuela"
        },
    },
    {
        "city": {
            "title": "Caloocan",
            "name": "Caloocan"
        },
        "country": {
            "title": "Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "title": "Philadelphia",
            "name": "Philadelphia"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Novosibirsk",
            "name": "Novosibirsk"
        },
        "country": {
            "title": "Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "title": "Phoenix,_Arizona",
            "name": "Phoenix"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Oran",
            "name": "Oran"
        },
        "country": {
            "title": "Algeria",
            "name": "Algeria"
        },
    },
    {
        "city": {
            "title": "Semarang",
            "name": "Semarang"
        },
        "country": {
            "title": "Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "title": "Recife",
            "name": "Recife"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Kobe",
            "name": "Kobe"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Daejeon",
            "name": "Daejeon"
        },
        "country": {
            "title": "South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "title": "Kampala",
            "name": "Kampala"
        },
        "country": {
            "title": "Uganda",
            "name": "Uganda"
        },
    },
    {
        "city": {
            "title": "Kawasaki,_Kanagawa",
            "name": "Kawasaki"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Guadalajara",
            "name": "Guadalajara"
        },
        "country": {
            "title": "Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "title": "Auckland",
            "name": "Auckland"
        },
        "country": {
            "title": "New_Zealand",
            "name": "New Zealand"
        },
    },
    {
        "city": {
            "title": "Vijayawada",
            "name": "Vijayawada"
        },
        "country": {
            "title": "India",
            "name": "India"
        },
    },
    {
        "city": {
            "title": "Fukuoka",
            "name": "Fukuoka"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Kwangju",
            "name": "Kwangju"
        },
        "country": {
            "title": "South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "title": "Porto_Alegre",
            "name": "Porto Alegre"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Kyoto",
            "name": "Kyoto"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "San_Antonio",
            "name": "San Antonio"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Santa_Cruz_de_la_Sierra",
            "name": "Santa Cruz de la Sierra"
        },
        "country": {
            "title": "Bolivia",
            "name": "Bolivia"
        },
    },
    {
        "city": {
            "title": "Munich",
            "name": "Munich"
        },
        "country": {
            "title": "Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "title": "Kharkiv",
            "name": "Kharkiv"
        },
        "country": {
            "title": "Ukraine",
            "name": "Ukraine"
        },
    },
    {
        "city": {
            "title": "Yekaterinburg",
            "name": "Yekaterinburg"
        },
        "country": {
            "title": "Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "title": "San_Diego",
            "name": "San Diego"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Barranquilla",
            "name": "Barranquilla"
        },
        "country": {
            "title": "Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "title": "Milan",
            "name": "Milan"
        },
        "country": {
            "title": "Italy",
            "name": "Italy"
        },
    },
    {
        "city": {
            "title": "Ibadan",
            "name": "Ibadan"
        },
        "country": {
            "title": "Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "title": "Makassar",
            "name": "Makassar"
        },
        "country": {
            "title": "Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "title": "C%C3%B3rdoba,_Argentina",
            "name": "Córdoba"
        },
        "country": {
            "title": "Argentina",
            "name": "Argentina"
        },
    },
    {
        "city": {
            "title": "Prague",
            "name": "Prague"
        },
        "country": {
            "title": "Czech_Republic",
            "name": "Czech Republic"
        },
    },
    {
        "city": {
            "title": "Mandalay",
            "name": "Mandalay"
        },
        "country": {
            "title": "Myanmar",
            "name": "Myanmar"
        },
    },
    {
        "city": {
            "title": "Dallas",
            "name": "Dallas"
        },
        "country": {
            "title": "United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "title": "Montevideo",
            "name": "Montevideo"
        },
        "country": {
            "title": "Uruguay",
            "name": "Uruguay"
        },
    },
    {
        "city": {
            "title": "Qom",
            "name": "Qom"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Ahvaz",
            "name": "Ahvaz"
        },
        "country": {
            "title": "Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "title": "Sofia",
            "name": "Sofia"
        },
        "country": {
            "title": "Bulgaria",
            "name": "Bulgaria"
        },
    },
    {
        "city": {
            "title": "Nizhny_Novgorod",
            "name": "Nizhny Novgorod"
        },
        "country": {
            "title": "Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "title": "Abuja",
            "name": "Abuja"
        },
        "country": {
            "title": "Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "title": "Calgary",
            "name": "Calgary"
        },
        "country": {
            "title": "Canada",
            "name": "Canada"
        },
    },
    {
        "city": {
            "title": "Saitama,_Saitama",
            "name": "Saitama"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Suwon",
            "name": "Suwon"
        },
        "country": {
            "title": "South_Korea",
            "name": "South Korea"
        },
    },
    {
        "city": {
            "title": "Hiroshima",
            "name": "Hiroshima"
        },
        "country": {
            "title": "Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "title": "Rosario,_Santa_Fe",
            "name": "Rosario"
        },
        "country": {
            "title": "Argentina",
            "name": "Argentina"
        },
    },
    {
        "city": {
            "title": "Brisbane",
            "name": "Brisbane"
        },
        "country": {
            "title": "Australia",
            "name": "Australia"
        },
    },
    {
        "city": {
            "title": "Belgrade",
            "name": "Belgrade"
        },
        "country": {
            "title": "Serbia",
            "name": "Serbia"
        },
    },
    {
        "city": {
            "title": "Campinas",
            "name": "Campinas"
        },
        "country": {
            "title": "Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "title": "Ulsan",
            "name": "Ulsan"
        },
        "country": {
            "title": "South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "title": "Omsk",
            "name": "Omsk"
        },
        "country": {
            "title": "Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "title": "Dakar",
            "name": "Dakar"
        },
        "country": {
            "title": "Senegal",
            "name": "Senegal"
        },
    },
    {
        "city": {
            "title": "Abu_Dhabi",
            "name": "Abu Dhabi"
        },
        "country": {
            "title": "United_Arab_Emirates",
            "name": "United Arab Emirates"
        },
    },
    {
        "city": {
            "title": "Monterrey",
            "name": "Monterrey"
        },
        "country": {
            "title": "Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "title": "Tripoli",
            "name": "Tripoli"
        },
        "country": {
            "title": "Libya",
            "name": "Libya"
        },
    },
    {
        "city": {
            "title": "Rostov-on-Don",
            "name": "Rostov-on-Don"
        },
        "country": {
            "title": "Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "title": "T%27bilisi",
            "name": "T&#39;bilisi"
        },
        "country": {
            "title": "Georgia_(country)",
            "name": "Georgia"
        },
    },
    {
        "city": {
            "title": "Fez,_Morocco",
            "name": "Fez"
        },
        "country": {
            "title": "Morocco",
            "name": "Morocco"
        },
    },
    {
        "city": {
            "title": "Birmingham",
            "name": "Birmingham"
        },
        "country": {
            "title": "United_Kingdom",
            "name": "United Kingdom"
        },
    },
    {
        "city": {
            "title": "Yerevan",
            "name": "Yerevan"
        },
        "country": {
            "title": "Armenia",
            "name": "Armenia"
        },
    },
    {
        "city": {
            "title": "Cologne",
            "name": "Cologne"
        },
        "country": {
            "title": "Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "title": "Tunis",
            "name": "Tunis"
        },
        "country": {
            "title": "Tunisia",
            "name": "Tunisia"
        },
    },
    {
        "city": {
            "title": "Bulawayo",
            "name": "Bulawayo"
        },
        "country": {
            "title": "Zimbabwe",
            "name": "Zimbabwe"
        },
    },
    {
        "city": {
            "title": "Astana",
            "name": "Astana"
        },
        "country": {
            "title": "Kazakhstan",
            "name": "Kazakhstan"
        },
    },
    {
        "city": {
            "title": "Islamabad",
            "name": "Islamabad"
        },
        "country": {
            "title": "Pakistan",
            "name": "Pakistan"
        }
    }
]
