import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
      <SearchIcon color="#3352CC" />
      <Input
        placeholder="Search by name, email or status"
        className="border-none outline-none ring-0 focus:ring-0 flex-1"
      />
    </div>
  )
}

export default Search

// SearchIcon : Icône loupe pour recherche.
// Input : Champ texte pour recherche.
// border-[#3352CC] : Bordure bleue stylisée champ.
// flex-1 : Largeur ajustable selon espace.
// placeholder : Texte indicatif pour recherche.