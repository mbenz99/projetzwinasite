import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (item.attributes.image) {
      const { url } = item.attributes.image?.data?.attributes?.formats?.medium || {};
      if (url) {
        setImageUrl(`http://localhost:1337${url}`);
      } else {
        console.error("Image URL is not defined properly:", item.attributes.image);
      }
    } else {
      console.error("Image attribute is missing:", item.attributes);
    }
  }, [item]);

  const neutralDark = theme.palette?.neutral?.dark || '';

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.attributes.name}
          width="300px"
          height="400px"
          src={imageUrl}
          onError={(e) => console.error("Image loading error:", e)}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {dispatch && (
              <Button
                onClick={() => {
                  dispatch(addToCart({ item: { ...item, count } }));
                }}
                sx={{ backgroundColor: shades.primary[300], color: "white" }}
              >
                Add to Cart
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutralDark}>
          {item.attributes.category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{item.attributes.name}</Typography>
        <Typography fontWeight="bold">${item.attributes.price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
