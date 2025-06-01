// components/TokenImage.jsx
import React from "react";

export default function Canva({ className = "" }) {
  return (
    <div className={`overflow-hidden rounded-full ${className}`}>
      <img
        className="w-full h-full object-cover"
        alt=""
        src="https://chatgpt.com/backend-api/content?id=file-6qPLxHx8u9lf2XszRtWG25RD&amp;gizmo_id=g-alKfVrz9K&amp;ts=485761&amp;p=gpp&amp;sig=86343ad6ad969057c398f2993c30a4ead779efb589be719985a5753805abdc81&amp;v=0"
      />
    </div>
  );
}
