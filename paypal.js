const express = require("express");

const engines = require("consolidate");

const paypal = require("paypal-rest-sdk");
const bodyParser=require("body-parser");


const app = express();



app.engine("ejs", engines.ejs);

app.set("views", "./views");

app.set("view engine", "ejs");
app.use( express.static( "public" ) );
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));
paypal.configure({

    mode: "sandbox", //sandbox or live

    client_id:

        "AYV6Gmj0EOYTJzrX4pS5sGAe68j3mkRpHev5y46dVKwG5CfNrg5niAI4Lwd5m5M0Ca3f84oRqTydh7sP",

    client_secret:

        "EBaqnG-VWj-_KLlFBUhYjmoOmIPjs2jTjzF1g2pDhGIu4OQ5_N4TVePb-ASnHKCgpS3N5ryQ7jumYdOZ"

});

app.get("/", (req, res) => {

    res.render("index");

});


app.get("/paypal", (req, res) => {

    var create_payment_json = {

        intent: "sale",

        payer: {

            payment_method: "paypal"

        },

        redirect_urls: {

            return_url: "http://192.168.43.22:3000/success",

            cancel_url: "http://192.168.43.22:3000/cancel"

        },

        transactions: [

            {

                item_list: {

                    items: [

                        {

                            name: "item",

                            sku: "item",

                            price: "70.00",

                            currency: "INR",

                            quantity: 1

                        }

                    ]

                },

                amount: {

                    currency: "INR",

                    total: "70.00"

                },

                description: "This is the payment description."

            }

        ]

    };



    paypal.payment.create(create_payment_json, function(error, payment) {

        if (error) {

            throw error;

        } else {

            console.log("Create Payment Response");

            console.log(payment);

            res.redirect(payment.links[1].href);
          //  res.send("Done");

        }

    });

});

app.get("/success",(req,res) =>{
	//res.send("Success");
	var PayerID = req.query.PayerID;

    var paymentId = req.query.paymentId;

    var execute_payment_json = {

        payer_id: PayerID,

        transactions: [

            {

                amount: {

                    currency: "INR",

                    total: "70.00"

                }

            }

        ]

    };



    paypal.payment.execute(paymentId, execute_payment_json, function(

        error,

        payment

    ) {

        if (error) {

            console.log(error.response);

            throw error;

        } else {

            console.log("Get Payment Response");

            console.log(JSON.stringify(payment));

            res.render("success");

        }

    });

});


app.get("/cancel",(req,res) =>{
	res.send("Cancelled");

});
app.listen(3000, () => {

    console.log("Server is running");

});