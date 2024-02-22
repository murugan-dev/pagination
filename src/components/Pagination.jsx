import {useState, useEffect} from "react"
import "./style.css"

const Pagination = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(()=>{
    async function fetchData(){
      const api = await fetch(`https://dummyjson.com/products`)
      const jsonData = await api.json();
      setProductData(jsonData.products)
    }
    fetchData()
  },[])

  const selectPage = (pageNum) =>{
    setPage(pageNum)
  }

  return(
    <>
    <div className="products">
    {
      productData.slice(page * 10 -10, page * 10).map((item)=>(
        <span key={item.id} className="single__products">
        <img src={item.thumbnail} alt={item.discription} />
        <span>{item.title}</span>
        </span>
      ))
    }
    
    </div>
    <div className="pagination">
      <span onClick={()=>selectPage(page - 1)}>◀</span>
    {
      [...Array(productData.length/10)].map((_, idx)=> <span onClick={()=>selectPage(idx+1)} 
      key={idx}
      className={page===idx+1 ? "selected__page" : " "}
      >{idx+1}</span>)
    }
    <span onClick={()=>selectPage(page + 1)}>▶</span>
    </div>
    </>
   
  );
}

export default Pagination;