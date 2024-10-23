import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
import ShoppingFooter from './footer'

export default function ShoppingLayout() {
  return (
    <div>
      <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeader />
        <main className='flex mt-14 flex-col w-full'>
            <Outlet />
        </main>
        <ShoppingFooter/>
      </div>
    </div>
  )
}
