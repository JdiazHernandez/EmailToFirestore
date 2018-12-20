# EmailToFirestore
This is a small project to store emails on Firestore

This node.js app will connect to a "less secure"* google account, retrieve all UNSEEN emails, parse them and store them in a selected Firestore database.


## Getting Started

Once you copy this repository you would need to acquire the correct credentials from Google firebase.

### Prerequisites

You need to have the following modules

```
npm install firebase-admin --save
npm install nodemailer --save
npm install imap

```


### Installing

First obtain the proper account services key from Google Firebase console:

```
 Project Console->Configuration of the project->Service account->Generate new service key

```

Change the name from <NAME-OF-THE-PROJECT>firebase<TYPE-OF-KEY>.json to firebase-keys.json and place in to the root of the project. Also hardcode the project ID on the configuration of firebase.

By the time being, the email account is hardcode since is needed to be set as "less secure" from Google.

*
To set your Gmail account as "less secure":

1. Sign in to your [Google Admin console.](https://admin.google.com/)
···Sign in using an administrator account

2. From the Admin console Home page, go to `Security > Basic settings`.
···To see Security on the Home page, you might have to click More controls at the bottom.

3. Under Less secure apps, select Go to settings for less secure apps.

4. In the sub window, select the Disable access to less secure apps for all users radio button.


## Running

Is possible to run the index.js as a standalone node.js instance.

Once the app has fetch all UNSEEN emails, it automatically sets them as SEEN.
I case of UNSEEN emails, the app stops on error, `Nothing to fecth`


## Author

* **Javier Diaz** - *Initial work* -


