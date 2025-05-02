import React, { useState } from 'react';
import Host from './Broadcast';
import Viewer from './Viewers';

function App() {
  const [role, setRole] = useState(null);
  


  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='tangerine-bold'>Baby Naming Ceremony</h1>
      <p className='parents'><span>Hosted by: </span>(Jane & John)</p>
      
      <br />
     <div className='babies '>
     <img src="https://wallpapercave.com/wp/COkN3ti.jpg" alt="img1" />
      <img src="https://cf.ltkcdn.net/baby/images/orig/273163-1600x1066-welcome-baby-boy.jpg" alt="img3" />
      <img src="https://www.pixelstalk.net/wp-content/uploads/2016/04/Funny-sleep-baby-wallpaper-HD.jpg" alt="img4" />
      <p style={{color:'gray',fontSize:'1.3rem'}}>
    “A child is a blessing, a gift from heaven above — a precious little angel to cherish <br /> and to love.”
  </p>
      <img src="http://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dspArticle/leadImage/31-BUSINESS-NEWBORNS-4-11_971D5AF0-0401-11E5-B8BA0698A1F216C3.jpg" alt="img5" />
      <img src="https://tse1.mm.bing.net/th?id=OIP.c_npKLATn-CjR0syFXQ3AAHaEb&pid=Api&P=0&h=180" alt="img6" />
     <img src="https://tse3.mm.bing.net/th?id=OIP.9LNVpyb3eaY7DTXuANJVUAHaEo&pid=Api&P=0&h=180" alt="img7" />
      <img src="http://images.huffingtonpost.com/2016-04-12-1460483390-1737677-Fotolia_78368536_Subscription_Monthly_M.jpg" alt="img8" />
     </div>
      <p className='text-center subtitle p-3'>  We are overjoyed to welcome you to this special occasion as we celebrate the naming of our precious child. 
  <br />
  Though you may be joining us virtually, your presence means the world to us. 
  Today marks a new beginning filled with love, blessings, and hope. 
  <br />
  Thank you for being a part of our joy. May your life be filled with the same happiness we feel today!</p>
  <hr />
     
  <div className='stream '>
       <div className="left">
       <h2 className="text-xl font-semibold tangerine-bold">Event Information:  </h2>
       <br /><br />
       <p>Host : Jane & John</p>
       <p>Date : May 10, 2025</p>
       <p>Location : Streaming live from NYC</p>
       </div>
       <div className="right">
       {!role && (
        <div className='btn '>
          <button onClick={() => setRole('host')}>Start as Host</button>
          <button onClick={() => setRole('viewer')}>Join as Viewer</button>
        </div>
      )}
      {role === 'host' && <Host />}
      {role === 'viewer' && <Viewer />}
       </div>
      
    </div>
    <hr />
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9987406144332!2d77.51017407484139!3d12.971932087343514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d0046b11521%3A0xb6c0864dc0886d08!2s-%20Nagarbhavi%20Circle%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1746197561713!5m2!1sen!2sin"
      width="400"
      height="300"
      style={{ border: 0, pointerEvents: 'none' }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Event Location"
    />
  

    <footer className="text-center py-4 border-t mt-10 ">
  <p>Thank you for joining us in celebrating this beautiful moment.</p>
  <p>With love, <strong><u>Jane & John Doe</u></strong></p>
  <p className="mt-2">© {new Date().getFullYear()} Baby Naming Ceremony • All rights reserved</p>
</footer>
    </div>
    
  );
}

export default App;
