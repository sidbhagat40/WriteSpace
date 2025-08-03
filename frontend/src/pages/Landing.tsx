import { useNavigate,Link } from "react-router-dom";

export const Landing = () => {

    const navigate = useNavigate();

    async function Redirect(){
        navigate("/signin");
    }

    return <div className="bg-[#F9F5F0] h-screen">
        <div className="shadow-md flex items-center justify-between pt-3 py-4">
            
            <div className="pl-10 font-lobster text-3xl">WriteSpace</div>
            
            <div className="flex justify-between font-serif font-thin text-lg">
                <div className="pr-15">Story</div>
                <div className="pr-15">Write</div>
                <Link to={"/signup"}>
                    <div className="cursor-pointer hover:text-gray-900">Sign In</div>
                </Link>     
            </div>
            <div className="pr-10">
                <button type="button" onClick={Redirect}className="text-white bg-[#000] hover:bg-[#000] focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-full text-sm px-5 py-2.5">Get Started</button> 
            </div>
        </div>

            <div className="flex items-center justify-between p-20">
                <div className="pt-20">
                    <div className="font-playfair font-light text-5xl">
                        <div className="pb-1">Either write something worth reading</div>
                        <div className="">or do something worth writing.</div>                         
                    </div>                                 
                    <div className="pt-6 pb-10 font-thin font-serif text-xl">- Benjamin Franklin</div>
                    <div className="pl-2">
                        <button type="button" onClick={Redirect}className="text-white bg-[#000] font-semibold rounded-full text-lg px-10 py-2 hover:bg-[#000] focus:outline-none focus:ring-4 focus:ring-gray-300">Start Reading</button>
                    </div>
                </div>

                <div className="">
                    <img className="max-w-lg h-auto rounded-lg shadow-lg" src="/images/WhyInvest2.jpg" alt="People collaborating on ideas" />
                </div>

            </div>
    </div>
}




