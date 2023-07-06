import Topclass from "../components/Topclass";
import PopularClass from "../components/PopularClass";
import Instructor from "../components/Instructor";
import Class from "./Class";
import Slider from "../components/Slider";
import { motion } from "framer-motion";

const Home = () => {
  return (

    <div>
      <div>
      <motion.div
    id="education"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 1 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 150 },
      }}
      className="sm:w-9/12 mx-auto md:py-16"
    >

          <Slider />
        </motion.div>
        <Topclass />
      </div>

      <div>
        <div className="text-4xl font-bold text-center mt-5">
          <p>Our Popular classes</p>

          <PopularClass />
        </div>
      </div>

      <div>
        <div className="text-4xl font-bold text-center mt-10">
          <p> Instructors</p>

          <Instructor home={true} />
        </div>
      </div>
      <div></div>

      <div></div>
    </div>
  );
};

export default Home;
