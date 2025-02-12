const BlogBox = ({ image, title, description, link, new: isNew }) => {
  return (
    <div className="flex items-stretch bg-[#191229] rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden max-w-xl ml-10 mt-10 relative">
      {/* Tag "New" */}
      {isNew && (
        <div className="absolute top-4 -right-2 flex items-center">
          <div className="relative bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-l">
            New
            {/* Phần dài ra phía sau */}
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-red-500 transform -translate-y-1/2 rotate-45 z-0"></div>
            {/* Phần móc ra đằng sau */}
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-red-400 transform -translate-y-1/2 rotate-45 z-0"></div>
          </div>
        </div>
      )}

      {/* Hình ảnh */}
      <div className="w-1/3 flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Nội dung */}
      <div className="p-6 w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
        </div>
        <a
          href={link}
          className="text-blue-400 hover:text-blue-500 text-sm font-semibold mt-4 inline-block"
        >
          Read more →
        </a>
      </div>
    </div>
  );
};

export default BlogBox;
