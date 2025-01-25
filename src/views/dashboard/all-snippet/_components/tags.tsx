"use client";

import { Navigation, Scrollbar, A11y, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Button } from "@/components/ui/button";

const Tags = () => {
  const navItems = [
    "All",
    "Filter function Exercises",
    "API Methods",
    "JavaScript Functions",
    "React Functions",
    "Reduce Function",
    "Reduce Function",
    "Reduce Function",
    "Reduce Function",
    "JavaScript Functions",
  ];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Scrollbar, A11y, FreeMode]}
        spaceBetween={10}
        freeMode={true}
        slidesPerView="auto"
        className="!w-full "
      >
        <div className="overflow-x-auto">
          {navItems.map((item, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <Button
                variant="ghost"
                className="px-4 py-2 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
              >
                {item}
              </Button>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Tags;
