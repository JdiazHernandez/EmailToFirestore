//Initialize Firestore

const Firestore = require("@google-cloud/firestore");

//Firesotre configuration

const firestore = new Firestore({
  projectId: "emailtofirestore",
  keyFilename: "./firebase-keys.json",
  timestampsInSnapshots: true
});

//Initialize Imap and MailParser

var Imap = require("imap"),
  inspect = require("util").inspect;

const simpleParser = require("mailparser").simpleParser;

var mail = {};

//Initialize email configuration
//This especific set of configuration requiere that the email acount from google is
//set as accept less secure apps.

var imap = new Imap({
  user: "jamaospokertour@gmail.com",
  password: "soyunjamao",
  host: "imap.gmail.com", //If you use gmail use this values below
  port: 993,
  tls: true
});

//Open of the inbox and retrieve of emails.

function openInbox(cb) {
  imap.openBox("INBOX", false, cb);
}

imap.once("ready", function() {
  openInbox(function(err, box) {
    if (err) throw err;
    //UNSEEN indicates that will retrieve any non open email
    imap.search(["UNSEEN"], function(err, results) {
      if (err) throw err;
      var f = imap.fetch(results, {
        bodies: ""
      });

      //Organize them by their sequence nummber
      f.on("message", function(msg, seqno) {
        //console.log('Message #%d', seqno);
        var prefix = "(#" + seqno + ") ";
        msg.on("body", function(stream, info) {
          //Parsing of each email
          simpleParser(stream, (err, parsed) => {
            console.log("-----------");
            console.log(prefix + "Email");
            //console.log( parsed);
            //Creation of the Email object for Firestore
            mail = {
              Date: parsed.date,
              title: parsed.subject,
              text: parsed.text,
              "Email from": parsed.from.value[0].address,
              "Email to": parsed.to.value[0].address
            };
            console.log(mail);
            console.log("-----------");
            //Firestore injection of the mail object
            firestore.collection("Emails").add({
              mail
            });
          });
        });
      });

      //Setting the emails as seen
      imap.setFlags(results, ["SEEN"], function(err) {
        if (!err) {
          console.log("marked as read");
        } else {
          console.log(JSON.stringify(err, null, 2));
        }
      });

      f.once("error", function(err) {
        console.log("Fetch error: " + err);
      });
      f.once("end", function() {
        console.log("Done fetching all messages!");
        imap.end();
      });
    });
  });
});
imap.connect();
