// content of index.js
const http = require('http')
const port = 3000

const preface = `
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

            h1, h2 {
                position: relative;
                top: 40%;
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
        </style>
    </head>
    <body>
        <div>`

const postface = `
        </div>
    </body>
</html>
`;

const requestHandler = (request, response) => {
  console.log(request.url)
  const index = Math.floor(Math.random()*cities.length)
  const city = cities[index].city;
  const country = cities[index].country;

  const cityString = '<h1><a target="_blank" href="' + city.url + '">' + city.name + '</a></h1>';
  const countryString = '<h2><a target="_blank" href="' + country.url + '">' + country.name + '</a></h2>';
  
  response.end(preface + cityString + countryString + postface);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

const cities = [
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Chongqing",
            "name": "Chongqing"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Shanghai",
            "name": "Shanghai"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Delhi",
            "name": "Delhi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Beijing",
            "name": "Beijing"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Mumbai",
            "name": "Mumbai"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Dhaka",
            "name": "Dhaka"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Bangladesh",
            "name": "Bangladesh"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Lagos",
            "name": "Lagos"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Chengdu",
            "name": "Chengdu"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Karachi",
            "name": "Karachi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Guangzhou",
            "name": "Guangzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Istanbul",
            "name": "Istanbul"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Turkey",
            "name": "Turkey"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tokyo",
            "name": "Tokyo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tianjin",
            "name": "Tianjin"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Moscow",
            "name": "Moscow"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/S%C3%A3o_Paulo",
            "name": "São Paulo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kinshasa",
            "name": "Kinshasa"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Democratic_Republic_of_the_Congo",
            "name": "DR Congo"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Lahore",
            "name": "Lahore"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Cairo",
            "name": "Cairo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Egypt",
            "name": "Egypt"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Seoul",
            "name": "Seoul"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Jakarta",
            "name": "Jakarta"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Wenzhou",
            "name": "Wenzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Mexico_City",
            "name": "Mexico City"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Lima",
            "name": "Lima"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Peru",
            "name": "Peru"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/London",
            "name": "London"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_Kingdom",
            "name": "United Kingdom"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bangkok",
            "name": "Bangkok"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Thailand",
            "name": "Thailand"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Xi%27an",
            "name": "Xi&#39;an"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Chennai",
            "name": "Chennai"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bangalore",
            "name": "Bangalore"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/New_York_City",
            "name": "New York City"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ho_Chi_Minh_City",
            "name": "Ho Chi Minh City"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Vietnam",
            "name": "Vietnam"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hyderabad",
            "name": "Hyderabad"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Shenzhen",
            "name": "Shenzhen"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Suzhou",
            "name": "Suzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Nanjing",
            "name": "Nanjing"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Dongguan",
            "name": "Dongguan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tehran",
            "name": "Tehran"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Quanzhou",
            "name": "Quanzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Shenyang",
            "name": "Shenyang"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bogot%C3%A1",
            "name": "Bogotá"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hong_Kong",
            "name": "Hong Kong"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Baghdad",
            "name": "Baghdad"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iraq",
            "name": "Iraq"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Fuzhou",
            "name": "Fuzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Changsha",
            "name": "Changsha"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Wuhan",
            "name": "Wuhan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hanoi",
            "name": "Hanoi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Vietnam",
            "name": "Vietnam"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Rio_de_Janeiro",
            "name": "Rio de Janeiro"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Qingdao",
            "name": "Qingdao"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Foshan",
            "name": "Foshan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Zunyi",
            "name": "Zunyi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Santiago",
            "name": "Santiago"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Chile",
            "name": "Chile"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Riyadh",
            "name": "Riyadh"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Saudi_Arabia",
            "name": "Saudi Arabia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ahmedabad",
            "name": "Ahmedabad"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Singapore",
            "name": "Singapore"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Singapore",
            "name": "Singapore"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Shantou",
            "name": "Shantou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ankara",
            "name": "Ankara"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Turkey",
            "name": "Turkey"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Yangon",
            "name": "Yangon"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Myanmar",
            "name": "Myanmar"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Saint_Petersburg",
            "name": "Saint Petersburg"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Sydney",
            "name": "Sydney"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Australia",
            "name": "Australia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Casablanca",
            "name": "Casablanca"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Morocco",
            "name": "Morocco"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Melbourne",
            "name": "Melbourne"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Australia",
            "name": "Australia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Abidjan",
            "name": "Abidjan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Ivory_Coast",
            "name": "Ivory Coast"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Alexandria",
            "name": "Alexandria"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Egypt",
            "name": "Egypt"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kolkata",
            "name": "Kolkata"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Surat",
            "name": "Surat"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Johannesburg",
            "name": "Johannesburg"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Dar_es_Salaam",
            "name": "Dar es Salaam"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Tanzania",
            "name": "Tanzania"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Shijiazhuang",
            "name": "Shijiazhuang"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Harbin",
            "name": "Harbin"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Giza",
            "name": "Giza"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Egypt",
            "name": "Egypt"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/%C4%B0zmir",
            "name": "İzmir"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Turkey",
            "name": "Turkey"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Zhengzhou",
            "name": "Zhengzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/New_Taipei_City",
            "name": "New Taipei City"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Los_Angeles",
            "name": "Los Angeles"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Changchun",
            "name": "Changchun"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Cape_Town",
            "name": "Cape Town"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Yokohama",
            "name": "Yokohama"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Khartoum",
            "name": "Khartoum"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Sudan",
            "name": "Sudan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Guayaquil",
            "name": "Guayaquil"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Ecuador",
            "name": "Ecuador"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hangzhou",
            "name": "Hangzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Xiamen",
            "name": "Xiamen"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Berlin",
            "name": "Berlin"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Busan",
            "name": "Busan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ningbo",
            "name": "Ningbo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Jeddah",
            "name": "Jeddah"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Saudi_Arabia",
            "name": "Saudi Arabia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Durban",
            "name": "Durban"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Algiers",
            "name": "Algiers"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Algeria",
            "name": "Algeria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kabul",
            "name": "Kabul"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Afghanistan",
            "name": "Afghanistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hefei",
            "name": "Hefei"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Mashhad",
            "name": "Mashhad"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Pyongyang",
            "name": "Pyongyang"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/North_Korea",
            "name": "Korea, North"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Madrid",
            "name": "Madrid"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Spain",
            "name": "Spain"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Faisalabad",
            "name": "Faisalabad"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Baku",
            "name": "Baku"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Azerbaijan",
            "name": "Azerbaijan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tangshan",
            "name": "Tangshan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ekurhuleni_Metropolitan_Municipality",
            "name": "Ekurhuleni"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Africa",
            "name": "South Africa"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Nairobi",
            "name": "Nairobi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Kenya",
            "name": "Kenya"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Zhongshan",
            "name": "Zhongshan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Pune",
            "name": "Pune"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Addis_Ababa",
            "name": "Addis Ababa"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Ethiopia",
            "name": "Ethiopia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Jaipur",
            "name": "Jaipur"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Buenos_Aires",
            "name": "Buenos Aires"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Argentina",
            "name": "Argentina"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Incheon",
            "name": "Incheon"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Quezon_City",
            "name": "Quezon City"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Toronto",
            "name": "Toronto"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Canada",
            "name": "Canada"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kiev",
            "name": "Kiev"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Ukraine",
            "name": "Ukraine"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Salvador,_Bahia",
            "name": "Salvador"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Rome",
            "name": "Rome"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Italy",
            "name": "Italy"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Dubai",
            "name": "Dubai"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_Arab_Emirates",
            "name": "United Arab Emirates"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Luanda",
            "name": "Luanda"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Angola",
            "name": "Angola"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Lucknow",
            "name": "Lucknow"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kaohsiung",
            "name": "Kaohsiung"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kanpur",
            "name": "Kanpur"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Surabaya",
            "name": "Surabaya"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Taichung",
            "name": "Taichung"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Basra",
            "name": "Basra"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iraq",
            "name": "Iraq"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Taipei",
            "name": "Taipei"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Chicago",
            "name": "Chicago"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Osaka",
            "name": "Osaka"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Quito",
            "name": "Quito"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Ecuador",
            "name": "Ecuador"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Chaozhou",
            "name": "Chaozhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Fortaleza",
            "name": "Fortaleza"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Chittagong",
            "name": "Chittagong"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Bangladesh",
            "name": "Bangladesh"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bandung",
            "name": "Bandung"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Managua",
            "name": "Managua"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Nicaragua",
            "name": "Nicaragua"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bras%C3%ADlia",
            "name": "Brasília"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Belo_Horizonte",
            "name": "Belo Horizonte"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Daegu",
            "name": "Daegu"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Houston",
            "name": "Houston"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Douala",
            "name": "Douala"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Cameroon",
            "name": "Cameroon"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Medellin",
            "name": "Medellin"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Yaound%C3%A9",
            "name": "Yaoundé"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Cameroon",
            "name": "Cameroon"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Nagpur",
            "name": "Nagpur"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Cali",
            "name": "Cali"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tashkent",
            "name": "Tashkent"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Uzbekistan",
            "name": "Uzbekistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Nagoya",
            "name": "Nagoya"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Isfahan",
            "name": "Isfahan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Phnom_Penh",
            "name": "Phnom Penh"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Cambodia",
            "name": "Cambodia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Paris",
            "name": "Paris"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/France",
            "name": "France"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ouagadougou",
            "name": "Ouagadougou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Burkina_Faso",
            "name": "Burkina Faso"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Lanzhou",
            "name": "Lanzhou"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kano",
            "name": "Kano"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Dalian",
            "name": "Dalian"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Guatemala_City",
            "name": "Guatemala City"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Guatemala",
            "name": "Guatemala"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Havana",
            "name": "Havana"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Cuba",
            "name": "Cuba"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Rawalpindi",
            "name": "Rawalpindi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Medan",
            "name": "Medan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Accra",
            "name": "Accra"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Ghana",
            "name": "Ghana"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Visakhapatnam",
            "name": "Visakhapatnam"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Gujranwala",
            "name": "Gujranwala"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Jinan",
            "name": "Jinan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/China",
            "name": "China"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Karaj",
            "name": "Karaj"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Peshawar",
            "name": "Peshawar"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Minsk",
            "name": "Minsk"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Belarus",
            "name": "Belarus"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Caracas",
            "name": "Caracas"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Venezuela",
            "name": "Venezuela"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Sana%27a",
            "name": "Sana&#39;a"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Yemen",
            "name": "Yemen"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Sapporo",
            "name": "Sapporo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tainan",
            "name": "Tainan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Taiwan",
            "name": "Taiwan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bucharest",
            "name": "Bucharest"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Romania",
            "name": "Romania"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Curitiba",
            "name": "Curitiba"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Shiraz",
            "name": "Shiraz"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Vienna",
            "name": "Vienna"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Austria",
            "name": "Austria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Brazzaville",
            "name": "Brazzaville"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Republic_of_the_Congo",
            "name": "Congo Republic"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bhopal",
            "name": "Bhopal"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Almaty",
            "name": "Almaty"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Kazakhstan",
            "name": "Kazakhstan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hamburg",
            "name": "Hamburg"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Manila",
            "name": "Manila"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kuala_Lumpur",
            "name": "Kuala Lumpur"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Malaysia",
            "name": "Malaysia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Maputo",
            "name": "Maputo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Mozambique",
            "name": "Mozambique"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Budapest",
            "name": "Budapest"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Hungary",
            "name": "Hungary"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Warsaw",
            "name": "Warsaw"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Poland",
            "name": "Poland"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Lusaka",
            "name": "Lusaka"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Zambia",
            "name": "Zambia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kathmandu",
            "name": "Kathmandu"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Nepal",
            "name": "Nepal"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tabriz",
            "name": "Tabriz"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hyderabad,_Pakistan",
            "name": "Hyderabad"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Palembang",
            "name": "Palembang"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tijuana",
            "name": "Tijuana"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Patna",
            "name": "Patna"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Montreal",
            "name": "Montreal"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Canada",
            "name": "Canada"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Davao_City",
            "name": "Davao City"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Harare",
            "name": "Harare"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Zimbabwe",
            "name": "Zimbabwe"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Barcelona",
            "name": "Barcelona"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Spain",
            "name": "Spain"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Maracaibo",
            "name": "Maracaibo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Venezuela",
            "name": "Venezuela"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Caloocan",
            "name": "Caloocan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Philippines",
            "name": "Philippines"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Philadelphia",
            "name": "Philadelphia"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Novosibirsk",
            "name": "Novosibirsk"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Phoenix,_Arizona",
            "name": "Phoenix"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Oran",
            "name": "Oran"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Algeria",
            "name": "Algeria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Semarang",
            "name": "Semarang"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Recife",
            "name": "Recife"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kobe",
            "name": "Kobe"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Daejeon",
            "name": "Daejeon"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kampala",
            "name": "Kampala"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Uganda",
            "name": "Uganda"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kawasaki,_Kanagawa",
            "name": "Kawasaki"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Guadalajara",
            "name": "Guadalajara"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Auckland",
            "name": "Auckland"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/New_Zealand",
            "name": "New Zealand"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Vijayawada",
            "name": "Vijayawada"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/India",
            "name": "India"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Fukuoka",
            "name": "Fukuoka"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kwangju",
            "name": "Kwangju"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Porto_Alegre",
            "name": "Porto Alegre"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kyoto",
            "name": "Kyoto"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/San_Antonio",
            "name": "San Antonio"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Santa_Cruz_de_la_Sierra",
            "name": "Santa Cruz de la Sierra"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Bolivia",
            "name": "Bolivia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Munich",
            "name": "Munich"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Kharkiv",
            "name": "Kharkiv"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Ukraine",
            "name": "Ukraine"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Yekaterinburg",
            "name": "Yekaterinburg"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/San_Diego",
            "name": "San Diego"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Barranquilla",
            "name": "Barranquilla"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Colombia",
            "name": "Colombia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Milan",
            "name": "Milan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Italy",
            "name": "Italy"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ibadan",
            "name": "Ibadan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Makassar",
            "name": "Makassar"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Indonesia",
            "name": "Indonesia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/C%C3%B3rdoba,_Argentina",
            "name": "Córdoba"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Argentina",
            "name": "Argentina"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Prague",
            "name": "Prague"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Czech_Republic",
            "name": "Czech Republic"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Mandalay",
            "name": "Mandalay"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Myanmar",
            "name": "Myanmar"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Dallas",
            "name": "Dallas"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_States",
            "name": "United States"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Montevideo",
            "name": "Montevideo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Uruguay",
            "name": "Uruguay"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Qom",
            "name": "Qom"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ahvaz",
            "name": "Ahvaz"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Iran",
            "name": "Iran"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Sofia",
            "name": "Sofia"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Bulgaria",
            "name": "Bulgaria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Nizhny_Novgorod",
            "name": "Nizhny Novgorod"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Abuja",
            "name": "Abuja"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Nigeria",
            "name": "Nigeria"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Calgary",
            "name": "Calgary"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Canada",
            "name": "Canada"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Saitama,_Saitama",
            "name": "Saitama"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Suwon",
            "name": "Suwon"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "South Korea"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Hiroshima",
            "name": "Hiroshima"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Japan",
            "name": "Japan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Rosario,_Santa_Fe",
            "name": "Rosario"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Argentina",
            "name": "Argentina"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Brisbane",
            "name": "Brisbane"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Australia",
            "name": "Australia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Belgrade",
            "name": "Belgrade"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Serbia",
            "name": "Serbia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Campinas",
            "name": "Campinas"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Brazil",
            "name": "Brazil"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Ulsan",
            "name": "Ulsan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/South_Korea",
            "name": "Korea, South"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Omsk",
            "name": "Omsk"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Dakar",
            "name": "Dakar"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Senegal",
            "name": "Senegal"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Abu_Dhabi",
            "name": "Abu Dhabi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_Arab_Emirates",
            "name": "United Arab Emirates"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Monterrey",
            "name": "Monterrey"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Mexico",
            "name": "Mexico"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tripoli",
            "name": "Tripoli"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Libya",
            "name": "Libya"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Rostov-on-Don",
            "name": "Rostov-on-Don"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Russia",
            "name": "Russia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/T%27bilisi",
            "name": "T&#39;bilisi"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Georgia_(country)",
            "name": "Georgia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Fez,_Morocco",
            "name": "Fez"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Morocco",
            "name": "Morocco"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Birmingham",
            "name": "Birmingham"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/United_Kingdom",
            "name": "United Kingdom"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Yerevan",
            "name": "Yerevan"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Armenia",
            "name": "Armenia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Cologne",
            "name": "Cologne"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Germany",
            "name": "Germany"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Tunis",
            "name": "Tunis"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Tunisia",
            "name": "Tunisia"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Bulawayo",
            "name": "Bulawayo"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Zimbabwe",
            "name": "Zimbabwe"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Astana",
            "name": "Astana"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Kazakhstan",
            "name": "Kazakhstan"
        },
    },
    {
        "city": {
            "url": "https://en.wikipedia.org/wiki/Islamabad",
            "name": "Islamabad"
        },
        "country": {
            "url": "https://en.wikipedia.org/wiki/Pakistan",
            "name": "Pakistan"
        }
    }
]