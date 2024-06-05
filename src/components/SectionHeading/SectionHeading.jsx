

const SectionHeading = ({heading,subHeading}) => {
    return (
        <div className="w-3/5 mx-auto"> 
            <h3 className="text-3xl md:text-5xl font-bold font-nunito border-y-4 text-purple-500 uppercase text-center">{heading}</h3>
            <p className="opacity-75 font-semibold text-center mt-2">{subHeading}</p>
        </div>
    );
};

export default SectionHeading;