"use client";

import { Button } from "@/components/ui/button";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  deleteCategory,
  deletePlaylist,
  makeArticle,
  makeCategories,
  makePlaylist,
  postVideo,
} from "@/actions/actions";
import { toast } from "react-toastify";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import styles from "./components.module.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Add, Delete } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetPlaylists } from "@/hooks/usePlayList";
import { Type } from "@prisma/client";
import { useGetCategory } from "@/hooks/useCategory";
import { useTranslations } from "next-intl";

const CreateVideo = ({ title }: { title: string }) => {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState<string>();
  const [playlistType, setPlaylistType] = useState<Type>("public");
  const [playlistPrice, setPlaylistPrice] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const t = useTranslations("videoBox");
  const handlePlaylistChange = (e: SelectChangeEvent<string[]>) => {
    const selectedPlaylists = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];

    setPlaylist(selectedPlaylists);
  };
  const { data: playlists } = useGetPlaylists();
  console.log(playlist);
  const { data: categories } = useGetCategory();
  useEffect(() => {
    console.log(playlistDescription);
  }, [playlistDescription]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      title,
      type,
      price,
      description,
    }: {
      title: string;
      type: Type;
      price: string;
      description: string;
    }) => makePlaylist(title, type, price, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPlaylist"] });
      toast.success(t("newPlaylist"));
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (title: string) => deletePlaylist(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPlaylist"] });
      toast.success(t("playlistDelete"));
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  const deleteCatMutation = useMutation({
    mutationFn: async (title: string) => await deleteCategory(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategory"] });
      toast.success(t("categoryDeleted"));
    },
  });
  const createCatMutation = useMutation({
    mutationFn: ({ title }: { title: string }) => makeCategories(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategory"] });
      toast.success(t("categoryAdded"));
    },
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    console.log(formData);
    console.log(title);
    formData.set("caption", caption);
    const myCaption = formData.get("caption");

    console.log(myCaption);
    try {
      if (title === "video") {
        console.log("here");

        await postVideo(formData);
        toast.success(`-${title}- ${t("uploadedSuccess")}`);
      } else if (title === "article") {
        await makeArticle(formData);
        console.log(formData);
        toast.success(`-${title}- ${t("uploadedSuccess")}`);
      }
    } catch (error) {
      toast.error(t("videoUpError") + error);
    } finally {
      setLoading(false);
    }
  };
  const handleMakePlayList = () => {
    if (playlistTitle) {
      const playlistData = {
        title: playlistTitle,
        type: playlistType!,
        price: playlistPrice,
        description: playlistDescription,
      };
      if (title === "video") {
        mutation.mutate(playlistData);
      } else {
        createCatMutation.mutate(playlistData);
      }
    } else {
      console.error("Playlist title is undefined.");
    }
  };
  const handleDeletePlayList = () => {
    if (playlistTitle && title === "video") {
      deleteMutation.mutate(playlistTitle);
    } else if (title === "article") {
      deleteCatMutation.mutate(playlistTitle!);
    } else {
      console.error("There is error in deletion");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        className="formInput w-full"
        placeholder={t("title")}
        name="title"
      />
      <input
        className="formInput w-full "
        type="file"
        placeholder={t("articleTitle")}
        name={title === "video" ? "video" : "image"}
        accept={title === "video" ? ".mp4, .mkv" : ".jpg, .jpeg, .png"}
      />
      <div className="formInput flex items-center">
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder={`${t("addANew")} ${
              title === "video" ? t("playlist") : t("category")
            } ${t("thenChoose")}`}
            className="w-full bg-transparent border-none outline-none"
            onChange={(e) => setPlaylistTitle(e.target.value)}
          />
          {title === "video" && (
            <div>
              <RadioGroup
                row
                defaultValue={playlistType}
                onChange={(e) => {
                  if (
                    e.target.value === "private" ||
                    e.target.value === "public"
                  ) {
                    setPlaylistType(e.target.value);
                  }
                }}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label={t("public")}
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label={t("private")}
                />
              </RadioGroup>
              {playlistType === "private" && (
                <input
                  type="text"
                  placeholder={t("price")}
                  name=""
                  id=""
                  className="w-full bg-transparent border-none outline-none"
                  onChange={(e) => setPlaylistPrice(e.target.value)}
                />
              )}
            </div>
          )}

          {title === "video" && (
            <input
              type="text"
              name="description"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              placeholder={t("description")}
              className="w-full bg-transparent border-none outline-none border-trans"
            />
          )}
        </div>
        <div
          onClick={handleDeletePlayList}
          className=" hover:scale-125 transition cursor-pointer"
        >
          <Delete />
        </div>
        <div
          onClick={handleMakePlayList}
          className=" hover:scale-125 transition cursor-pointer"
        >
          <Add />
        </div>
      </div>

      <FormControl>
        <InputLabel
          classes={{
            focused: styles.selectLabel,
          }}
          id="playlist"
        >
          {title === "video" ? t("Playlist") : t("Category")}
        </InputLabel>

        <Select
          defaultValue={playlist}
          onChange={handlePlaylistChange}
          label={t("selectPlaylist")}
          name="playlists"
          sx={{ backgroundColor: "#c6d9e6", textAlign: "start" }}
        >
          {title === "video" &&
            playlists?.map((playlist) => (
              <MenuItem key={playlist.value} value={playlist.value}>
                {playlist.title}
              </MenuItem>
            ))}

          {title === "article" &&
            categories?.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <CKEditor
        editor={ClassicEditor}
        data={
          title === "video"
            ? `<p>${t("eraseWrite")} ❤️</p>`
            : `<p>${t("eraseWriteArticle")} ❤️</p> `
        }
        onChange={(event, editor) => {
          console.log(editor.getData());
          setCaption(editor.getData());
        }}
      />
      {loading ? (
        <Button disabled type="submit">
          <CircularProgress sx={{ color: "white", transform: "scale(.7)" }} />
        </Button>
      ) : (
        <Button type="submit">{t("create")}</Button>
      )}
    </form>
  );
};

export default CreateVideo;
