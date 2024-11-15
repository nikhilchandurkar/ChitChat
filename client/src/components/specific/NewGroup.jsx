import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from "../../constants/sampleData";
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';

const NewGroup = () => {
  // Input validation for group name
  const groupName = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectMembers, setSelectedMembers] = useState([]);

  // Select member handler to toggle selection state
  const selectMemberHandler = (id) => {
    setMembers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, isAdded: !user.isAdded } : user
      )
    );
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  // Form submit handler
  const submitHandler = () => {
    // Handle group creation logic here
    console.log("Group Name:", groupName.value);
    console.log("Selected Members:", selectMembers);
  };

  // Close handler to close the dialog
  const closeHandler = () => {
    // Reset the form and close the dialog
    setSelectedMembers([]);
  };

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle align="center" variant="h4">New Group</DialogTitle>

        {/* Group Name Input */}
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          fullWidth
        />

        {/* Members Selection */}
        <Typography variant="body1">Members</Typography>
        <Stack>
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}  // Ensure key is unique and based on user._id
              handler={selectMemberHandler}
              isAdded={selectMembers.includes(user._id)}
            />
          ))}
        </Stack>

        {/* Action Buttons */}
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
