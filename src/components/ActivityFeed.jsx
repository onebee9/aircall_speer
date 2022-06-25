import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityDetail from './ActivityDetail.jsx';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';



const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));



export default function InteractiveList() {
  const [value, setValue] = React.useState(0);
  const [callList, setCallList] = useState([]);
  const [archivedCalls, setArchivedCalls] = React.useState([]);


  const handleArchiveCallClick = (callID) => {
    console.log(callID, "input")
    axios({
      method: 'post',
      url: `https://aircall-job.herokuapp.com/activities/${callID}`,
      data: { is_archived: true }
    })
      .then((response) => {
        const oldCallIndex = callList.findIndex(call => call.id === callID);
        //
        setCallList((prev) => {
          const newCallList = [...prev]
          newCallList[oldCallIndex] = response.data
          return newCallList;
        })
        console.log('callID', response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const handleCallsDisplay = () => {
    axios({
      method: 'get',
      url: ` https://aircall-job.herokuapp.com/activities`
    })
      .then((response) => {
        setCallList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleArchivedCallsDisplay = () => {
    const archivedCallList = callList.filter(call => call.is_archived === true);
    setArchivedCalls(archivedCallList);
    // console.log(archivedCallList);
  }

  //All user actions for calls
  const options = {
    Archive: handleArchiveCallClick
  }

  useEffect(() => {
    handleCallsDisplay()
  }, []);

  const callListType = (<ActivityDetail callList={value === 'Archived' ? archivedCalls : callList} options={options} />)

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        {callListType}
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction value="recent" label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction value="Archived" onClick={() => { handleArchivedCallsDisplay() }} label="Archived" icon={<FolderIcon />} />
        </BottomNavigation>
      </Grid>
    </Box>
  );

}