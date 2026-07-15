const paymentForm = document.getElementById("paymentForm");
const paymentStatus = document.getElementById("paymentStatus");

paymentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const amount = document.getElementById("amount").value.trim();

    if (!name || !email || !phone || !amount) {
        paymentStatus.innerHTML = "Please fill all the fields.";
        paymentStatus.className = "failure";
        return;
    }

    const paymentData = {
        name,
        email,
        phone,
        amount
    };

    try {

        const response = await fetch("http://localhost:3000/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        });

        const result = await response.json();

        if (result.status === "success") {
            paymentStatus.innerHTML = "✅ Payment Successful";
            paymentStatus.className = "success";
        } else {
            paymentStatus.innerHTML = "❌ Payment Failed";
            paymentStatus.className = "failure";
        }

    } catch (error) {

        paymentStatus.innerHTML = "Server Error!";
        paymentStatus.className = "failure";
        console.log(error);

    }

});