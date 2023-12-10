import React from "react";
import Image from "next/image";

const UserAvatar = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
  return (
    <div className="relative w-[48px] h-[48px] rounded-[24px] overflow-hidden">
      <Image
        className="w-[48px] h-[48px] rounded-[24px] overflow-hidden"
        fill
        src={imageUrl}
        alt={alt}
      />
    </div>
  );
};

export default UserAvatar;
