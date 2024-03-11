import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service"


export function UserMsg() {

  const [msg, setMsg] = useState(null)

  useEffect(()=>{
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(null)
      setTimeout(onCloseMsg, 3000)
    })


    return () => {
      unsubscribe()
    }
  },[])


  function onCloseMsg() {
    setMsg(null)
  }

  if (!msg) return <></>
  return (
    <div className={`user-msg ${msg.type}`}>
      <span className="user-msg-text">{msg.txt}</span>
      <button className="user-msg-close-button" onClick={onCloseMsg} />
    </div>
  )
}