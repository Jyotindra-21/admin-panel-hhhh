import React from "react";
import TipTap from "./TipTap/TipTap";

// News letter Post

export default function Newsletter() {
  const updateNewsLetter = () => {
    alert("Update News Letter");
  };
  return (
    <div>
      <h4>News Letter</h4>
      <TipTap forpage={"news-letter"} action={updateNewsLetter} />
    </div>
  );
}

// post newsletter
