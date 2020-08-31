import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";

function FlaskItem(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Item List</DialogTitle>
      {props.selectedValue.length > 0 ? (
        <List>
          {selectedValue.map((item) => (
            <ListItem key={item.name}>
              <Typography variant="h6">
                Item Name: {item.name} Item Price: {item.price}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="h6" style={{ padding: "2rem" }}>
          No current items exist, please create an item.
        </Typography>
      )}
    </Dialog>
  );
}

export default function FlaskItemDialog(props) {
  const [open, setOpen] = React.useState(props.state);
  const [selectedValue, setSelectedValue] = React.useState(
    props.itemList ? props.itemList : []
  );

  const handleClose = (value) => {
    setOpen(false);
    props.setState(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <FlaskItem
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
