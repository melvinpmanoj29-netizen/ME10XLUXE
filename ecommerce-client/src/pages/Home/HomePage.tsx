import { useEffect, useRef, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/buttons/Button";
import ProductCard from "../../components/cards/ProductCard";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { FaShippingFast, FaShieldAlt, FaAward, FaArrowRight } from "react-icons/fa";

function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      setProducts(productsData.slice(0, 8)); // Show 8 items for a full row grid
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    }
  };

  // Mock icons for categories for premium visual look
  const getCategoryIcon = (name: string) => {
    const icons: { [key: string]: string } = {
      "Mobiles": "📱",
      "Laptops": "💻",
      "Electronics": "⚡",
      "Accessories": "🎧",
      "Fashion": "👕",
      "Home": "🏠",
      "Books": "📚",
      "Beauty": "💄"
    };
    return icons[name] || "📦";
  };

  // categories scrollbar

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const scrollCategories = (direction: "left" | "right") => {
    if (!categoryScrollRef.current) return;

    categoryScrollRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout>
      {/* Top Categories Row (Flipkart-style Circular Navigation) */}
      
      <div className="w-full bg-theme-card border border-theme rounded-md p-4 mb-6 shadow-sm overflow-x-auto scrollbar-none transition-colors duration-200">
        <div className="relative">
          <button
            onClick={() => scrollCategories("left")}
            className="
              hidden
              md:flex
              absolute
              left-2
              top-1/2
              -translate-y-1/2
              z-10
              w-10
              h-10
              rounded-full
              bg-white/90
              dark:bg-slate-800/90
              shadow-md
              flex
              items-center
              justify-center
              text-xl
              hover:scale-105
              transition
            "
          >
            ←
          </button>

          <div
            ref={categoryScrollRef}
            className="
              flex
              justify-start
              md:justify-around
              items-center
              gap-5
              md:gap-8
              px-12
              overflow-x-auto
              scroll-smooth
              no-scrollbar
            "
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/products?category=${category.id}`)}
                className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent shrink-0"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-2xl md:text-3xl shadow-sm border border-gray-200/50 dark:border-slate-700 group-hover:scale-110 transition-transform duration-200 overflow-hidden">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    getCategoryIcon(category.name)
                  )}
                </div>

                <span className="text-xs font-semibold text-theme-primary group-hover:text-[#2874F0] dark:group-hover:text-[#5897ff] transition-colors">
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCategories("right")}
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              z-10
              w-10
              h-10
              rounded-full
              bg-white/90
              dark:bg-slate-800/90
              shadow-md
              flex
              items-center
              justify-center
              text-xl
              hover:scale-105
              transition
            "
          >
            →
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
    <section
        className="
            relative
            overflow-hidden
            rounded-3xl
            min-h-[520px]
            sm:min-h-[560px]
            md:min-h-[480px]
            lg:min-h-[560px]
            mb-12
            flex
            items-center
            bg-cover
            bg-center
            bg-no-repeat
            border
            border-blue-500/20
            shadow-2xl
            transition-all
            duration-500
            hover:shadow-blue-500/20
            hover:shadow-2xl
        "
      >

        <picture className="absolute inset-0 w-full h-full">

            {/* Mobile */}

            <source
                media="(max-width:767px)"
                srcSet="/images/mobile_hero_img.webp"
            />

            {/* Tablet */}

            <source
                media="(max-width:1023px)"
                srcSet="/images/tablet_hero_img.webp"
            />

            {/* Desktop */}

            <img
                src="/images/desktop_hero_img.webp"
                alt="Hero Background"
                className="w-full h-full object-cover object-center"/>

        </picture>
        <div
              className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-[#050b18]/95
                  via-[#071224]/70
                  to-transparent
              "
          />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b18]/95 via-[#071224]/75 to-transparent" />

        {/* Decorative glow */}
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6 py-10 md:px-12">

            <span className="inline-block rounded-full bg-orange-500 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-lg">
                BIG SUMMER SALE
            </span>

            <h1
                className="
                    mt-6
                    text-4xl
                    sm:text-5xl
                    lg:text-7xl
                    font-black
                    leading-tight
                    tracking-tight
                    text-white
                "
            >
                Elevate Your

                <span className="block text-yellow-400">
                    Lifestyle
                </span>
            </h1>

            <p
                className="
                    mt-6
                    max-w-xl
                    text-base
                    md:text-lg
                    leading-8
                    text-slate-200
                "
            >
                Discover the latest high-performance mobiles,
                professional laptops, gaming accessories,
                premium audio devices and cutting-edge technology
                at unbeatable prices.
            </p>

            <div
                className="
                    mt-10
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                "
            >

                <Button
                    onClick={() => navigate("/products")}
                >
                    Shop Now
                </Button>

                <Button
                    variant="secondary"
                    onClick={() => navigate("/register")}
                >
                    Join ME10XLUXE
                </Button>

            </div>

        </div>

      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 mb-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-theme-primary font-outfit">
            Why Shop With Us
          </h2>
          <div className="w-16 h-1 bg-[#2874F0] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
          <div className="bg-theme-card border border-theme p-6 rounded-lg text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl text-[#2874F0] mb-4">
              <FaShippingFast />
            </div>
            <h3 className="text-base font-bold text-theme-primary mb-1">
              Super Fast Delivery
            </h3>
            <p className="text-xs text-theme-muted leading-relaxed">
              Enjoy lightning-fast and secure shipping right to your doorstep, free on selected items.
            </p>
          </div>

          <div className="bg-theme-card border border-theme p-6 rounded-lg text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-orange-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl text-[#FB641B] mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-base font-bold text-theme-primary mb-1">
              100% Secure Shopping
            </h3>
            <p className="text-xs text-theme-muted leading-relaxed">
              Your payments are protected with advanced end-to-end security protocols.
            </p>
          </div>

          <div className="bg-theme-card border border-theme p-6 rounded-lg text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl text-green-600 mb-4">
              <FaAward />
            </div>
            <h3 className="text-base font-bold text-theme-primary mb-1">
              Authentic Reviews
            </h3>
            <p className="text-xs text-theme-muted leading-relaxed">
              Read verified feedback and detailed reviews left by actual customers.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-6 mb-12">
        <div className="flex justify-between items-end border-b border-theme pb-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-theme-primary font-outfit">
              Trending Products
            </h2>
            <p className="text-xs text-theme-muted mt-1">Recommended items based on your search history</p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="text-xs font-bold text-[#2874F0] hover:text-[#1259c7] dark:hover:text-[#5897ff] flex items-center gap-1 cursor-pointer border-none bg-transparent"
          >
            <span>View All</span>
            <FaArrowRight size={10} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {products.length === 0 ? (
            <div className="col-span-full py-12 text-center text-theme-muted">
              Loading products...
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default HomePage;
