"use client";
import React from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GridViewIcon from "@mui/icons-material/GridView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import EditNoteIcon from "@mui/icons-material/EditNote";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.userContainer}>
        <div className={styles.accountInfo}>
          <Avatar />
          <div className={styles.accountInfoDetails}>
            <span>user's name</span>
            <span>user's email</span>
          </div>
        </div>

        {/* <SignedOut>
          <Link href={"/sign-in"}>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </Link>
        </SignedOut> */}
      </div>

      <div className={styles.iconsContainer}>
        <Link href={"/hub"} className={styles.iconContainer}>
          <GridViewIcon />
          <p className={styles.menuText}>Hub</p>
        </Link>
        <Link href={"/hub/classes"} className={styles.iconContainer}>
          <AccessTimeIcon />
          <p className={styles.menuText}>Classes</p>
        </Link>
        <Link href={"/hub/writing"} className={styles.iconContainer}>
          <EditNoteIcon />
          <p className={styles.menuText}>Writing</p>
        </Link>
        <Link href={"/hub/teachers"} className={styles.iconContainer}>
          <PeopleIcon />
          <p className={styles.menuText}>Teachers</p>
        </Link>
        <Link href={"/hub/blogs"} className={styles.iconContainer}>
          <NoteAltIcon />
          <p className={styles.menuText}>Blog</p>
        </Link>
        <Link href={"/hub/videos"} className={styles.iconContainer}>
          <OndemandVideoIcon />
          <p className={styles.menuText}>Videos</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
