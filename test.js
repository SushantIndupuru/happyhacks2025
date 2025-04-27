export  async function testFunc(message) {

    console.log("sent "+message);
    const response = await fetch('http://localhost:4322/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message})
    });
    const data = await response.json();
    const reply = data.reply;
    console.log(reply);
}
