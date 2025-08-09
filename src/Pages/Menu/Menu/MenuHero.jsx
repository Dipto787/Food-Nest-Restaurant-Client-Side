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
                            🍽️ Welcome to Food-Nest – A Place Where Taste Feels Like Home! 🍔🍕🍜
Discover a nest full of flavors! From sizzling starters to mouthwatering mains and sweet delights – every bite at Food-Nest is made with love, freshness, and a passion for perfection. Dine in, take out, or order online – your delicious journey starts here!
                        </p>
                    </div>
                </div>
            </div>

        </Parallax>




    );
};

export default MenuHero;
