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
                <div className="absolute top-0 right-2">Your notifications</div>
                {
                    displayDrawer ? (
                        <div className="w-120 absolute right-2 mt-8 border-2 border-dashed p-4" style={{ borderColor: "var(--main-color)" }}>
                            {notifications.length > 0 ? (
                                <>
                                    <p>Here is the list of notifications</p>
                                    <button
                                        onClick={() => console.log('Close button has been clicked')}
                                        aria-label='Close'
                                    >
                                        <img className='size-3 absolute top-5 right-2' src={closeIcon} alt='close icon' />
                                    </button>
                                    <ul>
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
