/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require('firebase-admin');

// Initialize Application
admin.initializeApp();
const db = admin.firestore();

const cors = require('cors');
const corsHandler = cors({ origin: true });


/**
 * Add a new admin to the Firebase Authentication
 */
exports.createAdminUser = functions.https.onCall((data, context) => {
    // const isAdmin = context.auth.token.admin === true
    // if (!isAdmin) {
    //   return { error: `Unauthorized.` }
    // }

    const { firstName, lastName, email, password, createdBy } = data;

    return admin.auth().createUser({
        email: email,
        password: password,
        displayName: `${firstName} ${lastName}`,
        emailVerified: false,
        disabled: false,
    })
    .then((userRecord) => {
        const newUser = {
            uid: userRecord.uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
            createdBy: createdBy,
            createdAt: new Date(),
        }

        db.collection('users').doc(newUser.uid).set(newUser, { merge: true })
            .then(() => {
                console.log("User created successfully in Firestore");
            })
            .catch((error) => {
                console.error("Error creating new user in Firestore:", error);
                return { error: `Error creating new user in Firestore: ${error}` };
            }).then(() => {
                return {
                    uid: newUser.uid,
                    email: newUser.email,
                };
            })

    })
    .catch((error) => {
        console.error("Error creating new user in Firebase Authentication:", error);
        return { error: `Error creating new user in Firebase Authentication: ${error}` };
    });
});

/**
 * List all users in the Firebase Authentication
 */
exports.listUsers = functions.https.onCall((data, context) => {
  
    return admin
      .auth()
      .listUsers()
      .then((listUsersResult) => {
        // go through users array, and deconstruct user objects down to required fields
        const users = listUsersResult.users.map((user) => {
          const { uid, email, displayName } = user
          return { uid, email, displayName }
        })
  
        return users;
      })
      .catch((error) => {
        return { error: 'Error listing users' }
      })
  });
