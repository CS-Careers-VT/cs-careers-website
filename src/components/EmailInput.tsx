function EmailInput() {
    return (
        <input 
          type="email"
          placeholder="Enter your email"
          className="border-csc-maroon-bg border-2 tracking-wide py-4 px-8 text-2xl rounded-full w-full text-center text-white placeholder-white bg-transparent
                      focus:border-csc-maroon-bg focus:outline-none focus:ring-2 focus:ring-csc-maroon-bg focus:ring-opacity-50 focus:bg-csc-maroon-bg focus:bg-opacity-10 
                      transition-all duration-300 ease-in-out"
        />
    );
  };
  
  export default EmailInput;