import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'

const Notifications = () => {
  return (
    <Button className='bg-white rounded-full py-6'>
        <Bell color='#3352CC' fill='#3352CC'/>
    </Button>
  )
}

export default Notifications


// Button : Bouton rond pour notifications.
// Bell : Icône de cloche stylisée.
// bg-white : Style fond blanc bouton.
// fill='#3352CC' : Couleur remplissage icône cloche.
// py-6 : Espacement vertical bouton.