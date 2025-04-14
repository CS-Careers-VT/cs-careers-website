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
exports.createAdminUser = functions.https.onCall(async (request, response) => {
    // const isAdmin = context.auth.token.admin === true
    // if (!isAdmin) {
    //   return { error: `Unauthorized.` }
    // }

    console.log("Request data:", request.data);
    const firstName = request.data.firstName;
    const lastName = request.data.lastName;
    const email = request.data.email;
    const password = request.data.password;
    const createdBy = request.data.createdBy;

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
exports.listUsers = functions.https.onCall((request, response) => {
  
    
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


/**
 * Delete a user in the Firebase Authentication
 */
exports.deleteUser = functions.https.onCall(async (request, response) => {
    console.log("Request data:", request.data);
    const uid = request.data.uid;

    return admin.auth().deleteUser(uid)
        .then(() => {
            return { message: `User with UID ${uid} deleted successfully.` };
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            return { error: `Error deleting user: ${error}` };
        });
});