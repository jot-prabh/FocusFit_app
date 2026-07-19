const paymentForm = document.getElementById("paymentForm");


paymentForm.addEventListener("submit", async function (e) {

    e.preventDefault();


    const paymentData = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        amount: document.getElementById("amount").value

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


        console.log(result);


        if(result.success){


            // Create PayU Form
            const payuForm = document.createElement("form");

            payuForm.method = "POST";

            payuForm.action = "https://test.payu.in/_payment";
            payuForm.style.display = "none";


            const fields = {

                key: result.key,

                txnid: result.txnid,

                amount: result.amount,

                productinfo: result.productinfo,

                firstname: result.firstname,

                email: result.email,

                phone: result.phone,

                surl: result.surl,

                furl: result.furl,

                hash: result.hash

            };


            // Add hidden inputs
            for(const key in fields){

                const input = document.createElement("input");

                input.type = "hidden";

                input.name = key;

                input.value = fields[key];

                payuForm.appendChild(input);

            }


            document.body.appendChild(payuForm);


            // Submit to PayU
            payuForm.submit();


        }


    }

    catch(error){

        console.log("Error:", error);

    }


});