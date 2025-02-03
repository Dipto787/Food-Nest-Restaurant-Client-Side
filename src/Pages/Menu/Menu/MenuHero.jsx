import { Parallax } from 'react-parallax';

const MenuHero = ({ menuBg, heading, subHeading }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={menuBg}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[600px]" style={{ backgroundImage: `url("${menuBg}")`, }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 uppercase text-5xl font-bold">{heading}</h1>

                        <p className="mb-5">
                            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                </div>
            </div>

        </Parallax>




    );
};

export default MenuHero;
