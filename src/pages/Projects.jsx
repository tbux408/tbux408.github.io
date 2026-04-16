import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import CardPicture from "../components/CardPicture";
import ProjectBox from "../components/ProjectBox";

function Projects() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const params = new URLSearchParams(location.search);
    const elementId = params.get("id");
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [location.search]);

  const openLink = (url) => window.open(url, "_blank");

  const LinkButton = ({ url }) => (
    <button
      onClick={() => openLink(url)}
      className="p-2 rounded-xl bg-raised border border-line text-fg-dim hover:text-fg hover:border-line-hi transition-all"
      title="Open link"
    >
      <ExternalLink size={16} />
    </button>
  );

  const project1 = {
    title: "Gitit",
    id: "gitit",
    role: ["Research project"],
    collab: ["1 client"],
    tools: ["React", "Django", "Docker", "Kubernetes"],
    languages: ["JavaScript", "Python"],
    link: <LinkButton url="https://visualizations.endeavour.cs.vt.edu" />,
    cards: [
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/projviz.png"
            alt="Gitit visualization"
          />
        }
        description="Gitit is an innovative tool designed to help students master core computer science concepts with engaging, interactive visualizations. Featuring hands-on exercises for Command Line and Git."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/viz2.png"
            alt="Gitit visualization 2"
          />
        }
        description="Gitit empowers educators to create dynamic online courses with personalized exercises. Instructors can track progress and gain valuable insights into student performance and engagement."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/viz3.png"
            alt="Gitit visualization 3"
          />
        }
        description="Instructors can create custom exercises at varying difficulty levels. Gitit also offers a rich database of pre-created exercises, making it easy for anyone to start learning."
        
      />,
    ],
  };

  const project2 = {
    title: "AI Chatbot",
    id: "chatbot",
    role: ["Capstone project"],
    collab: ["4 person team", "1 client"],
    tools: ["React", "Quart", "Ollama", "OpenAI"],
    languages: ["JavaScript", "Python"],
    link: (
      <LinkButton url="https://vtechworks.lib.vt.edu/server/api/core/bitstreams/11516088-01bd-4923-8adc-b3c83212579f/content" />
    ),
    cards: [
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/eft1.PNG"
            alt="AI Chatbot 1"
          />
        }
        description="Seamless signup process with JSON Web Token (JWT) authentication for secure, scalable access."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/eft2.PNG"
            alt="AI Chatbot 2"
          />
        }
        description="An AI Chatbot implementing episodic future thinking (EFT) cue text generation to support treatment of obesity and type 2 diabetes using OpenAI LLMs."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/eft4.PNG"
            alt="AI Chatbot 3"
          />
        }
        description="Comprehensive usability assessments based on the System Usability Scale (SUS) to gather feedback and refine the chatbot experience."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/eft3.PNG"
            alt="AI Chatbot 4"
          />
        }
        description=""
        
      />,
    ],
  };

  const project3 = {
    title: "Hotel Scouter",
    id: "hotelscouter",
    role: ["Code Fest", "Front-end developer"],
    collab: ["5 person team"],
    tools: ["React", "Google Maps API"],
    languages: ["JavaScript", "HTML", "CSS"],
    link: <LinkButton url="https://github.com/tbux408/marriott" />,
    cards: [
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/Slide1.PNG"
            alt="Hotel Scouter 1"
          />
        }
        description="Advanced property acquisition tool using ML to optimize investment decisions. Provides Marriott executives with ranked location recommendations based on average daily rates and proximity to attractions."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/Slide2.PNG"
            alt="Hotel Scouter 2"
          />
        }
        description="Identifies hotels and nearby points of interest within a specified area. Predicts average daily room rates and compares them to actual prices for informed acquisition decisions."
        
      />,
    ],
  };

  const project4 = {
    title: "Questle?",
    id: "questle",
    role: ["Google Developer Competition"],
    collab: ["Individual"],
    tools: ["React", "Django"],
    languages: ["JavaScript", "Python"],
    link: <LinkButton url="https://youtu.be/pocbUB50fsM?si=4YmFRULLfVAeRbYH" />,
    cards: [
      <CardPicture
        pic={
          <iframe
            className="w-full h-56"
            src="https://www.youtube.com/embed/pocbUB50fsM?si=etIZgamugKHyT6WU"
            title="Questle demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        }
        description="A reverse 20 Questions game powered by Google Gemini. Each day, players guess the word of the day by asking strategic yes-or-no questions — blending classic gameplay with modern Wordle-style design."
        
      />,
    ],
  };

  const project5 = {
    title: "Ride Share",
    id: "rideshare",
    role: ["Fraternity Project"],
    collab: ["Individual project"],
    tools: ["Vue", "Django"],
    languages: ["JavaScript", "Python"],
    link: null,
    cards: [
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/drive1.png"
            alt="Ride Share 1"
          />
        }
        description="Lambda Drive — a fraternity management system with a secure ride-sharing queue. Users enter departure and destination details, prioritizing safety and efficient transportation."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/drive2.png"
            alt="Ride Share 2"
          />
        }
        description="Calendar system for event planning. Admins can create events and assign responsibilities to members, ensuring clear communication within the organization."
        
      />,
    ],
  };

  const project6 = {
    title: "The Book Warehouse",
    id: "bookstore",
    role: ["Course project"],
    collab: ["Individual"],
    tools: ["Vue", "Gradle"],
    languages: ["JavaScript", "Java"],
    link: null,
    cards: [
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/bookstore1.png"
            alt="Book Warehouse 1"
          />
        }
        description="A fully functional bookstore with an integrated database. Users can explore books across categories, add items to a cart, and complete checkout seamlessly."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/bookstore2.png"
            alt="Book Warehouse 2"
          />
        }
        description=""
        
      />,
    ],
  };

  const projectEmpower = {
    title: "Empower",
    id: "empower",
    role: ["Personal project"],
    collab: ["Individual"],
    tools: [
      "React",
      "TypeScript",
      "TanStack Router",
      "React Query",
      "Tailwind CSS",
      "Fastify",
      "oRPC",
      "AWS DynamoDB",
      "Clerk",
      "Stripe",
    ],
    languages: ["TypeScript"],
    link: null,
    cards: [
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/empower/calendar.png"
            alt="Empower calendar"
          />
        }
        description="A multi-tenant scheduling platform with calendar-based weekly scheduling designed to scale across unlimited tenant companies. Admins can view and manage their team's full schedule at a glance."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/empower/CalendarManager.png"
            alt="Empower calendar manager"
          />
        }
        description="Admin dashboard for managing employee schedules. Supports drag-and-drop shift assignment, conflict detection, and per-employee availability preferences."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/empower/ScheduleTimeOff.png"
            alt="Empower time-off management"
          />
        }
        description="Employees can submit time-off requests directly from the platform. Admins review, approve, or deny requests with full audit history — all synced to the live schedule."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/empower/moreCalendar.png"
            alt="Empower calendar detail"
          />
        }
        description="Built as a full-stack monorepo with 20+ type-safe API routes via Fastify and oRPC, backed by AWS DynamoDB. Secured with Clerk authentication, role-based authorization, and Stripe payment integration."
      />,
    ],
  };

  const projectMeals = {
    title: "Meals",
    id: "meals",
    role: ["Personal project"],
    collab: ["Individual"],
    tools: ["React", "Django", "Gemini AI", "JWT"],
    languages: ["JavaScript", "Python"],
    link: <LinkButton url="https://meals.tylerbuxton.com" />,
    cards: [
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/_meals/loginPage.png"
            alt="Meals login"
          />
        }
        description="A personal meal planning app hosted at meals.tylerbuxton.com. Secured with JWT token-based authentication — users sign in to access their private meal plans and grocery data."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/_meals/mealsPage.png"
            alt="Meals planning page"
          />
        }
        description="Plan weekly meals, browse saved recipes, and stay organized. Each meal is linked to its ingredients, automatically feeding into the grocery list."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/_meals/editPage.png"
            alt="Meals edit page"
          />
        }
        description="Create and edit recipes with a clean editor. Ingredients, instructions, and serving sizes are stored and tied to meal plans for easy scheduling."
      />,
      <CardPicture
        pic={
          <img
            className="w-full h-48 object-cover"
            src="/_meals/groceryList.png"
            alt="Meals grocery list"
          />
        }
        description="Generates a smart grocery list from planned meals. Google Gemini automatically groups items by category (produce, dairy, pantry, etc.), saving time at the store."
      />,
    ],
  };

  const projects = [
    projectEmpower,
    projectMeals,
    project1,
    project2,
    project3,
    project4,
    project5,
    project6,
  ];

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="px-6 pt-8 pb-4 border-b border-line">
          <h1 className="text-3xl font-bold text-fg tracking-tight">
            Projects
          </h1>
          <p className="text-fg-dim mt-1 text-sm">
            A selection of research, academic, and personal projects.
          </p>
        </div>
        {projects.map((project) => (
          <ProjectBox key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
