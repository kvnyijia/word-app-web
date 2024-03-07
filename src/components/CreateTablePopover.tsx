import React, { useState } from "react";
import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, ButtonGroup, FormControl, FormLabel, Stack, useDisclosure, Input } from "@chakra-ui/react";
import { tableServices } from "../utils/tableServices";

const Form = ({ onClose, owner }) => {
  const [name, setName] = useState("");
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel>{"New table name"}</FormLabel>
        <Input 
          name='name' 
          onChange={(e) => { setName(e.target.value); }} 
        />
      </FormControl>

      <ButtonGroup display='flex' justifyContent='flex-end'>
        <Button variant='outline' onClick={onClose}>
          Cancel
        </Button>

        <Button 
          colorScheme='teal'
          isDisabled={name === ""}
          onClick={() => {
            tableServices.createTable({ name, owner })
              .then(() => { window.location.reload(); })
              .catch(() => { })
          }}
        >
          Create
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export const CreateTablePopover = ({ username }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}      
    >
      <PopoverTrigger>
        <Button w='150px' colorScheme='cyan'>Create Table</Button>
      </PopoverTrigger>

      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <Form onClose={onClose} owner={username}/>
      </PopoverContent>
    </Popover>
  );
};
