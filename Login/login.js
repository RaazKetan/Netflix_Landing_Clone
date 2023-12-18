
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import { getDatabase,get,ref,child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAJA1nmrBJa5lxefFIna6CFd_cfq9_0cI4",
    authDomain: "netflix-login-ce7df.firebaseapp.com",
    databaseURL: "https://netflix-login-ce7df-default-rtdb.firebaseio.com",
    projectId: "netflix-login-ce7df",
    storageBucket: "netflix-login-ce7df.appspot.com",
    messagingSenderId: "275626161035",
    appId: "1:275626161035:web:685d98bb4465b830a6358e"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();
  const dbref = ref(db);
  
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let LoginUser = evt=>{
	evt.preventDefault();
	signInWithEmailAndPassword(auth,email.value,password.value)
	.then((userCredential) => {
        get(child(dbref, 'UserAuthList/'+userCredential.user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Check");
                sessionStorage.setItem("user-info",JSON.stringify({
                    username: snapshot.val().username,
                }))
                sessionStorage.setItem("user-creds",JSON.stringify(userCredential.user));
                window.location.href = "../Home/Home.html";
                }
        })
		// window.location.href = "../Login/login.html";
	})
	.catch((error) => {
		alert(error.message);
	})

  }
  MainForm.addEventListener("submit",LoginUser);
