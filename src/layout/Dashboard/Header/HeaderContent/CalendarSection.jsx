// import React, { useRef, useState } from 'react';
// import { format } from 'date-fns';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Popper from '@mui/material/Popper';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Paper from '@mui/material/Paper';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import Divider from '@mui/material/Divider';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import { Calendar } from '@mui/x-date-pickers';
// import { useNavigate } from 'react-router-dom';

// // project import
// import MainCard from 'components/MainCard';
// import Transitions from 'components/@extended/Transitions';

// // ==============================|| HEADER CONTENT - CALENDAR ||============================== //

// export default function CalendarSection() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const anchorRef = useRef(null);
//   const [open, setOpen] = useState(false);

//   const today = new Date();
//   const formattedDate = format(today, 'MMMM dd, yyyy');

//   const handleToggle = () => setOpen((prevOpen) => !prevOpen);
//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 1 }}>
//       <IconButton color="secondary" ref={anchorRef} onClick={handleToggle} sx={{ color: 'text.primary' }}>
//         <CalendarMonthIcon />
//         <Typography variant="body2" sx={{ ml: 0.5 }}>
//           {formattedDate}
//         </Typography>
//       </IconButton>
//       <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement="bottom-end">
//         {({ TransitionProps }) => (
//           <Transitions in={open} {...TransitionProps}>
//             <Paper sx={{ boxShadow: theme.customShadows.z1, width: 300 }}>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard title="Calendar" content={false}>
//                   <List sx={{ p: 0 }}>
//                     <Calendar
//                       date={today}
//                       onChange={() => {}} // Optional: Add logic for selecting a date
//                       disablePast
//                     />
//                     <Divider />
//                     <ListItemButton
//                       sx={{ textAlign: 'center', py: `${12}px !important` }}
//                       onClick={() => {
//                         navigate('..');
//                         handleClose();
//                       }}
//                     >
//                       <Typography variant="h6" color="primary">
//                         View All
//                       </Typography>
//                     </ListItemButton>
//                   </List>
//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>
//     </Box>
//   );
// }
