import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function HostVanDetails() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = useState(null);

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      {/* relative indicator that for path relative not the route  .. means back*/}
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} alt="current van" />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
