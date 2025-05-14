// for error messages
const error_msg = document.getElementById('error_msg');

function hideError(){
    error_msg.classList.add('d-none');
}
function showError(msg){
    error_msg.classList.remove('d-none');
    error_msg.innerText = msg
}

hideError();

const parentElement = document.getElementById('thelist'); //parent is the list of all quotes
// removes first 3 'quotes'
for(let i = 0; i < 3; i++){
    let child = parentElement.firstElementChild;
    if(child){
        parentElement.removeChild(child);
    }
}
// search on every keystroke
//use fetch for to retrieve quotes_search json for every event
//search quotes
document.getElementById('search').addEventListener('input', async () => { // input better than keydown
    // wanted to use keydown since thought it needed to be used but never gave correct quote(s) after word is completed, an extra character is needed
    // input gives quote(s) after completed word

    //if search textbox is blank/empty
    const isBlank = document.getElementById('search'); 
    if(isBlank.value === ''){
        //return list as empty
        parentElement.innerText = '';
        return;
    }

    // search for quote with each keystroke
    try{    //still using this to catch any errors
        const response = await fetch('/quote_search', {  //retrieve quote_search
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search: document.getElementById('search').value //text typed to textbox
            })
        });
        console.log(response);  //debug purpose
            
        if(response.ok){ 
            const data = await response.json();
            parentElement.innerText = '';  //helps with search to clear quotes when searching? (it does since its the list of quotes)
                    
            for(let quote of data){     //from part 2
                const newElement = document.createElement('li');
                newElement.className = "list-group-item"; //add class to new element
                newElement.innerText = quote.text;    //insert quote to list text (text is an attribute from db)
                parentElement.appendChild(newElement);  //add new quote to end of child node/list
            }
        }  
        else{
            showError("No quotes here :/");
        }   
    }
    catch{
        showError('Network crapped out, and no quotes to show :c');
    }
});
