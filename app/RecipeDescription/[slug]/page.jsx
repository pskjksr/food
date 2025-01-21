import React from "react";
import data from "../../data.js"; // ดึงข้อมูลจากไฟล์ data.js
import Random from "@/app/components/random.jsx";
import "../../homepage/Homepage.css";

const DetailPage = ({ params }) => {
  const { slug } = params;

  // ค้นหาข้อมูลของ item ที่ต้องการ โดยใช้ slug
  const item = data.find((item) => item.slug === slug);

  if (!item) {
    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <h1>ไม่พบข้อมูล</h1>
      </div>
    );
  }

  // ตัวอย่างข้อมูล Ingredients และ Recommended Dishes
  const ingredients = ["Tteok", "Onion"]; // ตัวอย่างข้อมูล


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center flex-wrap">
        {/* ส่วนของข้อความซ้าย */}
        <div className="w-full md:w-1/3 px-4">
          <h1 className="text-2xl font-bold text-left">{item.title}</h1>
          <h2 className="text-xl mt-2 text-left">{item.koreanTitle}</h2>
          <ul className="list-disc list-inside mt-4 text-left">
            {item.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
            <i className="fa-solid fa-heart border-2 text-sm border-[#FFECC1] bg-[#EFBD4C] text-[#fbfbfb] hover:text-[#FFB100] hover:bg-[#FFECC1] hover:border-[#EFBD4C] active:bg-[#F8F8F8] rounded-full p-1.5"></i>
          </ul>
        </div>

        {/* ส่วนของรูปภาพ */}
        <div
          className="w-full md:w-1/3 flex justify-center my-4 md:my-0"
          style={{
            backgroundColor: "#ffd44f",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginRight: "80px",
          }}
        >
          <img
            src={`/${item.image}`} // สมมุติว่าไฟล์รูปอยู่ในโฟลเดอร์ public/images
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* ส่วนของข้อความขวา */}
        <div className="text-left w-full md:w-1/3 px-4">
          <h3 className="text-lg font-semibold"></h3>
          <ol className="list-decimal list-inside mt-2">
            {item.steps.map((step, index) => (
              <li key={index} className="mt-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ส่วนของ Ingredients for cooking */}
      <div className="mt-8">
        <h2 className="mb-4">Ingredients for cooking</h2>
        <div className="flex space-x-2">
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="bg-gray-200 px-4 py-2 rounded-full text-sm">
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      {/* ส่วนของ Recommended Dishes */}
      <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Recommended Dishes</h2>
  <div className="">
    <Random/>
  </div>
</div>
    </div>
  );
};

// ตั้งค่าเมตะเดต้าแบบไดนามิกสำหรับแต่ละหน้า
export async function generateMetadata({ params }) {
  const item = data.find((item) => item.slug === params.slug);
  if (item) {
    return {
      title: item.title, // ชื่อตั้งตาม item.title
    };
  }
  return { title: "ไม่พบข้อมูล" }; // ชื่อเมื่อไม่พบข้อมูล
}

export default DetailPage;
