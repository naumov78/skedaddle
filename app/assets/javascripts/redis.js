var redis = require("redis"),
    client = redis.createClient();


    client.on("error", function (err) {
        console.log("Error " + err);
    });


client.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
