document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/select_data');
    console.log(response);
    const data = await response.json();

    const sel = document.getElementById('select');
    const tmpl = document.getElementById('template');

    tmpl.classList.add('d-none');
   

    //let option = null;  
    for(let option of data){
        /*const elt = document.createElement('option');
        elt.innerText = option.label;
        elt.value = option.id;
        sel.appendChild(elt); */

        const elt = tmpl.cloneNode(true);
        elt.id = ''; //id from element
        elt.value = option.id; //id from data
        elt.classList.remove('d-none')
        elt.getElementsByClassName('label')[0].innerText = option.label;
        elt.addEventListener('mouseenter', () => { //doesnt work when function as () => to show this.value
            console.log('mouse is over ' + option.id); //shouldnt work based on current understanding of how functions work
            //option.id has 3 copies which is the reason why it gives each number (keeping references?)
        });

        sel.appendChild(elt);

    }

});
// bubble structure talked about in class?
// talked about target
//console.log('mouse is over ' + option.id); //shouldnt work based on current understanding of how functions work
//talked about garbage collection
//function keeps each version of option, only gets rid of it when the function is gone? (only when option is created before for loop)