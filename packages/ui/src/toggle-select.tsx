interface OptionProps {
  name: string;
  logo: string;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}


export const ToggleSelect = ({children}: {children: JSX.Element}) => {
  return (
    <>
    <label className="block text-sm font-medium text-gray-700 mb-2 py-4">Select Bank</label>
    <div className="flex justify-start gap-5">   
      {children}    
    </div>
    </>
  );
};

export const ToggleOption = ({ name, logo, selectedOption, setSelectedOption }: OptionProps) => {
  return <div
  key={name}
  className={`relative min-w-[65px] min-h-[65px] flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-colors aspect-square ${
    selectedOption === name
      ? 'bg-purple-100 border-2 border-purple-500' 
      : 'bg-white border border-gray-200 hover:bg-gray-50'
  }`}
  onClick={() => setSelectedOption(name)}
>
  
  <img src={logo} alt={`${name} logo`} className="w-6 h-6 mb-2" />
  <span className="text-xs font-medium text-center">{name} Bank</span>
  {selectedOption === name && (
    <div className="absolute top-1 right-1 text-purple-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

    </div>
  )}
</div>
}




