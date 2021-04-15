import React, { useEffect } from "react";
import firebase from "./config/firebase";

const WomenLists = ({ women_lists }) => {
  return (
    <div>
      <h2>Women Lists</h2>
      <ul>
        {women_lists.map((woman) => {
          //ドキュメント（ユニークID)の参照
          var docRef = firebase
            .firestore()
            .collection("women_lists")
            .doc(woman.id);

          //Likeを増やしてfirestoreで管理する
          //ドキュメントIDを取得したいのでmap関数内で関数定義をして
          //ユニークなidを取得する
          const handleClickLike = (e) => {
            e.preventDefault();
            docRef.update({ like: woman.like + 1 });
          };

          //Nopeを増やしてfirestoreで管理する
          const handleClickNope = (e) => {
            e.preventDefault();
            docRef.update({ nope: woman.nope + 1 }).then(() => {
              if (woman.nope >= 9) {
                docRef
                  .delete()
                  .then(() => {
                    console.log("Document successfully deleted!");
                  })
                  .catch((error) => {
                    console.error("Error removing document: ", error);
                  });
              }
            });
          };

          return (
            <li key={woman.id}>
              <img src={woman.downloadURL} alt="woman" />
              <div>
                <button onClick={handleClickLike}>Like</button>
                <p>{woman.like}</p>
              </div>
              <div>
                <button onClick={handleClickNope}>Nope</button>
                <p>{woman.nope}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WomenLists;
