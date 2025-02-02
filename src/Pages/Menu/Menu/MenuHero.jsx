const MenuHero = ({menuBg,heading,subHeading}) => {
    return (
        <div>
            <div
                className="hero h-[700px]"
                style={{
                    backgroundImage: `url("${menuBg}")`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 uppercase text-5xl font-bold">{heading}</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                     
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuHero;