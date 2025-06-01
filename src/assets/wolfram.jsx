// components/TokenImage.jsx
import React from "react";

export default function Wolfram({ className = "" }) {
  return (
    <div className={`overflow-hidden rounded-full ${className}`}>
      <img
        className="w-full h-full object-cover"
        alt=""
        src="https://chatgpt.com/backend-api/content?id=file-fGE6EGZCQY73C76MJantfE0d&gizmo_id=g-0S5FXLyFN&ts=485707&p=gpp&sig=11b9bd2ef7c21d15e6834c825b7cc7829b4ecab2738cf328acc651d918869d6a&v=0"
      />
    </div>
  );
}
