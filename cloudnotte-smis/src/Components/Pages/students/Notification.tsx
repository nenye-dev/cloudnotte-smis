import type { NotificationData } from "./studentTypes";
type NotificationProps={
  notification:NotificationData;
}
function Notification({notification}:NotificationProps){
    return(
        <div
          className={`notification ${notification.type}`}
          role={notification.type === "error" ? "alert" : "status"}
        >
          {notification.message}
        </div>
    )
}
export default Notification