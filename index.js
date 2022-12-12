const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(cors({
  origin: '*' // that will for all like  https / http 
}))
const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};
let counter = 0;
let interval;
app.get("/event", (req, res) => {
  console.log('get event request')
  res.writeHead(200, headers);
  interval = setInterval(() => {
    const data = `${JSON.stringify({ counter: counter })}\n\n`;
    //res.write(data);
    
    res.write(`id: ${counter}\n` +'event: myEvent\n' + 'data: '+ data);
    counter++;
    console.log('Sent out data');
    console.log(data)
  }, 1000);
  req.on('close', () => {
    counter = 0
    clearInterval(interval);
    console.log("Connect close! ")
  });
});
app.listen(4000, () => {
  console.log("listening...");
});
