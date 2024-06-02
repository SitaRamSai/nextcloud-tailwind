import React, { useState } from 'react';
import axios from 'axios';

const DeleteTags = () => {
  const [tags, setTags] = useState([]); // State to store tags
  const [isDeleting, setIsDeleting] = useState(false); // State to manage deleting status

  // Function to fetch tags from the API
  const fetchTags = () => {
    axios.get('https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/fetch-all-tags')
      .then(response => {
        const sortedTags = [...response.data].sort((a, b) => a.name.localeCompare(b.name)); // Sort tags alphabetically
        setTags(sortedTags); // Set sorted tags to the state
      })
      .catch(error => console.log('Error fetching tags:', error)); // Handle fetch error
  };

  // Function to delete a specific tag
  const deleteTag = (id) => {
    axios.delete(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/delete-tags/${id}`, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    })
    .then(() => {
      setTags(tags.filter(tag => tag.id !== id));
      alert(`Tag ${id} deleted successfully`);
    })
    .catch(error => console.log('Error deleting tag:', error));
  };

  // Function to delete all tags
  const deleteAllTags = async () => {
    if (window.confirm('Are you sure you want to delete all tags?')) {
      setIsDeleting(true);
      for (let tag of tags) {
        await axios.delete(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/delete-tags/${tag.id}`, {
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          }
        })
        .catch(error => console.log(`Error deleting tag ${tag.id}:`, error));
      }
      setIsDeleting(false);
      setTags([]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <div className="flex justify-between mb-4">
          {/* Button to fetch all tags */}
          <button
            onClick={fetchTags}
            disabled={isDeleting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Get All Tags
          </button>
          {/* Button to delete all tags */}
          <button
            onClick={deleteAllTags}
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
                    onClick={() => deleteTag(tag.id)}
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
