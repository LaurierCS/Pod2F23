import React, { useState } from 'react';
import { storage, db } from '../firebase/firebase';
import { FirebaseError } from 'firebase/app';
import { UploadTaskSnapshot, ref, getDownloadURL , uploadBytesResumable} from 'firebase/storage'; // Import Firebase Storage types
import { collection, doc, updateDoc } from 'firebase/firestore'; // Import Firestore types


const AvatarUpload = ({ userId }: { userId: string }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
      setImage(file);
    } else {
      alert('Please select a valid image (JPG, PNG, GIF).');
    }
  };

  const handleUpload = () => {
    if (image) {
      const imageRef = ref(storage, `avatars/${userId}/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
  
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          // nothing to handle for now
        },
        (error: FirebaseError) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Upload completed, get the download URL and store it in Firestore
          getDownloadURL(imageRef).then((url) => {
            // Store the URL in Firestore, associate it with the user, etc.
            updateDoc(doc(db, 'users', userId), {
              avatarURL: url,
            });
            alert('Avatar uploaded successfully!');
          });
        }
      );
    }
  };
  
  return (
    <div className="my-4 px-4">
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-500 file:text-white
                   hover:file:bg-blue-600"
      />
      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
      >
        Upload Avatar
      </button>
    </div>
  );
};

export default AvatarUpload;
