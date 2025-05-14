// show error messages
const error_msg = document.getElementById('error_msg');   

function hideError(){
    error_msg.classList.add('d-none');
}
function showError(msg){
    error_msg.classList.remove('d-none');
    error_msg.innerText = msg
}
////////// MAKE COPY OF DATABASE //////////////
// retrieve immediately on document load
(async () => {
    console.log("Document loaded, JavaScript running!")
    hideError();
    try { //if anything in here throws an error
        const response = await fetch('/quotes');    //get quotes route (get db)
        console.log(response);    //debugging purpose
        if(response.ok){
            const data = await response.json(); // wait until quotes is received from db
            const parentElement = document.getElementById('thelist')  //get parent element; parent is the list of all quotes
            const template = document.getElementById('template'); //gets <li> to use as template

            // removes first 3 "quotes"
            for(let i = 0; i < 3; i++){
                let child = parentElement.firstElementChild;
                if(child){
                    parentElement.removeChild(child);
                }
            }

            function addQuotes(quote){    //function to keep it neat
                const item = template.cloneNode(true); //clone template
                item.id = '';
                item.getElementsByClassName('text')[0].innerText = quote.text;
                item.getElementsByClassName('speaker')[0].innerText = quote.speaker;
                item.getElementsByClassName('source')[0].innerText = quote.source;

                return item;
            }

            for(let quote of data){

                //get function to add quotes
                const addItem = addQuotes(quote); // addItem is quote being added to list
                
                // make red button row appear (needs to be added before quotes are inserted?)
                addItem.addEventListener('mouseenter', e =>{
                    console.log("entered " + e.currentTarget); 
                    const row = e.currentTarget.getElementsByClassName('button')[0]; //get div with button
                    //show row where button is at
                    row.classList.remove('d-none'); //button doesn't work, only first class name (learned that d-none is used to hide elements?)
                    
                });

                // make red button row disappear
               addItem.addEventListener('mouseleave', e => {
                    const row = e.currentTarget.getElementsByClassName('button')[0];
                    //hides row where button is at
                    row.classList.add('d-none');
                });

                parentElement.appendChild(addItem); //insert to end of child node
                addItem.classList.remove('d-none');

                const button = addItem.getElementsByClassName('button')[0]; //div where button is at on template

                // click on red button to delete quote
                button.addEventListener('click', async e => {    //event handler put on button
                    //const del  = e.currentTarget.getElementsByClassName('button')[0]; //same as button
                    console.log("clicked on " + button); //check to see if it works (before removing)
                    let id = quote.id; //get quote id

                    //fetch route
                    const response = await fetch(`/delete/${id}`); //get delete route w/ id
                    if(response.ok){
                        //button.remove(); //only removes button?
                       addItem.remove(); //removes quote from db (additem = quote being added to list)
                    }
                }); 


                 /*const newElement = document.createElement('li');
                newElement.className = "list-group-item"; //add class to new element
                newElement.innerText = quote.text;    //insert quote to list text (text is an attribute from db)
                parentElement.appendChild(newElement);  //add new quote to end of child node/list
                */

            }
        }
        else{
            showError('Error, unable to show quotes');
        }
    }
    catch{  // catch errors here
        showError('My bad :C');
    }
})();