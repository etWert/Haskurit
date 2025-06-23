import { useState } from 'react';
import { useDeleteToolMutation, useUpdateToolMutation } from './toolsApiSlice';
import { MdDelete, MdEdit } from "react-icons/md";
import { RiSave3Line } from "react-icons/ri";

const AdminToolCard = ({ tool, onSuccess }) => {
  const [deleteTool] = useDeleteToolMutation();
  const [updateTool, { isLoading: isUpdating }] = useUpdateToolMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: tool.name,
    description: tool.description || '',
    price: tool.price,
    _id: tool._id,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(tool.imageUrl);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (selectedImage) {
      form.append('image', selectedImage);
    }
    updateTool(form).unwrap();
    setIsEditing(false);
  }

  const handleDelete = () => {
    if (window.confirm(`האם למחוק את הכלי "${tool.name}"?`)) {
      deleteTool(tool._id);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(tool.imageUrl);
    setSelectedImage(null);
    setFormData({
      name: tool.name,
      description: tool.description || '',
      price: tool.price,
      _id: tool._id,
    });
  }


  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-200">
      <img src={imagePreview} alt={formData.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        {isEditing ? (
          <>
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm"
              />
              {selectedImage && (
                <p className="text-sm text-gray-500 mt-1">תמונה תעודכן לאחר שמירה</p>
              )}
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-xl font-bold text-haskurit-gray mb-2 border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="text-sm text-gray-600 mb-3 border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
            <div className="text-lg font-semibold text-haskurit-yellow flex items-center gap-1 mb-2">
              <input
                type="number"
                name="price"
                min="1"
                value={formData.price}
                onChange={handleChange}
                className="w-24 border border-gray-300 rounded-lg px-2 py-1"
              />
              <span>₪ ליום</span>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-haskurit-gray mb-2">{tool.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
            <span className="text-lg font-semibold text-haskurit-yellow flex items-center gap-1">
              <span>₪{tool.price} ליום</span>
            </span>
          </>
        )}
        <div className="flex justify-end gap-3 mt-4">
          {isEditing ? (
            <>
              <button onClick={handleUpdate} className="text-green-600 text-sm hover:underline">שמור<RiSave3Line /></button>
              <button onClick={handleCancel} className="text-gray-600 text-sm hover:underline">❌ ביטול</button>
            </>
          ) : (
            <>
              <button className="text-blue-600 text-sm hover:underline" onClick={() => setIsEditing(true)}><MdEdit /></button>
              <button className="text-red-600 text-sm hover:underline" onClick={handleDelete}><MdDelete size={20} /></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminToolCard;