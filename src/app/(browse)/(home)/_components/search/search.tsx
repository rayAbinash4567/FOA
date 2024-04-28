'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import React from 'react';

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

const Search = () => {
  return (
    <form
      onSubmit={() => {}}
      className="relative w-full h-12 lg:w-[250px] flex items-center"
    >
      <Input
        placeholder="Search"
        className="rounded-r-none  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <Button
        type="submit"
        className="rounded-l-none h-10"
        size="sm"
        variant="secondary"
      >
        <SearchIcon className=" text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
