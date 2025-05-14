// followed in class
document.getElementById('submit').addEventListener('click', async (e) => {
    e.preventDefault();     //not used in assignment
    const response = await fetch('add_quote', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            source: form.source.value,
            speaker: form.speaker.value,
            text: form.text.value
        })
    })
});