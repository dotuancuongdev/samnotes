import { useParams } from "react-router-dom";
import { Box } from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const UserSetting = () => {
  const [image, setImage] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [informations, setInformation] = useState(null);
  const params = useParams();
  const [showBox2, setShowBox2] = useState(true);
  const [selected, setAge] = useState("");

  const handleEditClick = () => {
    setShowBox2((prevShowBox2) => !prevShowBox2);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleImageCoverChange = (e) => {
    const selectedImageCover = e.target.files[0];
    setImageCover(selectedImageCover);
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios(
          `https://samnote.mangasocial.online/profile/${params.id}`
        );
        setInformation(res.data.user);
        if (res.data.user.Avarta) {
          setImage(res.data.user.Avarta);
        }
        if (res.data.user.AvtProfile) {
          setImageCover(res.data.user.AvtProfile);
        }
        console.log("đây là data", res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, [params.id]);

  return (
    <>
      <Container>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            marginTop: "20px",
            color: "#6a53cc",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          Update Account
        </Typography>
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <Typography sx={{ width: "200px" }}>Avatar:</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              accept="image/*"
              id="avatar-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            {image && (
              <Box sx={{ marginLeft: 2 }}>
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Uploaded"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            )}
            <label htmlFor="avatar-button-file" style={{ marginLeft: "10px" }}>
              <Button variant="contained" component="span">
                Choose
              </Button>
            </label>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <Typography sx={{ width: "200px" }}>Name:</Typography>
          <TextField
            required
            id="outlined-required"
            defaultValue={informations.name}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <Typography sx={{ width: "200px" }}>Cover image:</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              accept="image/*"
              id="cover-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageCoverChange}
            />
            {imageCover && (
              <Box sx={{ marginLeft: 2 }}>
                <img
                  src={
                    typeof imageCover === "string"
                      ? imageCover
                      : URL.createObjectURL(imageCover)
                  }
                  alt="Uploaded"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            )}
            <label htmlFor="cover-button-file" style={{ marginLeft: "10px" }}>
              <Button variant="contained" component="span">
                Choose
              </Button>
            </label>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <Typography sx={{ width: "200px" }}>Gmail:</Typography>
          <Typography>{informations.gmail}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <Typography sx={{ width: "200px" }}>PassWord:</Typography>

          {showBox2 ? (
            <Box
              sx={{
                display: "flex",
                alignItem: "center",
                textAlign: "center",
              }}
            >
              <Typography sx={{}}>*******</Typography>
              <Button
                variant="outlined"
                component="span"
                sx={{ marginLeft: "20px" }}
                onClick={handleEditClick}
              >
                Edit
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                required
                id="outlined-required"
                placeholder="Nhập lại mật khẩu cũ"
                sx={{ width: "300px" }}
              />
              <TextField
                required
                id="outlined-required"
                placeholder="mật khẩu mới"
                sx={{ width: "300px", marginTop: "5px" }}
              />
              <Button variant="contained" sx={{ marginTop: "10px" }}>
                UPDATE
              </Button>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography sx={{ width: "200px" }}>Password 2:</Typography>
          {informations.password_2 === null ? (
            <Button
              variant="outlined"
              component="span"
              sx={{ marginLeft: "20px" }}
              // onClick={}
            >
              Create
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItem: "center" }}>
              <Typography>*******</Typography>
              <Button
                variant="outlined"
                component="span"
                sx={{ marginLeft: "20px" }}
                // onClick={}
              >
                Edit
              </Button>
            </Box>
          )}
        </Box>
        <Button sx={{ marginTop: "20px" }} variant="contained">
          UPDATE PROFILE
        </Button>
        <Typography
          component="h2"
          variant="h5"
          sx={{
            margin: "25px 0 20px",
            color: "#6a53cc",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          General
        </Typography>
        <Box>
          <Box sx={{ display: "flex", alignItem: "center" }}>
            <Typography sx={{ width: "200px" }}>Default screen:</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Calendar"
              defaultValue="calendar"
              onChange={handleChange}
            >
              <MenuItem value={1}>calendar</MenuItem>
              <MenuItem value={10}>Archived</MenuItem>
              <MenuItem value={20}>Deleted</MenuItem>
              <MenuItem value={30}>Settings</MenuItem>
            </Select>
          </Box>
          <Typography>Default color:</Typography>
        </Box>
        <Typography
          component="h2"
          variant="h5"
          sx={{
            margin: "20px 0 ",
            color: "#6a53cc",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          Online Sync & Backup
        </Typography>
        <Box>
          <Box sx={{ display: "flex", alignItem: "center" }}>
            <Typography sx={{ width: "300px" }}>Sync on lauch:</Typography>
            <CheckCircleOutlineIcon />
          </Box>
          <Box sx={{ display: "flex", alignItem: "center", marginTop: "20px" }}>
            <Typography sx={{ width: "300px" }}>Auto backup:</Typography>
            <CheckCircleOutlineIcon />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserSetting;
