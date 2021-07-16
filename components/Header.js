// import Button from "@material-tailwind/react/Button";
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
function Header() {
    return (
        <div className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md 
         bg-white">
            <Button
            color='gray'
            buttonType='outline'
            rounded={true}
            iconOnly={true}
            ripple="dark"
            className=" hidden md:inline-flex h-20 w-20 border-0"
            >
                <Icon name="menu" size="3xl"/>
            </Button>
            <Icon name="description" size="5xl" color="blue"/>
            <h1 className=" mx-5 md:mx-20 hidden md:inline-flex ml-2 text-gray-700 text-2xl">Docs</h1>

            <div className="flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-xl  focus-within:text-gray-600 focus-within:shadow-md">
                <Icon name="search" size="3xl" color="gray"/>
                <input type="text" className=" bg-transparent flex-grow px-5 text-base outline-none" placeholder="Search"/> 
            </div>

            <Button
            color="gray"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple="dark"
            className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0"
            >
                <Icon name="apps" size="3xl" color="gray"/>
            </Button>

            <img
            loading="lazy"
            // onClick={signOut}
            className=" cursor-pointer h-12 w-12 rounded-full ml-2"
            src="https://th.bing.com/th/id/OIP.4Py7MYDlJMhMjiA_gELNdAHaGh?pid=ImgDet&rs=1"
            alt=""
            />
        </div>
    )
}

export default Header
