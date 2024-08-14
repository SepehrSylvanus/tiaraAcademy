import Link from "next/link";
import styles from "./page.module.css";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Divider, TextField } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CustomHamburger from "@/components/hamburger/CustomHamburger";

import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import ClerkAvatar from "@/components/reusableComponents/ClerkAvatar";
import { getLocale, getMessages } from "next-intl/server";
import { setUserLocale } from "@/services/locale";
import ChangeLocale from "@/components/changeLocale/ChangeLocale";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const message = (await getMessages()) as any;
  const language = await getLocale();
  console.log(message);
  console.log(message.Navbar.language);
  return (
    <div className={`${styles.container} bg-lightPrime `}>
      <section
        className={`${styles.navbar} bg-lightPrime text-extraText flex items-center`}
      >
        <Image
          src={"/logo.jpg"}
          alt={message.logoAlt}
          width={85}
          height={85}
          className="scale-125"
        />
        <div
          className={`${styles.navbarLeft} bg-lightPrime text-lightText items-center`}
        >
          {" "}
          <Link className="text-lightText" href={"#services"}>
            {message.Navbar.services}
          </Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link className="text-lightText" href={"#levels"}>
            {message.Navbar.levels}
          </Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link className="text-lightText" href={"#testimonials"}>
            {message.Navbar.testimonials}
          </Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link className="text-lightText" href={"/hub"}>
            {message.Navbar.enterHub}
          </Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <ChangeLocale />
        </div>
        <div className={`${styles.navbarRight} bg-lightPrime`}>
          <div className=" scale-75 lg:scale-100">
            {token ? (
              <div className=" pt-4 mb-3 gap-8 flex items-center justify-between">
                <Link href={"/hub"} className="brownLink">
                  {message.Navbar.enterHub}
                </Link>

                <div className=" scale-150">
                  <ClerkAvatar />
                </div>
              </div>
            ) : (
              <div className=" mb-3 pt-6 md:pt-0 md:mb-0 ">
                <Link href={"/sign-in"} className="brownLink">
                  {message.Navbar.signInUp}
                </Link>
              </div>
            )}
          </div>
        </div>
        <CustomHamburger navbar={true} sidebar={false} />
      </section>

      <section id="services" className={`${styles.header} bg-lightPrime`}>
        <div className={`${styles.leftHeader} bg-lightPrime text-extraText`}>
          <p
            style={{ marginBottom: "2em", fontWeight: 700 }}
            className=" text-lightText"
          >
            {message.Hero.introduction}
          </p>
          <p className=" text-4xl font-bold md:text-5xl lg:text-6xl">
            <span>{message.Hero.academy}</span>
            <br className="hidden md:block" />
            <span> {message.Hero.smart}</span>
            <br className="hidden md:block" />
            <span>{message.Hero.learning}</span>
          </p>
          <p style={{ marginBottom: "1em" }} className="text-lightText">
            {message.Hero.description}
          </p>
          <div className="flex gap-4 items-center flex-col md:flex-row ">
            <Button className=" cursor-default hover:scale-110 hover:border-lightText border rounded border-lightText bg-transparent text-lightText mb-4">
              <Link href={"#howToUse"}>{message.Hero.seeHowItWorks}</Link>
            </Button>
          </div>
        </div>

        <div className=" hidden md:block">
          <Image
            src="/Online-communication-skills.png"
            alt={message.Hero.introImageAlt}
            width={400}
            height={500}
          />
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section
        id="howToUse"
        className={`${styles.joinCommunity} bg-lightPrime`}
      >
        <div className={styles.joinComLeft}>
          <h4
            style={{ fontWeight: 700, fontSize: 40 }}
            className=" text-extraText text-center w-screen"
          >
            {message.Guidance.guidance}
          </h4>
          <p className="text-center mb-4">{message.Guidance.description}</p>
        </div>
        <div className="hidden md:block mb-4">
          <Image
            src={
              "https://images.pexels.com/photos/8618062/pexels-photo-8618062.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt="Join Community"
            width={400}
            height={400}
          />
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />
      <section className={styles.secondService}>
        <div className="hidden md:block">
          <Image
            src={"/About-Us.png"}
            alt="About us"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.secondServiceRight}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}>
            {message.About.title}
          </p>
          <h4
            style={{ fontWeight: 700, fontSize: 30 }}
            className=" text-extraText"
          >
            {message.About.description}
          </h4>
          <p>{message.About.explain}</p>
          <Link href={"/about"} className="font-bold underline text-extraText">
            {message.About.readMore}
          </Link>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />
      <section className={styles.thirdService}>
        <div className={styles.leftThirdService}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}>
            {message.Contact.title}
          </p>
          <h4
            style={{ fontWeight: 700, fontSize: 30 }}
            className="text-extraText"
          >
            {message.Contact.subtitle}
          </h4>
          <p>{message.Contact.description}</p>
          <Link
            href={"/contact"}
            className="font-bold underline text-extraText"
          >
            {message.Contact.knowMore}
          </Link>
        </div>
        <div className="hidden md:block">
          <Image
            src={"/Contact-us.png"}
            alt="Contact us"
            width={500}
            height={500}
          />
        </div>
      </section>

      <Divider sx={{ margin: "1em 0" }} />
      <section id="levels" className={styles.levels}>
        <div className={styles.leftLevels}>
          <Image
            src={"/User-Account-Sign-up.png"}
            alt="Sign up"
            width={350}
            height={350}
            className={styles.levelsImg}
          />
          <h3
            style={{ fontWeight: 700, fontSize: 30 }}
            className="text-extraText"
          >
            {message.Levels.title}
          </h3>
          <p>{message.Levels.description}</p>
          <Link href={"/sign-up"} className="brownLink w-fit">
            {message.Levels.signUpNow}
          </Link>
        </div>
        <div className={styles.rightLevels}>
          <div className={`${styles.eachLevel}`}>
            <h4>{message.Levels.step1}</h4>
            <p className="flex gap-2 items-center">
              {message.Levels.step1Desc}
              <span className="bg-lightText text-lightPrime px-4 py-2 rounded-md">
                {message.Levels.signUpNow}
              </span>{" "}
              {message.Levels.button}
            </p>
          </div>

          <div className={`${styles.eachLevel}`}>
            <h4>{message.Levels.step2}</h4>
            <p>{message.Levels.step2Desc}</p>
          </div>

          <div className={`${styles.eachLevel}`}>
            <h4>{message.Levels.step3}</h4>
            <p>{message.Levels.step3Desc}</p>
          </div>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section id="testimonials" className={styles.testimonials}>
        <h3
          style={{ fontSize: 40, marginBottom: ".5em" }}
          className="text-extraText"
        >
          {message.Testimonials.title}
        </h3>
        <p>{message.Testimonials.description}</p>
        <div className={styles.commentsContainer}>
          <div
            className={`${styles.eachComment} bg-extraBg text-lightPrime shadow-md rounded-md`}
          >
            <p>
              Since implementing Lando our business has seen significant growth.
            </p>

            <div style={{ display: "flex" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <p>Jack Sibire</p>
            <p>Lead Manager, Growio</p>
          </div>
          <div
            className={`${styles.eachComment} bg-extraBg text-lightPrime shadow-md rounded-md`}
          >
            <p>
              Since implementing Lando our business has seen significant growth.
            </p>

            <div style={{ display: "flex" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <p>Jack Sibire</p>
            <p>Lead Manager, Growio</p>
          </div>
          <div
            className={`${styles.eachComment} bg-extraBg text-lightPrime shadow-md rounded-md`}
          >
            <p>
              Since implementing Lando our business has seen significant growth.
            </p>

            <div style={{ display: "flex" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <p>Jack Sibire</p>
            <p>Lead Manager, Growio</p>
          </div>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section className={`${styles.footer} !bg-lightPrime  `}>
        <div className={`${styles.footerSectionsContainer} bg-lightPrime`}>
          <div className={styles.eachCol}>
            <h4 style={{ fontSize: 30 }} className="text-extraText">
              {message.Footer.tiaraAc}
            </h4>
            <p>{message.Footer.newsLetter}</p>
            <form className={styles.newsletterForm} action="">
              <TextField
                sx={{
                  "&.MuiInputBase-root": {
                    "&.MuiOutlinedInput-root": {
                      borderRadius: 0,
                      borderColor: "black",
                    },
                  },
                }}
              />
              <Button className="border rounded border-black bg-transparent text-black">
                Subscribe
              </Button>
            </form>
          </div>

          <div className={`${styles.eachCol} lg:self-start`}>
            <h5>{message.Footer.websiteMap}</h5>
            <Link href={"/hub/classes"}>{message.Footer.classes}</Link>
            <Link href={"#"}>{message.Footer.writingCenter}</Link>
            <Link href={"#"}>{message.Footer.teachers}</Link>
            <Link href={"#"}>{message.Footer.notes}</Link>
            <Link href={"#"}>{message.Footer.videoCenter}</Link>
          </div>
          <div className={`${styles.eachCol} lg:self-start`}>
            <h5>Follow Us</h5>
            <Link href={"#"}>
              <FacebookIcon />
              Facebook
            </Link>
            <Link href={"#"}>
              <InstagramIcon />
              Instagram
            </Link>
            <Link href={"#"}>
              <XIcon />X
            </Link>
            <Link href={"#"}>
              <LinkedInIcon />
              Linkedin
            </Link>
            <Link href={"#"}>
              <YouTubeIcon />
              Youtube
            </Link>
          </div>
        </div>
        <p className="text-center mt-[1.5em] text-sm">
          {" "}
          © 2024 Tiara Academy. All rights reserved. Content for educational use
          only. Website by Sani Development.
        </p>
      </section>
    </div>
  );
}
