import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut  } from "firebase/auth";
import { getDatabase, ref, onValue, set, child, get, remove, update} from "firebase/database";

const app = initializeApp(firebaseConfig)

const auth = getAuth();
const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();

const db = getDatabase(app);

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      getData(setUserData)
    } else {
      setUserProfile(user)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------

function withFacebook () {
  var sUsrAg = navigator.userAgent;

  if (( sUsrAg.indexOf("FBAN") > -1) || (sUsrAg.indexOf("FBAV") > -1 )) {
        alert("Obzon Bolivia utiliza tecnologías modernas que FACEBOOK NAVEGATOR no reconoce aun, por favor PRESIONE LOS TRES PUNTOS DEL LATERAL DERECHO Y ELIJA LA OPCIÓN ABRIR EN EL NAVEGADOR o intente directamente desde otro navegador o establezca otro navegador como prederterminado, gracias por su comprensión.");
        return
  }
  const auth = getAuth();
  signInWithPopup(auth, providerFB)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
  
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
    });
}



function withGoogle () {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    const obj = {displayName: user.displayName, email: user.email}
    return writeUserData('/users/' + user.uid, obj)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

function handleSignOut () {
  signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

// -------------------------------Firebase Realtime Database------------------------------------

const dbRef = ref(getDatabase());

function getData(setUserData) {

  onValue(ref(db, '/'), (snapshot) => {
    if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData('');
        }
    
  });
}

function getSpecificData(query, setUserSpecificData) {

  get(child(dbRef, `users/${query}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setUserSpecificData(snapshot.val()) 
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function writeUserData (rute, object, setUserSuccess, data) {
  console.log('write')
  update(ref(db, rute), object )
  .then(()=> setUserSuccess !== null? setUserSuccess(data ? data : 'save'): console.log('Save'))
  .catch(()=> setUserSuccess !== null?setUserSuccess('repeat'): console.log('no save'))
}

async function removeData (rute, setUserData, setUserSuccess) {
  await remove(ref(db, rute)).then(()=>setUserSuccess('save')).catch(()=>setUserSuccess('repeat'));
  getData(setUserData)

}
function getCode(code, uid, setUserSuccess){
  onValue(ref(db, '/activadores'), function(snapshot){  
        var b = snapshot.child(code).exists();                
        if (b === true ){
              var val = snapshot.child(code).val();
              if(val == false) {
                    const us = 'users' 
                    update(ref(db, '/activadores'), {[code]: true} )
                    // db.ref(`/activadores/${code}`).set(true)
                    update(ref(db, `/${us}/${uid}`), { uid: code, date: Date()}) 
                    setUserSuccess('Premium')
              }else{
                    console.log('ya esta en uso')
                    setUserSuccess('InUse')
              }
        } else {
           console.log('no exist')
           setUserSuccess('NonExist')
        }
  })
}

export { onAuth, withGoogle, handleSignOut, getData, getSpecificData, writeUserData, removeData, getCode, withFacebook}
