import React, { useState, useMemo } from "react";
import format from "date-fns/format";
import { useAuthenticated } from "../../components/VerifyAuth";
import apiClient from "../../services/api-client";

import { VideoThumbnail } from "../VideoThumbnail";
import { VideoThumbnailProps } from "../VideoThumbnail/VideoThumbnailTypes";
import { PlaylistProps } from "./PlaylistTypes";
import "./Playlist.css";

const Playlist: React.FC<PlaylistProps> = ({ videos, favoriteVideos }) => {
  const { isAuthenticated } = useAuthenticated();
  const videosFormatted = useMemo(() => {
    // const videoToReturn;
    const originalVideosArr = [...videos];

    originalVideosArr.map((v) => {
      const formattedDate = format(new Date(v.createdAt), "dd/MM/yyyy");
      v.createdAt = formattedDate;
    });

    return originalVideosArr;
  }, [videos]);

  const favoriteVideosId = useMemo<string[]>(() => {
    const favoriteVideosIdArr: null | string[] = [];

    if (favoriteVideos.length > 0) {
      console.log("cheguei");
      favoriteVideos.map((f) => {
        favoriteVideosIdArr.push(f.id);
      });
    } else {
      console.log("oxe");
    }

    return favoriteVideosIdArr;
  }, []);

  const handleAddNewFavorite = async (videoId: string) => {
    const url = `/videos/${videoId}/favoritos`;
    console.log("adding a video from favories");

    try {
      await apiClient.post(url);
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const handleRemoveAFavorite = async (videoId: string) => {
    const url = `/videos/${videoId}/favoritos`;
    console.log("removing a video from favories");
    try {
      await apiClient.delete(url);
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const checkIThatVideoIsAfavoriteVideo = (id: string) => {
    const videoId = favoriteVideosId.filter((fv) => {
      return fv === id;
    });

    if (videoId.length > 0) return true;
    else return false;
  };

  const handleFavorite = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (checkIThatVideoIsAfavoriteVideo(id)) {
      handleRemoveAFavorite(id);
    } else {
      handleAddNewFavorite(id);
    }
  };

  return (
    <div className="home">
      {/* {videos.length === 0 ? (
        <NoVideosMessage />
      ) : (
        videos.map((video) => <VideoThumbnail key={video.id} {...video} />)
      )} */}

      {isAuthenticated && (
        <div className="playlist">
          <div className="playlistTitle">
            <h2 className="topicTitle">Favoritos</h2>
            <hr className="line" />
          </div>

          <div className="carosel">
            {favoriteVideos.length > 0
              ? favoriteVideos.map((video) => (
                  <div className="video">
                    <div className="thumb">
                      <button className="favorite">favorite</button>
                    </div>

                    <div className="title">{video.nome}</div>
                    <div className="subtitle">
                      {video.topico} - {video.createdAt}
                    </div>
                  </div>
                ))
              : "Você ainda não possui vídeos favoritados."}
          </div>
        </div>
      )}

      <div className="playlist">
        <div className="playlistTitle">
          <h2 className="topicTitle">Aulões</h2>
          <hr className="line" />
        </div>

        <div className="carosel">
          {videosFormatted.map((video) => (
            <div className="video">
              <div className="thumb">
                <button
                  className="favorite"
                  onClick={(e) => handleFavorite(e, video.id)}
                >
                  {checkIThatVideoIsAfavoriteVideo(video.id)
                    ? "Desfavoritar"
                    : "Favoritar"}
                </button>
              </div>

              <div className="title">{video.nome}</div>
              <div className="subtitle">
                {video.topico} - {video.createdAt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAuthenticated && (
        <div className="playlist">
          <div className="playlistTitle">
            <h2 className="topicTitle">Imersão React</h2>
            <hr className="line" />
          </div>

          <div className="carosel">
            {videosFormatted.map((video) => (
              <div className="video">
                <div className="thumb">
                  <button className="favorite">favorite</button>
                </div>

                <div className="title">{video.nome}</div>
                <div className="subtitle">
                  {video.topico} - {video.createdAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="playlist">
          <div className="playlistTitle">
            <h2 className="topicTitle">Todos os vídeos</h2>
            <hr className="line" />
          </div>

          <div className="carosel">
            {videosFormatted.map((video) => (
              <div className="video">
                <div className="thumb">
                  <button className="favorite">favorite</button>
                </div>

                <div className="title">{video.nome}</div>
                <div className="subtitle">
                  {video.topico} - {video.createdAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
