import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Loader from "../components/common/Loader";
import TourCard from "../components/common/TourCard";
import PageBanner from "../components/common/PageBanner";
import EmptyState from "../components/common/EmptyState";

function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get("/tours");
        setTours(res.data.data || []);
      } catch (error) {
        console.error("Error fetching tours", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(tours.map((t) => t.category).filter(Boolean))];
  }, [tours]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch =
        tour.title?.toLowerCase().includes(search.toLowerCase()) ||
        tour.location?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category ? tour.category === category : true;

      return matchesSearch && matchesCategory;
    });
  }, [tours, search, category]);

  return (
    <>
      <PageBanner
        title="Explore Our Tours"
        subtitle="Choose from adventure, wildlife, and scenic travel packages."
      />

      <section className="section">
        <div className="container">
          <div className="search-bar">
            <input
              className="input"
              placeholder="Search by title or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <Loader />
          ) : filteredTours.length === 0 ? (
            <EmptyState message="No tours found for your search." />
          ) : (
            <div className="grid grid-3">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Tours;
