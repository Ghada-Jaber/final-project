<p >
<ol>
<li>
 Install laravel: Please check the official laravel installation guide for server requirements before you start. (https://laravel.com/docs/8.x/installation)
 </li>

<li>Clone the repository: git clone [your URL]
</li>

<li> 
Go to the project directory: composer install
</li>

<li> 
Copy the example env file and make the required configuration changes in the .env file:
    Run the command in the terminal: cp .env.example .env
    Create a new database <database-name> and edit the below in the .env accordingly: <br>
    <pre>
    DB_CONNECTION=mysql 
    DB_HOST=127.0.0.1 
    DB_PORT=3306 
    DB_DATABASE= database-name  
    DB_USERNAME= mysql-username 
    DB_PASSWORD= mysql-password 
    </pre>

</li>

 <li> 
Run command in terminal: php artisan migrate (to deploy the database)
</li> 

<li> 
php artisan passport:install
</li> 

<li> 
 php artisan passport:client --personal <br>
Name the personal access token: “Personal Access Token” <br>
For more details on Laravel passport, check the official documentation:
 (Laravel Passport - Laravel - The PHP Framework For Web Artisans)
</li>

<li> 
 php artisan storage:link <br>
To create a symbolic link from public/storage to storage/app/public
</li> 

<li> 
 Create Firebase project: <br>
Go to Authentication and enable authentication with email and password
 get the Firebase Credentials file (json file):
From Firebase navigate to Project settings -> Service accounts -> Generate a new private key -> Generate Key. <br>
Open the downloaded file and copy and paste it to the firebase credentials file (json file) in the project <br>
The file should look like: <br>
    <pre>
    { 
    "type": "", 
    "project_id": "", 
    "private_key_id": "", 
    "private_key": "", 
    "client_id": "", 
    "auth_uri": "", 
    "token_uri": "", 
    "auth_provider_x509_cert_url": "", 
    "client_x509_cert_url": "" 
    } 
    </pre>

</li> 

<li> 
php artisan ui react
</li> 

<li>
npm install 
</li> 

<li> 
From Firebase navigate to Project settings -> General -> Your apps -> Copy the following:<br>
    <pre>
    {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID",
    };
    </pre>
Then paste it to the Firebase Configuration file (Javascript file)
</li> 

<li>  
In the public folder, you should insert the GSM sender id in the  manifest.json file. This can be obtained from Firebase: Navigate to Project settings->Cloud Messaging -> Project credentials -> Sender ID. <br>

    Manifest.json should contain: <br>
    <pre>
    { 
        "Gsm_sender_id":"sender-id" 
    } 
    </pre>

Be sure to also include your Firebase Configuration to the firebase-message-sw.js file (which can also be found in the public folder)

</li> 

<li> 
Firebase Rules: <br>
In order to have Firebase fully functioning, slight modifications in the rules are needed: <br>

Firestore: <br>
Firebase Firestore rules: (to ensure only authenticated users can access the collections) <br>
<pre>
rules_version = '2'; 
service cloud.firestore { 
match /databases/{database}/documents { 
   		match /{document=**} { 
      			allow read, write: if true && request.auth != null; 
    		} 
  	} 
}
</pre> 

Storage: <br>
Firebase Storage rules: (to ensure only authenticated users can access the collections) <br>
<pre>
rules_version = '2'; 
service firebase.storage { 
match /b/{bucket}/o { 
   		match /{allPaths=**} { 
      			allow read: if true && request.auth != null; 
      			allow write: if true && request.auth != null &&              
request.resource.contentType.matches('image/.*'); 
    		} 
  	} 
}
</pre> 

</li> 

<li> 
Head to resources/js/components/Firebase <br>
In the init-fcm.js file, insert the VapidKey which can be found in Firebase: Project settings-> Cloud Messaging -> Web Configuration -> Key pair (You should create a new one) <br>

Inside Init-fcm.js, paste the vapid key in the following line:  <br>
messaging.usePublicVapidKey(“Vapidkey”)
</li>

<li> 
Head to resources/js/components/user <br>
In the Payment.js file, on line 130 insert the Service Key which can be found in Firebase: Project settings>Cloud Messaging -> project credentials -> Server key<br>

Inside Init-fcm.js, paste the vapid key in the following line:  <br>
messaging.usePublicVapidKey(“Vapidkey”)
</li>

<li> 
 Run command in terminal: php artisan serve (to access the website)
</li> 
</ol>
</p>




