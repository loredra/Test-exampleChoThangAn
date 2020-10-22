var Crawler = require("crawler");
 
var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            var tatCaSoBongTrong=$(" div.day_so_ket_qua_v2 > span.bong_tron").text();
           

            var arrayOfSoBong=[];
            for (var i=0;i<tatCaSoBongTrong.length-1;i+=2){

                arrayOfSoBong.push(tatCaSoBongTrong.slice(i,i+2))
            }
            var tmpArrayResult=[];
            var resultArray=[];
            var n=0;
            for (var i=0;i<arrayOfSoBong.length;i++){
                n++;
                if(n===6){
                tmpArrayResult.push(arrayOfSoBong[i]);               
                resultArray.push(tmpArrayResult)
                tmpArrayResult=[];
                n=0;
                }
                else
                tmpArrayResult.push(arrayOfSoBong[i]);
            }
            console.log(resultArray);

           // console.log($(" div.day_so_ket_qua_v2 > span.bong_tron").text());
        }
        done();
    }
});
 
// Queue just one URL, with default callback
 c.queue('https://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/winning-number-645');
 
// // Queue a list of URLs
// //c.queue(['http://www.google.com/','http://www.yahoo.com']);
 
// // Queue URLs with custom callbacks & parameters
// c.queue([{
//     uri: 'http://parishackers.org/',
//     jQuery: false,
 
//     // The global callback won't be called
//     callback: function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Grabbed', res.body.length, 'bytes');
//         }
//         done();
//     }
// }]);
 
// // Queue some HTML code directly without grabbing (mostly for tests)
// c.queue([{
//     html: '<p>This is a <strong>test</strong></p>'
// }]);