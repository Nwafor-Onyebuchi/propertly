import Hero from "@/components/Hero";
import Homeproperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import connectDB from "@/config/database";


const HomePage = () => {
    connectDB()
    return (
        <div>
           <Hero />
           <InfoBoxes />
           <Homeproperties />
        </div>
    )
   
}
 
export default HomePage;