import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { handleLogOut } from "../helper";
import { SketchPicker } from "react-color";
import DatePicker from "react-datepicker";
import api from "../api";

const navbarItems = [
  {
    name: "Home Page",
    icon: <HomeIcon />,
    url: "/user",
  },
  {
    name: "Photos",
    icon: <PhotoLibraryIcon />,
  },
  {
    name: "Note",
    icon: <EventNoteIcon />,
    url: "/user/note",
  },
  {
    name: "Group",
    icon: <GroupIcon />,
  },
  {
    name: "Dustbin",
    icon: <DeleteIcon />,
  },
  {
    name: "Sketch",
    icon: <DriveFileRenameOutlineIcon />,
  },
];
const types = ["Text", "CheckList"];
const notePublicOptions = [0, 1];

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};

export const UserPanel = () => {
  const [type, setType] = useState("Text");
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [idFolder, setIdFolder] = useState("");
  const [dueAt, setDueAt] = useState(null);
  const [pinned, setPinned] = useState(false);
  const [lock, setLock] = useState("");
  const [remindAt, setRemindAt] = useState(null);
  const [linkNoteShare, setLinkNoteShare] = useState("");
  const [notePublic, setNotePublic] = useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const appContext = useContext(AppContext);
  const { user, setUser, setSnackbar } = appContext;

  const navigate = useNavigate();

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleClose() {
    setDisplayColorPicker(false);
  }

  function handleChange(color) {
    setColor(color.rgb);
  }

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleChangeNotePublic = (e) => {
    setNotePublic(e.target.value);
  };

  const handleSubmit = () => {
    let idFolderNumber;
    if (idFolder === "") {
      idFolderNumber = 0;
    } else {
      idFolderNumber = parseInt(idFolder);
    }
    const parsedColor = {
      r: parseInt(color.r),
      g: parseInt(color.g),
      b: parseInt(color.b),
      a: parseInt(color.a),
    };
    const payload = {
      type,
      data,
      title,
      color: parsedColor,
      idFolder: idFolderNumber,
      dueAt: JSON.parse(JSON.stringify(dueAt)),
      pinned,
      lock,
      remindAt: JSON.parse(JSON.stringify(remindAt)),
      linkNoteShare,
      notePublic,
    };
    const postNewNote = async () => {
      try {
        await api.post(`/notes/${user.id}`, payload);
        console.log(`https://samnote.mangasocial.online/notes/${user.id}`);
        setSnackbar({
          isOpen: true,
          message: "Created new note succesfully",
          severity: "success",
        });
      } catch (err) {
        console.log(err);
      }
    };
    postNewNote();
  };

  return (
    <>
      {user && (
        <Box className="flex pl-[320px]">
          <Box
            className={`w-[320px] min-h-screen bg-[#1D1D1D] text-white p-8 fixed top-0 left-0`}
          >
            <Box className="flex items-center justify-between mb-10">
              <Box
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => navigate(`/user/profile`)}
              >
                <img
                  src={user.AvtProfile}
                  alt=""
                  className="rounded-full w-12"
                />
                <Typography className="text-2xl">{user.name}</Typography>
              </Box>
              <SettingsIcon
                fontSize="large"
                className="cursor-pointer"
                onClick={() => navigate(`/user/setting`)}
              />
            </Box>

            <Box className="flex items-end text-white mb-10">
              <SearchIcon className="mr-1 my-1" />
              <TextField
                id="input-with-sx"
                label="Search messenger"
                variant="standard"
                sx={{ input: { color: "white" } }}
                InputLabelProps={{ color: "info" }}
              />
            </Box>

            <Box>
              <Button
                variant="contained"
                className="bg-[#5BE260] rounded-full w-full mb-12"
                onClick={() => setOpenModal(true)}
              >
                <NoteAddIcon className="text-blue-500" />
                <Typography>new</Typography>
              </Button>
              <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleModal}>
                  <RemoveIcon
                    className="absolute top-4 right-5 p-1 cursor-pointer  hover:text-red-500"
                    onClick={() => setOpenModal(false)}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      position: "relative",
                    }}
                  >
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        size="small"
                        value={type}
                        onChange={handleChangeType}
                      >
                        {types.map((type, idx) => {
                          return (
                            <MenuItem key={idx} value={type}>
                              {type}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {type === "Text" ? (
                      <TextField
                        label="Data"
                        size="small"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                      />
                    ) : (
                      <>checklist</>
                    )}
                    <TextField
                      label="Title"
                      size="small"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div
                      style={{
                        padding: "5px",
                        background: "#fff",
                        borderRadius: "1px",
                        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "14px",
                          borderRadius: "2px",
                          background: ` rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                        }}
                      />
                    </div>
                    {displayColorPicker ? (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "2",
                        }}
                      >
                        <div
                          style={{
                            position: "fixed",
                            top: "0px",
                            right: "0px",
                            bottom: "0px",
                            left: "0px",
                          }}
                          onClick={handleClose}
                        />
                        <SketchPicker color={color} onChange={handleChange} />
                      </div>
                    ) : null}
                    <TextField
                      label="idFolder"
                      size="small"
                      type="number"
                      value={idFolder}
                      onChange={(e) => setIdFolder(e.target.value)}
                    />
                    <DatePicker
                      selected={dueAt}
                      onChange={(date) => setDueAt(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                    <FormControlLabel
                      label="Pinned"
                      control={
                        <Checkbox
                          value={pinned}
                          onChange={(e) => setPinned(e.target.checked)}
                        />
                      }
                    />
                    <TextField
                      label="Lock"
                      size="small"
                      type="password"
                      value={lock}
                      onChange={(e) => setLock(e.target.value)}
                    />
                    <DatePicker
                      selected={remindAt}
                      onChange={(date) => setRemindAt(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                    <TextField
                      label="LinkNoteShare"
                      size="small"
                      value={linkNoteShare}
                      onChange={(e) => setLinkNoteShare(e.target.value)}
                    />
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Note Public
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label="Note Public"
                        size="small"
                        value={notePublic}
                        onChange={handleChangeNotePublic}
                      >
                        {notePublicOptions.map((note, idx) => {
                          return (
                            <MenuItem key={idx} value={note}>
                              {note}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleSubmit}>
                      submit
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>

            <Box className="flex flex-col gap-4">
              {navbarItems.map((item, idx) => (
                <Box
                  key={idx}
                  className="flex gap-5 text-xl cursor-pointer"
                  onClick={() => navigate(item.url)}
                >
                  {item.icon}
                  <Typography>{item.name}</Typography>
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              className="bg-red-500 w-full rounded-full"
              onClick={() => {
                const submit = confirm("Do you want to logout?");
                if (submit === true) {
                  setUser(null);
                  handleLogOut();
                }
              }}
            >
              logout
            </Button>
          </Box>
          <Outlet />
        </Box>
      )}
    </>
  );
};
