import { Star, StarHalf, ExternalLink } from 'lucide-react';
import { formatPrice, generateStars } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  const stars = generateStars(product.rating);

  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-darker">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.category?.name}
          </span>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(stars.full)].map((_, i) => (
            <Star key={`full-${i}`} size={16} className="text-yellow-500 fill-yellow-500" />
          ))}
          {stars.half === 1 && (
            <StarHalf size={16} className="text-yellow-500 fill-yellow-500" />
          )}
          {[...Array(stars.empty)].map((_, i) => (
            <Star key={`empty-${i}`} size={16} className="text-gray-600" />
          ))}
          <span className="text-sm text-gray-400 ml-2">({product.rating})</span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 text-sm"
          >
            {product.buttonText || 'Buy Now'}
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
