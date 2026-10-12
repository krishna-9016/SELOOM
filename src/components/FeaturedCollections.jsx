import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCollections() {
  const collections = [
    {
      title: 'DENIMS',
      image: '/images/collections/collection-denim.jpg',
      link: '/collection/denims',
      subtitle: 'Baggy & Wide Silhouettes'
    },
    {
      title: 'OVERSIZED TEES',
      image: '/images/collections/collection-tees.jpg',
      link: '/collection/tops',
      subtitle: '280 GSM Heavy Combed Cotton'
    },
    {
      title: 'STREETWEAR ESSENTIALS',
      image: '/images/collections/collection-essentials.jpg',
      link: '/collection/all-drops',
      subtitle: 'Hoodies, Cargos & Layers'
    }
  ];

  return (
    <section>
      <div className="section-header-bar">
        <h2 className="section-title">FEATURED COLLECTIONS</h2>
        <Link to="/collection/all-drops" className="section-link">
          VIEW ALL <ArrowRight size={14} />
        </Link>
      </div>

      <div className="featured-tiles-container">
        {collections.map(col => (
          <Link to={col.link} key={col.title} className="collection-tile">
            <img
              src={col.image}
              alt={col.title}
              className="collection-tile-img"
              loading="lazy"
            />
            <div className="collection-tile-content">
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', opacity: 0.8, textTransform: 'uppercase' }}>
                {col.subtitle}
              </span>
              <h3 className="collection-tile-title">{col.title}</h3>
              <span className="collection-tile-link">
                EXPLORE <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
