import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsXPmSqAfnc-uAu7JXggkQ0IlrhS4vo4c",
  authDomain: "sushi-test-c21f1.firebaseapp.com",
  projectId: "sushi-test-c21f1",
  storageBucket: "sushi-test-c21f1.appspot.com",
  messagingSenderId: "560021999850",
  appId: "1:560021999850:web:4a2c9c3015a9188f664793",
  measurementId: "G-YS1JVZSVMS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirestoreExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const addDataToFirestore = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
  
    try {
      // Read the JSON file
      const fileContent = await selectedFile.text();
      const jsonData = JSON.parse(fileContent);
  
      // Add each item to Firestore as a separate document
      for (const item of jsonData) {
        // Convert "productPrice" to a number
        item.productPrice = parseFloat(item.productPrice);
  
        // Add the item to Firestore
        await addDoc(collection(db, 'sushi-products'), item);
      }
  
      console.log('Data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding data to Firestore: ', error);
    }
  };
  

  return (
    <div>
      <h2>Firestore Example</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={addDataToFirestore}>Add Data to Firestore</button>
    </div>
  );
};

export default FirestoreExample;
