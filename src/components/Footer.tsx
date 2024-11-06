const Footer = ()=>{
    return(
        <div className="bg-orange-500 py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <span className="font-bold tracking-tight text-3xl text-white">
                    MernEats.com
                </span>
                <span className="font-bold tracking-tight text-white flex gap-4">
                    <span>Privacy policy</span>
                    <span>Terms of service</span>
                </span>
            </div>
        </div>
    );
};

export default Footer;