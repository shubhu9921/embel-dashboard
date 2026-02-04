export function TimeFilter({ selected, onChange, onEnlarge }) {
  const options = [
    { value: "day", label: "1D" },
    { value: "week", label: "1W" },
    { value: "month", label: "1M" },
    { value: "year", label: "1Y" },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Button Group */}
      <div className="inline-flex rounded-full bg-gray-100 p-1 shadow-sm">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200
              ${
                selected === option.value
                  ? "bg-white text-blue-600 shadow-md border border-blue-200"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-200"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Optional enlarge button */}
      {onEnlarge && (
        <button
          onClick={onEnlarge}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-all shadow-sm"
          title="Expand"
        >
          ⤢
        </button>
      )}
    </div>
  );
}
