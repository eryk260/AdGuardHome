import React, { FC, useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { Input, Radio, Switch } from 'Common/controls';
import { DEFAULT_IP_ADDRESS } from 'Consts/install';
import { chechNetworkType, NETWORK_TYPE } from 'Helpers/installHelpers';
import theme from 'Lib/theme';
import Store from 'Store/installStore';

import s from './Auth.module.pcss';
import StepButtons from '../StepButtons';
import { FormValues } from '../../Install';

interface AuthProps {
    values: FormValues;
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const Auth: FC<AuthProps> = observer(({
    values,
    setFieldValue,
}) => {
    const { ui: { intl } } = useContext(Store);

    return (
        <div className={s.content}>
            <div className={theme.typo.title}>
                {intl.getMessage('install_auth_title')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_block)}>
                {intl.getMessage('install_auth_description')}
            </div>
            <Input
                placeholder={intl.getMessage('login')}
                type="username"
                name="username"
                value={values.username}
                onChange={(v) => setFieldValue('username', v)}
            />
            <Input
                placeholder={intl.getMessage('password')}
                type="password"
                name="password"
                value={values.password}
                onChange={(v) => setFieldValue('password', v)}
            />
            <StepButtons
                setFieldValue={setFieldValue}
                currentStep={2}
                values={values}
            />
        </div>
    );
});

export default Auth;
