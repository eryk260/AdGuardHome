import React from 'react';
import { notification } from 'antd';

import { DEFAULT_NOTIFICATION_DURATION } from 'Consts/common';

export const notifySuccess = (title: string, code?: string) => {
    notification.success({
        message: (
            <div
                data-notification={code || 'success'}
            >
                {title}
            </div>
        ),
        placement: 'bottomRight',
        duration: DEFAULT_NOTIFICATION_DURATION,
        className: 'notification',
        // closeIcon: <Icon icon="close_big" />,
    });
};

export const notifyError = (
    title: string,
    options?: {
        btn?: React.ReactNode;
        duration?: number;
        onClose?: () => void;
    },
) => {
    const { btn, duration, onClose } = options || {};
    notification.error({
        onClose,
        message: (
            <div>
                {title}
            </div>
        ),
        placement: 'bottomRight',
        duration: typeof duration === 'number' ? duration : DEFAULT_NOTIFICATION_DURATION,
        className: 'notification',
        // closeIcon: <Icon icon="close_big" />,
        btn,
    });
};
