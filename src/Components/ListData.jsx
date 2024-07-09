import React from "react";
import { FixedSizeList } from "react-window";
import {Box} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function renderRow(props) {
  const { index, style } = props;

  const data = {
    title: `Judul ${index + 1}`,
    subtitle: `Subtitle ${index + 1}`,
    date: `Tanggal ${index + 1}`,
  };

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemText
        primary={data.title}
        secondary={`${data.subtitle} - ${data.date}`}
      />
    </ListItem>
  );
}

const ListData = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 800,
        bgcolor: "gray-200",
      }}
    >
      <FixedSizeList
        height={400}
        width={800}
        itemSize={60}
        itemCount={50}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
};

export default ListData;
