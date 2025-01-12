import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'
const Navbar = () => {
    return (
        <header className='w-full p-5 sm:px-10 flex justify-between items-center'>
            <nav className='flex w-full screen-max-width'>
                <img src={appleImg} alt="Apple" width={14} height={18} />
                <div className='flex flex-1 justify-center max-sm:hidden'>
                    {navLists.map((nav) => (
                        <div key={nav} className='px-5 text-gray text-sm hover:text-white transition-all cursor-pointer'>
                            {nav}
                        </div>
                    ))}
                </div>
                <div className='flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end'>
                    <img src={searchImg} alt="Search" width={18} height={18} />
                    <img src={bagImg} alt="Bag" width={18} height={18} />
                </div>
            </nav>
        </header>
    )
}

export default Navbar