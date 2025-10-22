window.addEventListener('load', ()=> {
    document.getElementById('button-hotdog').addEventListener('click', ()=> {
        let noDogs = document.getElementById('number-hotdog').value;
        console.log(noDogs);

        //creating object
        let obj = {hotdogIngredients: noDogs};

        //stringify the object
        let jsonData = JSON.stringify (obj);

        //fetch to route hotdogIngredients

        fetch('/noDogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)}
        )


        //make a fetch request of type POST so we can send info to the server (hotdog ingredients)

        document.getElementById('get-tracker').addEventListener('click', ()=> {
            //get info on all the ingredients tracked so far
fetch('/all-ingredients')
.then(resp=> resp.json())
.then(data => {
    document.getElementById('ingredient-list').innerHTML = '';
    console.log(data.data);
    for(let i=0; i<data.data.length; i++) {
        let string = data.data[i].date + ": " + data.data[i].hotdogIngredients;
        let elt = document.createElement('p');
        elt.innerHTML = string;
        document.getElementById('ingredient-list').appendChild(elt);
    }
});
})
})
})
