import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { notifyError } from 'Common/ui';
import theme from 'Lib/theme';
import Store from 'Store/installStore';
import Install from 'Store/stores/Install';

import { FormValues } from '../Install';

interface StepButtonsProps {
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
    currentStep: number;
    values: FormValues;
}

const StepButtons: FC<StepButtonsProps> = observer(({
    setFieldValue,
    currentStep,
    values,
}) => {
    const { ui: { intl } } = useContext(Store);
    const onNext = async () => {
        const check = await Install.checkConfig({
            ...values, web: { ...values.web, ip: values.web.ip[0] },
        });
        const checker = (condition: boolean, message: string) => {
            if (condition) {
                setFieldValue('step', currentStep + 1);
            } else {
                notifyError(message);
            }
        };
        console.log(values);
        switch (currentStep) {
            case 1: {
                // web
                checker(check?.web?.status === '', check?.web?.status || '');
                break;
            }
            case 3: {
                // dns
                checker(check?.dns?.status === '', check?.dns?.status || '');
                break;
            }
            default:
                setFieldValue('step', currentStep + 1);
                break;
        }
    };
    return (
        <div>
            <Button
                size="large"
                type="ghost"
                className={cn(theme.button.button, theme.button.inGroup)}
                onClick={() => setFieldValue('step', currentStep - 1)}
            >
                {intl.getMessage('back')}
            </Button>
            <Button
                size="large"
                type="primary"
                className={cn(theme.button.button)}
                onClick={onNext}
            >
                {intl.getMessage('next')}
            </Button>
        </div>
    );
});

export default StepButtons;
