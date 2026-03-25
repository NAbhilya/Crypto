// 🔹 Prime Check
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// 🔹 Fast Modular Exponentiation
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
        if (exp % 2 === 1)
            result = (result * base) % mod;

        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return result;
}

// 🔹 Primitive Root Check
function isPrimitiveRoot(a, q) {
    let set = new Set();

    for (let i = 1; i < q; i++) {
        set.add(modExp(a, i, q));
    }

    for (let i = 1; i < q; i++) {
        if (!set.has(i)) return false;
    }

    return true;
}

// 🔹 MAIN FUNCTION
function generate() {

    let q = parseInt(document.getElementById("q").value);
    let a = parseInt(document.getElementById("a").value);
    let xa = parseInt(document.getElementById("xa").value);
    let xb = parseInt(document.getElementById("xb").value);

    let output = document.getElementById("output");

    // ✅ VALIDATION
    if (!q || !a || !xa || !xb) {
        output.innerHTML = "❌ Fill all fields!";
        return;
    }

    if (!isPrime(q)) {
        output.innerHTML = "❌ q must be prime!";
        return;
    }

    if (!isPrimitiveRoot(a, q)) {
        output.innerHTML = "❌ α is not primitive root of q!";
        return;
    }

    // 🔹 Step 1: Public Keys
    let YA = modExp(a, xa, q);
    let YB = modExp(a, xb, q);

    // 🔹 Step 2: Shared Keys
    let KA = modExp(YB, xa, q);
    let KB = modExp(YA, xb, q);

    // 🔹 OUTPUT
    output.innerHTML = `
    <b>Public Parameters:</b><br>
    q = ${q}, α = ${a} <br><br>

    <b>User A:</b><br>
    XA = ${xa}, YA = ${YA} <br><br>

    <b>User B:</b><br>
    XB = ${xb}, YB = ${YB} <br><br>

    <b>Exchange:</b><br>
    A → B : ${YA} <br>
    B → A : ${YB} <br><br>

    <b>Shared Key Calculation:</b><br>
    A computes: K = ${KA} <br>
    B computes: K = ${KB} <br><br>

    <b>Final Shared Key:</b> ${KA} <br>
    ${KA === KB ? "✅ Keys Match" : "❌ Keys Do Not Match"}
    `;
}

// 🔹 CLEAR
function clearAll() {
    document.getElementById("output").innerHTML = "";
}