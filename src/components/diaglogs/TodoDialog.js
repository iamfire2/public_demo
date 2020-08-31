import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

function Todo(props) {
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
      <DialogTitle id="simple-dialog-title">Todo List</DialogTitle>
      <List>
        {selectedValue.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.title} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function TodoDialog(props) {
  const [open, setOpen] = React.useState(props.state);
  const [selectedValue, setSelectedValue] = React.useState(props.todoList);

  const handleClose = (value) => {
    setOpen(false);
    props.setState(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Todo selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
