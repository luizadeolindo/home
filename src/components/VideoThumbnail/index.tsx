import { useState } from "react";
import { Link } from "react-router-dom";
import { VideoThumbnailProps } from "./VideoThumbnailTypes";

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  id,
  nome,
  url,
  thumbUrl,
  descricao,
  createdAt,
  duracao,
  topico,
}) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <>
      <Link to={"/videos/{id}"}>
        ;
        <img src={thumbUrl} />
        <div>{nome}</div>
      </Link>
    </>
  );
};
