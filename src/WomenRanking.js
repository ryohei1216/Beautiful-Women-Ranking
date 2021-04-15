import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";

const WomenRanking = () => {
  //women_listsをfirebaseから取得してくる
  //非同期処理でfire storeの情報を取得する
  const [womenLists, setWomenLists] = useState([]);
  useEffect(() => {
    //useEffectがコンポーネントの初期化中に必ず一度実行される
    // ということはuseEffectを利用して事前に外部からAPIでデータ
    // を取得することでコンポーネントの初期化の流れの中でデータ
    // を表示させることができる
    firebase
      .firestore()
      .collection("women_lists")
      .onSnapshot((snapshot) => {
        const women_info = snapshot.docs.map((doc) => {
          // return doc.data();
          return {
            downloadURL: doc.data().downloadURL,
            id: doc.data().id,
            like: doc.data().like,
            nope: doc.data().nope,
          };
        });
        setWomenLists(women_info);
      });
  }, []);

  //likeの順に並び変える
  //配列は参照型なので他の変数に格納
  const women_ranking = [];
  for (let i = 0; i < womenLists.length; i++) {
    women_ranking.push(womenLists[i]);
  }
  women_ranking.sort(function (a, b) {
    return b.like - a.like;
  });

  return (
    <>
      <h1>Women Ranking</h1>
      <ul>
        {women_ranking.map((woman) => {
          return (
            <li key={woman.id}>
              <img src={woman.downloadURL} alt="" />
              <p>Like: {woman.like}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WomenRanking;
