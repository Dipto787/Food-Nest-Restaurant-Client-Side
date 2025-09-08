const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 mb-10 relative">
      <p className="text-indigo-500 uppercase tracking-widest  font-semibold text-xs">
        {subHeading}
      </p>

      <h2 className="text-xl font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
        border-b-4 border-pink-400 pb-3
        relative
        before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:bg-pink-400 before:rounded-full before:animate-pulse
      ">
        {heading}
      </h2>
    </div>
  );
};

export default SectionTitle;
