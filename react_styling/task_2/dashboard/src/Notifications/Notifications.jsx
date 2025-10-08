import { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
    constructor(props) {
        super(props)
    }

    markAsRead = (id) => {
        console.log(`Notification ${id + 1} has been marked as read`);
    }

    shouldComponentUpdate(nextProps) {
        return (
            nextProps.notifications.length >
            this.props.notifications.length ||
            nextProps.displayDrawer !== this.props.displayDrawer
        );
    }

    render() {
        const { notifications = [], displayDrawer = true } = this.props;
        return (
            <div>
                <div className="absolute top-1 right-2">Your notifications</div>
                {
                    displayDrawer ? (
                        <div className="flex flex-row justify-between w-120 absolute right-2 mt-8 border-2 border-dashed p-1" style={{ borderColor: "var(--main-color)" }}>
                            {notifications.length > 0 ? (
                                <>
                                <div className='flex flex-col'>
                                    <p>Here is the list of notifications</p>  
                                    <ul className='list-disc list-inside'>
                                        {notifications.map((notification, index) => (
                                            <NotificationItem
                                                id={index}
                                                key={notification.id}
                                                type={notification.type}
                                                value={notification.value}
                                                html={notification.html}
                                                markAsRead={this.markAsRead}
                                            />
                                        ))}
                                    </ul>
                                </div>
                                <div className='size-3'>
                                    <button onClick={() => console.log('Close button has been clicked')}aria-label='Close'>
                                        <img  src={closeIcon} alt='close icon' />
                                    </button>
                                </div>
                                </>
                            ) : (
                                <p>No new notification for now</p>
                            )}
                        </div>
                    ) :
                        ([])
                }
            </div>
        );
    }
}

export default Notifications
