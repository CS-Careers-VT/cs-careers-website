function EmailInput() {
    return (
      <div className="relative w-[331px] h-[63px]">
        <svg width="331" height="63" viewBox="0 0 331 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="327.855" height="59.134" rx="29.567" stroke="#861F41" strokeWidth="3"/>
        </svg>
        <input 
          type="email"
          placeholder="Enter your email"
          className="absolute inset-0 w-full h-full text-center text-white opacity-60 bg-transparent text-[23px] font-semibold font-['Inter'] outline-none"
        />
      </div>
    );
  };
  
  export default EmailInput;