var express = require('express')
var app = express()


app.get("/whoami", function(req,res){
    var headers = req.headers;
    console.log(req.headers);
    var ua = headers['user-agent'],
    $ = {};

if (/mobile/i.test(ua)){
    $.Mobile = true;
}

if (/like Mac OS X/.test(ua)) {
    $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
    $.iPhone = /iPhone/.test(ua);
    $.iPad = /iPad/.test(ua);
}

if (/Android/.test(ua)){
    $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
}
if (/webOS\//.test(ua)){
    $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
}
if (/(Intel|PPC) Mac OS X/.test(ua)){
    $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;
}
if (/Windows NT/.test(ua)){
    $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
}
console.log($)
    res.send({
        "ipaddress":headers["x-forwarded-for"],
        "language": headers["accept-language"],
        "software":$
    });
})
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})