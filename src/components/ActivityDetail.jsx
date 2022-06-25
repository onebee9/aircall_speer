import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemSecondaryAction } from '@mui/material';

export default function ActivityDetail(props) {
  console.log(props);
  const { callList, options } = props;
  return (
    <List>
      {callList.map((calls) => (<Item calls={calls} options={options} key={calls.id}/>))}
    </List>);
}

const Item = (props) => {

  const { calls, options } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem
      key={calls.id}
    >
      <ListItemAvatar>
        <Avatar>
          <i className="fa-solid fa-phone"></i>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={calls.from}
        secondary={calls.created_at + calls.is_archived}
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          key={calls.id}
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}

        >
          <MenuList>
            {Object.keys(options).map((option) => {
              return (
                <MenuItem
                  key={calls.id}
                  onClick={(e) => {

                    //Calls the function associated with the action
                    const optionsHandler = options[option];
                    optionsHandler(calls.id)
                    setAnchorEl(null);
                  }}>
                  {option}
                </MenuItem>
              )
            }
            )}
          </MenuList>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  )
}