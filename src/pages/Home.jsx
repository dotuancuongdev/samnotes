import React from "react";
import { handleLogOut } from "../helper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";
import DescriptionIcon from "@mui/icons-material/Description";
import ErrorIcon from "@mui/icons-material/Error";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import "../App.css";
import "../bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const customTime = (lastDate) => {
  const milliseconds = Math.floor(new Date() - new Date(lastDate));

  let sec = Math.floor(milliseconds / 1000);
  let min = Math.floor(sec / 60);
  if (!min) return sec + "seconds ago";
  let hour = Math.floor(min / 60);
  if (!hour) return min + " minutes ago";
  let day = Math.floor(hour / 24);
  if (!day) return hour + " hours ago";
  return day + " days ago";
};

const Mybox = styled(Box)({
  textAlign: "center",
  fontSize: "50px",
  fontWeight: "700",
  marginBottom: "30px",
});
const Home = () => {
  const [informations, setInformation] = useState(null);
  const [newNotes, setLastPublicNote] = useState(null);
  const [newUsers, setNewUser] = useState(null);
  const [userOnline, setUserOnline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canRefresh, setCanRefresh] = useState(true);

  const getProfile = async () => {
    try {
      const res = await axios(`https://samnote.mangasocial.online/numbernote`);
      setInformation(res.data.data);
      console.log("uihuhreuhrehcerh", res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Kết thúc quá trình tải
    }
  };

  const getLastPublicNote = async () => {
    try {
      const res = await axios(
        `https://samnote.mangasocial.online/notes_public`
      );
      setLastPublicNote(res.data.public_note);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserOnline = async () => {
    try {
      const res = await axios(
        `https://samnote.mangasocial.online/users-online`
      );
      setUserOnline(res.data.users);
      console.log(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const getNewUser = async () => {
    try {
      const res = await axios(`https://samnote.mangasocial.online/lastUser`);
      setNewUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = () => {
    if (canRefresh) {
      setLoading(true); // Bắt đầu quá trình tải
      setCanRefresh(false); // Chặn việc nhấn Refresh trong 5 giây
      setTimeout(() => {
        setCanRefresh(true); // Cho phép nhấn Refresh sau khi đã chờ 5 giây
      }, 5000); // Thời gian chờ 5 giây
      setTimeout(() => {
        getProfile();
      }, 1000); // Tự động tải lại sau 5 giây
    }
  };

  useEffect(() => {
    getProfile();
    getLastPublicNote();
    getNewUser();
    getUserOnline();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const mdScreen = useMediaQuery("(max-width:767px)");
  return (
    <Box sx={{ padding: "0 20%" }}>
      <header
        style={{
          display: "flex",
          height: "70px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="../public/logo.png"
            alt="logo"
            style={{ width: "32px", height: "32px", marginRight: "20px" }}
          />
          <Typography color="text.primary">SAMNOTES</Typography>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ul
            className="nav-main"
            style={
              mdScreen
                ? {
                    display: isOpen ? "block" : "none",
                    flexDirection: "column",
                    position: "absolute",
                    top: "70px",
                    borderRadius: "10px",
                    right: "10px",
                    backgroundColor: "#323436",
                    padding: "20px 30px",
                  }
                : { display: "flex", marginBottom: "0px" }
            }
          >
            <li
              style={
                mdScreen
                  ? { color: "#fff", padding: "10px 0px" }
                  : { whiteSpace: "nowrap", fontSize: "14px" }
              }
            >
              Manager My Note
            </li>
            <li
              style={
                mdScreen
                  ? { color: "#fff", padding: "10px 0px" }
                  : {
                      whiteSpace: "nowrap",
                      margin: "0 10px",
                      fontSize: "14px",
                    }
              }
            >
              Contact Us
            </li>
            <li
              style={
                mdScreen
                  ? { color: "#fff", padding: "10px 0px" }
                  : { whiteSpace: "nowrap", fontSize: "14px" }
              }
            >
              Help
            </li>
            <li
              style={
                mdScreen
                  ? { color: "#fff", padding: "10px 0px" }
                  : {
                      whiteSpace: "nowrap",
                      margin: "0 10px",
                      fontSize: "14px",
                    }
              }
            >
              Blog
            </li>
            <li
              style={
                mdScreen
                  ? { color: "#fff", padding: "10px 0px" }
                  : { whiteSpace: "nowrap", fontSize: "14px" }
              }
            >
              Support Forum
            </li>
            <li
              style={
                mdScreen
                  ? { color: "#fff", padding: "10px 0px" }
                  : {
                      whiteSpace: "nowrap",
                      margin: "0 10px",
                      fontSize: "14px",
                    }
              }
            >
              Login
            </li>
          </ul>
          <div onClick={toggleMenu}>
            {isOpen ? (
              <ClearIcon
                sx={{
                  color: "mycolor.main",
                  cursor: "pointer",
                  display: "none",
                }}
                className="menu-mobile"
              />
            ) : (
              <MenuIcon
                sx={{
                  color: "mycolor.main",
                  cursor: "pointer",
                  display: "none",
                }}
                className="menu-mobile"
              />
            )}
          </div>
        </div>
      </header>
      <main>
        {" "}
        <Mybox component="h2">
          The simplest way to <br></br>
          keep notes
        </Mybox>
        <p style={{ marginBottom: "30px", textAlign: "center" }}>
          All your notes, synced on all your devices. Get Samnotes now for iOS,
          Android or in your browser.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              padding: "10px 20px",
              alignItems: "center",
              display: "flex",
              marginBottom: "30px",
            }}
            variant="contained"
          >
            Create Public Notes
          </Button>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to left,    rgba(113, 236, 70, 0.64),    rgba(233, 15, 237, 0.35)  )",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                height: "60px",
                width: "105px",
                borderRadius: "10px",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
                marginBottom: "10px",
              }}
            >
              Member
            </Box>
            <Box
              onClick={handleRefresh}
              sx={{
                height: "60px",
                width: "105px",
                borderRadius: "10px",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: "#fff",
                marginBottom: "10px",
              }}
            >
              Refresh
            </Box>
          </div>
          <div>
            {loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              informations &&
              informations.map((info, index) => (
                <div
                  key={index}
                  style={{
                    margin: "0px 0px",
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    fontSize: "20px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    borderBottom: "1px dotted #000",
                    backgroundColor: "#fff",
                  }}
                >
                  <p style={{ margin: 0, width: "5%" }}>{index + 1}</p>
                  <Link
                    to={`/user/profile/${info.idUser}`}
                    style={{ width: "10%" }}
                  >
                    <Avatar
                      src={info.Avatar}
                      alt="Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                  <p
                    style={{
                      margin: 0,
                      width: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {info.name}
                  </p>
                  <p style={{ margin: 0, width: "15%", textAlign: "end" }}>
                    {info.nbnote} notes
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <Box
          component="hr"
          sx={{
            height: "1px",
            borderRadius: "5px",
            backgroundColor: "text.primary",
          }}
        ></Box>
        <h5 style={{ fontSize: "24px", marginTop: "40px" }}>
          Lastest Public Notes
        </h5>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right,    rgba(113, 236, 70, 0.64),    rgba(233, 15, 237, 0.35)  )",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {newNotes?.map((item, index) => (
            <div
              key={index}
              style={{
                fontSize: "20px",
                display: "flex",
                backgroundColor: "#fff",
                padding: "10px 10px",
                borderBottom: "1px dotted #000",
              }}
            >
              <div
                style={{
                  width: "5%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  width: "15%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.type}
              </div>
              <div
                style={{
                  width: "30%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  width: "20%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {customTime(item.update_at)}
              </div>
              <div
                style={{
                  width: "30%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.author}
              </div>
            </div>
          ))}
        </div>
        <Box
          component="hr"
          sx={{
            height: "1px",
            borderRadius: "5px",
            backgroundColor: "text.primary",
          }}
        ></Box>
        <h5 style={{ fontSize: "24px", marginTop: "40px" }}>New Users</h5>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right,    rgba(113, 236, 70, 0.44),    rgba(233, 15, 237, 0.15)  )",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {newUsers?.map((item, index) => (
            <div
              key={index}
              style={{
                fontSize: "20px",
                display: "flex",
                backgroundColor: "#fff",
                padding: "10px 10px",
                borderBottom: "1px dotted #000",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "5%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {index + 1}
              </div>
              <div style={{ width: "10%" }}>
                <Avatar
                  src={item.linkAvatar}
                  alt="Avatar"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div
                style={{
                  width: "35%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  width: "20%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {customTime(item.createAt)}
              </div>
              <div
                style={{
                  width: "30%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.gmail}
              </div>
            </div>
          ))}
        </div>
        <Box
          component="hr"
          sx={{
            height: "1px",
            borderRadius: "5px",
            backgroundColor: "text.primary",
          }}
        ></Box>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to top,    rgba(113, 236, 70, 0.64),    rgba(233, 15, 237, 0.35)  )",
            padding: "60px 40px 40px",
            borderRadius: "10px",
            marginTop: "50px",
          }}
        >
          <span style={{ fontSize: "20px" }}>Online</span>
          {userOnline !== null ? (
            userOnline?.map((item, index) => (
              <div
                key={index}
                style={{
                  fontSize: "20px",
                  display: "flex",
                  backgroundColor: "#fff",
                  padding: "10px 10px",
                  borderBottom: "1px dotted #000",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "15%" }}>
                  <Avatar
                    src={item.url_avatar}
                    alt="Avatar"
                    sx={{ width: "50px", height: "50px" }}
                  />
                </div>

                <div
                  style={{
                    width: "65%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.user_name}
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Online
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "20px",
                      backgroundColor: "rgb(14 152 198)",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có người dùng nào đang online</p>
          )}
        </div>
        <Box
          component="hr"
          sx={{
            height: "1.5px",
            borderRadius: "5px",
            backgroundColor: "text.primary",
          }}
        ></Box>
        <section>
          <Mybox>Comprehensive underneath, simple on the surface</Mybox>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-12">
                <Box sx={{ display: "flex" }}>
                  <CloudIcon
                    sx={{ color: "mycolor.main", marginRight: "5px" }}
                  />
                  <h5>Use it everywhere</h5>
                </Box>
                <Box component="p" sx={{ color: "text.disabled" }}>
                  Notes stay updated across all your devices, automatically and
                  in real time. There's no “sync” button: It just works.
                </Box>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <Box sx={{ display: "flex" }}>
                  <LocalOfferIcon
                    sx={{ color: "mycolor.main", marginRight: "5px" }}
                  />
                  <h5>Stay organized</h5>
                </Box>
                <Box component="p" sx={{ color: "text.disabled" }}>
                  Add tags to find notes quickly with instant searching.
                </Box>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <Box sx={{ display: "flex" }}>
                  <PeopleIcon
                    sx={{ color: "mycolor.main", marginRight: "5px" }}
                  />

                  <h5>Work together</h5>
                </Box>
                <Box component="p" sx={{ color: "text.disabled" }}>
                  Share a to-do list, post some instructions, or publish your
                  notes online.
                </Box>
              </div>

              <div className="col-lg-4 col-sm-6 col-12">
                <Box sx={{ display: "flex" }}>
                  <HistoryIcon
                    sx={{ color: "mycolor.main", marginRight: "5px" }}
                  />
                  <h5>Go back in time</h5>
                </Box>
                <Box component="p" sx={{ color: "text.disabled" }}>
                  Share a to-do list, post some instructions, or publish your
                  notes online.
                </Box>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <Box sx={{ display: "flex" }}>
                  <DescriptionIcon
                    sx={{ color: "mycolor.main", marginRight: "5px" }}
                  />
                  <h5>Markdown support</h5>
                </Box>
                <Box component="p" sx={{ color: "text.disabled" }}>
                  Share a to-do list, post some instructions, or publish your
                  notes online.
                </Box>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <Box sx={{ display: "flex" }}>
                  <ErrorIcon
                    sx={{ color: "mycolor.main", marginRight: "5px" }}
                  />
                  <h5>It's free</h5>
                </Box>
                <Box component="p" sx={{ color: "text.disabled" }}>
                  Share a to-do list, post some instructions, or publish your
                  notes online.
                </Box>
              </div>
            </div>
          </div>
        </section>
        <section className="saying">
          <Mybox>What people are saying</Mybox>
          <div className="container">
            <div className="row">
              <div
                className="col-sm-4"
                style={{
                  position: "relative",
                  height: "fit-content",
                  marginBottom: "20px",
                }}
              >
                <p>If you're not using Samnotes, you're missing out.</p>
                <Box
                  component="span"
                  sx={{ color: "text.disabled", fontStyle: "italic" }}
                >
                  TechCrunch
                </Box>
              </div>
              <div
                className="col-sm-4"
                style={{
                  position: "relative",
                  height: "fit-content",
                  marginBottom: "20px",
                }}
              >
                <p>
                  If you're looking for a cross-platform note-taking tool with
                  just enough frills, it's hard to look beyond Samnotes.
                </p>
                <Box
                  component="span"
                  sx={{ color: "text.disabled", fontStyle: "italic" }}
                >
                  MacWorld
                </Box>
              </div>
              <div
                className="col-sm-4"
                style={{
                  position: "relative",
                  height: "fit-content",
                  marginBottom: "20px",
                }}
              >
                <p>
                  If you want a truly distraction-free environment then you
                  can't do better than Samnotes for your note-taking needs do
                  better than Samnotes for your note-taking needs.
                </p>
                <Box
                  component="span"
                  sx={{ color: "text.disabled", fontStyle: "italic" }}
                >
                  Zapier
                </Box>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Mybox>Available on all your devices</Mybox>
          <Box
            component="p"
            sx={{
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Download Samnotes for any device and stay in
            <br></br>sync - all the time, everywhere.
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <Button
                sx={{
                  bgcolor: "mycolor.dark",
                  color: "text.primary",
                  border: "1px solid",
                  borderColor: "text.primary",
                  padding: "10px 15px",
                  height: "65px",
                  width: "235px",
                  margin: "20px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                <AppleIcon />
                <div>
                  <p style={{ margin: 0 }}>Download on the </p>
                  <p style={{ margin: 0 }}>App Store</p>
                </div>
              </Button>
            </div>
            <Button
              sx={{
                bgcolor: "mycolor.dark",
                color: "text.primary",
                border: "1px solid",
                borderColor: "text.primary",
                textTransform: "none",
                padding: "10px 15px",
                height: "65px",
                fontSize: "16px",
                width: "235px",
                margin: "20px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <AndroidIcon />
              <div>
                <p style={{ margin: 0 }}>Download on the </p>
                <p style={{ margin: 0 }}>Google play</p>
              </div>
            </Button>
          </div>
        </section>
      </main>
      <footer style={{ marginTop: "60px" }}>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "0",
          }}
        >
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a> Contact Us</a>
          </li>
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a>Help</a>
          </li>
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a>Blog</a>
          </li>
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a>Developers</a>
          </li>
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a>Term & Conditions</a>
          </li>
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a>Privacy</a>
          </li>
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a>Press</a>
          </li>
          <li
            style={{ margin: "0 10px", whiteSpace: "nowrap", fontSize: "14px" }}
          >
            <a>Privacy Notice for California Users</a>
          </li>
        </ul>
      </footer>
      <p style={{ textAlign: "center", padding: "20px 0" }}>© Automatic</p>
    </Box>
  );
};

export default Home;
