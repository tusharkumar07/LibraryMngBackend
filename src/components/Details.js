import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../style/setdetails.css";
import Header from "./Header";
import Footer from "./Footer";
import detailsImg1 from "../img/detailsImg1.png";
import detailsImg2 from "../img/detailsImg2.webp";
import detailsImg3 from "../img/detailsImg3.webp";
const Details = () => {
  const [details, setDetails] = useState([]);
  const [clk,setClk]=useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get("https://library-mang-backend.onrender.com/details").then((res) => {
        setDetails(res.data);
        // console.log(res.data);
      });
    } catch (err) {
      console.log(`Error in details page GET request : ${err}`);
    }
  }, [clk]);
  const removeEntry = (index) => {
    axios
      .post("https://library-mang-backend.onrender.com/removeData", { indexData: index })
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          swal({
            icon: "success",
            title: "Deleted!",
            text: `Entry has been Deleted`,
            showConfirmButton: false,
            timer: 2000,
          });
          setClk(true);
          clk?navigate("/details"):navigate("/");
        }
      })
      .catch((err) => {
        console.log(`Error in Deleting Data from frontend : ${err}`);
      });
  };
  const fullDate=new Date();
  const currentDate=fullDate.toLocaleDateString();
  const currentTime=fullDate.toLocaleTimeString();
  const sendMail=(emailInfo,dateInfo)=>{
    const data={
      email:emailInfo,
      date:dateInfo
    }
    axios.post("https://library-mang-backend.onrender.com/sendMail",data).then((res)=>{
      if(res.data===true){
        console.log("Sent mail");
        swal({
          icon: "success",
          title: "Sent",
          text: `Mail has been Sent`,
          showConfirmButton: false,
          timer: 2000,
        });

      }
    }).catch((err)=>{
      console.log(`Error in sending mail : ${err}`);
    })
  }
  return (
    <div style={{ backgroundColor: "#9EC8B9"}}>
    <Header/>
    {/* <div className="today">
    <h4 className="currentDate currentTime" style={{backgroundColor:"#1B4242"}}>Current Date : {currentDate}</h4>
    <h4 className="currentTime">Current Time : {currentTime}</h4>
    </div> */}
    <div className="imageSection">
      <img src={detailsImg1} className="imgSec"></img>
      <img src={detailsImg2} className="imgSec1"></img>
      <img src={detailsImg3} className="imgSec"></img>
    </div>
    <div className="scrollBox">
  <table className="table table-striped margingT">
  <thead>
  <tr>
    <th className='lb1'>Name</th>
    <th className='lb2'>Email</th>
    <th className='lb3'>Book Id</th>
    <th className='lb4'>Roll No</th>
    <th className='lb5'>Issue Date</th>
    <th className='lb6'>Submit Date</th>
    <th className='lb7'>Remind</th>
    <th className='lb7'>Remove</th>
  </tr>
</thead>

    <tbody>
      {details.map((item) => {
        return (
          <tr key={item.id}>
            <td className="name" style={{ color: 'black' }}>{item.name}</td>
            <td className="email" style={{ color: 'black' }}>{item.email}</td>
            <td className="bookId" style={{ color: 'black' }}>{item.bookId}</td>
            <td className="rollNo" style={{ color: 'black' }}>{item.rollNo}</td>
            <td className="startDate" style={{ color: 'black' }}>{item.startDate}</td>
            <td className="lastDate" style={{ color: 'black' }}>{item.lastDate}</td>
            <td>
              <button onClick={() => sendMail(item.email, item.startDate)} className="btn btn-primary mail" style={{ height: '2em' }}>Send</button>
            </td>
            <td><button onClick={() => removeEntry(item._id)} className="btn btn-danger delete" style={{ height: '2em' }}>Delete</button></td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
<Footer/>
    </div>
    
  );
};
export default Details;
