



var Imap = require('imap'),
    inspect = require('util').inspect;

const simpleParser = require('mailparser').simpleParser;


    var imap = new Imap({
        user: 'YOUREMAIL@ACCOUNT.HERE',//If you use gmail. Be aware: Use less secure option on your email or implement XoAuth2.
        password: 'YoUrPaSsWoRdhErE',
        host: 'imap.gmail.com',//If you use gmail use this values below
        port: 993,
        tls: true
        });

        function openInbox(cb) {
            imap.openBox('INBOX', true, cb);
          }

          imap.once('ready', function() {

          openInbox(function(err, box) {

          if (err) throw err;
          imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
            if (err) throw err;
            var f = imap.fetch(results, { bodies: '' });
            f.on('message', function(msg, seqno) {
              console.log('Message #%d', seqno);
              var prefix = '(#' + seqno + ') ';
              msg.on('body', function(stream, info) {
                 simpleParser(stream, (err, parsed) => {
                   console.log(prefix + 'Message');
                   console.log('=> '+ parsed.date)
                    //HERE NOW SHOULD GO FIREBASE ADD SEQUENCE, SO EACH EMAIL GOES SEPARATELY

                 });
              });
            });
            f.once('error', function(err) {
              console.log('Fetch error: ' + err);
            });
            f.once('end', function() {
              console.log('Done fetching all messages!');
              imap.end();
            });
          });
        });
    });
    imap.connect();