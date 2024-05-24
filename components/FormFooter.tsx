import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function FormFooter() {
  return (
    <Card className="shadow-none border-none flex-1 self-start">
      <CardHeader className='pt-0'>
        <CardTitle className='text-2xl sm:text-left text-center'>
          Обратная связь
        </CardTitle>
        <CardDescription className='sm:text-base sm:text-left text-center'>
          Свяжитесь с нами если возникли вопросы
        </CardDescription>
      </CardHeader>
      <CardContent className='!w-full'>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end pb-0">
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
