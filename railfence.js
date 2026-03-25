let lastEncrypted = "";

function createMatrix(r, c) {
    return Array.from({length:r}, () => Array(c).fill(""));
}

function showTable(rail) {
    let html = "<table>";
    for (let i=0;i<rail.length;i++) {
        html += "<tr>";
        for (let j=0;j<rail[i].length;j++) {
            html += "<td>"+(rail[i][j]||"")+"</td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("table").innerHTML = html;
}

function encrypt() {
    let text = document.getElementById("text").value;
    let key = parseInt(document.getElementById("key").value);

    let rail = createMatrix(key, text.length);

    let row=0, dir=1;

    for (let i=0;i<text.length;i++) {
        rail[row][i] = text[i];

        if (row==0) dir=1;
        else if (row==key-1) dir=-1;

        row+=dir;
    }

    showTable(rail);

    let result="";
    for (let i=0;i<key;i++)
        for (let j=0;j<text.length;j++)
            if (rail[i][j]!="") result+=rail[i][j];

    lastEncrypted = result;
    document.getElementById("result").innerHTML = "Encrypted: " + result;
}

function decrypt() {
    let key = parseInt(document.getElementById("key").value);
    let text = lastEncrypted;

    let rail = createMatrix(key, text.length);

    let row=0, dir=1;

    for (let i=0;i<text.length;i++) {
        rail[row][i]="*";

        if (row==0) dir=1;
        else if (row==key-1) dir=-1;

        row+=dir;
    }

    let index=0;
    for (let i=0;i<key;i++)
        for (let j=0;j<text.length;j++)
            if (rail[i][j]=="*" && index<text.length)
                rail[i][j]=text[index++];

    showTable(rail);

    let result="";
    row=0; dir=1;

    for (let i=0;i<text.length;i++) {
        result+=rail[row][i];

        if (row==0) dir=1;
        else if (row==key-1) dir=-1;

        row+=dir;
    }

    document.getElementById("result").innerHTML = "Decrypted: " + result;
}