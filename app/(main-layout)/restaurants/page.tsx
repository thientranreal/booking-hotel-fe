import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CardRestaurant from "@/components/CardRestaurant";

export default function Restaurants() {
  return (
    <Box mt={5}>
      {/* Search section */}
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
          sx={{ width: "25rem" }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<FilterAltIcon />} variant="outlined">
            Lọc
          </Button>
          <Button startIcon={<SearchIcon />} variant="contained">
            Tìm kiếm
          </Button>
        </Stack>
      </Box>
      {/* End Search section */}

      <Grid container spacing={2} mt={5}>
        <Grid item xs={12} md={6} lg={3}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings="4"
            numberPeopelRate="20000"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings="4"
            numberPeopelRate="20000"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings="4"
            numberPeopelRate="20000"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings="4"
            numberPeopelRate="20000"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
