import {
  TextField,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";

// Component: Filters
const Filters: React.FC<{
  search: string;
  year: string;
  type: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  loading: boolean;
}> = ({
  search,
  year,
  type,
  setSearch,
  setYear,
  setType,
  onSearch,
  loading,
}) => (
  <Grid container spacing={2} mb={2}>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        fullWidth
        label="Search Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        fullWidth
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        fullWidth
        select
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="movie">Movie</MenuItem>
        <MenuItem value="series">Series</MenuItem>
        <MenuItem value="episode">Episode</MenuItem>
      </TextField>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Button
        fullWidth
        variant="contained"
        onClick={onSearch}
        disabled={loading}
      >
        Search
      </Button>
    </Grid>
  </Grid>
);

export default Filters