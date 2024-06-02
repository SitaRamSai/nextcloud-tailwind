// src/pages/DeleteTags.js
import React, { useState } from 'react';
import { fetchTags, deleteTag, deleteAllTags, fetchTagsForDelete } from '../utils/api'; // Adjust the path as needed

const DeleteTags = () => {
  const [tags, setTags] = useState([]); // State to store tags
  const [isDeleting, setIsDeleting] = useState(false); // State to manage deleting status

  // Function to handle fetching tags
  const handleFetchTags = async () => {
    try {
      const fetchedTags = await fetchTagsForDelete();
      setTags(fetchedTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  // Function to handle deleting a specific tag
  const handleDeleteTag = async (id) => {
    try {
      await deleteTag(id);
      setTags(tags.filter(tag => tag.id !== id));
      alert(`Tag ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  // Function to handle deleting all tags
  const handleDeleteAllTags = async () => {
    if (window.confirm('Are you sure you want to delete all tags?')) {
      setIsDeleting(true);
      try {
        await deleteAllTags(tags);
        setTags([]);
      } catch (error) {
        console.error('Error deleting all tags:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <div className="flex justify-between mb-4">
          {/* Button to fetch all tags */}
          <button
            onClick={handleFetchTags}
            disabled={isDeleting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Get All Tags
          </button>
          {/* Button to delete all tags */}
          <button
            onClick={handleDeleteAllTags}
            disabled={isDeleting || tags.length === 0}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete All Tags
          </button>
        </div>
        {isDeleting && <p className="text-red-500 mb-4">Deleting tags...</p>} {/* Show deleting status */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="text-left py-2 px-4">Tag Name</th>
              <th className="text-left py-2 px-4">ID</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(tag => (
              <tr key={tag.id} className="w-full border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-4">{tag.name}</td>
                <td className="py-2 px-4">(ID: {tag.id})</td>
                <td className="py-2 px-4">
                  {/* Button to delete a specific tag */}
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    disabled={isDeleting}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteTags;
