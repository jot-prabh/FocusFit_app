require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));





app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});



app.post("/pay", (req, res) => {

    try {

        const { name, email, phone, amount } = req.body;


        if (!name || !email || !phone || !amount) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }


        const txnid = "TXN" + Date.now();

        
function generateHash(params, salt) {

    const key = params.key;
    const txnid = params.txnid;
    const amount = params.amount;
    const productinfo = params.productinfo;
    const firstname = params.firstname;
    const email = params.email;

    const udf1 = params.udf1 || "";
    const udf2 = params.udf2 || "";
    const udf3 = params.udf3 || "";
    const udf4 = params.udf4 || "";
    const udf5 = params.udf5 || "";

    const hashString =
        `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;

    return crypto
        .createHash("sha512")
        .update(hashString)
        .digest("hex");
}

        const params = {

            key: process.env.PAYU_KEY,

            txnid: txnid,

            amount: amount,

            productinfo: "Payment",

            firstname: name,

            email: email,

            udf1: "",
            udf2: "",
            udf3: "",
            udf4: "",
            udf5: ""

        };


        const hash = generateHash(
            params,
            process.env.PAYU_SALT
        );


        console.log("\n========== PAYMENT DETAILS ==========");

        console.log("Name          :", name);
        console.log("Email         :", email);
        console.log("Phone         :", phone);
        console.log("Amount        :", amount);

        console.log("-------------------------------------");

        console.log("Transaction ID:", txnid);
        console.log("Hash          :", hash);

        console.log("=====================================\n");


        res.json({

            success: true,

            key: params.key,

            txnid: txnid,

            amount: amount,

            productinfo: params.productinfo,

            firstname: name,

            email: email,

            phone: phone,

            hash: hash,


            surl:
            "http://localhost:3000/success",

            furl:
            "http://localhost:3000/failure"

        });


    }

    catch(error) {

        console.log(error);

        res.status(500).json({

            success:false,
            message:"Server error"

        });

    }

});
app.post("/success", (req, res) => {
    console.log("Payment Successful:", req.body);
    res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.post("/failure", (req, res) => {
    console.log("Payment Failed:", req.body);
    res.sendFile(path.join(__dirname, "public", "failure.html"));
});
app.listen(PORT,()=>{

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});