import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";

const UploadPhotos = () => {
  const [photo, setPhoto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a root reference
    var storageRef = firebase.storage().ref();
    console.log(photo);
    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child(photo[0].name);
    var file = photo[0];
    mountainsRef.put(file).then(function (snapshot) {
      console.log("Uploaded a blob or file!");
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log(downloadURL);

        //アップした女性の写真データをfire storeに送って保存,ドキュメントの追加
        // Add a new document in collection "cities"
        // Add a new document with a generated id.

        //"women_lists"コレクションの参照
        var collectionRef = firebase.firestore().collection("women_lists");

        collectionRef
          .add({
            downloadURL: downloadURL,
            like: 0,
            nope: 0,
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            //ドキュメントIDをidとして追加
            //addが実行された返り値(ドキュメントID)がdocRef.idに
            //格納されているからここでドキュメントIDが入ったidを
            //ドキュメントに追加
            collectionRef
              .doc(docRef.id)
              .set({ id: docRef.id }, { merge: true });
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });
    });
  };

  return (
    <div>
      <p>Please upload photos</p>
      <form onSubmit={handleSubmit}>
        <input
          name="photo"
          type="file"
          onChange={(e) => {
            setPhoto(e.target.files);
          }}
        />
        <button type="submit">upload</button>
      </form>
    </div>
  );
};

export default UploadPhotos;
