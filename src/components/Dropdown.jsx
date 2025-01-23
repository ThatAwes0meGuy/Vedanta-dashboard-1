export const Dropdown = ({dropdownLabel, dropdownList, currentValue, setDropdownValue}) => {
    return <>
     <label htmlFor={`${dropdownLabel}Value`} className="text-gray-700 font-medium">
                      {dropdownLabel}:
                  </label>
                  <select
                      id={`${dropdownLabel}Value`}
                      value={currentValue}
                      onChange={(e) => setDropdownValue(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {dropdownList?.map((dropdownItem) => <option value={dropdownItem}>{dropdownItem}</option>)}
                  </select>
        </>
}