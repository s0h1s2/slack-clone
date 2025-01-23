type Props = {
  url: string | null | undefined;
};
const Thumbnail = ({ url }: Props) => {
  if (!url) return null;

  return (
    <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
      <img
        src={url}
        alt="Message image"
        className="rounded-md object-cover size-full"
      />
    </div>
  );
};

export default Thumbnail;
