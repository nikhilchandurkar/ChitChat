import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import { useInputValidation } from "6pp"
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';

const Search = () => {
  const search = useInputValidation("");
  let isLodingSendFriendRequest = false;
  const [users, setUsers] = useState(sampleUsers)
  const addFriendHandler = (_id) => {
    console.log(id)
  }

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>find people</DialogTitle>
        <TextField
          label=" search"
          value={search.value} onChange={search.changeHandler}
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <List>
          {
            users.map((user,_id) => (
                  <UserItem user={user}
                  key={_id}
                  handler={addFriendHandler}
                  handlerIsLoading={isLodingSendFriendRequest}
                />


            ))}
        </List>
      </Stack>
    </Dialog>

  )
}

export default Search
