
//initialize function called when the script loads
function initialize(){
    cities();
   // debugCallback(); //I don't think I need this
    debugAjax();
};

function cities(){
    //define an array of objects for cities and population
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];
    
    //create the table element
    var table = document.createElement("table");

    //create a header row
    var headerRow = document.createElement("tr");

    //add the "City" column
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);

    //add the "Population" column
    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

    //add the row to the table
    table.appendChild(headerRow);

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population; 
        tr.appendChild(pop);

        table.appendChild(tr);
    };
    //add the table to the div in index.html
    var mydiv =  document.getElementById("table");
    mydiv.appendChild(table);
    
    //function to add a column to my table
    function addColumns(cityPop){
        //loop to add a new column to each city row
        document.querySelectorAll("tr").forEach(function(row, i){  
        //add column header to first row in table
    	   if (i == 0){
            //add the header "City Size"
    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
    	} else {
            //add city size label for each row 
    		var citySize;
            //if city population is less than 10,000 then it's small
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
                //if city population is less than 50,000 but not less than 10,000 then it's medium
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';
                //if city size is greater than 50,000 then it's large
    		} else {
    			citySize = 'Large';
    		};
            //insert small, medium, or large into the row 
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
    	};
    })
};

//funtion to add random color on mouseover and clickme events to the table
    function addEvents(){
        //select the table element
        table = document.querySelector("table");
        //add mouseover random color event
	   document.querySelector("table").addEventListener("mouseover", function(){
		var color = "rgb(";
        //generate random color by selecting a random number 3 times
		for (var i=0; i<3; i++){
            //multiply random number by 255
			var random = Math.round(Math.random() * 255);
			//set r value 
            color += random;//should there be a comma here...?
            // set g value 
			if (i<2){
				color += ",";
			// set b value
			} else {
				color += ")";
            }
		};
        //give table the random generated color
		document.querySelector("table").style.color = color;
	});

    //add function that shows an alert when the table is clicked
	function clickme(){
        //define alert
		alert('Hey, you clicked me!');
	};
        //event listener for the click
	document.querySelector("table").addEventListener("click", clickme)
};
    addColumns(cityPop);
    addEvents(cityPop);
}

//DEBUG CODE BEGINS HERE...I don't think this first function is in the right place
//function debugCallback(response){
	//document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
//};

//define fetch request
function debugAjax(){
	//define variable to hold the data
	var myData;
	//use fetch to retrieve data
	fetch("data/MegaCities.geojson")
		.then(function(response){
			return response.json();
		})
    //converting callback response with anonymous call back function
        .then(function(response){
            myData = response;
        //links the GeoJSON file to my index file to display on webpage
              document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data:<br>' + JSON.stringify(myData))
        })
};
//call the initialize function when the window has loaded
window.onload = initialize();
window.onload = debugAjax();