import React , {useState, useContext,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { UserSessionData } from '../Context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { imageDB, textDB, auth} from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from 'firebase/firestore';
import './PostAnAd.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Button } from '@mui/material';

function PostAnAd() {

      const {user,setUser} = useContext(UserSessionData)
      const [image, setImage] = useState(null)
      const [name, setName] = useState('')
      const [description, setDescription] = useState('')
      const [price, setPrice] = useState()
      const [id, setId] = useState('')
      const [category, setCategory] = useState('')
      const [successMessage, setSuccessMessage] = useState('')
      const [uploadError, setUploadError] = useState('')
      const [imageError, setImageError]= useState('')

  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })

  },[setUser])

  const handleImageUpload = (e)=>{
    setImage(e.target.files[0])
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
   const storageRef = ref(imageDB,`/ProductImages/${image.name}`);
   const uploadTask = uploadBytesResumable(storageRef,image)
   uploadTask.on('state_changed', (snapshot)=>{
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
   },
   (error)=>{ setImageError(error.message)}, 
   ()=>{
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
       const valRef = collection(textDB, 'ProductInfo')
   addDoc(valRef, {
        name,
        description,
        price:Number(price),
        id: name,
        category,
        image: imageURL
    }).then(()=>{
      //adding document to firestore has been succesful
      setSuccessMessage('Product Data has been successfully uploaded')
      setName('')
      setPrice(0)
      setId('')
      setCategory('')
      setDescription('')
      document.getElementById('file').value =''
      setUploadError('')
      setImageError('')
      setTimeout(()=>{
        setSuccessMessage('')
      }, 5000)

    }).catch((error)=>{
       setUploadError(error.message)
    })
  

    });
   }
  )}

  return (
    <>
    <Navbar></Navbar>
    <div className="postAdContainer">
    <br/>
    {successMessage&& <div className='success-message'>
        {successMessage}
     </div>}
   <br/>
   <br/>
   <header>Post An Add</header>
    <form autoComplete='off' onSubmit={(e)=> handleSubmit(e)}>
     <input type='text' name='Name' value={name} placeholder='Product Name' onChange={(e)=> setName(e.target.value)} required />
     <div className='productCategory'>
     <label>Product Category:</label><br/>
     <select name='Category' onChange={(e)=> setCategory(e.target.value)} required>
      <option>- None -</option>
      <option value="Bearings">Bearings</option>
      <option value="Bevel Gears">Bevel Gears</option>
      <option value="Clutches">Clutches</option>
      <option value="Cylinders">Cylinders</option>
      <option value="Filters">Filters</option>
      <option value="FuelTanks">Fuel Tanks</option>
      <option value="Helical Gears">Helical Gears</option>
      <option value="Pistons">Piston</option>
      <option value="Rack Pinions">Rack Pinions</option>
      <option value="Shockerss">Shockers</option>
      <option value="Spark Plugs">Spark Plugs</option>
      <option value="Spur Gears">Spur Gears</option>
      <option value="Valves">Valves</option>
      <option value="Wheels">Wheels</option>
     </select>
     </div>
     <input type='number' name='Price' value={price} placeholder='Product Price' onChange={(e)=> setPrice(e.target.value)} required />
     <input type='text' name='Id' value={id} placeholder='Product ID' onChange={(e)=> setId(e.target.value)} required />
     <input type='text' name='Description' value={description} placeholder='Product Description' onChange={(e)=> setDescription(e.target.value)} required />
     <div className='productImage'>
     <label>Product Image:</label><br/>
     <input type='file' id='file' name='Image' accept='image/*' onChange={handleImageUpload} required />
     <br/>
     {imageError && <div className='error-message'>
         {imageError}
      </div>}
    </div>
    <Button type='submit' className="uploadBtn" variant='contained'>
    Upload Data
  </Button>
    </form>
    <br/>
     {uploadError && <div className='error-message'>
         {uploadError}
      </div>}
    <br/>
 {
  //place a back to home button
 }
  </div>
  <Footer></Footer>
  </>
)}

export default PostAnAd
