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
  const { callList, options, value } = props;

  return (
    <List>
      {callList.map((calls) => (<Item calls={calls} options={options} key={calls.id} value={value} />))}
    </List>
  )
}

const Item = (props) => {

  const { calls, options, value } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
        secondary={calls.via}
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
            {options.map((option) => {
              return (
                option.scopes.includes(value) &&
                <MenuItem
                  key={calls.id - option}
                  onClick={(e) => {

                    //Calls the function associated with the action
                    const optionsHandler = option.handler;
                    optionsHandler(calls.id)
                    setAnchorEl(null);
                  }}>
                  {option.key}
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