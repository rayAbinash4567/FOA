'use client'

import React from 'react'
import qs from 'query-string'
import { useState } from 'react'
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {}

const Search = () => {
  return (
    <form
      onSubmit={() => {}}
      className="relative w-full  lg:w-[250px] flex items-center"
    >
      <Input
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <Button
        type="submit"
        className="rounded-l-none"
        size="sm"
        variant="secondary"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  )
}

export default Search
