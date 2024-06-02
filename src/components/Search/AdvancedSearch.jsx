import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FiPlus, FiTrash2, FiInfo } from 'react-icons/fi';
import Tooltip from 'react-tooltip-lite';

const ItemType = 'CONDITION';

const DraggableCondition = ({ condition, index, moveCondition, updateSearchCondition, removeSearchCondition }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveCondition(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
      <div className="grid grid-cols-4 gap-4 items-center">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={condition.fieldName}
          onChange={(e) => updateSearchCondition(index, 'fieldName', e.target.value)}
          aria-label="Field selector"
        >
          <option value="">Select Field</option>
          <option value="Policy Number">Policy Number</option>
          <option value="Insured Name">Insured Name</option>
          <option value="UW Name">UW Name</option>
          <option value="LOB">LOB</option>
          <option value="Broker Company">Broker Company</option>
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={condition.operation}
          onChange={(e) => updateSearchCondition(index, 'operation', e.target.value)}
          aria-label="Condition selector"
        >
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
        </select>
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter value"
          value={condition.searchValue}
          onChange={(e) => updateSearchCondition(index, 'searchValue', e.target.value)}
          aria-label="Value input"
        />
        <button
          className="text-red-500 text-lg font-bold"
          onClick={() => removeSearchCondition(index)}
          aria-label="Delete condition"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const AdvancedSearch = ({
  searchConditions,
  addSearchCondition,
  updateSearchCondition,
  removeSearchCondition,
  logicalOperator,
  toggleLogicalOperator,
  handleSearch
}) => {
  const [errors, setErrors] = useState([]);

  const validateConditions = () => {
    const newErrors = searchConditions.map((condition) => {
      if (!condition.fieldName || !condition.operation || !condition.searchValue) {
        return 'All fields are required';
      }
      return null;
    });
    setErrors(newErrors);
    return !newErrors.some((error) => error !== null);
  };

  const handleSubmit = () => {
    if (validateConditions()) {
      handleSearch();
    }
  };

  const moveCondition = (fromIndex, toIndex) => {
    const updatedConditions = [...searchConditions];
    const [movedCondition] = updatedConditions.splice(fromIndex, 1);
    updatedConditions.splice(toIndex, 0, movedCondition);
    updateSearchCondition(updatedConditions);
  };

  const handleAddCondition = () => {
    addSearchCondition();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-2xl mx-auto mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span
                className={`px-4 py-2 cursor-pointer ${logicalOperator === 'AND' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => toggleLogicalOperator('AND')}
              >
                AND
              </span>
              <span
                className={`px-4 py-2 cursor-pointer ${logicalOperator === 'OR' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => toggleLogicalOperator('OR')}
              >
                OR
              </span>
            </div>
            <span className="ml-2 text-gray-500">Toggle to switch between AND/OR</span>
          </div>
          <Tooltip content="Choose logical operator for the conditions" direction="right" tagName="span" className="ml-2">
            <FiInfo className="text-gray-500" />
          </Tooltip>
        </div>
        {searchConditions.map((condition, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="text-center my-2">
                <span className="text-gray-500 font-semibold">{logicalOperator}</span>
              </div>
            )}
            <DraggableCondition
              condition={condition}
              index={index}
              moveCondition={moveCondition}
              updateSearchCondition={updateSearchCondition}
              removeSearchCondition={removeSearchCondition}
            />
            {errors[index] && <div className="text-red-500 text-sm">{errors[index]}</div>}
          </React.Fragment>
        ))}
        <div className="flex justify-between mt-4 items-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 flex items-center"
            onClick={handleAddCondition}
            aria-label="Add condition"
          >
            <FiPlus className="mr-1" /> Add Condition
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={handleSubmit}
            aria-label="Submit conditions"
          >
            Search
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default AdvancedSearch;
