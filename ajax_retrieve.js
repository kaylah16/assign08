const display_text = document.getElementById('display_text');
const display_html = document.getElementById('display_html');
const error_msg = document.getElementById('error_msg');

function hideError(){
    error_msg.classList.add('d-none');
}
function showError(msg){
    error_msg.classList.remove('d-none');
    error_msg.innerText = msg
}
// retrieve
document.getElementById('retrieve').addEventListener('click', async ()=> {
    console.log('click');   //check button works
    const response = await fetch('stuff.txt') //file is in same directory as this file so http not needed
    //console.log(response);    //debugging purpose
    const data = await response.text(); // wait until stuff is recieved
    display_text.innerText = data; //displays text
    display_html.innerHTML = data;   //displays html

});

// bad retrieve
document.getElementById('bad_retrieve').addEventListener('click', async ()=> {
    hideError();
    try { //if anything in here throws an error
        const response = await fetch('stuffz.txt');
        console.log(response);    //debugging purpose
        if(response.ok){
            const data = await response.json(); // wait until stuff is recieved
            display_text.innerText = data; //displays text
            display_html.innerHTML = data;   //displays html
        }
        else{
            showError("My bad");
        }
    }
    catch{  // catch errors here
        showError("Network crapped out :c");
    }
});

// retrieve json
document.getElementById('retrieve_json').addEventListener('click', async ()=> {
    hideError();
    try { //if anything in here throws an error
        const response = await fetch('/quotes');
        console.log(response);    //debugging purpose
        if(response.ok){
            const data = await response.json(); // wait until stuff is recieved
            console.log(data);
            //display_text.innerText = data; //displays text
            //display_html.innerHTML = data;   //displays html
            /*
             for(let p of data){
                display_text.innerText += 'i love ${p.name}';
            }*/
        }
        else{
            showError('My bad');
        }
    }
    catch{  // catch errors here
        showError('Network crapped out :c');
    }
});