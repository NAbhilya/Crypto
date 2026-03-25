let lastEncrypted = "";

function encrypt() {
    let text = document.getElementById("text").value.toUpperCase();
    let key = parseInt(document.getElementById("key").value);

    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c >= 'A' && c <= 'Z') {
            result += String.fromCharCode((c.charCodeAt(0)-65+key)%26+65);
        } else result += c;
    }

    lastEncrypted = result;
    document.getElementById("result").innerHTML = "Encrypted: " + result;
}

function decrypt() {
    let key = parseInt(document.getElementById("key").value);
    let text = lastEncrypted;
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c >= 'A' && c <= 'Z') {
            result += String.fromCharCode((c.charCodeAt(0)-65-key+26)%26+65);
        } else result += c;
    }

    document.getElementById("result").innerHTML = "Decrypted: " + result;
}