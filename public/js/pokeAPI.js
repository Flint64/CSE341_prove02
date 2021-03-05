let list = document.getElementById("list");
let next = document.getElementById("next");
let previous = document.getElementById("previous");


// let firstPrevious = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
let nextPage = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
let previousPage = '';

function loadNext(){
    fetch(nextPage)
    .then(res => res.json())
    .then(json => {
    //   console.log(json);
      list.innerHTML = "";
      
      //Loop through the next set of data
      //Create the <li>'s, set the data
      //Append to the DOM
      for (let i = 0; i < 10; i++){
        let element = document.createElement('li');
        element.id = ("num_" + i);
        element.innerHTML = json.results[i].name;
        list.appendChild(element);
      }

    //Set the new next & Previous URL to the correct data
        previousPage = json.previous;
        nextPage = json.next;
        
    });
}

function loadPrevious(){
        fetch(previousPage)
        .then(res => res.json())
        .then(json => {
        // console.log(json);
        list.innerHTML = "";
        
        //Loop through the next set of data
        //Create the <li>'s, set the data
        //Append to the DOM
        for (let i = 0; i < 10; i++){
            let element = document.createElement('li');
            element.id = ("num_" + i);
            element.innerHTML = json.results[i].name;
            list.appendChild(element);
        }
        
        //Set the new next & Previous URL to the correct data
        previousPage = json.previous;
        nextPage = json.next;

        });
}
