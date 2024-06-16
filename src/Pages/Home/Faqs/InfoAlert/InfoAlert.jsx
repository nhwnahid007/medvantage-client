const InfoAlert = () => {
  return (
    <div>
      <div className="py-10 bg-white dark:bg-dark">
        <div className="container">
          <div className="shadow-1 dark:bg-dark-2 flex w-full rounded-lg border-l-[6px] border-transparent bg-white px-7 py-8 md:p-9">
            <div className="bg-cyan-light-2/30 text-cyan-dark mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99998 0.506256C4.3031 0.506256 0.506226 4.30313 0.506226 9.00001C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9.00001C17.5219 4.30313 13.6969 0.506256 8.99998 0.506256ZM8.99998 16.2563C5.00623 16.2563 1.77185 12.9938 1.77185 9.00001C1.77185 5.00626 5.00623 1.77188 8.99998 1.77188C12.9937 1.77188 16.2562 5.03438 16.2562 9.02813C16.2562 12.9938 12.9937 16.2563 8.99998 16.2563Z"
                  fill="#0B76B7"
                />
                <path
                  d="M10.125 7.65001H7.87496C7.53746 7.65001 7.22809 7.93126 7.22809 8.29688V13.9219C7.22809 14.2594 7.50934 14.5688 7.87496 14.5688H10.125C10.4625 14.5688 10.7718 14.2875 10.7718 13.9219V8.29688C10.7718 7.93126 10.4625 7.65001 10.125 7.65001ZM9.50621 13.275H8.52184V8.91563H9.50621V13.275Z"
                  fill="#0B76B7"
                />
                <path
                  d="M8.99996 3.45938C8.04371 3.45938 7.22809 4.24688 7.22809 5.23126C7.22809 6.21563 8.01559 7.00313 8.99996 7.00313C9.98434 7.00313 10.7718 6.21563 10.7718 5.23126C10.7718 4.24688 9.95621 3.45938 8.99996 3.45938ZM8.99996 5.70938C8.71871 5.70938 8.49371 5.48438 8.49371 5.20313C8.49371 4.92188 8.71871 4.69688 8.99996 4.69688C9.28121 4.69688 9.50621 4.92188 9.50621 5.20313C9.50621 5.48438 9.28121 5.70938 8.99996 5.70938Z"
                  fill="#0B76B7"
                />
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-3 text-lg  text-purple-600 font-black">
                Important Notice
              </h5>
              <p className="text-base leading-relaxed text-body-color dark:text-dark-6">
                Our commitment to excellence drives us to continuously improve
                our services for your well-being.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Did you know? section */}
      <div className="py-10 bg-white dark:bg-dark">
        <div className="container">
          <div className="shadow-1 dark:bg-dark-2 flex w-full rounded-lg border-l-[6px] border-transparent bg-white px-7 py-8 md:p-9">
            <div className="bg-yellow-300 mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0.5C4.30311 0.5 0.5 4.30311 0.5 9C0.5 13.6969 4.30311 17.5 9 17.5C13.6969 17.5 17.5 13.6969 17.5 9C17.5 4.30311 13.6969 0.5 9 0.5ZM9 16C5.08301 16 1.75 12.667 1.75 9C1.75 5.08301 5.08301 1.75 9 1.75C12.667 1.75 16 5.08301 16 9C16 12.667 12.667 16 9 16Z"
                  fill="#FFD500"
                />
                <path
                  d="M9.25 6.5H8.75C8.61193 6.5 8.5 6.61193 8.5 6.75V12.25C8.5 12.3881 8.61193 12.5 8.75 12.5H9.25C9.38807 12.5 9.5 12.3881 9.5 12.25V6.75C9.5 6.61193 9.38807 6.5 9.25 6.5ZM9.25 13C9.11193 13 9 12.8881 9 12.75V12.25C9 12.1119 9.11193 12 9.25 12H9.75C9.88807 12 10 12.1119 10 12.25V12.75C10 12.8881 9.88807 13 9.75 13H9.25Z"
                  fill="#FFD500"
                />
                <path
                  d="M9.25 5.25H8.75C8.61193 5.25 8.5 5.13807 8.5 5V4.5C8.5 4.36193 8.61193 4.25 8.75 4.25H9.25C9.38807 4.25 9.5 4.36193 9.5 4.5V5C9.5 5.13807 9.38807 5.25 9.25 5.25Z"
                  fill="#FFD500"
                />
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-3 text-lg text-purple-600 font-black">
                Did You Know?
              </h5>
              <p className="text-base leading-relaxed text-body-color dark:text-dark-6">
                Fun fact: The human body has over 600 muscles, making up about
                40% of body weight. Keep moving for optimal health!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;
