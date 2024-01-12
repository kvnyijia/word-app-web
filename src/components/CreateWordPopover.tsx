import React, { useState } from "react";
import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, ButtonGroup, FormControl, FormLabel, Stack, useDisclosure, Input } from "@chakra-ui/react";
import { wordServices } from "../utils/wordServices";

const Form = ({ onClose, table_id }) => {
  const [term, setTerm] = useState("");
  const [meaning, setMeaning] = useState("");
  const [picture_url, setPicture_url] = useState("");
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel>{"New word"}</FormLabel>
        <Input 
          name='term' 
          onChange={(e) => { setTerm(e.target.value); }} 
        />

        <FormLabel>{"Meaning"}</FormLabel>
        <Input 
          name='meaning' 
          onChange={(e) => { setMeaning(e.target.value); }} 
        />

        <FormLabel>{"Picture url"}</FormLabel>
        <Input 
          name='picture_url' 
          onChange={(e) => { setPicture_url(e.target.value); }} 
        />
      </FormControl>

      <ButtonGroup display='flex' justifyContent='flex-end'>
        <Button variant='outline' onClick={onClose}>
          Cancel
        </Button>

        <Button 
          colorScheme='teal'
          isDisabled={term === "" || meaning === "" || picture_url === ""}
          onClick={() => {
            wordServices.createWord({ table_id, term, meaning, picture_url })
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

export const CreateWordPopover = ({ table_id }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}      
    >
      <PopoverTrigger>
        <Button colorScheme='cyan'>Create Word</Button>
      </PopoverTrigger>

      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <Form onClose={onClose} table_id={table_id}/>
      </PopoverContent>
    </Popover>
  );
};
