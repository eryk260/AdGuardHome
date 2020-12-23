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
                const check = await Install.checkConfig(values);
                checker(check?.web?.status === '', check?.web?.status || '');
                break;
            }
            case 3: {
                // dns
                const check = await Install.checkConfig(values);
                checker(check?.dns?.status === '', check?.dns?.status || '');
                break;
            }
            case 4: {
                // configure
                const config = await Install.configure(values);
                if (config) {
                    const { web } = values;
                    window.location.href = `http://${web.ip[0]}:${web.port}`;
                }
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
