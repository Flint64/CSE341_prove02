let newAvenger = document.getElementById("addAvengerID");

function addAvenger(){

    let newData = {
        name: newAvenger.value
    }

    newData = JSON.stringify(newData);

    fetch('http://localhost:3000/admin/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newData
    }).then(res => res.json())
    .then(json => {

        if (json.message){
            let err = document.getElementById("err");
            err.innerHTML = json.message;
            return;
        }

        let list = document.getElementById("avengerList");
        list.innerHTML = "";

        console.log(json);

        for (let avenger of json.dummyData.avengers){
            let el = document.createElement('li');
            el.innerHTML = avenger.name;
            list.appendChild(el);
        }
    })
}