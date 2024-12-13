import React, { useState, useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/HeaderSearch.module.css";
import TitleIcon from "@mui/icons-material/Title";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomTypography from "./CustomTypography";

function HeaderSearch({ info, setChecked }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
    setChecked(false);
  };

  const [searching, setSearching] = useState("");
  const handleChange = (event) => {
    setSearching(event.target.value);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    document.getElementById("search").focus();
    document.getElementById("search").select();
  }, []);

  const searchTable = [
    {
      name: "Tyler Buxton",
      criteria: ["Tyler Buxton", "About"],
      link: "/about?id=1",
    },
    {
      name: "Locations",
      criteria: [
        "locations",
        "Roanoke, VA",
        "Virginia",
        "New York, NY",
        "NYC",
        "Blacksburg, VA",
        "Nova",
        "DC",
        "D.C.",
        "Washington D.C.",
      ],
      link: "/about?id=1",
    },
    {
      name: "Education",
      criteria: [
        "education",
        "Virginia Tech",
        "Masters",
        "Graduate",
        "Undergraduate",
        "M.S. Thesis Computer Science & Applications May 2025",
        "B.S. Computer Science May 2024",
      ],
      link: "/about?id=2",
    },
    {
      name: "Links",
      criteria: [
        "links",
        "LinkedIn",
        "GitHub",
        "Google Scholar",
        "Email",
        "@tbux",
        "tbux@vt.edu",
        "Tyler Buxton",
        "@tbux408",
      ],
      link: "/about?id=3",
    },
    {
      name: "Skills",
      criteria: [
        "skills",
        "Deployment",
        "Artificial Intelligence",
        "AI",
        "LLM",
        "Frameworks",
        "Back-end",
        "backend",
        "front-end",
        "frontend",
        "front-end languages",
        "backend languages",
        "databases",
        "Docker, Kubernetes, Adminer",
        "OpenAI, Gemini, Ollama",
        "React.js, Next.js, Angular, Vue",
        "Django, Poetry",
        "HTML, CSS, JavaScript, TypeScript",
        "Python, Java",
        "SQL, MariaDB, SQLite, Firebase",
      ],
      link: "/about?id=4",
    },
    {
      name: "Organizations",
      criteria: [
        "organizations",
        "Lambda Chi Alpha",
        "Fraternity",
        "Phi Beta Kappa",
        "🥇 Academic Scholarship Winner",
        "Prestigious academic honor society",
        "groups",
      ],
      link: "/about?id=5",
    },
    {
      name: "Resume",
      criteria: ["Resume", "download"],
      link: "/resume",
    },
    {
      name: "Projects",
      criteria: ["Projects"],
      link: "/projects",
    },
    {
      name: "Gitit",
      criteria: [
        "gitit",
        "Gitit helps students learn core computer science concepts through interactive visualizations. The tools features interactive exercises for Command Line and Git.",
        "Gitit enables the creation of online courses, providing instructors with the ability to assign customized exercises to their students. Instructors can track student progress, offering insights into performance and engagement to better support students' learning.",
        "Instructors can create custom exercises at varying levels of difficulty for their curriculum, enabling them to address specific learning objectives and skill levels. These personalized activities help engage students more effectively and reinforce critical early practical concepts through visual interaction.",
        "Research project",
        "1 client",
        "React Django Docker Kubernetes",
        "JavaScript Python",
      ],
      link: "/projects?id=gitit",
    },
    {
      name: "AI Chatbot",
      criteria: [
        "AI Chatbot",
        "Artificial intelligence",
        "User signup with JWT authentication",
        "AI chatbot designed to implement episodic future thinking cue text generation for the treatment of obesity and type 2 diabetes.",
        "JavaScript Python",
        "EFT",
        "Capstone project",
        "4 person team 1 client",
        "React Quart Ollama OpenAI",
      ],
      link: "/projects?id=chatbot",
    },
    {
      name: "Hotel Scouter",
      criteria: [
        "Optimal property acquisition tool that uses machine learning.",
        "Hotel Scouter",
        "Marriott",
        "Finds all hotels and points of interest in a given area across the United States. Predicts the average price of a room and displays the actual price for easy comparison.",
        "Code Fest Front-end developer",
        "5 person team",
        "React Google Map API",
        "JavaScript HTML CSS",
      ],
      link: "/projects?id=hotelscouter",
    },
    {
      name: "Questle?",
      criteria: [
        "Questle?",
        "Questle? is a reverse 20 questions game powered by AI.",
        "Google Developer Competition",
        "Individual",
        "React Django",
        "JavaScript Python",
      ],
      link: "/projects?id=questle",
    },
    {
      name: "Ride Share",
      criteria: [
        "Ride Share",
        "Lambda Chi Alpha",
        "Allows anyone to safely get a ride from a departure and destination by adding their information to a queue.",
        "Fraternity Project",
        "Vue Django",
        "JavaScript Python",
      ],
      link: "/projects?id=rideshare",
    },
    {
      name: "The Book Warehouse",
      criteria: [
        "The book warehoues",
        "Vue Gradle",
        "JavaScript Python",
        "Individual",
        "JavaScript Java",
      ],
      link: "/projects?id=bookstore",
    },
    {
      name: "Experience",
      criteria: [
        "Experience",
        "2024",
        "Fedex",
        "Comparative Languages",
        "Tracking Students' Perception",
        "🎉 Accepted Publication",
        "Graduate Teaching Assistant",
        "Completed Undergraduate Degree",
        "Software Design & Data Structures",
        "🎉 Started New Program",
        "Fraternity",
        "🎓 Graduated",
        "Software Engineer @ FedEx",
        "2023",
        "2022",
        "2021",
        "Received Official Charter",
        "CEED",
        "Center for the Enhancement of Engineering Diversity",
        "Fall Summer Spring May",
        "Applied Combinatorics",
        "Internship",
        "First Year Student Mentor",
        "Future Engineers Mentor",
        "Started College",
      ],
      link: "/experience",
    },
    {
      name: "Publications",
      criteria: ["Publications", "coming soon..."],
      link: "/publications",
    },
    {
      name: "Time Wasters",
      criteria: ["Time Wasters", "coming soon..."],
      link: "/timewasters",
    },
  ];

  return (
    <div className={styles.display}>
      <div className={styles["search-box"]}>
        <SearchIcon className={styles["search-icon"]} />
        <input
          id={"search"}
          className={styles["search-input"]}
          style={{
            "--text-color": theme.palette.secondary.main,
          }}
          placeholder="Search Tyler Buxton"
          value={searching}
          onChange={handleChange}
        />
        {searching && (
          <CustomTypography
            message={
              <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
            }
            setChecked={() => null}
            setContent={() => null}
            onClick={() => setSearching("")}
            logo={true}
          />
        )}
      </div>

      {searching.length > 2 && (
        <div className={styles.container}>
          Search
          {searchTable
            .filter((i) =>
              i.criteria.some((crit) =>
                crit
                  .replace(/[^a-z0-9]/gi, "")
                  .toLowerCase()
                  .includes(searching.replace(/[^a-z0-9]/gi, "").toLowerCase())
              )
            )
            .map((result, index) => (
              <Typography variant="h6" key={index}>
                <b
                  className={styles.button}
                  onClick={() => handleClick(result.link)}
                >
                  {result.name}
                </b>
              </Typography>
            ))}
          {searchTable.filter((i) =>
            i.criteria.some((crit) =>
              crit
                .replace(/[^a-z0-9]/gi, "")
                .toLowerCase()
                .includes(searching.replace(/[^a-z0-9]/gi, "").toLowerCase())
            )
          ).length < 1 && (
            <Typography variant="h6">
              <b className={styles.button}>No Results</b>
            </Typography>
          )}
        </div>
      )}

      {info.map((e, index) => (
        <div className={styles.container} key={index}>
          {e.title}
          {e.content.map((l, index2) => (
            <Typography variant="h6" key={index2}>
              <b onClick={() => handleClick(l.link)} className={styles.button}>
                {l.name}
              </b>
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HeaderSearch;
