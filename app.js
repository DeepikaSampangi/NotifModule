const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
var count=1;


var dt = new Date();
var utcDate = dt.toLocaleString();


// Init Nexmo
const nexmo = new Nexmo({
  apiKey: 'ea62c5a1',
  apiSecret: 'XT8ifzgtHlg3gZHp'
}, {debug: true});

// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

// Catch form submit
/*app.post('/', (req, res) => {
  // res.send(req.body);
  // console.log(req.body);
  const number = req.body.number;
  const text = req.body.text;

  nexmo.message.sendSms(
    'YOURVURTUALNUMBER', number, text, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Get data from response
        const data = {
          id: responseData.messages[0]['message-id'],
          number: responseData.messages[0]['to']
        }

        // Emit to the client
        io.emit('smsStatus', data);
      }
    }
  );
});
*/
// Define port
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
console.log(utcDate);
// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected');
   //Auctioneer Section
  /*if(count==1){
    SendT('918008030261',"SMART TRADE,Success " + utcDate);count=2;
   }
  
   if(count==2){
    SendT('918008030261',"EndAuction: "+ utcDate);count=3;
    
  }
  /*else if(count==3){
    SendT('919705314527',"Congrats Won Bid "+ utcDate);count=2;
    
  }*/
  
 //Bidder Section 
 /* if(count==1){
    SendT('919705314527',"SMART TRADE,Success "+ utcDate);count=2;
   }
  else if(count==2){
    SendT('919705314527',"BidPlaced "+ utcDate);
  }*/

  
  io.on('disconnect', () => {
    console.log('Disconnected');
  })
})

function SendT(number, text){
  
  nexmo.message.sendSms(
    '918886211191', number, text, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Get data from response
        const data = {
          id: responseData.messages[0]['message-id'],
          number: responseData.messages[0]['to']
        }

        // Emit to the client
        io.emit('smsStatus', data);
      }
    }
  );
}