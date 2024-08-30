import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls), //--Concatenate new image URLs to existing ones in formData
                    });
                    setImageUploadError(false);
                    setUploading(false); 
                }).catch((err) => {
                    setImageUploadError("Image upload failed (2 mb max per image)");
                    setUploading(false);
                });
        } else {
            setImageUploadError("You can only upload 6 image per listing! ")
            setUploading(false);
        }

    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((err) => {
                            console.error('Error getting download url:', err);
                        });
                }
            )
        })
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    return (
        <section className="max-w-6xl mx-auto p-3">
            <h1 className="text-3xl text-center font-semibold my-7">Create a Listing</h1>

            <form className="flex flex-col gap-3 sm:flex-row" >
                <div className="flex flex-col gap-3 flex-1">
                    <input type="text" placeholder="Name" id="name"
                        className=" p-3 rounded-lg"
                        minLength={10}
                        maxLength={62}
                        required
                    />
                    <textarea type="text" placeholder="Description" id="description"
                        className=" p-3 rounded-lg" required
                    />
                    <input type="text" placeholder="Address" id="address"
                        className=" p-3 rounded-lg" required
                    />

                    <div className="flex gap-3 flex-wrap">
                        <div className="flex gap-3">
                            <input type="checkbox" className="w-4" id="sell" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-3">
                            <input type="checkbox" className="w-4" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-3">
                            <input type="checkbox" className="w-4" id="parking" />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-3">
                            <input type="checkbox" className="w-4" id="furnished" />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-3">
                            <input type="checkbox" className="w-4" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <input type="number" id="bedrooms" min={1} max={10} required
                                className="border border-gray-400 rounded-lg p-1 focus:outline-none" />
                            <span>Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="bathrooms" min={1} max={10} required
                                className="border border-gray-400 rounded-lg p-1 focus:outline-none" />
                            <span>Bathrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="RegularPrice" min={1} max={10} required
                                className="border border-gray-400 rounded-lg p-1 focus:outline-none" />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-sm">($/month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="discountPrice" min={1} max={10} required
                                className="border border-gray-400 rounded-lg p-1 focus:outline-none" />
                            <div className="flex flex-col items-center">
                                <p>Discounted Price</p>
                                <span className="text-sm">($/month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="font-semibold">
                        Images:<span className="font-normal text-slate-600 ml-1">The first image will be cover (max-6)</span>
                    </h2>
                    <div className="flex gap-2">
                        <input onChange={(e) => setFiles(e.target.files)} type="file" id="images" accept="image/*" multiple
                            className="border border-gray-400 p-3 rounded w-full"
                        />
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={handleImageSubmit}
                            className="text-green-700 border border-green-700 rounded p-3 hover:shadow-lg disabled:opacity-80 uppercase"
                        >
                            {uploading ? 'uploading...' : 'upload'}
                        </button>
                    </div>
                    <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                            return <div key={url} className="flex justify-between p-3 border items-center">
                                <img src={url} alt="property image"
                                    className="w-20 h-20 rounded-lg object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-3 uppercase text-red-700 rounded-lg border hover:opacity-80"
                                >Delete</button>
                            </div>
                        })
                    }

                    <button
                        className="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-90 disabled:opacity-80"
                    >
                        Create Listing
                    </button>
                </div>

            </form>
        </section>
    )
};
