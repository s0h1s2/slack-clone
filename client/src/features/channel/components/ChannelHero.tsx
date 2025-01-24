import { format } from "date-fns";
import React from "react";
type Props = {
  title: string;
  creationDate: string;
};
const ChannelHero = ({ title, creationDate }: Props) => {
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <div className="text-2xl font-bold flex items-center mb-2"># {title}</div>
      <p className="font-normal text-slate-800 mb-2">
        This channel was created on {format(creationDate, "MMMM do, yyyy")}.
        This is the very beginning of the <strong>{title}</strong>.
      </p>
    </div>
  );
};

export default ChannelHero;
