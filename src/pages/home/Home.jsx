import Posts from '../../components/posts/Posts'
import './Home.css'

// import PopupNotification from '../../components/popupNotification/PopupNotification'
// import { useState } from "react";
// import { w3cwebsocket } from "websocket";

// const client = new w3cwebsocket("ws://localhost:8000/ws/notifications/"); 

const Home = () => {
  // const [notification, setNotification] = useState(null);
  // const [notificationKey, setNotificationKey] = useState(0);

  // client.onmessage = function (event) {
  //   const message = JSON.parse(event.data).payload.message;
  //   console.log('recived a message')
  //   setNotificationKey(notificationKey + 1);
  //   setNotification(<PopupNotification  key={notificationKey} message={message} variant="info" />);
  // };

  return (
    // <div className='home' style={{marginLeft: "calc(260px + 1%)",marginRight: '2%'}}>
    <div className='home' >
      {/* <Stories />       */}
      {/* <PopupNotification message="Hello, world!" variant="success" /> */}
      {/* <div>{notification}</div> */}

      <Posts />
    </div>
  )
}
export default Home
