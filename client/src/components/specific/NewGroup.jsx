import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from "../../constants/sampleData"
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
const NewGroup = () => {
  // function
  const groupName = useInputValidation("")
  const [members, setMembers] = useState(sampleUsers)
  const [selectMembers, setSelectedMembers] = useState([])


  const selectMemberHandler = (id) => {
    setMembers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, isAdded: !user.isAdded } : user
      )
    );
    setSelectedMembers((prev) =>
      (prev.includes(id))
        ? prev.filter((currElement) => currElement != id)
        : [...prev, id]
    );
  };
  console.log(selectMembers)

  const submitHandler = () => { }
  const closeHandler = () => { }

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle align='center' variant='h4'>new group</DialogTitle>

        <TextField label={"Group Name"}
          value={groupName.value}
          onChange={groupName.changeHandler} />
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {
            members.map((user, _id) => (
              <UserItem user={user}
                key={_id}
                handler={selectMemberHandler}
                isAdded={selectMembers.includes(user._id)}

              />
            ))}
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"} >
          <Button
            variant='text'
            color='error'
            size='large'
            onClick={closeHandler}
          >Cancel</Button>

          <Button variant='contained'
            size='large'
            onClick={submitHandler}
          >Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
