export  async function getRequest(message) {

    console.log("sent "+message);
    const currentHost = window.location.hostname;
    const response = await fetch(`http://${currentHost}:4322/chat`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message})
    });
    const data = await response.json();
    const reply = data.reply;
    console.log(reply);
    return reply;
}
