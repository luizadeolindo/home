import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import Playlist from "../../components/Playlist";
import { VideoThumbnailProps } from "../../components/VideoThumbnail/VideoThumbnailTypes";
import apiClient from "../../services/api-client";

const HomePage = () => {
  const [videos, setVideos] = useState<VideoThumbnailProps[]>([]);
  const [favoriteVideos, setFavoriteVideos] = useState<VideoThumbnailProps[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const buscarVideos = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<VideoThumbnailProps[]>("/videos");
      setVideos(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Erro ao carregar vídeos");
    } finally {
      setLoading(false);
    }
  };

  const getFavoriteVideos = async () => {
    const url = `/videos/favoritos`;

    try {
      const response = await apiClient.get(url);
      setFavoriteVideos(response.data);
    } catch (error) {
      console.log("Erro ao carregar vídeos");
    }
  };

  useEffect(() => {
    buscarVideos();
    getFavoriteVideos();
  }, []);

  return (
    <>
      <Playlist videos={videos} favoriteVideos={favoriteVideos} />
    </>
  );
};

export default HomePage;
