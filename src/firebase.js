// import firebase SDK from npm install firebase node package
import firebase from 'firebase/app';
import 'firebase/database';

// web app configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAGjURZnH491UnfoBoBpxSPts9obUvkpTw",
    authDomain: "tenal-bourchier-project-five.firebaseapp.com",
    databaseURL: "https://tenal-bourchier-project-five.firebaseio.com",
    projectId: "tenal-bourchier-project-five",
    storageBucket: "tenal-bourchier-project-five.appspot.com",
    messagingSenderId: "975956098016",
    appId: "1:975956098016:web:f553aaf3265b0fa6a4c985"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// export configured version of firebase
export default firebase;