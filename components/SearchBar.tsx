import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";

export default function SearchBar() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        gap={2}
      >
        <TextField
          id="search"
          label="Tìm kiếm"
          variant="outlined"
          sx={{ width: { xs: "inherit", sm: "20rem", md: "25rem" } }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={open ? <FilterAltOffIcon /> : <FilterAltIcon />}
            variant="outlined"
            onClick={handleClick}
          >
            Lọc
          </Button>
          <Button startIcon={<SearchIcon />} variant="contained">
            Tìm kiếm
          </Button>
        </Stack>
      </Box>

      <Collapse sx={{ mt: 2 }} in={open} timeout="auto" unmountOnExit>
        <FormControl sx={{ px: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Cuisine</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="japanese" />}
              label="Japanese"
            />

            <FormControlLabel
              control={<Checkbox name="chinese" />}
              label="Chinese"
            />
          </FormGroup>
        </FormControl>

        <FormControl sx={{ px: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Price Range</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="low" />} label="Low" />

            <FormControlLabel control={<Checkbox name="high" />} label="High" />
          </FormGroup>
        </FormControl>

        <FormControl sx={{ px: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Rating</FormLabel>

          <Box display="flex" maxWidth="10rem" mt={1} gap={2} flexWrap="wrap">
            {[1, 2, 3, 4, 5].map((item) => (
              <Button
                variant="outlined"
                key={item}
                sx={{ border: "1px solid gray" }}
              >
                {[...Array(item)].map((_, index) => (
                  <StarIcon sx={{ color: "#FFC107" }} key={index} />
                ))}
              </Button>
            ))}
          </Box>
        </FormControl>
      </Collapse>
    </Box>
  );
}
