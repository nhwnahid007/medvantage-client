import SectionHeading from "../../../components/SectionHeading/SectionHeading";


const Faqs = () => {
    return (
        <div>
           <section className="dark:bg-gray-100 dark:text-gray-800">
	<div className="container mt-20 flex flex-col justify-center p-4 mx-auto md:p-8">
		
		<SectionHeading heading={'Frequently Asked Questions'}></SectionHeading>
		<div className="flex  flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
			<details>
				<summary className="py-2 text-[#7600dc] outline-none cursor-pointer focus:underline">What is Medvantage?</summary>
				<div className="px-4 pb-4 ">
					<p>Medvantage is a platform that provides comprehensive healthcare solutions and suppliments tailored to your needs.</p>
				</div>
			</details>
			<details>
				<summary className="py-2 text-[#7600dc] outline-none cursor-pointer focus:underline">How do I sign up?</summary>
				<div className="px-4 pb-4">
					<p>You can sign up for Medvantage by visiting our website and clicking on the &quot;Join Us &quot;button.</p>
				</div>
			</details>
			<details>
				<summary className="py-2 text-[#7600dc] outline-none cursor-pointer focus:underline">What services does Medvantage offer?</summary>
				<div className="px-4 pb-4 space-y-2">
					<p>Medvantage offers a wide range of healthcare services including various wellness programs.</p>
					<p>Our platform connects you with healthcare professionals and resources to help you manage your health effectively.</p>
				</div>
			</details>
			{/* Additional FAQs */}
			<details>
				<summary className="py-2 text-[#7600dc] outline-none cursor-pointer focus:underline">How secure is my data?</summary>
				<div className="px-4 pb-4">
					<p>At Medvantage, we take data security seriously. We use advanced encryption techniques to protect your personal information.</p>
				</div>
			</details>
			<details>
				<summary className="py-2 text-[#7600dc] outline-none cursor-pointer focus:underline">Can I get authentic Product?</summary>
				<div className="px-4 pb-4">
					<p>Yes, you can. We provide only the best.</p>
				</div>
			</details>
		</div>
	</div>
</section>
 
        </div>
    );
};

export default Faqs;