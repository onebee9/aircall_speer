import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityDetail from './ActivityDetail.jsx';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';



export default function InteractiveList() {
  const [value, setValue] = React.useState(0);
  const [callList, setCallList] = useState([]);
  const [archivedCalls, setArchivedCalls] = React.useState([]);
  const [availableCalls, setAvailableCalls] = React.useState([]);
  const [inProgress, setInProgress] = React.useState(false);


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

  const handleUnarchiveCallClick = (callID) => {
    console.log(callID, "input")
    axios({
      method: 'post',
      url: `https://aircall-job.herokuapp.com/activities/${callID}`,
      data: { is_archived: false }
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
    return axios({
      method: 'get',
      url: ` https://aircall-job.herokuapp.com/activities`
    })
      .then((response) => {
        setCallList(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleArchivedCallsDisplay = (calls) => {
    const archivedCallList = calls.filter(call => call.is_archived === true);
    setArchivedCalls(archivedCallList);
  }

  const handleAvailableCallsDisplay = (calls) => {
    const availableCallsList = calls.filter(call => call.is_archived !== true);
    console.log("availablecalls", availableCallsList)
    console.log("callList", callList)
    setAvailableCalls(availableCallsList);
  }

  //All user actions for calls
  const options = {
    Archive: handleArchiveCallClick,
    Unarchive: handleUnarchiveCallClick
  }

  useEffect(() => {
    const execute = () =>{
     return  handleCallsDisplay()
      .then((calls) => {
        handleAvailableCallsDisplay(calls);
      })  
    }
    execute()
    
  }, []);



  const callListType = (<ActivityDetail callList={value === 'Archived' ? archivedCalls : availableCalls} options={options} allCallData={availableCalls} value={value} />)
  // const callListType =  value === 'Archived'? (<ActivityDetail callList ={ archivedCalls} options ={options.Unarchive}/>) : (<ActivityDetail callList ={availableCalls} options ={options.Archive}/>);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid item xs={12} md={6}>
        {callListType}
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction value="recent" onClick={() => { handleAvailableCallsDisplay(callList) }} label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction value="Archived" onClick={() => { handleArchivedCallsDisplay(callList) }} label="Archived" icon={<FolderIcon />} />
        </BottomNavigation>
      </Grid>
    </Box>
  );

}