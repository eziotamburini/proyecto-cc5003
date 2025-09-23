import React, { useEffect, useState } from "react";
import server from "../services/server";
import type { StoreWithDetails } from "../types/types";

interface StoreDetailsProps {
    storeId: number;
    onBack: () => void;
}

const StoreDetails: React.FC<StoreDetailsProps> = ({ storeId, onBack }) => {
    const [store, setStore] = useState<StoreWithDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

        return (
        <>
            {[...Array(fullStars)].map((_, i) => (
            <span key={`full-${i}`} className="star full">
                ★
            </span>
            ))}
            {hasHalf && <span className="star half">⭑</span>}
            {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`} className="star empty">
                ☆
            </span>
            ))}
        </>
        );
    };

    useEffect(() => {
        const fetchStoreDetails = async () => {
            try {
                setLoading(true);
                const data = await server.getStoreWithDetails(storeId);
                setStore(data);
            } catch {
                setError("Failed to load store details");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreDetails();
    }, [storeId]);

    if (loading) {
        return <div className="loading">Loading store details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!store) {
        return <div className="error">Store not found</div>;
    }

    return (
        <div>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <img
                    src={store.images[0]}
                    className="blurred-image"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder.png";
                    }}
                />
                
                <button onClick={onBack} className="back-button">
                    ← Back to Stores
                </button>
                
                <div className="store-detail-header">
                    <h2>{store.name}</h2>
                    <div>
                        <p className="location">📍 Ubicación: {store.location}</p>
                        <p className="category"> Tipo: {store.storeCategory}</p>
                        <p className={store.junaeb ? "junaeb" : ""}>
                            {store.junaeb ? "Acepta Junaeb" :  "No Acepta Junaeb 😔"}
                        </p>
                    </div>
                    {store.description && (
                        <div className="store-description">
                            <p>{store.description}</p>
                        </div>
                    )}

                    <div className="rating">
                        <span 
                            className="stars" 
                            role="img" 
                            aria-label={`Rating: ${store.averageRating} out of 5`}
                        >
                            {renderStars(store.averageRating)}
                        </span>
                        <span className="numeric-rating">{store.averageRating.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            {store.items && store.items.length > 0 && (
                <div>
                    <h2>Productos</h2>
                    <div className="product-container">
                        {store.items.map((item) => (
                            <div key={item.id} className="product-item">
                                {item.picture && (
                                    <img 
                                        src={item.picture} 
                                        alt={item.name} 
                                        className="item-image"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "/images/placeholder.png";
                                        }}
                                    />
                                )}
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="price">${item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {store.reviews && store.reviews.length > 0 && (
                <div>
                    <h2>Reseñas</h2>
                    <div className="review-container">
                        {store.reviews.map((review) => (
                            <div key={review.id} className="review-item">
                                <div>
                                    <h4>{review.userName || "Anónimo"}</h4>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                        <span className="numeric-rating">({review.rating})</span>
                                    </div>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                {review.picture && (
                                    <img 
                                        src={review.picture} 
                                        className="review-image"
                                        onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/images/placeholder.png";
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreDetails;
