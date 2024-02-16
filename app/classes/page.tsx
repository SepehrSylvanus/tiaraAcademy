"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./classes.module.css";
import {
  Autocomplete,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";
import { CustomClassTextField } from "./styledComponents";
import { retrieveAllClasses, retrieveTeacherName } from "@/actions/actions";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Class } from "@/utils/types";
const page = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachersName, setTeachersName] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  // START FILTER DATA
  const [className, setClassName] = useState("");
  const [whichTeacher, setWhichTeacher] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const teacherNames = await retrieveTeacherName();
      const allClasses = await retrieveAllClasses();
      setTeachersName(teacherNames);
      setClasses(allClasses);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filterData = () => {
    const filteredClasses = classes.filter((item) => item.title !== className);

    setClasses(filteredClasses);
  };

  // END FILTER DATA

  return (
    <div className={styles.container}>
      <div className={styles.classesHeader}>
        <div className={styles.titleContainer}>
          <h4>Tiara Academy</h4>
          <h1>Products</h1>
          <p>Here you can see all of available classes</p>
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <ClassIcon />
            </IconButton>
            <CustomClassTextField
              name="class-name"
              variant="outlined"
              label="Class name"
              onChange={(e) => {
                setClassName(e.target.value);
                console.log(className);
                filterData();
                console.log(classes);
              }}
            />
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <SchoolIcon />
            </IconButton>
            <FormControl fullWidth>
              <CustomClassTextField
                select
                variant="outlined"
                label="Choose your teacher"
              >
                {teachersName.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </CustomClassTextField>
            </FormControl>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className={styles.classesBody}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <CircularProgress sx={{ color: "#81403e" }} />
          </div>
        ) : (
          classes.map((eachClass) => {
            const hours = Math.floor(
              Number(eachClass.duration) / 1000 / 60 / 60
            );
            return eachClass.classInstructors.map((teacher) => (
              <Card key={eachClass.id} className={styles.eachClassCard}>
                {eachClass.img && (
                  <CardMedia
                    title={eachClass.title}
                    sx={{ height: 150 }}
                    image={eachClass.img}
                  />
                )}
                <CardContent className={styles.eachCardContent}>
                  <div className={styles.classDetailsLeft}>
                    <h4>{eachClass.title}</h4>
                    <p>{teacher.instructor.name}</p>
                    <h4>{`${(eachClass.price * 10)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} IRR`}</h4>
                  </div>
                  <div className={styles.classDetailsRight}>
                    <p>{`${hours > 0 ? hours + "hr" : ""} ${
                      (Number(eachClass.duration) / 1000 / 60) % 60
                    } m`}</p>
                  </div>
                </CardContent>
                <CardActions>
                  <BrownLink title="Register" href={`/${eachClass.link}`} />
                </CardActions>
              </Card>
            ));
          })
        )}
      </div>
    </div>
  );
};

export default page;
