import React, {useState, useEffect}  from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Dialog from '@material-ui/core/Dialog';


// CSS
import './App.css';
import 'react-notifications/lib/notifications.css';
// import { makeStyles } from '@material-ui/core/styles';

// Componentes
import Items from './items/Items'

// Material UI

// Imagenes
import logo from './img/logo.png';

// Iconos
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';


function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalM2, setTotalM2] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0) 
  const [total, setTotal] = useState(0) 
  const [due, setDue] = useState(0) 

  let numForm = Intl.NumberFormat('en-US')

  useEffect(()=>{
    let tempData = data
    let tempTotalItems = 0
    let tempTotalM2 = 0
    let tempSubtotal = 0
    let tempTax = 0
    let tempTotal = 0
    let tempDue = 0

    tempData.forEach((e, i) => {
      tempTotalItems = tempTotalItems + e.qty
      tempTotalM2 = (e.qty * e.value) + tempTotalM2
      if(e.qty === 0){
        tempData.splice(i, 1)
        setData([...tempData])
      }
    });

    tempSubtotal = Math.round(200 * tempTotalM2)
    tempTax = tempSubtotal  * .16
    tempTotal = tempSubtotal + tempTax
    tempDue = tempTotal / 2

    setTotalItems(tempTotalItems)
    setTotalM2(tempTotalM2)
    setSubtotal(numForm.format(tempSubtotal))
    setTax(numForm.format(tempTax))
    setTotal(numForm.format(tempTotal))
    setDue(numForm.format(tempDue))
  },[data, setData])

  const alertN = (type, msg) => {
    if(type === "s"){
        NotificationManager.success(msg,"", 1000);
    } else if(type === "e") {
        NotificationManager.error(msg,"", 1000);
    } else if(type === "i") {
        NotificationManager.info(msg,"", 1000);
    }
}

  const clearAll = () => {
    alertN("e", "Deleted data")
    setData([])
    setTotalItems(0)
    setTotalM2(0)
    setSubtotal(0)
    setTax(0)
    setTotal(0)
    setDue(0)
  }

  const handleOpen = () => {    
    if(totalItems !== 0){
      setOpen(true);
      alertN("s", "Data Calculated")
    } else {
      alertN("e", "Add Products")
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <NotificationContainer/>
      {/* Menu */}
      <div className="menu">
        <img src={logo} alt="Logo" />
        <div className="menuLinks">
          <a href="#ancla"> How We Work</a>
          <a href="#ancla"> Service</a>
          <a href="#ancla"> Free Quote</a>
          <a href="#ancla"> Contact</a>
        </div>
        <div className="menuIcon">
          <a href="#ancla"> Menu</a>
        </div>
      </div>

      {/* Texto */}
      <div className="texto">
        <h1>What items to store?</h1>
        <h5>Select which items you wish to store before moving to your new home. We’ll keep ’em safe!</h5>
      </div>

      {/* Items */}
      <div className="contenedor">
        <Items clearAll={clearAll} data={data} setData={setData} type="beds" name="Beds"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="refrigerador" name="Refrigerador"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="furniture" name="Furniture"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="oven" name="Oven"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="sofa" name="Sofa"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="tv" name="tv"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="washerdryer" name="Washer-dryer"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="dining" name="Dining"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="desk" name="Desk"></Items>
        <Items clearAll={clearAll} data={data} setData={setData} type="wardrobe" name="Wardrobe"></Items>
      </div>

      {/* Buttons */}
      <div className="contenedorButtons">
        <div className="buttonBase calculateWidth">
          <div className="button buttonClear" onClick={clearAll}>Clear</div>
        </div>
        <div className="buttonBase calculateWidth">
          <div className="button buttonCalculate" onClick={handleOpen}>Calculate</div>
        </div>
      </div>

      {/* Summary */}
      <div className="summary">
        <h1>Summary</h1>
        <div className="panel">
          <div className="data">
            <h3 className="dataName">Total Items</h3>
            <h3 className="dataValue">{totalItems}</h3>
          </div>
          <div className="data">
            <h3 className="dataName">Total M<sup>2</sup></h3>
            <h3 className="dataValue">{totalM2}</h3>
          </div>
          <div className="data">
            <h3 className="dataName">Subtotal</h3>
            <h3 className="dataValue">${subtotal}</h3>
          </div>
          <div className="data">
            <h3 className="dataName">Tax</h3>
            <h3 className="dataValue">${tax}</h3>
          </div>
          <div className="data">
            <h3 className="dataName"><strong>Total</strong></h3>
            <h3 className="dataValue"><strong>${total}</strong></h3>
          </div>
          <div className="data">
            <h3 className="dataName"><strong>Due Today 50%</strong></h3>
            <h3 className="dataValue"><strong>${due}</strong></h3>
          </div>
        </div>
      </div>
    
      {/* Footer */}
      <div className="footer">
        <div className="firstFooter panelFooter">
          <img src={logo} alt="Logo" />
          <p>It is a long established fact that a reader will be distracted by the readable content of a page whenters.</p>
          <div>
            <FacebookIcon className="icon"></FacebookIcon>
            <TwitterIcon className="icon"></TwitterIcon>
            <CameraAltIcon className="icon"></CameraAltIcon>
          </div>
        </div>
        <div className="panelFooter">
          <h3>About Us</h3>
          <h5>About</h5>
          <h5>Privacy & Policy</h5>
          <h5>Terms & Conditions</h5>
          <h5>Faq</h5>
        </div>
        <div className="panelFooter">
          <h3>Navigate</h3>
          <h5>How We Work</h5>
          <h5>Services</h5>
          <h5>Faq</h5>
          <h5>Contact</h5>
          <h5>Free Quote</h5>
        </div>
        <div className="panelFooter">
          <h3>Contact Us</h3>
          <h5>Ricardo Margain 444</h5>
          <h5>Call: +52 81 1234 5678</h5>
          <h5>Email: info@challenge.com</h5>
          <div className="button"><WhatsAppIcon className="bIcon"></WhatsAppIcon> <h3>WhatsApp</h3></div>
        </div>
      </div>
    
      {/* Modal */}
      <Dialog 
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <div className="summary">
        <h1>Summary</h1>
        <div className="panel">
          <div className="data">
            <h3 className="dataName">Total Items</h3>
            <h3 className="dataValue">{totalItems}</h3>
          </div>
          <div className="data">
            <h3 className="dataName">Total M<sup>2</sup></h3>
            <h3 className="dataValue">{totalM2}</h3>
          </div>
          <div className="data">
            <h3 className="dataName">Subtotal</h3>
            <h3 className="dataValue">${subtotal}</h3>
          </div>
          <div className="data">
            <h3 className="dataName">Tax</h3>
            <h3 className="dataValue">${tax}</h3>
          </div>
          <div className="data">
            <h3 className="dataName"><strong>Total</strong></h3>
            <h3 className="dataValue"><strong>${total}</strong></h3>
          </div>
          <div className="data">
            <h3 className="dataName"><strong>Due Today 50%</strong></h3>
            <h3 className="dataValue"><strong>${due}</strong></h3>
          </div>
        </div>
      </div>
      </Dialog>
    </div>
  );
}

export default App;
