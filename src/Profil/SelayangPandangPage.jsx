import React, {useState, useEffect} from 'react';

const SelayangPandang =()=>{
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        fetch(
          `${process.env.VUE_APP_API_URL}/api/getOPDInfo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ kunker: process.env.VUE_APP_OPD_ID }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const menuItems = data.menu.lsmenu.map((item) => ({
              name: item.nama_menu,
              link: `/${item.nama_menu.toLowerCase()}`,
              submenu: item.submenu || [], // Check if item has submenu
            }));
            setItemData(menuItems);

            console.log(menuItems);
          })
          .catch((error) => console.error("Error fetching berita data:", error));
      }, []);

    return(
        <div>
            <h1>ini adalah selayang pandang</h1>
        </div>
    )
}

export default SelayangPandang;