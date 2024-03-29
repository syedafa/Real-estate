function UpdateList() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      {/* <h1 className="text-3xl font-semibold text-center my-7">
    Create a Listing
  </h1>
  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
    <div className="flex flex-col gap-4 flex-1">
      <input
        type="text"
        placeholder="Name"
        className="border p-3 rounded-lg"
        id="name"
        maxLength="62"
        minLength="10"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        type="text"
        placeholder="Description"
        className="border p-3 rounded-lg"
        id="description"
        required
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Address"
        className="border p-3 rounded-lg"
        id="address"
        required
        value={formData.address}
        onChange={handleChange}
      />
      <div
        className="flex gap-4
       flex-wrap"
      >
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="sale"
            className="w-5"
            onChange={handleChange}
            checked={formData.type === "sale"}
          />
          <span>Sale</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="rent"
            className="w-5"
            onChange={handleChange}
            checked={formData.type === "rent"}
          />
          <span>Rent</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="parking"
            className="w-5"
            onChange={handleChange}
            checked={formData.parking}
          />
          <span>Parking Spot</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="furnished"
            className="w-5"
            onChange={handleChange}
            checked={formData.furnished}
          />
          <span>Furnished</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="offer"
            className="w-5"
            onChange={handleChange}
            checked={formData.offer}
          />
          <span>Offer</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input
            type="number"
            id="bedrooms"
            min={1}
            max={10}
            required
            className="p-3 border border-gray-300 rounded-lg"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <p>Beds</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            id="bathroom"
            min={1}
            max={10}
            required
            className="p-3 border border-gray-300 rounded-lg"
            value={formData.bathroom}
            onChange={handleChange}
          />
          <p>Baths</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            id="regularPrice"
            min={50}
            max={100000}
            required
            className="p-3 border border-gray-300 rounded-lg"
            value={formData.regularPrice}
            onChange={handleChange}
          />
          <div className="flex flex-col items-center">
            <p>Regular Price</p>
            <span className="text-xs">($ / month)</span>
          </div>
        </div>
        {formData.offer && (
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="discountPrice"
              min={0}
              max={100000}
              required
              className="p-3 border border-gray-300 rounded-lg"
              value={formData.discountPrice}
              onChange={handleChange}
            />
            <div className="flex flex-col items-center">
              <p>Discounted Price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="flex flex-col flex-1 gap-4">
      <p className="font-semibold">
        Images:
        <span className="font-normal text-gray-600 ml-2">
          The first image will be the cover (max 6)
        </span>
      </p>
      <div className="flex gap-4">
        <input
          onChange={(e) => setFiles(e.target.files)}
          className="p-3 border border-gray-300 rounded w-full"
          type="file"
          id="images"
          accept="image/*"
          multiple
        />
        <button
          disabled={imageUploading}
          onClick={handleImageSubmit}
          type="button"
          className="p-3 text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
        >
          {imageUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <p className="text-red-700 text-sm">
        {imageUploadError && imageUploadError}
      </p>
      {formData.imageUrls.length > 0 &&
        formData.imageUrls.map((url, i) => (
          <div
            key={i}
            className="flex justify-between p-3 border items-center"
          >
            <img
              src={url}
              alt="loading..."
              className="w-20 h-20 object-contain rounded-lg"
            />
            <button
              onClick={() => handleImageRemove(i)}
              type="button"
              className="p-3 text-red-700 rounded-lg uppercase hover:opacity-65"
            >
              Delete
            </button>
          </div>
        ))}
      <button
        disabled={loading || imageUploading}
        className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        {loading ? "Creating list..." : "Create Listing"}
      </button>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  </form> */}
    </main>
  );
}

export default UpdateList;
